module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ssn: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salary: {
            type: Sequelize.STRING
        },
        designation: {
            type: Sequelize.STRING
        },
        department: {
            type: Sequelize.ENUM(["sales", "production"])
        },
        experience: {
            type: Sequelize.INTEGER
        },
        date_of_joining: {
            type: Sequelize.DATE
        }
    }, {
        freezeTableName: true
    });

    return Employee;
};
