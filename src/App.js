import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    StreetViewPanorama,
    GoogleMap,
    LoadScript,
} from "@react-google-maps/api";
import Geocode from "react-geocode";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./App.css";
import { generateRandomPoint, shuffleArray } from "./api/methods";
import CityButton from "./components/CityButton";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const cityList = [
    "Tokyo",
    "Boston",
    "Hong Kong",
    "Riyadh",
    "Barcelona",
    "Paris",
    "Rome",
    "Sydney",
    "Cairo",
    "Moscow",
    "New York",
    "Quito",
    "San Sebastian",
    "Niseko",
    "Los Angeles",
    "Zermatt",
    "Berlin",
];

const containerStyle = {
    height: "80vh",
    width: "80vw",
};

const App = (props) => {
    const [cityCoords, setCityCoords] = useState();
    const [cityChoices, setCityChoices] = useState();

    useEffect(() => {
        generateCityCoords();
    }, [props.score]);

    const generateCityCoords = () => {
        const randomCity =
            cityList[Math.floor(Math.random() * cityList.length)];

        Geocode.fromAddress(randomCity).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;

                let randomPoint = generateRandomPoint({ lat, lng }, 100);

                setCityCoords(randomPoint);
                generateCityChoices(randomCity);
            },
            (error) => {
                console.error(error);
            }
        );
    };

    const generateCityChoices = (randomCity) => {
        const remainingCities = cityList.filter((city) => {
            return city !== randomCity;
        });

        const shuffledRemainingCities = shuffleArray(remainingCities);

        const cities = [];
        cities.push({ city: randomCity, answer: randomCity });

        for (let i = 0; i < 3; i++) {
            cities.push({
                city: shuffledRemainingCities[i],
                answer: randomCity,
            });
        }

        setCityChoices(shuffleArray(cities));
    };

    //Change color based on score
    let scoreColor = "green";

    // scoreColor = props.score < 0 ? "#DC143C" : "green";

    const scoreStyle = {
        color: scoreColor,
        align: "right",
    };

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <h1 style={{ padding: "1rem" }}>Where are you?</h1>
                </Col>
            </Row>
            <Row>
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        zoom={7}
                        initialCenter={{
                            lat: 42.3517071,
                            lng: -71.0691937,
                        }}
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
            </Row>
            <div className="city-choices">
                <Row>
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
                    <Col></Col>
                    <Col md={{ span: 2.5 }}>
                        <h3 style={scoreStyle}>{`Streak ${props.score}`}</h3>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

const mapStateToProps = (state, props) => ({
    score: state.score,
});

// const mapDispatchToProps = (dispatch, props) => ({
//     incrementScore: () => dispatch(incrementScore()),
// });

export default connect(mapStateToProps)(App);
