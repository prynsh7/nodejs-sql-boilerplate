module.exports = app => {
    const data = require("../controllers/data.controller");
    const { protect } = require("../middlewares/authMiddleware");

    var router = require("express").Router();

    // Create an address
    router.route("/").post( data.create);

    app.use("/api/data", router);
};
