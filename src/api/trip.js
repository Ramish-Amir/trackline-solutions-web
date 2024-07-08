import { collection, getDocs } from "firebase/firestore";
import { DB_COLLECTIONS } from "./auth";

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
    vehiclesSnapshot?.forEach(async (vehicleDoc) => {
      const vehicleId = vehicleDoc.id;

      const tripsCollectionRef = collection(
        db,
        DB_COLLECTIONS.USERS,
        userId,
        DB_COLLECTIONS.VEHICLES,
        vehicleId,
        DB_COLLECTIONS.VEHICLES
      );

      const tripsSnapshot = await getDocs(tripsCollectionRef);

      tripsSnapshot?.forEach((tripDoc) => {
        trips.push({
          id: tripDoc?.id,
          ownerId: userId,
          ownerName: `${firstName} ${lastName}`,
          vehicleId,
          ...vehicleDoc?.data(),
        });
      });

    //   allVehicles.push({
    //     id: vehicleDoc.id,
    //     ownerId: userId,
    //     ownerName: `${firstName} ${lastName}`,
    //     ...vehicleDoc.data(),
    //   });
    });
  }
};
