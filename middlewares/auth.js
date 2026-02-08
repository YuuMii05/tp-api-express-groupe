const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Header d\'autorisation manquant');
    }

    const token = req.headers.authorization.split(' ')[1];
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'CLE_SECRETE_TOKEN');
    
    const userId = decodedToken.userId;
    req.auth = { userId };
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Requête non authentifiée !' });
  }
};