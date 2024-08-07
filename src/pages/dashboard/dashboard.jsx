import React from "react";
import  { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { useSpring, animated } from "@react-spring/web"; // Import useSpring and animated
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.css";
import Page from "../../layouts/Page/Page";
import TripsChart from "../../components/TripsChart/TripsChart";
import RecentTrip from "../../components/RecentTrip/RecentTrip";
import {getAllTrips, getTripsCount} from "../../api/trips";
import {getAllVehicles, getVehiclesCount} from "../../api/vehicle";
import {getAllUsers, getUsersCount} from "../../api/users"
import { setLogLevel } from "firebase/app";


const Dashboard = () => {
  // Define animations for each card
const [totalTrips,setTotalTrips]=useState(0);
const [loading,setLoading]=useState(true);
const [totalVehicles,setTotalVehicles]=useState(0);
const [totalUsers,setTotalUsers]=useState(0);
const [totalDistance,setTotalDistance]=useState(0);
const [users,setUser]=useState(null);

useEffect(() => 
   {
    fetchDetails();
   }, []);

const fetchDetails= async ()=>
  {
      try
       {
        setLoading(true);
        const trips = await getTripsCount();
        const vehicles = await getVehiclesCount();
        const users = await getUsersCount();
        setTotalTrips(trips);
        setTotalVehicles(vehicles);
        setTotalUsers(users);
        setUser(users);
        const tripDocs = await getAllTrips();
        let totalDistance = 0;
         for(const trip of tripDocs)
           {
             totalDistance+=trip.distance
           }
         setTotalDistance(totalDistance);  
       }
      catch(error)
       {
         console.log(error);
       } 
      finally
       {
         setLoading(false);
       }

  };  
  
  const [tripsAnimation] = useSpring(() => ({
    number: totalTrips,
    from: { number: 0 },
    config: { duration: 2000 },
  }),[totalTrips]);

  const [vehicleAnimation] = useSpring(() => ({
    number: totalVehicles,
    from: { number: 0 },
    config: { duration: 2000 },
  }),[totalVehicles]);

  const [usersAnimation] = useSpring(() => ({
    number: totalUsers,
    from: { number: 0 },
    config: { duration: 2000 },
  }),[totalUsers]);

  const [milesAnimation] = useSpring(() => ({
    number: totalDistance,
    from: { number: 0 },
    config: { duration: 2000 },
  }),[totalDistance]);


  return (
    <Page>
      <Container className="dashboard">
        <main className="main-content">
          <div className="pageHeader">
            <h1 className="page-title">
              Welcome to your <i>Track</i>board!
            </h1>
            <div className="headerActions"></div>
          </div>
          {/* <h1 className="page-title">
            Welcome to your <i>Track</i>board!
          </h1> */}
          <Row>
            {[
              {
                  title: "Total trips",       
                  value: tripsAnimation.number,
                  change: "+278 in last month",
                  icon: "Trips",
                  color: "primary",
                  animation: tripsAnimation,
                  format: (n) =>
                    `${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
                 
              },
              {
                title: "Total Vehicle",
                value: vehicleAnimation.number,
                change: "+3 in last month",
                icon: "Vehicles",
                color: "success",
                animation: vehicleAnimation,
                format: (n) =>
                  `${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
              },
              {
                title: "Users",
                value: usersAnimation.number,
                change: "+2 in last month",
                icon: "Users",
                color: "warning",
                animation: usersAnimation,
                format: (n) => `${n.toFixed(0)}`,
              },
              {
                title: "Total miles",
                value: milesAnimation.number,
                change: "+2500 in last month",
                icon: "Distance",
                color: "danger",
                animation: milesAnimation,
                format: (n) =>
                  `${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
              },
            ].map((card, index) => (
              <Col xs={12} md={3} key={index} className="mb-4">
                <Card
                  className={`h-100 shadow-sm border-0 rounded-lg card-${card.color}`}
                >
                  <CardBody className="text-center">
                    <div
                      className={`card-header header-rounded card-bg-${"trips"} bg-${
                        card.color
                      } text-white mb-3`}
                    >
                      <span className={`material-icons card-icon`}>
                        {card.icon}
                      </span>
                    </div>
                    <CardTitle tag="h6" className="card-title">
                      {card.title}
                    </CardTitle>
                    <animated.h4 className="card-value">
                      {card.animation.number.to(card.format)}
                    </animated.h4>
                    <CardText className={`card-change text-${card.color}`}>
                      {card.change}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="dashboardChartsContainer">
            <div className="lineChartContainerWrap">
              <TripsChart />
            </div>
            <div className="recentTripMap">
              <RecentTrip />
            </div>
          </div>
        </main>
      </Container>
    </Page>
  );
};

export default Dashboard;
