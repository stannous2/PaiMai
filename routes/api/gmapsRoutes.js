const router = require("express").Router();
 //old

router.post("/", (req, res) => {
const gMapsClient = require("@google/maps").createClient({key: process.env.GMAPS_KEY, Promise: Promise});
  let body = req.body;
  gMapsClient.geocode({address: `${body.address}, ${body.zip}`})
    .asPromise()
    .then((response) => {
      let data = response.json.results[0];
      res.json(data.geometry.location);
    });
});

module.exports = router;
