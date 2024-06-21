const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    founded: {
        type: Date,
        required: true
    },
    employees: {
        type: String, // Updated to String to accommodate values like "4000+"
        required: true
    },
    location: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    techStack: [{
        name: {
            type: String,
            required: true
        },
        logo: {
            type: String
        }
    }],
    logo: {
        type: String,
        required: true
    },
    additionalDetails: {
        type: String
    },
    contact: {
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        email: {
            type: String
        }
    }
}, {
    timestamps: true
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
