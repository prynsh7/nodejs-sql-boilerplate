const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const db = require("./app/models");

const { notFound, errorHandler } = require("./app/middlewares/errorMiddleware")



db.sequelize.sync({});

// support cors
app.use(cors());


// parse application/json
app.use(express.json({limit: '50mb'}));

// parse x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



// simple route
app.get("/", (req, res) => {
    return res.status(200).json({ message: "Namaste duniya waalon!" });
});


// Middlewares
require("./app/routes/data.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/employee.routes")(app);



app.use(notFound);
app.use(errorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
