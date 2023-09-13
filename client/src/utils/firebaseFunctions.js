import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { v4 as uuid } from "uuid";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

export async function postPostData(id, postData) {
  const docRef = doc(db, "users", id, "posts", uuid());
  await setDoc(docRef, postData);
}

export async function isUserExists(id) {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  return docSnap.data() ? true : false;
}

export async function signWithGoogle() {
  const auth = getAuth();
  try {
    const user = await signInWithPopup(auth, provider);

    const isValidUser = await isUserExists(user?.user?.uid);

    if (isValidUser) {
      return user?.user;
    }
  } catch (error) {
    toast.error(error.message);
  }

  return null;
}
