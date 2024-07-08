import { collection, getDocs } from "firebase/firestore";
import { DB_COLLECTIONS } from "./auth";
import { db } from "../firebase"; // Assuming db is exported from firebase.js or similar

export const getAllTrips = async () => {
  const trips = [];

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
    for (const vehicleDoc of vehiclesSnapshot.docs) {
      const vehicleId = vehicleDoc.id;

      const tripsCollectionRef = collection(
        db,
        DB_COLLECTIONS.USERS,
        userId,
        DB_COLLECTIONS.VEHICLES,
        vehicleId,
        DB_COLLECTIONS.TRIPS // Corrected collection path
      );

      const tripsSnapshot = await getDocs(tripsCollectionRef);

      tripsSnapshot.forEach((tripDoc) => {
        trips.push({
          id: tripDoc?.id,
          ownerId: userId,
          ownerName: `${firstName} ${lastName}`,
          vehicleId,
          ...tripDoc?.data(), // Corrected spread operator to use tripDoc instead of vehicleDoc
        });
      });
    }
  }

  return trips; // Return the trips array
};
