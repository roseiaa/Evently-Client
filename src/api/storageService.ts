import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import firebaseApp from "../config/firebaseConfig"
export const uploadFileAndReturnUrl = async (file: any) => {
   
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `images/${file.name}`);
    const response = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(response.ref);
    return url
  
}