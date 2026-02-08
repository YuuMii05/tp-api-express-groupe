const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');     

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);   

// Basic Route to test
app.get('/', (req, res) => {
    res.json({ message: "Welcome to our Group API project!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
