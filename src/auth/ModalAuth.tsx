import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faClose, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, message, Spin } from "antd";
import { imgSource } from "assets/images";
import { ContextApp } from "context";
import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import * as React from "react";
import { dbApp } from "FirebaseMusic";
import { useFirebase } from "hooks";
import { UserInformation } from "types";

export interface IModalAuthProps {}

export function ModalAuth(props: IModalAuthProps) {
  const { setCurrentModal, setPropsModal, setUserInfo } = React.useContext(
    ContextApp
  );
  const [formLogin] = Form.useForm();
  const [formRegister] = Form.useForm();
  const [isHasAccount, setIsHasAccount] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { handleAddDoc } = useFirebase();

  // login with google
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const userInfo: UserInformation = {
        displayName: user.displayName ? user.displayName : "",
        email: user.email ? user.email : "",
        photoURL: user.photoURL ? user.photoURL : "",
        user_uid: user.uid,
      };
      localStorage.setItem("accessToken", user.refreshToken);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUserInfo(userInfo);

      setCurrentModal("");
      setPropsModal({});
      setIsLoading(true);
      await handleAddDoc(dbApp, "users", userInfo);
      setIsLoading(false);
      message.success("Đăng nhập thành công");
    } catch (error) {
      message.success("Có lỗi xảy ra");
      setIsLoading(false);
    }
  };

  // register
  const handleRegisterAccount = async (dataRegister: any) => {
    const { fullName, password, username } = dataRegister;

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );

      const { user } = userCredential;
      const userRegister: UserInformation = {
        displayName: user.displayName ? user.displayName : fullName,
        email: user.email ? user.email : "",
        photoURL: user.photoURL ? user.photoURL : "",
        user_uid: user.uid,
      };
      setIsLoading(true);

      await handleAddDoc(dbApp, "users", userRegister);
      setIsLoading(false);

      localStorage.setItem("accessToken", user.refreshToken);
      localStorage.setItem("userInfo", JSON.stringify(userRegister));
      setUserInfo(userRegister);
      setCurrentModal("");
      setPropsModal({});
      formRegister.resetFields();
      message.success("Đăng kí tài khoản thành công");
    } catch (error) {
      setIsLoading(false);

      if (error) {
        message.error("Email đã được sử dụng!");
      }
    }
  };

  // handleLogin with user and account
  const handleLogin = async (dataLogin: any) => {
    const { fullName, password, username } = dataLogin;

    const auth = getAuth();
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const { user } = userCredential;
      const userLogin: UserInformation = {
        displayName: user.displayName ? user.displayName : fullName,
        email: user.email ? user.email : "",
        photoURL: user.photoURL ? user.photoURL : "",
        user_uid: user.uid,
      };
      setIsLoading(false);

      localStorage.setItem("accessToken", user.refreshToken);
      localStorage.setItem("userInfo", JSON.stringify(userLogin));
      setUserInfo(userLogin);
      setCurrentModal("");
      setPropsModal({});
      formLogin.resetFields();
      message.success("Đăng nhập thành công");
    } catch (error) {
      const e = error as AuthError;
      message.error("Sai tên đăng nhập hoặc mật khẩu");
      setIsLoading(false);
    }
  };
  return (
    <div>
      {/* header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[24px] text-primaryText">Đăng nhập</h2>
        <p
          className="w-[35px] h-[35px] rounded-full bg-bgHoverDrawer flex-center-element cursor-pointer hover:scale-110 trasition-common"
          onClick={() => {
            setCurrentModal("");
          }}
        >
          <FontAwesomeIcon icon={faClose} />
        </p>
      </div>
      {/* content */}
      <div>
        {/* form login */}
        {isHasAccount ? (
          <Form
            form={formLogin}
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            onFinish={handleLogin}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={<p className="text-primaryText">Tên đăng nhập:</p>}
              name="username"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                { required: true, message: "Please input your username!" },
              ]}
              className="mb-3"
            >
              <Input
                prefix={
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-[#333333] mr-1"
                  />
                }
              />
            </Form.Item>
            {/* pass */}

            <Form.Item
              label={<p className="text-primaryText">Mật khẩu:</p>}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-[#333333] mr-1"
                  />
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={`bg-bgButtonPrimary w-full text-primaryText mt-3 flex-center-element hover:opacity-90 ${
                  isLoading ? "pointer-events-none" : "pointer-events-auto"
                }`}
              >
                {isLoading ? <Spin /> : "Đăng nhập"}
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form
            form={formRegister}
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            onFinish={handleRegisterAccount}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {/* form Registration */}
            <Form.Item
              label={<p className="text-primaryText">Tên:</p>}
              name="fullName"
              className="mb-3"
            >
              <Input
                prefix={
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-[#333333] mr-1"
                  />
                }
              />
            </Form.Item>
            <Form.Item
              label={<p className="text-primaryText">Email:</p>}
              name="username"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                { required: true, message: "Please input your username!" },
              ]}
              className="mb-3"
            >
              <Input
                prefix={
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-[#333333] mr-1"
                  />
                }
              />
            </Form.Item>

            <Form.Item
              label={<p className="text-primaryText">Mật khẩu:</p>}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must have at least 6 characters" },
              ]}
              className="mb-3"
            >
              <Input.Password
                prefix={
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-[#333333] mr-1"
                  />
                }
              />
            </Form.Item>

            {/* confirm pass */}
            <Form.Item
              name="confirm"
              label={<p className="text-primaryText">Xác nhận mật khẩu:</p>}
              dependencies={["password"]}
              // hasFeedback : show tick success
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-[#333333] mr-1"
                  />
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={`bg-bgButtonPrimary w-full text-primaryText mt-3 flex-center-element hover:opacity-90 ${
                  isLoading ? "pointer-events-none" : "pointer-events-auto"
                }`}
              >
                {isLoading ? <Spin /> : "Đăng kí"}
              </Button>
            </Form.Item>
          </Form>
        )}

        {/* Check if you already have an account? */}
        <p className="flex-center-element mb-8">
          <span
            className="cursor-pointer"
            onClick={() => {
              setIsHasAccount(!isHasAccount);
            }}
          >
            {isHasAccount ? "Đăng kí" : "Đăng nhập"}
          </span>
        </p>

        {/* login with google */}
        {isHasAccount ? (
          <div className="flex-center-element">
            <div
              className="flex-center-element gap-x-2 cursor-pointer"
              onClick={() => {
                handleLoginWithGoogle();
              }}
            >
              <img src={imgSource.logoGoogle} alt="" className="w-8 h-8" />
              <p>Đăng nhập bằng Google</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
