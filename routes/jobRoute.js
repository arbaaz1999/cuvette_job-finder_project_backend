const express = require('express')
const protected = require('../middleware/authMiddleware');
const { create_job, get_job_by_id, get_all_jobs, edit_job } = require('../controllers/jobController');

const router = express.Router();

router.post('/create', protected, create_job);
router.put('/update', protected, edit_job);
router.get('/:id', get_job_by_id);
router.get('/', get_all_jobs);

module.exports = router;