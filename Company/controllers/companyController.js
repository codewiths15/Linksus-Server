const Company = require('../models/companyModel');

const companyController = {
    registerCompany: async (req, res) => {
        try {
            // Extract data from the request body
            const {
                companyId,
                name,
                website,
                founded,
                employees,
                location,
                industry,
                description,
                techStack,
                logo,
                additionalDetails,
                contact,
            } = req.body;

            // Create a new company instance with the extracted data
            const newCompany = new Company({
                companyId,
                name,
                website,
                founded,
                employees,
                location,
                industry,
                description,
                techStack,
                logo,
                additionalDetails,
                contact
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
    },

    getAllCompanies: async (req, res) => {
        try {
            const companies = await Company.find();
            res.status(200).json(companies);
        } catch (error) {
            console.error("Error fetching companies:", error);
            res.status(500).json({ message: "Error fetching companies", error: error.message });
        }
    },

    getCompanyById: async (req, res) => {
        const { companyId } = req.params;
        try {
            const company = await Company.findOne({ companyId });
            if (!company) {
                return res.status(404).json({ message: "Company not found" });
            }
            res.status(200).json(company);
        } catch (error) {
            console.error("Error fetching company:", error);
            res.status(500).json({ message: "Error fetching company", error: error.message });
        }
    },

    updateCompanyById: async (req, res) => {
        const { companyId } = req.params;
        try {
            // Extract fields that can be updated from request body
            const {
                name,
                website,
                founded,
                employees,
                location,
                industry,
                description,
                techStack,
                logo,
                additionalDetails,
                contact
            } = req.body;

            const updatedCompany = await Company.findOneAndUpdate(
                { companyId },
                {
                    name,
                    website,
                    founded,
                    employees,
                    location,
                    industry,
                    description,
                    techStack,
                    logo,
                    additionalDetails,
                    contact
                },
                { new: true, runValidators: true }
            );

            if (!updatedCompany) {
                return res.status(404).json({ message: "Company not found" });
            }

            res.status(200).json(updatedCompany);
        } catch (error) {
            console.error("Error updating company:", error);
            res.status(400).json({ message: "Error updating company", error: error.message });
        }
    },

    deleteCompanyById: async (req, res) => {
        const { companyId } = req.params;
        try {
            const deletedCompany = await Company.findOneAndDelete({ companyId });

            if (!deletedCompany) {
                return res.status(404).json({ message: "Company not found" });
            }

            res.status(200).json({ message: "Company deleted successfully" });
        } catch (error) {
            console.error("Error deleting company:", error);
            res.status(500).json({ message: "Error deleting company", error: error.message });
        }
    }
};

module.exports = companyController;
