const profile = require('../models/profile');
const fs = require('fs');
const mime = require('mime');

module.exports = {
    // Create and Save a new profile
    //['required','numeric','regex:/^[5-9][0-9]{9}$/'],
    createRules: {
        fullName: "required|string",
        role: "alpha",
        email: "string",
        mobileNumber: "string",
        passowrd: "required|alpha",
        handle: "required|alpha"

    },
    updateRules: {
        email: "required|string",
        address: "required|string",
        city: "required|alpha",
        state: "required|alpha",
        pinCode: "required|numeric",
        emergencyNumber: "required|numeric",
        panNumber: "required|alpha_num",
        gender: "required|alpha",
        aadharNumber: "required|numeric",
        updatedDate: "required|date",
        updatedBy: "required"


    },
    create: (req, res) => {
        console.log('req', req.body)
        profile.create(req.body, (err, result) => {
            if (err) {
                console.log('error', err);
                res.status(500).send({ status: 400, message: 'Oops! Not able to create profile. Please try after sometimes', profile: {} });
            } else {
                res.status(200).send({ status: 200, message: 'profile created successfully.', profile: result });
            }
        });
    },

    // Retrieve and return all profiles from the database.
    findAll: (req, res) => {
        profile.find({}, (err, result) => {
            if (err) {
                res.status(500).send({status: 500, message: 'Oops! Not able to get all profiles. Please try after sometimes', profiles: result });
            } else {
                res.status(200).send({status: 200, message: 'profiles got successfully listed.', profiles: result });
            }
        });
    },

    // Find a single profile with a profileId
    findOne: (req, res) => {
        profile.findById({ _id: req.params.profileId }, (err, result) => {
            if (err) {
                res.status(500).send({ status: 500,message: 'Oops! Not able to get profile. Please try after sometimes', profile: {} });
            } else {
                res.status(200).send({status: 200, message: '', profile: result });
            }
        });
    },

    // Update a profile identified by the profileId in the request
    update: (req, res) => {
        profile.findOneAndUpdate({ _id: req.params.profileId }, { $set: req.body }, { new: true }, (err, result) => {
            if (err) {
                res.status(500).send({status: 500, message: 'Oops! Not able to update profile. Please try after sometimes', profiles: result });
            } else {
                res.status(200).send({status: 200, message: 'profile updated successfully.', profile: result });
            }
        });
    },
    // Delete a profile with the specified profileId in the request
    delete: (req, res) => {
        profile.findOneAndDelete({ _id: req.params.profileId }, (err, result) => {
            if (err) {
                res.status(500).send({status: 500, message: 'Oops! Not able to delete profile. Please try after sometimes', profile: {} });
            } else {
                res.status(200).send({status: 200, message: 'profile deleted successfully.', profile: result });
            }
        });
    },
    uploadResume: (req, res, next) => {
        console.log('req', req)
        var matches = req.body.resume.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            res.status(500).send({status: 500, message: 'Invalid input string', profiles: '' });
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        let extension = mime.extension(type);
        let fileName = req.params.profileId + "-resume." + extension;
        try {
            fs.writeFileSync("./public/resume/" + fileName, imageBuffer, 'utf8');
            profile.findOneAndUpdate({ _id: req.params.profileId }, { $set: {resume:fileName} },{ new: true }, (err, result) => {
                if (err) {
                    res.status(500).send({status: 500, message: 'Oops! Not able to update profile. Please try after sometimes', profiles: result });
                } else {
                    res.status(200).send({status: 200, message: 'profile updated successfully.', profile: result });
                }
            })
           

        } catch (e) {
            res.status(500).send({ message: e, profiles: '' });
        }
    }
}
