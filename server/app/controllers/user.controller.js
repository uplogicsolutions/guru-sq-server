const UserService = require('../services/user.service');
const CustomError = require('../utils/customError');
const Sequelize = require('sequelize');

exports.createUser = async (req, res) => {
    try {
        const response = await UserService.create(req.body);
        res.send(response);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(400).send({
                message:
                    error.message || "Validation error while creating the User."
            });
        } else if (error instanceof Sequelize.ValidationError) {
            let currentUserError = error.get('users.username');
            if (currentUserError.length > 0 && currentUserError[0].type == 'unique violation') {
                res.status(400).send({
                    message: "Username not unique."
                });
            } else {
                res.status(400).send({
                    message:
                        error.message || "Validation error while creating the User."
                });
            }
        } else {
            res.status(500).send({
                message:
                    error.message || "Some went wrong while creating the User."
            });
        }
    }
};

exports.findUsers = async (req, res) => {
    try {
        const response = await UserService.findAll();
        res.send(response);
    } catch(error) {
        res.status(500).send({
            message:
                error.message || "Some went wrong while fetching the users."
        });
    }
};

exports.findUserById = async (req, res) => {
    try {
        const id = req.params.id;
    const response = await UserService.findById(id);
    res.send(response);
    } catch(error) {
        res.status(500).send({
            message:
                error.message || "Some went wrong while fetching the user."
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        await UserService.update(id, req.body);
        res.send({message: "User updated successfully."});
    } catch(error) {
        if (error instanceof CustomError) {
            res.status(400).send({
                message:
                    error.message || "Error in updating user."
            });
        } else {
            res.status(500).send({
                message:
                    error.message || "Some went wrong while updating the user."
            });
        }
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await UserService.delete(id);
        res.send({message: "User deleted successfully."});
    } catch(error) {
        if (error instanceof CustomError) {
            res.status(400).send({
                message:
                    error.message || "Error in updating user."
            });
        } else {
            res.status(500).send({
                message:
                    error.message || "Some went wrong while updating the user."
            });
        }
    }
};
