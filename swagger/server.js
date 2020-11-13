const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/status', (req, res) => {
  res.send({
    electionsState: 'ACTIVE',
    startDate: '20-02-2020',
    endDate: '30-02-2020',
  });
});

app.listen(port, () => console.log(`listening on ${port}`));
