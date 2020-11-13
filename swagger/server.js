const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
var options = {
  swaggerOptions: {
    server: 'http://localhost:3000',
  },
};

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options),
);

app.get('/status', (req, res) => {
  res.send({
    currentStatus: 'ACTIVE',
    startDate: '20-02-2020',
    endDate: '30-02-2020',
  });
});

app.listen(port, () => console.log(`listening on ${port}`));
