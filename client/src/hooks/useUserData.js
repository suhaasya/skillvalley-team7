import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  arrayUnion,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  or,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { deleteUser, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

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

async function createUserChat(currentUser, otherUser) {
  const docRef1 = doc(db, "users", currentUser._id, "chats", otherUser._id);
  const docRef2 = doc(db, "users", otherUser._id, "chats", currentUser._id);
  const docRef3 = doc(db, "chats", currentUser._id + otherUser._id);

  try {
    await runTransaction(db, async (transaction) => {
      transaction.set(docRef1, otherUser);
      transaction.set(docRef2, currentUser);
      transaction.set(docRef3, { messages: [] });
    });
  } catch (error) {
    throw new Error(error);
  }
}

export function useCreateUserChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (users) => {
      return createUserChat(users.currentUser, users.otherUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userChats"]);
    },
  });
}

async function getAllChats(id) {
  const chats = [];
  if (!id) {
    throw new Error("id undefined");
  }
  try {
    const chatsRef = collection(db, "users", id, "chats");
    const chatsQuery = query(chatsRef, orderBy("createdAt", "desc"));
    const chatsSnap = await getDocs(chatsQuery);
    chatsSnap.forEach(async (doc) => {
      chats.push({ ...doc.data() });
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  return new Promise((resolve, reject) => {
    resolve(chats);
  });
}

export function useGetAllChats(userId) {
  const allUserChats = useQuery({
    queryKey: ["userChats"],
    queryFn: () => getAllChats(userId),
  });

  return allUserChats;
}

async function createMessage({ id1, id2 }, data) {
  const docRef1 = doc(db, "chats", id1 + id2);
  const docRef2 = doc(db, "chats", id2 + id1);

  try {
    const docSnap1 = await getDoc(docRef1);
    const docSnap2 = await getDoc(docRef2);
    if (docSnap1.exists()) {
      return await updateDoc(docRef1, { messages: arrayUnion(data) });
    }
    if (docSnap2.exists()) {
      return await updateDoc(docRef2, { messages: arrayUnion(data) });
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  return new Promise((resolve, reject) => {
    resolve();
  });
}

export function useCreateMessage(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return createMessage(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

async function getMessages(id1, id2) {
  let messages = null;

  const docRef1 = doc(db, "chats", `${id1}${id2}`);
  const docRef2 = doc(db, "chats", `${id2}${id1}`);

  try {
    const docSnap1 = await getDoc(docRef1);
    const docSnap2 = await getDoc(docRef2);
    if (docSnap1.exists()) {
      messages = docSnap1.data();
    }
    if (docSnap2.exists()) {
      messages = docSnap2.data();
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  return new Promise((resolve, reject) => {
    resolve(messages?.messages);
  });
}

export function useGetMessages({ userId, activeChatId }) {
  const allUserChats = useQuery({
    queryKey: [`chats`, `${userId}${activeChatId}`],
    queryFn: () => getMessages(userId, activeChatId),
    refetchInterval: 1000,
  });

  return allUserChats;
}
