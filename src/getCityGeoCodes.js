import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

Geocode.fromAddress("Eiffel Tower").then(
    (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
    },
    (error) => {
        console.error(error);
    }
);

// import axios from "axios";

// let query = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

// axios.get(query).then((res) => {
//     // const records = res.data.result.records;

//     // const cleanRecords = records.filter((record) => {
//     //     return record.Lat || record.Long;
//     // });
//     console.log(res);
// });
