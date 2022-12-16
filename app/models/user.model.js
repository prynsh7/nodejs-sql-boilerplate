const bcrypt = require("bcrypt")

module.exports = (sequelize, Sequelize) => {
    let User = sequelize.define(
        "user",
        {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            role: {
                type: Sequelize.ENUM(["ADMIN", "USER"]),
            },
            status: {
                type: Sequelize.ENUM(["ACTIVE", "INACTIVE"]),
            },

        },
        {
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, "a");
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, "a");
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                },
            }
        },

        {
            freezeTableName: true,
        }
    );

    User.validPassword = async (password, hash) => {
        return await bcrypt.compareSync(password, hash);
    }

    return User;
};
