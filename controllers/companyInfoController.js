const Company = require('./../models/companyModel');

const companyInfoController = {
    post: async (req, res) => {
        try {
            // Create a new company instance with the data from the request body
            const newCompany = new Company({
                name: req.body.name,
                website: req.body.website,
                additionalDetails: {
                    foundedYear: req.body.additionalDetails.foundedYear,
                    foundedMonth: req.body.additionalDetails.foundedMonth,
                    numberOfEmployees: req.body.additionalDetails.numberOfEmployees,
                    location: {
                        basedIn: req.body.additionalDetails.location.basedIn,
                        countriesEstablished: req.body.additionalDetails.location.countriesEstablished
                    },
                    industry: req.body.additionalDetails.industry
                },
                profile: req.body.profile,
                contactDetails: {
                    twitter: req.body.contactDetails.twitter,
                    facebook: req.body.contactDetails.facebook,
                    linkedin: req.body.contactDetails.linkedin,
                    gmail: req.body.contactDetails.gmail
                },
                techStack: req.body.techStack.map(tech => ({ name: tech.name }))
            });

            // Save the new company to the database
            const savedCompany = await newCompany.save();

            // Log the saved company data to the console
            console.log("New company registered:", savedCompany);

            // Respond with the saved company data
            res.status(201).json(savedCompany);
        } catch (error) {
            // Handle errors, such as validation errors
            console.error("Error saving company:", error);
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = companyInfoController;
