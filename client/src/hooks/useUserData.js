import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

async function fetchUser(id) {
  const userRef = doc(db, "users", id);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return { _id: userSnap.id, ...userSnap.data() };
  }
}

function useUserData(id) {
  const {
    isLoading: userLoader,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: () => fetchUser(id),
  });

  return { userLoader, userError, userData };
}

export default useUserData;
