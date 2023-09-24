const Contacts = require("../model/Contacts");
const asyncHandler = require("express-async-handler");

const CreateContacts = asyncHandler(async (req, res) => {
  try {
    const { name, email, mobileNumber } = req.body;
    if (!name || !email || !mobileNumber) {
      res.status(400).json({ message: "All fields are mandatory" });
      return;
    }

    // Create a new contact with login history
    const createCont = await Contacts.create({
      name,
      email,
      mobileNumber,
      loginHistory: [
        {
          timestamp: new Date(),
          sessionDuration:30000, // You can set the initial session duration here
        },
      ],
    });

    res.status(200).json(createCont);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const GetPreviousLogins = asyncHandler(async (req, res) => {
  try {
    const users = await Contacts.find({}, "loginHistory.timestamp");

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users with login history found" });
    }

    const timestamps = users
      .filter((user) => user.loginHistory && user.loginHistory.length > 0)
      .flatMap((user) => user.loginHistory.map((login) => login.timestamp));

    res.json(timestamps);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { CreateContacts, GetPreviousLogins };
