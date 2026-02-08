const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    const user = await User.create({ 
      firstName, 
      lastName, 
      email, 
      password 
    });
    
    res.status(201).json({ 
      message: 'Utilisateur créé !', 
      userId: user.id 
    });
  } catch (error) {
    res.status(400).json({ 
      error: 'Erreur lors de l’inscription', 
      details: error.message 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    res.status(200).json({
      userId: user.id,
      token: jwt.sign(
        { userId: user.id }, 
        process.env.JWT_SECRET || 'CLE_SECRETE_TOKEN', 
        { expiresIn: '24h' }
      )
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};