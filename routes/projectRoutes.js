const express = require('express');
const router = express.Router();
const projectCtrl = require('../controllers/projectController');
const auth = require('../middlewares/auth'); 

router.get('/', auth, projectCtrl.getAllProjects);

router.post('/', auth, projectCtrl.createProject);

router.get('/:id', auth, projectCtrl.getProjectById);

router.put('/:id', auth, projectCtrl.updateProject);

router.delete('/:id', auth, projectCtrl.deleteProject);

module.exports = router;