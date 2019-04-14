const axios = require("axios");
const express = require("express");
const app = express();
const path = require("path");

const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));
const port = process.env.PORT || 80;

const ngrok = require("ngrok");
(async function() {
  const url = await ngrok.connect();
  console.log(url);
})();

app.post("/", (req, res) => {
  axios
    .get(
      "https://transportapi.com/v3/uk/train/station/cre///timetable.json?app_id=3be79224&app_key=b0fc747a0aaf204a7d43df5d93e55cd4&train_status=passenger"
    )
    .then(result => {
      let operator_name = result.data.departures.all[0].operator_name;
      let destination_name = result.data.departures.all[0].destination_name;
      let aimed_departure_time =
        result.data.departures.all[0].aimed_departure_time;
      res.send(
        `The next train is a ${operator_name} to ${destination_name} leaving at ${aimed_departure_time}.`
      );
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  axios
    .get(
      "https://transportapi.com/v3/uk/train/station/cre///timetable.json?app_id=3be79224&app_key=b0fc747a0aaf204a7d43df5d93e55cd4&train_status=passenger"
    )
    .then(result => {
      let operator_name = result.data.departures.all[0].operator_name;
      let destination_name = result.data.departures.all[0].destination_name;
      let aimed_departure_time =
        result.data.departures.all[0].aimed_departure_time;
      res.send(
        `The next train is a ${operator_name} to ${destination_name} leaving at ${aimed_departure_time}.`
      );
    })
    .catch(err => {
      console.log(err);
    });
});

axios
  .get(
    "https://transportapi.com/v3/uk/train/station/cre///timetable.json?app_id=3be79224&app_key=b0fc747a0aaf204a7d43df5d93e55cd4&train_status=passenger"
  )
  .then(result => {
    console.log(result.data.departures.all[0]);
  })
  .catch(err => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
