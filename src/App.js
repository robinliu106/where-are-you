import React from "react";
import logo from "./logo.svg";
import "./App.css";

import {
    StreetViewService,
    StreetViewPanorama,
    GoogleMap,
    LoadScript,
} from "@react-google-maps/api";

const containerStyle = {
    height: "400px",
    width: "800px",
};

const center = {
    lat: 51.5320665,
    lng: -0.177203,
};

const App = () => {
    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={7}
                center={center}
            >
                <StreetViewPanorama
                    position={center}
                    visible={true}
                    options={{
                        disableDefaultUI: true,
                        enableCloseButton: false,
                    }}
                />
            </GoogleMap>
        </LoadScript>
    );
};

export default App;

/*
 *           <MapBox
                apiKey={"AIzaSyDZvOGdpcfvXcW7faf8eA4fG0JvKJ1dXDQ"}
                opts={{
                    center: { lat: 42.390053, lng: -71.142162 },
                    zoom: 14,
                }}
                style={{
                    height: "100vh",
                    width: "100%",
                }}
                onCenterChanged={() => {
                    console.log("The center of the map has changed.");
                }}
            />{" "} 
 */
