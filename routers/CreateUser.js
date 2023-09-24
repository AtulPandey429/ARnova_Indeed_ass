const express = require("express");
const Routes = express.Router();
const {
  CreateContacts,
  GetPreviousLogins,
} = require("../controllers/editContact");

const { validateLoginData } = require("../middleware/LoginValidation");
// const { addLoginHistory } = require("../controllers/editContact");

Routes.post("/login", validateLoginData, CreateContacts);
Routes.get("/previous-logins", GetPreviousLogins);

// Routes.post("/add-login-history", addLoginHistory);

module.exports = Routes;
