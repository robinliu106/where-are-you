import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import generateRandomPoint from "./api/generateRandomPoint";
import { connect } from "react-redux";
import { incrementScore } from "./actions/scoreAction";

import {
    StreetViewService,
    StreetViewPanorama,
    GoogleMap,
    LoadScript,
} from "@react-google-maps/api";

/////////////////////
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const cityList = [
    "Tokyo",
    "Singapore",
    "Boston",
    "Washington DC",
    "Mexico City",
    "Hong Kong",
];

// cityCoords();

/////////

const containerStyle = {
    height: "400px",
    width: "800px",
};

const initialCenter = {
    lat: 42.3517071,
    lng: -71.0691937,
};

const App = (props) => {
    const [cityCoords, setCityCoords] = useState();

    useEffect(() => {
        getCityCoords();
    }, []);

    const getCityCoords = () => {
        const randomCity =
            cityList[Math.floor(Math.random() * cityList.length)];
        console.log("city", randomCity);
        Geocode.fromAddress(randomCity).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;

                const randomPoint = generateRandomPoint({ lat, lng }, 100);

                setCityCoords(randomPoint);
            },
            (error) => {
                console.error(error);
            }
        );
    };
    return (
        <div>
            <div>
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        zoom={7}
                        initialCenter={initialCenter}
                    >
                        <StreetViewPanorama
                            position={cityCoords}
                            visible={true}
                            options={{
                                disableDefaultUI: true,
                                enableCloseButton: false,
                            }}
                        />
                    </GoogleMap>
                </LoadScript>
            </div>
            <div>
                <button onClick={props.incrementScore}>{props.score}</button>
            </div>
        </div>
    );
};

const mapStateToProps = (state, props) => ({
    score: state.score,
});

const mapDispatchToProps = (dispatch, props) => ({
    incrementScore: () => dispatch(incrementScore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
