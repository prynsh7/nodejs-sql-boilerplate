const db = require("../models");
const Data = db.data;
const Op = db.Sequelize.Op;
const PINCODE_REGEX = /^[1-9]{1}[0-9]{5}$/;


// Create and Save a new Data
exports.create = (req, res) => {

    // if (
    //     !PINCODE_REGEX.test(req.body.pincode) || !req.body.line1
    //     || !req.body.recipient_name || !req.body.recipient_phone
    // ) {
    //     return res.status(400).json({ message: "Bad Request" });
    // }

    // Create a data

    const { first_name,
        last_name,
        email,
        mobile_number,
        current_location,
        highest_education,
        total_exp,
        current_company,
        current_company_start_date,
        current_company_end_date,
        previous_company,
        previous_company_start_date,
        previous_company_end_date,
        primary_skill_1,
        primary_skill_2,
        primary_skill_3,
        secondary_skill_1,
        secondary_skill_2,
        secondary_skill_3,
        exp_summary,
        resume } = req.body

    const data1 = {
        first_name,
        last_name,
        email,
        mobile_number,
        current_location,
        highest_education,
        total_exp,
        current_company,
        current_company_start_date,
        current_company_end_date,
        previous_company,
        previous_company_start_date,
        previous_company_end_date,
        primary_skill_1,
        primary_skill_2,
        primary_skill_3,
        secondary_skill_1,
        secondary_skill_2,
        secondary_skill_3,
        exp_summary,
        resume

    };

    // Save Address in the database
    return Data.create(data1)
        .then(async data => {
            data = data.get({ plain: true });

            return res.status(201).json({
                code: 200,
                message: "Data added successfully",
                data
            });
        })
        .catch(err => {
            console.error(`Error Creating Data :: ${err}`);
            return res.status(500).json({ message: 'Internal Server Error' });
        });
};


// Retrieve all Address from the database.
exports.findAll = (req, res) => {

    const limit = Math.min(parseInt(req.query.limit || 10), 10);

    const condition = {
        retailer_id: req.user.id
    };

    if (req.query.nextToken) {
        condition.updatedAt = { [Op.lt]: new Date(req.query.nextToken) };
    }

    return Data.findAll({
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


