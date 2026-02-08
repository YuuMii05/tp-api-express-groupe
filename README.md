<h1 align="center" id="top">API REST – Gestion de Projets & Tâches</h1>

<p align="center">
  <b>Architecture MVC • Authentification JWT • Base de Données Relationnelle</b>
</p>

<p align="center">
  <i>API sécurisée développée avec Node.js et Express, intégrant Sequelize ORM, 
  relations SQL (User ↔ Project ↔ Task) et documentation complète via Swagger.</i>
</p>

<br>

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
</div>

<br>

<div align="center">
  <img src="https://img.shields.io/badge/Auth-JWT-informational?style=flat-square" />
  <img src="https://img.shields.io/badge/Password-Hashed%20with%20bcrypt-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/API-Documented%20with%20Swagger-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Database-Relational-blue?style=flat-square" />
</div>

<br><br>

<p align="center">
  <a href="#archi">Architecture</a> •
  <a href="#install">Installation</a> •
  <a href="#api">API Endpoints</a>
</p>

<br>

#### Bienvenue sur notre API de gestion de projets. Ce projet a été réalisé dans le cadre du TP de développement Backend.  

*Ce projet a été réalisé en collaboration par trois étudiants :*
* *Maram Bougossa (L'Architecte) : Responsable de la structure globale du projet (MVC), de la configuration d'Express, de la modélisation de la base de données avec Sequelize, des relations entre les tables et de la mise en place du workflow GitHub.*
* *Joao Victor (Spécialiste Sécurité) : Responsable de l'authentification des utilisateurs, du hachage des mots de passe avec Bcrypt et de la sécurisation des routes via les jetons JWT (JSON Web Tokens).*
* *Damien Cuba (Développeur Features) : Responsable du développement de la logique métier (Controllers) et de la mise en place de toutes les routes CRUD pour la gestion des projets et des tâches.*
---

<div id="archi"></div>  

> ### Architecture et Modélisation technique 
Le projet repose sur une infrastructure robuste conçue pour assurer la séparation des responsabilités et la cohérence des données. L'architecture logicielle adopte le pattern MVC (Modèle-Vue-Contrôleur) afin de structurer le code de manière modulaire et évolutive.  

**Organisation du Logiciel**  
La structure du répertoire a été organisée pour isoler chaque composant de l'application :
* Controllers : Gèrent la logique métier et la communication entre les modèles et les vues.
* Models : Définissent la structure des données et les règles de validation via Sequelize.
* Routes : Cartographient les points d'entrée (endpoints) de l'API.
* Migrations & Seeders : Assurent le versioning de la base de données et le déploiement de données initiales.

**Conception de la Base de Données**  
Le système s'appuie sur une base de données relationnelle MySQL, orchestrée par l'ORM Sequelize. La modélisation inclut trois entités clés (Users, Projects, Tasks) articulées autour d'une relation One-to-Many : un projet peut contenir plusieurs tâches, tandis qu'une tâche est strictement rattachée à un projet unique via une clé étrangère.  

**Initialisation et Fiabilité (Seeders)**  
Afin de garantir un environnement de développement prêt à l'emploi pour toute l'équipe, des scripts de Seeders ont été implémentés. Ces scripts permettent d'injecter automatiquement des jeux de données de test, validant ainsi l'intégrité des relations dès le déploiement initial.

<div id="install"></div>  

> ### Installation et Configuration
Pour déployer ce projet localement, suivez les étapes ci-dessous :

1. **Clonage du projet**
   ```bash
   git clone [https://github.com/YuuMii05/tp-api-express-groupe.git](https://github.com/YuuMii05/tp-api-express-groupe.git)  
   cd tp-api-express-groupe
   
2. **Installation des dépendances**
   ```bash
   npm install
   
3. **Variables d'environnement**  
  Créez un fichier .env à la racine et configurez vos accès XAMPP :
   ```bash
   DB_USERNAME=root
   DB_PASSWORD=
   DB_NAME=api_project_db
   DB_HOST=127.0.0.1
   JWT_SECRET=votre_cle_secrete_ici

5. **Déploiement de la base de données**  
Exécutez les migrations et les seeders pour préparer l'environnement :
   ```bash
   npx sequelize db:migrate
   npx sequelize db:seed:all

<div id="api"></div>  

> ### Points de terminaison (Endpoints) de l'API  
Cette section répertorie les routes disponibles pour interagir avec les ressources de l'application. 
  
**Points de terminaison (Endpoints) de l'API**  
*Gestion des entités parentes regroupant les ensembles de travaux.*

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/projects`| Récupère tous les projets (inclut les tâches) |
| `GET` | `/api/projects/:id` | Récupère un projet spécifique par son ID |
| `POST` | `/api/projects` | Crée un nouveau projet |

**Opérations sur les "Tâches" (Tasks)**  
*Manipulation des unités de travail atomiques rattachées aux projets.*

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/tasks` | Crée une tâche liée à un projet |
| `PUT` | `/api/tasks/:id` | Modifie une tâche (titre, statut, etc.) |
| `DELETE` | `/api/tasks/:id` | Supprime définitivement une tâche |

---
<p align="right"><a href="#top">Retour au menu</a></p>
