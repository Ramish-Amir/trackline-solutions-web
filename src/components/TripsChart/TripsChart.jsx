import React, { useEffect, useState } from "react";
import { Col, Card, CardBody, CardTitle, CardText } from "reactstrap";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import { tripsChartData } from "../../api/trips";

function TripsChart() {
  const [data, setData] = useState([
    { name: "Sep", Trips: 0 },
    { name: "Oct", Trips: 0 },
    { name: "Nov", Trips: 0 },
    { name: "Dec", Trips: 0 },
    { name: "Jan", Trips: 0 },
    { name: "Feb", Trips: 0 },
    { name: "Mar", Trips: 0 },
    { name: "Apr", Trips: 0 },
    { name: "May", Trips: 0 },
    { name: "Jun", Trips: 0 },
    { name: "Jul", Trips: 0 },
    { name: "Aug", Trips: 0 },
  ]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const chartDataRes = await tripsChartData();
      setData(chartDataRes);
    } catch (err) {}
  };
  return (
    <div className="lineChartContainer">
      <Card className="h-100 shadow-sm border-0 rounded-lg">
        <CardBody>
          <CardTitle tag="h6" className="mb-3">
            Your trips in last year
          </CardTitle>
          {/* <CardText className="text-muted mb-4">
            +4% more than previous year
          </CardText> */}
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="Trips"
                  stroke={"#1f7b7b"}
                  strokeWidth={4}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default TripsChart;
