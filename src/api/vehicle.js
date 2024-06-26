import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
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

export const getAllVehicles = async () => {
  const allVehicles = [];

  // Step 1: Get all users
  const usersCollectionRef = collection(db, DB_COLLECTIONS.USERS);
  const usersSnapshot = await getDocs(usersCollectionRef);

  // Step 2: For each user, get all vehicles
  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id;
    const { firstName, lastName } = userDoc?.data();
    const vehiclesCollectionRef = collection(
      db,
      DB_COLLECTIONS.USERS,
      userId,
      DB_COLLECTIONS.VEHICLES
    );

    const vehiclesSnapshot = await getDocs(vehiclesCollectionRef);

    // Add each vehicle to the allVehicles array
    vehiclesSnapshot.forEach((vehicleDoc) => {
      allVehicles.push({
        id: vehicleDoc.id,
        ownerId: userId,
        ownerName: `${firstName} ${lastName}`,
        ...vehicleDoc.data(),
      });
    });
  }

  return allVehicles;
};

export const deleteVehicle = async (ownerId, vehicleId) => {
  await deleteDoc(
    doc(db, DB_COLLECTIONS.USERS, ownerId, DB_COLLECTIONS.VEHICLES, vehicleId)
  );

  await updateDoc(doc(db, DB_COLLECTIONS.USERS, ownerId), {
    totalVehicles: increment(-1),
  });
};
