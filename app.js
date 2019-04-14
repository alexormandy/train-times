const axios = require("axios");
const express = require("express");
const app = express();
const path = require("path");

const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));
const port = process.env.PORT || 3000;

const ngrok = require("ngrok");
(async function() {
  const url = await ngrok.connect();
})();

app.get("/", (req, res) => {
  axios
    .get(
      "https://transportapi.com/v3/uk/train/station/cre///timetable.json?app_id=3be79224&app_key=b0fc747a0aaf204a7d43df5d93e55cd4&train_status=passenger"
    )
    .then(result => {
      res.send(result.data.departures.all[0]);
    })
    .catch(err => {
      console.log(err);
    });
});
// axios
//   .get(
//     "https://transportapi.com/v3/uk/train/station/cre///timetable.json?app_id=3be79224&app_key=b0fc747a0aaf204a7d43df5d93e55cd4&train_status=passenger"
//   )
//   .then(result => {
//     console.log(result.data.departures.all[0]);
//   })
//   .catch(err => {
//     console.log(err);
//   });

app.listen(port, () => {
  console.log("listening on port 3000");
});
