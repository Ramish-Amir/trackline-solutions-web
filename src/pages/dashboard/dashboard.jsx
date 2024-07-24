import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from "reactstrap";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSpring, animated } from '@react-spring/web'; // Import useSpring and animated
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';

const data = [
  { name: "Apr", uv: 400 },
  { name: "May", uv: 300 },
  { name: "Jun", uv: 200 },
  { name: "Jul", uv: 278 },
  { name: "Aug", uv: 189 },
  { name: "Sep", uv: 239 },
  { name: "Oct", uv: 349 },
  { name: "Nov", uv: 200 },
  { name: "Dec", uv: 278 },
];

const Dashboard = () => {
  // Define animations for each card
  const [tripsAnimation] = useSpring(() => ({
    number: 53000,
    from: { number: 0 },
    config: { duration: 2000 },
  }));

  const [vehicleAnimation] = useSpring(() => ({
    number: 10300,
    from: { number: 0 },
    config: { duration: 2000 },
  }));

  const [usersAnimation] = useSpring(() => ({
    number: 5.0,
    from: { number: 0 },
    config: { duration: 2000 },
  }));

  const [milesAnimation] = useSpring(() => ({
    number: 103430,
    from: { number: 0 },
    config: { duration: 2000 },
  }));

  return (
    <Container className="dashboard">
      <main className="main-content">
        <h1 className="dashboard-title">Welcome to Your Dashboard!</h1>
        <Row>
          {[
            { title: "Total trips", value: "53,000", change: "+40% since yesterday", icon: "Trips", color: "primary", animation: tripsAnimation, format: (n) => `${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` },
            { title: "Total Vehicle", value: "10,300", change: "+13% since last month", icon: "Vehicles", color: "success", animation: vehicleAnimation, format: (n) => `${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` },
            { title: "Users", value: "5.0 M", change: "+20% since last quarter", icon: "Users", color: "warning", animation: usersAnimation, format: (n) => `${n.toFixed(1)} M` },
            { title: "Total miles", value: "103,430", change: "+15% than last month", icon: "Distance", color: "danger", animation: milesAnimation, format: (n) => `${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` },
          ].map((card, index) => (
            <Col xs={12} md={3} key={index} className="mb-4">
              <Card className={`h-100 shadow-sm border-0 rounded-lg card-${card.color}`}>
                <CardBody className="text-center">
                  <div className={`card-header bg-${card.color} text-white mb-3`}>
                    <span className={`material-icons card-icon`}>{card.icon}</span>
                  </div>
                  <CardTitle tag="h6" className="card-title">{card.title}</CardTitle>
                  <animated.h4 className="card-value">
                    {card.animation.number.to(card.format)}
                  </animated.h4>
                  <CardText className={`card-change text-${card.color}`}>{card.change}</CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
          <Col xs={12} className="mb-4">
            <Card className="h-100 shadow-sm border-0 rounded-lg">
              <CardBody>
                <CardTitle tag="h6" className="mb-3">Sales Overview</CardTitle>
                <CardText className="text-muted mb-4">+4% more in 2021</CardText>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <Line type="monotone" dataKey="uv" stroke="#007bff" strokeWidth={2} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </main>
    </Container>
  );
};

export default Dashboard;
