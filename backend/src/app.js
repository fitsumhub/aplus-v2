const express = require("express");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3009;

app.use(bodyParser.json());
app.use(cors());

app.use("/user", signupRoute);
app.use("/auth", loginRoute);

app.listen(PORT, () =>  {
    console.log(`Server Is Operational On: http://localhost:${PORT}`);
});