import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";

export const GlobalContext = createContext({});

// Provider Component
export const GlobalProvider = ({ children }) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [userPostsData, setUserPostsData] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // All Posts Data
      const postsref = collection(db, "posts");
      const q = query(postsref, orderBy("post", "desc"));
      const postsSnap = await getDocs(q);
      const posts = [];
      postsSnap.forEach((doc) => {
        posts.push({ _id: doc.id, ...doc.data() });
      });
      setPostsData(posts);

      // All Users Data
      const usersSnap = await getDocs(collection(db, "users"));
      const users = [];
      usersSnap.forEach((doc) => {
        users.push({ _id: doc.id, ...doc.data() });
      });
      setUsersData(users);

      // Logged in User Data
      const userRef = doc(db, "users", auth.currentUser?.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUser({ _id: userSnap.id, ...userSnap.data() });
      }

      // User Posts Data
      const userPosts = posts.filter(
        (post) => post.user.uid === auth.currentUser?.uid
      );

      setUserPostsData(userPosts);

      setLoading(false);
    }
    fetchData();
  }, [auth.currentUser?.uid, state]);

  function signWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userId = result.user.uid;

        if (usersData.some((user) => user._id === userId)) {
          navigate("/home");
        } else {
          navigate("/welcome");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <GlobalContext.Provider
      value={{
        user,
        usersData,
        userPostsData,
        postsData,
        loading,
        setLoading,
        signWithGoogle,
        setState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
