'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt'); // Importation de bcrypt pour la sécurité

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Tu pourras ajouter des associations ici plus tard si besoin
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Sécurité : pas deux fois le même email
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      // Avant de sauvegarder l'utilisateur, on hache son mot de passe
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });
  return User;
};