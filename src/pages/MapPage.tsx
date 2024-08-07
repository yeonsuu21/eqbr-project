import React from "react";
import TabBar from ".././components/TabBar/TabBar";
import Map from "../components/Map/Map";
function MapPage() {
  return (
    <div className="App">
      <TabBar />
      <div>
        <Map />
      </div>
    </div>
  );
}

export default MapPage;
