import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Spin } from "antd";
import { TbMicrophone2 } from "react-icons/tb";

import * as React from "react";
import { RiPlayListFill } from "react-icons/ri";
import {
  faAddressBook,
  faBuilding,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FaYoutubeSquare } from "react-icons/fa";

export interface IModalUploadSongProps {}

export function ModalUploadSong(props: IModalUploadSongProps) {
  const [formLogin] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<Boolean>(false);
  return (
    <div>
      <Form
        form={formLogin}
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        // onFinish={handleLogin}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={<p className="text-primaryText">Tên bài hát:</p>}
          name="nameSong"
          rules={[{}, { required: true, message: "Vui lòng nhập tên bài hát" }]}
          className="mb-3"
        >
          <Input
            prefix={
              // <FontAwesomeIcon icon={faUser} className="text-[#333333] mr-1" />
              <RiPlayListFill className="text-[#333333] mr-1" />
            }
          />
        </Form.Item>
        {/* nhạc sĩ */}

        <Form.Item
          label={<p className="text-primaryText">Tên nghệ sĩ:</p>}
          name="nameSinger"
          rules={[{ required: true, message: "Vui lòng nhập tên nghệ sĩ" }]}
          className="mb-3"
        >
          <Input
            prefix={
              <FontAwesomeIcon
                icon={faAddressBook}
                className="text-[#333333] mr-1"
              />
              // <TbMicrophone2 className="text-black" />
            }
          />
        </Form.Item>
        {/* thể loại */}
        <Form.Item
          label={<p className="text-primaryText">Tên thể loại:</p>}
          name="typeSong"
          rules={[
            { required: true, message: "Vui lòng nhập tên thể loại bài hát" },
          ]}
          className="mb-3"
        >
          <Input
            prefix={
              <FontAwesomeIcon
                icon={faBuilding}
                className="text-[#333333] mr-1"
              />
              // <TbMicrophone2 className="text-black" />
            }
          />
        </Form.Item>
        {/* link youtobe */}
        <Form.Item
          label={<p className="text-primaryText">Link Youtube:</p>}
          name="linkYoutobe"
          rules={[{ required: true, message: "Nhập Link Youtube" }]}
        >
          <Input
            prefix={
              // <FontAwesomeIcon
              //   icon={}
              //   className="text-[#333333] mr-1"
              // />
              <FaYoutubeSquare className="text-[#333333] mr-1" />
            }
          />
        </Form.Item>
        {/* select song */}
        <Form.Item
          // label={<p className="text-primaryText">Chọn bài hát:</p>}
          name="song"
          rules={[{ required: true, message: "Vui lòng chọn bài hát" }]}
        >
          <div className="flex items-center gap-x-2 bg-bgButtonPrimary w-fit py-1 px-2 cursor-pointer">
            <FontAwesomeIcon icon={faUpload} className="text-secondText" />
            <p>Chọn bài hát</p>
          </div>
        </Form.Item>
        {/* select song */}
        <Form.Item
          // label={<p className="text-primaryText">Chọn poster:</p>}
          name="song"
          rules={[{ required: true, message: "Vui lòng chọn poster" }]}
        >
          <div className="flex items-center gap-x-2 bg-bgButtonPrimary w-fit py-1 px-2 cursor-pointer">
            <FontAwesomeIcon icon={faUpload} className="text-secondText" />
            <p>Chọn bài hát</p>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={`bg-bgButtonPrimary w-full text-primaryText mt-3 flex-center-element hover:opacity-90 ${
              isLoading ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            {isLoading ? <Spin /> : "Tải nhạc lên"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
