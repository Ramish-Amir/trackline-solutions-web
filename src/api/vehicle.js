import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
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

  // Query all vehicles subcollections
  const vehiclesCollectionGroup = collectionGroup(db, DB_COLLECTIONS.VEHICLES);
  const vehiclesSnapshot = await getDocs(vehiclesCollectionGroup);

  // Add each vehicle to the allVehicles array
  for (const vehicleDoc of vehiclesSnapshot.docs) {
    const ownerId = vehicleDoc.ref.parent.parent.id; // Assuming the parent of the vehicles subcollection is the user document
    const ownerDocRef = doc(db, DB_COLLECTIONS.USERS, ownerId);
    const ownerDoc = await getDoc(ownerDocRef);

    if (ownerDoc.exists()) {
      const { firstName, lastName } = ownerDoc.data();
      const ownerName = `${firstName} ${lastName}`;
      allVehicles.push({
        id: vehicleDoc.id,
        ownerId,
        ownerName,
        ...vehicleDoc.data(),
      });
    }
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

export const editVehicle = async (ownerId, vehicleId, newData) => {
  try {
    console.log(
      "Editing vehicle with ownerId:",
      ownerId,
      "and vehicleId:",
      vehicleId
    );

    const vehicleDocRef = doc(
      db,
      DB_COLLECTIONS.USERS,
      ownerId,
      DB_COLLECTIONS.VEHICLES,
      vehicleId
    );

    await updateDoc(vehicleDocRef, newData);

    console.log("Vehicle updated successfully:", vehicleId);
  } catch (error) {
    console.error("Failed to update vehicle:", error);
    throw new Error("Failed to update vehicle.");
  }
};
