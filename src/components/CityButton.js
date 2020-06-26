import React from "react";
import { connect } from "react-redux";
import { incrementScore, decrementScore } from "../actions/scoreAction";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const CityButton = (props) => {
    const handleClick = (e) => {
        const result = e.target.value;

        if (result === "true") {
            props.incrementScore();
        } else {
            props.decrementScore();
        }
    };

    const refreshPage = () => {
        window.location.reload(false);
    };
    return (
        <Col>
            <Button
                variant="outline-primary"
                size="lg"
                key={props.cityName}
                value={props.cityName === props.answer}
                onClick={handleClick}
            >
                {props.cityName}
            </Button>
        </Col>
    );
};

const mapDispatchToProps = (dispatch, props) => ({
    incrementScore: () => dispatch(incrementScore()),
    decrementScore: () => dispatch(decrementScore()),
});

export default connect(undefined, mapDispatchToProps)(CityButton);
