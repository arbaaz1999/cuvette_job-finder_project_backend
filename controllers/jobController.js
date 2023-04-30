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
        let skills = req.query.skills;
        let search = req.query.search || "";
        console.log(skills, search)
        if (skills) { skills = skills.split(',') };
        console.log(JSON.stringify(skills))
        const jobs = await Jobs.find({ job_position: { $regex: search, $options: "i" } })
            .where('skills_required')
            .in(skills)
            .sort({ createdAt: -1 })
        console.log(jobs)
        if (jobs) {
            return res.status(200).json({
                message: 'Jobs fetched successfully!',
                data: jobs,
                error: null,
            })
        } else if (jobs.length === 0) {
            return res.status(404).json({
                message: 'Not found!'
            })
        }
    } catch (error) {
        console.log(error)
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

const edit_job = async (req, res) => {
    try {
        const { id, company_name, logo_url, job_position, monthly_salary, job_type, remote_office, location, job_description, about_company, skills_required } = req.body;

        const job = await Jobs.findOne({ _id: id });
        if (job) {
            job.company_name = company_name || job.company_name;
            job.logo_url = logo_url || job.logo_url;
            job.job_position = job_position || job.job_position;
            job.monthly_salary = monthly_salary || job.monthly_salary;
            job.job_type = job_type || job.job_type;
            job.remote_office = remote_office || job.remote_office;
            job.location = location || job.location;
            job.job_description = job_description || job.job_description;
            job.about_company = about_company || job.about_company;
            job.skills_required = skills_required || job.skills_required;
        } else {
            return res.status(401).json({
                message: 'Not found!',
            })
        }
        const updatedJob = await job.save();
        return res.status(200).json({
            message: 'Job updated successfully',
            data: updatedJob,
            error: null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        })
    }
}



module.exports = { create_job, get_job_by_id, get_all_jobs, edit_job };