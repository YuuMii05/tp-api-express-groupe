const { Project, Task } = require('../models');

// Récupérer tous les projets avec leurs tâches
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            include: [{ model: Task }]
        });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Créer un projet
exports.createProject = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) return res.status(400).json({ message: "Le titre est obligatoire" });

        const newProject = await Project.create({ title, description });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Récupérer un projet par ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: [{ model: Task }]
        });
        if (!project) return res.status(404).json({ message: "Projet non trouvé" });
        
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Mettre à jour un projet
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: "Projet non trouvé" });

        await project.update(req.body);
        res.status(200).json({ message: "Projet mis à jour !", project });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer un projet
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: "Projet non trouvé" });

        await project.destroy();
        res.status(200).json({ message: "Projet supprimé avec succès !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};