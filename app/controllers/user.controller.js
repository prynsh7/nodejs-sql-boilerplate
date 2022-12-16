const { college } = require("../models");
const db = require("../models");
const User = db.user;


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const { createJwtToken } = require("../utils/generateToken");
const ApproverApplication = db.employeeApproverApplication;



// CREATE
exports.create = async (req, res) => {
  const { name, phone, email, role, password } = req.body;

  if (!name || !email || !role || !password) {
    return res.status(400).json({ message: "Bad Request" });
  }

  // Create a User
  const user = {
    name,
    phone,
    email,
    role,
    password,
    status: "ACTIVE",
  };

  // Save Form
  return User.create(user)
    .then((data) => {
      return res.status(201).json({
        message: "user create success",
        data,
      });
    })
    .catch((err) => {
      console.error(`user Creating Enquiry Form :: ${err}`);
      return res.status(500).json({ message: "Internal Server Error" });
    });
};


// ROLES
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: "Bad Request" });
  }


  const user = await User.findOne({
    where: { email },
    raw: true,
  });


  if (!user || !user.id) {
    return res.status(404).json({ message: "Email Not Found" });
  }


  const token = createJwtToken({ id: user.id });



  if ((user && await User.validPassword(password, user.password))) {


  
    res.json({
      code: 200,
      message: "user loggedin succesfully",
      data: {
        token: token,
        id: user.id,
        role: user.role,
      },
    });
  } else {
    return res.status(401).json({ message: "Wrong Password" });
  }
};








