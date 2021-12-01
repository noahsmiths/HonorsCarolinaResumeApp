const Resume = require('../models/resume.model.js');

// Update a Resume identified by the resumeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.comment) {
        return res.status(404).send({
            message: "Comment can not be empty."
        });
    }
    if(!req.body.name) {
        return res.status(404).send({
            message: "Commenter name can not be empty."
        });
    }
    Resume.findById(req.params.resumeId)
    .then(resume => {
        if(!resume) {
            return res.status(404).send({
                message: "Resume not found with id " + req.params.resumeId
            });            
        }
        return resume;
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "resume not found with id " + req.params.resumeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving resume with id " + req.params.resumeId
        });
    }).then(found => {
        found.comments.push({
            name: req.body.name,
            comment: req.body.comment
        })
        Resume.findByIdAndUpdate(req.params.resumeId, {
            comments: found.comments
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
    });

    // Find resume and update it with the request body
    
};