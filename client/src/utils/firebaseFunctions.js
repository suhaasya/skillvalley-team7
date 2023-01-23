import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { v4 as uuid } from "uuid";

export async function postPostData(id, postData) {
  const docRef = doc(db, "users", id, "posts", uuid());
  await setDoc(docRef, postData);
}
