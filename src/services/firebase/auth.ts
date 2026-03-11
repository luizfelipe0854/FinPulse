import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./config";
import { createUserCollection } from "./firestore";

const auth = getAuth(app);

export const createUser = async (
  email: string,
  password: string,
  displayName: string,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredential.user;

  await updateProfile(user, {
    displayName,
  });

  await createUserCollection(user.uid, displayName, email);

  return userCredential;
};

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
