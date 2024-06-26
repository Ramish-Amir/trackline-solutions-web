import {
  addDoc,
  collection,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { DB_COLLECTIONS } from "./auth";

export const registerVehicle = async (data) => {
  const vehicleRef = collection(
    db,
    DB_COLLECTIONS.USERS,
    data?.owner,
    DB_COLLECTIONS.VEHICLES
  );

  await addDoc(vehicleRef, {
    ...data,
    vehicleTotalTrips: 0,
    co2Km: 0,
    co2M: 0,
  });

  const userDocRef = doc(db, DB_COLLECTIONS.USERS, data?.owner);
  await updateDoc(userDocRef, { totalVehicles: increment(1) });
};
