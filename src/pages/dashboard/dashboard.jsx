import React, { useEffect, useState } from "react";
import Page from "../../layouts/Page/Page";
import TripMap from "../../components/TripMap/TripMap.jsx";

function Dashboard() {
  const encodedPoints =
    "erecF|wrhVUdAUbA[~@YA_@~@_@z@a@z@a@z@c@|@c@z@c@|@a@~@c@~@]~@[bAWdAUdAQdAOhAKfAIhAGfAEfAAhAChAEhACfAEhAGhAIdAKdAOfAQbAUbAUbAWbA[~@]z@_@z@a@z@e@x@e@t@g@t@i@r@k@n@m@l@m@n@m@l@q@l@m@l@";

  // const encodedPoints =
  //   "erecF|wrhVUdAUbA[~@Y`A_@~@_@z@a@z@a@z@c@|@c@z@c@|@a@~@c@~@]~@[bAWdAUdAQdAOhAKfAIhAGfAEfAAhAChAEhACfAEhAGhAIdAKdAOfAQbAUbAUbAWbA[~@]z@_@z@a@z@e@x@e@t@g@t@i@r@k@n@m@l@m@n@m@l@q@l@m@l@";
  // "}lilEmwf|L";

  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    setTimeout(() => {
      setZoom(15);
    }, 500);
  }, []);
  return (
    <Page>
      <h1>Dashboard</h1>
      <h3>In progress...</h3>
      <TripMap encodedString={encodedPoints} zoom={zoom} />
    </Page>
  );
}

export default Dashboard;
