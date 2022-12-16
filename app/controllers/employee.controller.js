const { condition } = require("sequelize");
const db = require("../models");
const Employee = db.employee;
const Op = db.Sequelize.Op;

// Create and Save a new Data
exports.create = (req, res) => {

    const {
        name,
        ssn,
        gender,
        salary,
        designation,
        department,
        experience,
        resume,
        date_of_joining
    } = req.body

    const data1 = {
        name,
        ssn,
        gender,
        salary,
        designation,
        department,
        experience,
        resume,
        date_of_joining
    };

    // Save Address in the database
    return Employee.create(data1)
        .then(async data => {
            data = data.get({ plain: true });

            return res.status(201).json({
                code: 200,
                message: "Employee added successfully",
                data
            });
        })
        .catch(err => {
            console.error(`Error Creating Employee :: ${err}`);
            return res.status(500).json({ message: 'Internal Server Error' });
        });
};


// Retrieve all Address from the database.
exports.findAll = (req, res) => {

    const limit = Math.min(parseInt(req.query.limit || 10), 10);

    const condition = {}

    if (req.query.department) {
        condition.department = req.query.department
    }

    if (req.query.nextToken) {
        condition.updatedAt = { [Op.lt]: new Date(req.query.nextToken) };
    }

    return Employee.findAll({
        where: condition,
        order: [['updatedAt', 'desc']],
        limit: limit,
        raw: true,
    })
        .then(async data => {


            const nextToken = data.length === limit ? data[limit - 1].updatedAt : null;

            return res.status(200).json({ data, nextToken });
        })
        .catch(err => {
            console.error(`Error Getting Addresses :: ${err}`);
            return res.status(500).json({ message: "Internal Server Error" });
        });
};


exports.deleteAll = (req, res) => {


    return Employee.destroy({
        where: {
            experience: {
                [Op.gte]: 20
            }
        }
    })
        .then(async data => {


            return res.status(200).json({ message: "employee deleted successfully" });
        })
        .catch(err => {
            console.error(`Error deleteing employee :: ${err}`);
            return res.status(500).json({ message: "Internal Server Error" });
        });
};



