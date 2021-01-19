
require("dotenv").config();
require("./database/mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();

/* Middleware */
app.use(cors({
    origin: "http://localhost:3000", //  Need to change once we deploy the app
    credentials: true,
})
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require("./routes/userRouter"));

app.get("/", (req, res) => {
    try {
        res.send("Welcome to team-9 server!");
    } catch (error) {
        res.status(404).send(error.message);
    }
});


app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
});
