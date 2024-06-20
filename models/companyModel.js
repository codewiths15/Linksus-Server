const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    website: {
        type: String,
        required: true,
        trim: true
    },
    additionalDetails: {
        foundedYear: {
            type: Number,
            required: true
        },
        foundedMonth: {
            type: String,
            required: true
        },
        numberOfEmployees: {
            type: Number,
            required: true
        },
        location: {
            basedIn: {
                type: String,
                required: true
            },
            countriesEstablished: {
                type: [String],
                required: true
            }
        },
        industry: {
            type: String,
            required: true,
            trim: true
        }
    },
    profile: {
        type: String,
        required: true,
        maxlength: 1000 // approximately 150 words
    },
    contactDetails: {
        twitter: {
            type: String,
            trim: true
        },
        facebook: {
            type: String,
            trim: true
        },
        linkedin: {
            type: String,
            trim: true
        },
        gmail: {
            type: String,
            trim: true
        }
    },
    techStack: [{
        name: {
            type: String,
            required: true,
            trim: true
        }
    }]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
