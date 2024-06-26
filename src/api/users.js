import { collection, getDocs } from "firebase/firestore";
import { DB_COLLECTIONS } from "./auth";
import { db } from "../firebase";

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, DB_COLLECTIONS.USERS));
    return querySnapshot.docs?.map((doc) => doc?.data());
  } catch (err) {
    console.log(err);
    return err;
  }
};
