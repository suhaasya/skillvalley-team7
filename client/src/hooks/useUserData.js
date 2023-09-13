import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { deleteUser, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";

async function getUser(id) {
  if (id) {
    try {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return new Promise((resolve, reject) => {
          resolve({ _id: userSnap.id, ...userSnap.data() });
        });
      }
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  return new Promise((resolve, reject) => {
    reject();
  });
}

export function useGetUser(id) {
  const user = useQuery({
    queryKey: [`user-${id}`],
    queryFn: () => getUser(id),
  });

  return user;
}

async function getUserPosts(id) {
  const posts = [];
  if (id) {
    try {
      const postsRef = collectionGroup(db, "posts");
      const postsQuery = query(postsRef, where("user._id", "==", id));
      const postsSnap = await getDocs(postsQuery);

      postsSnap.forEach(async (doc) => {
        posts.push({ _id: doc.id, ...doc.data() });
      });

      return new Promise((resolve) => {
        resolve(posts);
      });
    } catch (error) {
      console.log(error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  return new Promise((resolve, reject) => {
    reject();
  });
}

export function useGetUserPosts(id) {
  const userPosts = useQuery({
    queryKey: [`userPosts-${id}`],
    queryFn: () => getUserPosts(id),
  });

  return userPosts;
}

async function updateUser(userId, body) {
  return updateDoc(doc(db, "users", userId), body);
}

export function useUpdateUser(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => {
      return updateUser(userId, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
}

async function updateUserPassword(user, newPassword) {
  return updatePassword(user, newPassword);
}

export function useUpdatePassword(user) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPassword) => {
      return updateUserPassword(user, newPassword);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

async function deleteUserAccount(user) {
  try {
    await runTransaction(db, async (transaction) => {
      await transaction.delete(doc(db, "users", user.uid));
      await deleteUser(user);
    });

    return new Promise((resolve, reject) => {
      resolve();
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
}

export function useDeleteUser(user) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return deleteUserAccount(user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

async function searchUserAccounts(value) {
  const users = [];
  try {
    const snap = await getDocs(
      query(
        collection(db, "users"),
        or(where("firstName", "==", value), where("lastName", "==", value))
      )
    );

    snap.forEach(async (doc) => {
      users.push({ _id: doc.id, ...doc.data() });
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

export function useSearchUsers(query) {
  const users = useQuery({
    queryKey: [`user-${query}`],
    queryFn: () => searchUserAccounts(query),
  });

  return users;
}
