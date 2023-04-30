const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
    {
        company_name: {
            type: String,
            required: [true, 'Company name cannot be empty!'],
            min: 3,
        },
        logo_url: {
            type: String,
            default: 'https://images.unsplash.com/photo-1557053964-937650b63311?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2594&q=80',
        },
        job_position: {
            type: String,
            required: [true, 'Please mention the job position'],
            min: 2,
        },
        monthly_salary: {
            type: Number,
            required: true,
        },
        job_type: {
            type: String,
            required: true,
        },
        remote_office: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        job_description: {
            type: String,
            required: true,
        },
        about_company: {
            type: String,
            required: true,
        },
        skills_required: {
            type: [String],
            required: [true, 'Please mention atleat one skill!'],
            validate: {
                validator: function (v) {
                    return v.length >= 1
                },
                message: 'There should be atleast one skill(s) required!'
            }
        },
    },
    {
        timestamps: true,
    }
)

const Jobs = mongoose.model('Jobs', jobSchema);

module.exports = Jobs;