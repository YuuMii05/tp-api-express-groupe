const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors()); // Obligatoire pour le barème !
app.use(express.json());

// Importation des routes
const authRoutes = require('./routes/authRoutes'); // Ton travail
const projectRoutes = require('./routes/projectRoutes'); // Travail de Damien
const taskRoutes = require('./routes/taskRoutes'); // Travail de Damien

// Déclaration des routes
app.use('/api/auth', authRoutes); // Tes endpoints /signup et /login
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Route de base
app.get('/', (req, res) => {
    res.json({ message: "Welcome to our Group API project! Auth & CRUD are ready." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});