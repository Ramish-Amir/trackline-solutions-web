import {
  collection,
  getDocs,
  doc,
  getDoc,
  collectionGroup,
  orderBy,
  limit,
  query,
} from "firebase/firestore";
import { DB_COLLECTIONS } from "./auth";
import { db } from "../firebase"; // Assuming db is exported from firebase.js or similar

const MONTHS = [
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
];

export const getAllTrips = async () => {
  const trips = [];

  const usersCollectionRef = collection(db, DB_COLLECTIONS.USERS);
  const usersSnapshot = await getDocs(usersCollectionRef);

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

    for (const vehicleDoc of vehiclesSnapshot.docs) {
      const vehicleId = vehicleDoc.id;
      const { company } = vehicleDoc?.data();
      const tripsCollectionRef = collection(
        db,
        DB_COLLECTIONS.USERS,
        userId,
        DB_COLLECTIONS.VEHICLES,
        vehicleId,
        DB_COLLECTIONS.TRIPS
      );

      const tripsSnapshot = await getDocs(tripsCollectionRef);

      tripsSnapshot.forEach((tripDoc) => {
        trips.push({
          id: tripDoc?.id,
          ownerId: userId,
          ownerName: `${firstName} ${lastName}`,
          vehicleId,
          company,
          ...tripDoc?.data(),
        });
      });
    }
  }

  return trips;
};

export const getTripDetails = async (ownerId, vehicleId, tripId) => {
  try {
    // Reference the trip document
    const tripDocRef = doc(
      db,
      DB_COLLECTIONS.USERS,
      ownerId,
      DB_COLLECTIONS.VEHICLES,
      vehicleId,
      DB_COLLECTIONS.TRIPS,
      tripId
    );

    // Fetch the trip document
    const tripDocSnapshot = await getDoc(tripDocRef);
    if (!tripDocSnapshot.exists()) {
      throw new Error("Trip not found");
    }
    const tripData = tripDocSnapshot.data();

    // Fetch user information
    const userDocRef = doc(db, DB_COLLECTIONS.USERS, ownerId);
    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      throw new Error("User not found");
    }
    const { firstName, lastName, email } = userDocSnapshot.data();

    // Fetch vehicle information
    const vehicleDocRef = doc(
      db,
      DB_COLLECTIONS.USERS,
      ownerId,
      DB_COLLECTIONS.VEHICLES,
      vehicleId
    );
    const vehicleDocSnapshot = await getDoc(vehicleDocRef);
    if (!vehicleDocSnapshot.exists()) {
      throw new Error("Vehicle not found");
    }
    const { company } = vehicleDocSnapshot.data();

    // Combine the data
    const tripDetails = {
      id: tripId,
      ownerId,
      ownerName: `${firstName} ${lastName}`,
      owner: userDocSnapshot.data(),
      vehicleId,
      vehicle: vehicleDocSnapshot.data(),
      company,
      ...tripData,
    };

    return tripDetails;
  } catch (error) {
    console.error("Error getting trip details:", error);
    throw error;
  }
};

export const getPerTripDetails = async (ownerId, vehicleId, tripId) => {
  try {
    // Reference the trip document
    const tripDocRef = doc(
      db,
      DB_COLLECTIONS.USERS,
      ownerId,
      DB_COLLECTIONS.VEHICLES,
      vehicleId,
      DB_COLLECTIONS.TRIPS,
      tripId
    );

    // Fetch the trip document
    const tripDocSnapshot = await getDoc(tripDocRef);
    if (!tripDocSnapshot.exists()) {
      throw new Error("Trip not found");
    }
    const tripData = tripDocSnapshot.data();

    // Fetch user information
    const userDocRef = doc(db, DB_COLLECTIONS.USERS, ownerId);
    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      throw new Error("User not found");
    }
    const { firstName, lastName } = userDocSnapshot.data();

    // Fetch vehicle information
    const vehicleDocRef = doc(
      db,
      DB_COLLECTIONS.USERS,
      ownerId,
      DB_COLLECTIONS.VEHICLES,
      vehicleId
    );
    const vehicleDocSnapshot = await getDoc(vehicleDocRef);
    if (!vehicleDocSnapshot.exists()) {
      throw new Error("Vehicle not found");
    }
    const { company } = vehicleDocSnapshot.data();

    // Combine the data
    const tripDetails = {
      id: tripId,
      ownerId,
      ownerName: `${firstName} ${lastName}`,
      vehicleId,
      company,
      ...tripData,
    };

    return tripDetails;
  } catch (error) {
    console.error("Error getting trip details:", error);
    throw error;
  }
};

export const tripsChartData = async () => {
  const tripsCollectionGroup = collectionGroup(db, DB_COLLECTIONS.TRIPS);
  const tripsSnapshot = await getDocs(tripsCollectionGroup);

  const trips = tripsSnapshot?.docs?.map((tripDoc) => tripDoc.data());

  // Sort trips by endingTime in descending order
  trips.sort((a, b) => b.endingTime.seconds - a.endingTime.seconds);

  // Initialize an empty object to store the count of trips for each month
  const tripsByMonth = {};

  // Iterate over the trips array
  trips.forEach((trip) => {
    const date = new Date(trip.endingTime.seconds * 1000); // convert to JavaScript Date object
    const month = date.toLocaleString(undefined, {
      month: "short",
      timeZone: "America/Toronto",
    }); // get month in local time
    const year = date.toLocaleString(undefined, {
      year: "numeric",
      timeZone: "America/Toronto",
    }); // get year in local time

    // Use the month and year as a key in the object and increment the count
    const key = `${month} ${year}`;
    tripsByMonth[key] = (tripsByMonth[key] || 0) + 1;
  });

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Create the past12MonthsData array with all 12 months
  const past12MonthsData = MONTHS.map((month) => {
    const year = 2024;
    // currentDate.getMonth() >= MONTHS.indexOf(month)
    //   ? currentYear
    //   : currentYear - 1;
    const key = `${month} ${year}`;
    return { name: month, Trips: tripsByMonth[key] || 0 };
  });

  return past12MonthsData;
};

export const getTripsCount = async () => {
  const collectionGrp = collectionGroup(db, DB_COLLECTIONS.TRIPS);
  const snapshot = await getDocs(collectionGrp);
  return snapshot.docs.length;
};

export const getRecentTrip = async () => {
  const collectionGrp = collectionGroup(db, DB_COLLECTIONS.TRIPS);
  const snapshot = await getDocs(collectionGrp);

  const latestTrip = snapshot.docs.reduce((prev, current) => {
    return prev.data().endingTime > current.data().endingTime ? prev : current;
  });
  return latestTrip?.data();
};
