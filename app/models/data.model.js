module.exports = (sequelize, Sequelize) => {
    const Data = sequelize.define("data", {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mobile_number: {
            type: Sequelize.STRING
        },
        current_location: {
            type: Sequelize.STRING
        },
        highest_education: {
            type: Sequelize.STRING
        },
        highest_education_in_year: {
            type: Sequelize.STRING
        },
        total_exp: {
            type: Sequelize.FLOAT
        },
        current_company: {
            type: Sequelize.STRING
        },
        current_company_start_date: {
            type: Sequelize.DATE
        },
        current_company_end_date: {
            type: Sequelize.DATE
        },
        previous_company: {
            type: Sequelize.STRING
        },
        previous_company_start_date: {
            type: Sequelize.DATE
        },
        previous_company_end_date: {
            type: Sequelize.DATE
        },
        primary_skill_1: {
            type: Sequelize.STRING
        },
        primary_skill_2: {
            type: Sequelize.STRING
        },
        primary_skill_3: {
            type: Sequelize.STRING
        },
        secondary_skill_1: {
            type: Sequelize.STRING
        },
        secondary_skill_2: {
            type: Sequelize.STRING
        },
        secondary_skill_3: {
            type: Sequelize.STRING
        },
        exp_summary: {
            type: Sequelize.STRING
        },
        resume: {
            type: Sequelize.TEXT
        }
    }, {
        freezeTableName: true
    });

    return Data;
};
