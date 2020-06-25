import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import generateRandomPoint from "./api/generateRandomPoint";
import { connect } from "react-redux";
import CityButton from "./components/CityButton";
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
    const [cityChoices, setCityChoices] = useState();
    const [toggleStreetView, setToggleStreetView] = useState();

    useEffect(() => {
        getCityCoords();
        // setToggleStreetView(!!props.reloadStreetView);
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
                generateCityChoices(randomCity);
            },
            (error) => {
                console.error(error);
            }
        );
    };

    const shuffleCityList = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    const generateCityChoices = (randomCity) => {
        const remainingCities = cityList.filter((city) => {
            return city !== randomCity;
        });

        const shuffledRemainingCities = shuffleCityList(remainingCities);

        const cities = [];
        cities.push({ city: randomCity, answer: randomCity });

        for (let i = 0; i < 2; i++) {
            cities.push({
                city: shuffledRemainingCities[i],
                answer: randomCity,
            });
        }
        setCityChoices(cities);

        console.log(cities);
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
                        (
                        <StreetViewPanorama
                            position={cityCoords}
                            visible={true}
                            options={{
                                disableDefaultUI: true,
                                enableCloseButton: false,
                            }}
                        />
                        )
                    </GoogleMap>
                </LoadScript>
            </div>
            <div>
                {cityChoices
                    ? cityChoices.map((item) => {
                          return (
                              <CityButton
                                  key={item.city}
                                  cityName={item.city}
                                  answer={item.answer}
                              />
                          );
                      })
                    : ""}
                <h3>{props.score}</h3>
            </div>
        </div>
    );
};

const mapStateToProps = (state, props) => ({
    score: state.score,
    reloadStreetView: state.reloadStreetView,
});

// const mapDispatchToProps = (dispatch, props) => ({
//     incrementScore: () => dispatch(incrementScore()),
// });

export default connect(mapStateToProps)(App);
