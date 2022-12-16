const employee = require("../controllers/employee.controller")

module.exports = app => {
    const { protect, admin } = require("../middlewares/authMiddleware");

    const router = require("express").Router();

    // create 
    router.post("/", employee.create);

    router.get("/", employee.findAll);

    router.delete("/", protect, admin, employee.deleteAll);



    app.use("/api/employee", router);

};
