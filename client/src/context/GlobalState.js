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
import { setError, setUser } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/features/postsSlice";
import { setUsers } from "../redux/features/usersSlice";

export const GlobalContext = createContext({});

// Provider Component
export const GlobalProvider = ({ children }) => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userRef = doc(db, "users", auth.currentUser?.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          dispatch(setUser(userSnap.data()));
        } else {
          dispatch(setError("user doesnt exist"));
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }

    async function fetchUsers() {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const users = [];
        usersSnap.forEach((doc) => {
          users.push({ _id: doc.id, ...doc.data() });
        });

        dispatch(setUsers(users));
      } catch (error) {
        dispatch(setError(error.message));
      }
    }

    async function fetchPosts() {
      try {
        const postsref = collection(db, "posts");
        const q = query(postsref, orderBy("post", "desc"));
        const postsSnap = await getDocs(q);
        const posts = [];
        postsSnap.forEach((doc) => {
          posts.push({ _id: doc.id, ...doc.data() });
        });

        dispatch(setPosts(posts));
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
    fetchUser();
    fetchUsers();
    fetchPosts();
  }, [auth.currentUser?.uid, dispatch, state]);

  function signWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userId = result.user.uid;

        if (users.some((user) => user._id === userId)) {
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
