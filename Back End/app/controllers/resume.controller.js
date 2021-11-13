const Resume = require('../models/resume.model.js');

// Create and Save a new Resume
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name || !req.body.link || !req.body.major || !req.body.tags || !req.body.approved) {
        return res.status(400).send({
            message: "Resume contents can not be empty"
        });
    }

    // Create a Resume
    const resume = new Resume({
        name: req.body.name, 
        link: req.body.link,
        major: req.body.major,
        tags: req.body.tags,
        approved: req.body.approved
    });

    // Save Resume in the database
    resume.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Resume."
        });
    });
};

// Retrieve and return all resumes from the database.
exports.findAll = (req, res) => {
    Resume.find()
    .then(resumes => {
        res.send(resumes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving resumes."
        });
    });
};

// Find a single resume with a resumeId
exports.findOne = (req, res) => {
    Resume.findById(req.params.resumeId)
    .then(resume => {
        if(!resume) {
            return res.status(404).send({
                message: "Resume not found with id " + req.params.resumeId
            });            
        }
        res.send(resume);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "resume not found with id " + req.params.resumeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving resume with id " + req.params.resumeId
        });
    });
};

// Delete a resume with the specified resumeId in the request
exports.delete = (req, res) => {
    Resume.findByIdAndRemove(req.params.resumeId)
    .then(resume => {
        if(!resume) {
            return res.status(404).send({
                message: "Resume not found with id " + req.params.resumeId
            });
        }
        res.send({message: "Resume deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Resume not found with id " + req.params.resumeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete resume with id " + req.params.resumeId
        });
    });
};

// Update a Resume identified by the resumeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.approved) {
        return res.status(400).send({
            message: "Resume approved/pending can not be empty"
        });
    }
    // Find resume and update it with the request body
    Resume.findByIdAndUpdate(req.params.resumeId, {
        approved: req.body.approved
    })
    .then(resume => {
        if(!resume) {
            return res.status(404).send({
                message: "Resume not found with id " + req.params.resumeId
            });
        }
        res.send(resume);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Resume not found with id " + req.params.resumeId
            });                
        }
        return res.status(500).send({
            message: "Error updating Resume with id " + req.params.resumeId,
        });
    });
};
