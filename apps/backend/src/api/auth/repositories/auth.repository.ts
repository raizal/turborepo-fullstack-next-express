import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  admin,
  db,
} from "@/config/firebase-config";

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdTokenResult();

    if (!idToken) {
      return null;
    }

    const { uid, displayName, photoURL, emailVerified } = userCredential.user;

    try {
      await db.collection('USERS').doc(uid).set({});
    } catch (e) {
    }

    return { idToken, uid, email, displayName, photoURL, emailVerified };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const resetPassword = async (email: string) => {
  return await sendPasswordResetEmail(auth, email);
};

export const userRegister = async (email: string, password: string) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(credential.user);
}