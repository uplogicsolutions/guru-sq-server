const Sequelize = require('sequelize');
const CustomError = require("./customError");

exports.getCustomErrorMessage = (error) => {
  if (error instanceof CustomError) {
    return error.message
  } else if (error instanceof Sequelize.ForeignKeyConstraintError) {
    return `Invalid ${error.table}`
  } else {
    return error.message || "Some went wrong."
  }
}

exports.getCustomErrorStatus = (error) => {
  if (error instanceof CustomError || error instanceof Sequelize.ForeignKeyConstraintError) {
    return 400;
  } else {
    return 500;
  }
}