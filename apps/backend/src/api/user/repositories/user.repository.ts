import {
  db,
} from "@/config/firebase-config";
import { UpdateUserInput } from "@repo/entity";

import {getAuth} from 'firebase-admin/auth'
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

const auth = getAuth();

export const getUserData = async (currentUser: DecodedIdToken) => {
  const {
    email,
    phoneNumber,
    photoURL,
    displayName: name,
  } = await auth.getUser(currentUser.uid);
  const data = (await db.collection('USERS').doc(currentUser.uid).get()).data();
  return {...data, email, phoneNumber, photoURL, name};
}

export const updateUserData = async (currentUser: DecodedIdToken, newData: UpdateUserInput) => {
  await auth.updateUser(currentUser.uid, {
    phoneNumber: newData.phoneNumber,
    photoURL: newData.photoURL,
    displayName: newData.name,
  });
  return await getUserData(currentUser);
}