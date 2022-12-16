const user = require("../controllers/user.controller")

module.exports = app => {
    // const { protect } = require("../middlewares/authMiddleware");

    const router = require("express").Router();

    // create 
    router.post("/create", user.create);

    router.post("/", user.login);

    
    app.use("/api/user", router);

};
