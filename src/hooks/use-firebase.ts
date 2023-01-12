import { MusicProperties } from './../types/music.types';
import { arrayRemove, arrayUnion, doc, Firestore, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { dbApp } from "FirebaseMusic";
import { UserInformation } from "types";
import React from 'react';
import { ContextApp } from 'context';
import { notification } from 'antd';

export const useFirebase = ()=>{
  const {
    userInfo,
    setCurrentModal,
    setPropsModal,
    propsModal,
   
  } = React.useContext(ContextApp);
  const handleAddDoc = async(dbApp:Firestore,collection:string, userInfo:UserInformation)=>{
    const docRef = doc(dbApp, collection, userInfo.user_uid);
    const docSnap = await getDoc(docRef);
   return  !docSnap.exists() ? await setDoc(doc(dbApp, collection, userInfo.user_uid) ,userInfo) :false

  }
  // add music to list favorites
  const handleAddToListFirebase = async(collection:string, userInfo:UserInformation,field:string, dataUpdate:any,type:string)=>{
    const docRef = doc(dbApp, collection, userInfo.user_uid);
    try {
     if(type==="add"){
      // await updateDoc(docRef,{
      //   [field]:arrayRemove(dataUpdate)
      // })
      await updateDoc(docRef,{
        [field]:arrayUnion(dataUpdate)
      })
     }
     else if(type==="remove") {
      await updateDoc(docRef,{
        [field]:arrayRemove(dataUpdate)
      })
     }
    } catch (error) {
      console.log({error});
    }

  }
  // check favorited
  const handleCheckFavorited = (listFavorites:MusicProperties[]|undefined,favorite:MusicProperties)=>{
   if(!listFavorites?.length){
    return false
   }
   else {
    return listFavorites.find((item)=>{
      return item._id===favorite._id
    }) ? true :false
   }

  }

  // click heart
  const handleClickHeart = async(listFavorited:MusicProperties[]|undefined,carousel:MusicProperties)=>{
    if (userInfo) {
      if (handleCheckFavorited(listFavorited, carousel)) {
        notification.success({
          message: "Đã xóa khỏi thư viện",
          placement: "bottomLeft",
          duration: 2.5,
        });
        // remove item khoi listfavorite of user's docs
        await handleAddToListFirebase(
          "users",
          userInfo,
          "favorites",
          carousel,
          "remove"
        );
      } else {
        notification.success({
          message: "Đã thêm vào thư viện",
          placement: "bottomLeft",
          duration: 2.5,
        });
        await handleAddToListFirebase(
          "users",
          userInfo,
          "favorites",
          carousel,
          "add"
        );
      }
    } else {
      setCurrentModal("modal_auth");
      setPropsModal({
        ...propsModal,
        width: 500,
        closable: false,
      });
    }
  }
  return {
    handleAddDoc,
    handleAddToListFirebase,
    handleCheckFavorited,
    handleClickHeart
  }
}