const Jobs = require('../models/jobModel');

const create_job = async (req, res) => {
    try {
        const { company_name, logo_url, job_position, monthly_salary, job_type, remote_office, location, job_description, about_company, skills_required } = req.body;

        const job = await Jobs.create({
            company_name, logo_url, job_position, monthly_salary, job_type, remote_office, location, job_description, about_company, skills_required
        })
        if (job) {
            return res.status(200).json({
                message: 'Job created successfully!',
                data: job,
                error: null
            })
        } else {
            return res.status(400).json({
                message: 'Something went wrong!',
                data: null,
                error: true,
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Something went wrong!',
            error: error,
        })

    }
}

const get_all_jobs = async (req, res) => {
    try {
        const jobs = await Jobs.find({});
        if (jobs) {
            return res.status(200).json({
                message: 'Jobs fetched successfully!',
                data: jobs,
                error: null,
            })
        } else {
            return res.status(401).json({
                message: 'Not found!'
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Something went wrong!',
            error: error
        })
    }
}

const get_job_by_id = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Jobs.findOne({ _id: id })
        if (job) {
            return res.status(200).json({
                message: "Job fetched successfully!",
                data: job,
                error: null,
            })
        } else {
            return res.status(401).json({
                message: 'Not found!',
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

const get_job_by_skills = async (req, res,) => {
    try {
        const { skills } = req.params;
        console.log(skills);
        res.json({ data: skills })
        // const jobsBySkills = await Jobs.find({ skills_required: })
    } catch (error) {

    }
}

module.exports = { create_job, get_job_by_id, get_all_jobs, get_job_by_skills };