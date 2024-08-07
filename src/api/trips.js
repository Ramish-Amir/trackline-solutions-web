import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { DB_COLLECTIONS } from "./auth";
import { db } from "../firebase"; // Assuming db is exported from firebase.js or similar

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
    console.log("GET DETAILS >> ", ownerId, vehicleId, tripId);
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
    console.log(tripData);
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

function getMonthRange(year,month)
 {
   const start =new Date(year,month,1);
   const end =new Date(year,month+1,0);
   return {start,end};
   
 }
function getCurrentMonthRange()
 {
   const now=new Date();
   return getMonthRange(now.getFullYear(),now.getMonth());
 } 
function getLastMonthRange()
 {
   const now=new Date();
   const lastMonth=now.getMonth()-1;
   const year= lastMonth<0 ? now.getFullYear()-1:now.getFullYear();
   const month=(lastMonth+12)%12;
   return getMonthRange(year,month);
 } 
function countTripsInRange(trips,range)
 {
    return trips.filter(trips=>{
      const tripDate= new Date(trips.startingTime.seconds*1000);
      return tripDate >=range.start && tripDate<=range.end;
    }).length;
 }
export function getTripsDifference(trips)
 {
  const currentMonthRange=getCurrentMonthRange();
  const lastMonthRange=getLastMonthRange();

  const currentMonthTripsCount=countTripsInRange(trips,currentMonthRange);
  const lastMonthTripsCount=countTripsInRange(trips,lastMonthRange);
  return currentMonthTripsCount-lastMonthTripsCount;
 } 

export const getPerTripDetails = async (ownerId, vehicleId, tripId) => {
  try {
    console.log("GET DETAILS >> ", ownerId, vehicleId, tripId);
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

