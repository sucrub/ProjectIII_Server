const express = require("express");
const path = require("path");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const httpLogger = require("http-logger");
const cookieParser = require("cookie-parser");

const camelCaseReq = require("./middlewares/camelCaseReq");
const omitReq = require("./middlewares/omitReq");
const snakeCaseRes = require("./middlewares/snakeCaseRes");
const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config();
require("./models");

const { PORT } = require("./configs");

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(httpLogger());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(camelCaseReq);
app.use(omitReq);
app.use(snakeCaseRes());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

require("./routes")(app);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
