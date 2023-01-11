import { MusicProperties } from './../types/music.types';
import { arrayUnion, doc, Firestore, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { dbApp } from "FirebaseMusic";
import { UserInformation } from "types";

export const useFirebase = ()=>{
  const handleAddDoc = async(dbApp:Firestore,collection:string, userInfo:UserInformation)=>{
    const docRef = doc(dbApp, collection, userInfo.user_uid);
    const docSnap = await getDoc(docRef);
   return  !docSnap.exists() ? await setDoc(doc(dbApp, "users", userInfo.user_uid) ,userInfo) :false

  }
  // add music to list favorites
  const handleAddToFavoriteList = async(collection:string, userInfo:UserInformation,field:string, dataUpdate:any)=>{
    const docRef = doc(dbApp, collection, userInfo.user_uid);
    try {
      await updateDoc(docRef,{
        [field]:arrayUnion(dataUpdate)
      })
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
  return {
    handleAddDoc,
    handleAddToFavoriteList,
    handleCheckFavorited
  }
}