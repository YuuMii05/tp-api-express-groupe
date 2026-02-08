const { Task, Project } = require('../models');

// Créer une tâche
exports.createTask = async (req, res) => {
    try {
        const { content, status, projectId } = req.body;

        // Vérifier si le projet existe
        const project = await Project.findByPk(projectId);
        if (!project) return res.status(404).json({ message: "Projet introuvable" });

        const newTask = await Task.create({
            content,
            status: status || 'To Do',
            projectId
        });

        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Modifier une tâche
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, content } = req.body;

        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: "Tâche introuvable" });

        task.status = status || task.status;
        task.content = content || task.content;
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Task.destroy({ where: { id } });

        if (!deleted) return res.status(404).json({ message: "Tâche introuvable" });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};