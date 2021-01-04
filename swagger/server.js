const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");

const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/election/:id/status", (req, res) => {
  res.send({
    electionsState: "ongoing",
    startDate: "2020-11-19T00:00:00.00Z",
    endDate: "2020-11-29T00:00:00.00Z",
    electedOrgan: "Burmistrz Wąchocka",
  });
});

app.post("/election/:id/getCode", (req, res) => {
  // res.status(400).send('Data does not mach');
  res.send("thisisecretcode");
});

app.get("/election/:id/candidates", (req, res) => {
  res.send({
    maxVotes: 3,
    list: [
      {
        id: "100",
        name: "List 0",
        candidates: [
          { id: "01", name: "Ar", surname: "Ba" },
          { id: "02", name: "Ja", surname: "Ga" },
        ],
      },
      {
        id: "110",
        name: "List 1",
        candidates: [
          { id: "03", name: "Wi", surname: "Fi" },
          { id: "04", name: "Łu", surname: "Ko" },
        ],
      },
    ],
  });
});

app.get("/election/:id/votes", (req, res) => {
  res.send({
    all: 400,
    counted: 200,
  });
});

app.post("/election/:id/vote", (req, res) => {
  console.log(JSON.stringify(req.body));
  res.status(400).send();
  // res.send("Success");
});

app.listen(port, () => console.log(`listening on ${port}`));
