import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

export async function createUser(data) {
  await setDoc(doc(db, "users", data.id), data.body);
  await setDoc(doc(db, "userChats", data.id), {});
}
