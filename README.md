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
  <a href="#api">API Endpoints</a> •
  <a href="#workflow">Guide d'Utilisation</a> •
  <a href="#preuves">Aperçu & Preuves</a> •
  <a href="#conclusion">Conclusion</a> •
  <a href="#contacts">Contacts</a>
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
* **Controllers :** Gèrent la logique métier et la communication entre les modèles et les vues.
* **Models :** Définissent la structure des données et les règles de validation via Sequelize.
* **Routes :** Cartographient les points d'entrée (endpoints) de l'API.
* **Migrations & Seeders :** Assurent le versioning de la base de données et le déploiement de données initiales.

**Conception de la Base de Données**  
Le système s'appuie sur une base de données relationnelle MySQL, orchestrée par l'ORM Sequelize. La modélisation inclut trois entités clés (Users, Projects, Tasks) articulées autour d'une relation One-to-Many : un projet peut contenir plusieurs tâches, tandis qu'une tâche est strictement rattachée à un projet unique via une clé étrangère.  

**Sécurité et Authentification**  
La protection des données est assurée par une couche de sécurité robuste :
* **Hachage Automatique** : Intégration de hooks Sequelize pour hacher les mots de passe avec `Bcrypt` (10 rounds) avant l'enregistrement en base de données.
* **Authentification JWT** : Utilisation de `JSON Web Tokens` pour générer des sessions sécurisées d'une durée de 24h.
* **Middleware "Auth"** : Un garde-barrière intercepte les requêtes vers les projets et tâches pour vérifier la validité du jeton dans le header `Authorization`.

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
   PORT=3000

5. **Déploiement de la base de données**  
Exécutez les migrations et les seeders pour préparer l'environnement :
   ```bash
   npx sequelize db:migrate
   npx sequelize db:seed:all
   npm start

<div id="api"></div>  

> ### Points de terminaison (Endpoints) de l'API  
Cette section répertorie les routes disponibles pour interagir avec les ressources de l'application. 


**Authentification**  
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/auth/signup`| Inscription d'un nouvel utilisateur |
| `POST` | `/api/auth/login` | Connexion et récupération du Token JWT |

**Projets (Protégés par JWT)**  
*Gestion des entités parentes regroupant les ensembles de travaux.*

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/projects`| Récupère tous les projets (inclut les tâches) |
| `GET` | `/api/projects/:id` | Récupère un projet spécifique |
| `POST` | `/api/projects` | Crée un nouveau projet |
| `PUT` | `/api/projects/:id` | Modifie un projet |
| `DELETE` | `/api/projects/:id` | Supprime un projet |


**Tâches (Protégées par JWT)**  
*Manipulation des unités de travail atomiques rattachées aux projets.*

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/tasks` | Crée une tâche liée à un projet |
| `PUT` | `/api/tasks/:id` | Modifie une tâche (titre, statut, etc.) |
| `DELETE` | `/api/tasks/:id` | Supprime définitivement une tâche |


**Validation des Tests**  
L'API a été validée via curl et Postman. Pour tester les routes protégées, assurez-vous d'inclure le header suivant :
`Authorization: Bearer <votre_token>`

---

*<div id="workflow"></div>

> ### Guide d'Utilisation (Workflow)
Pour tester l'intégralité du flux de travail, suivez ces étapes :  
1. **Créer un compte** : Envoyez une requête `POST` à `/api/auth/signup`.
2. **S'authentifier** : Envoyez une requête `POST` à `/api/auth/login` pour obtenir votre jeton.
3. **Créer un Projet** : Utilisez le jeton dans le header `Authorization` pour créer votre premier projet via `POST /api/projects`.
4. **Ajouter des Tâches** : Utilisez l'ID du projet créé pour ajouter des tâches via `POST /api/tasks`.

### Structure du Projet  
```text
tp-api-express-groupe/
├── config/             # Configuration de la base de données (Sequelize)
├── controllers/        # Logique métier (Auth, Projets, Tâches)
├── middleware/         # Protection des routes (JWT)
├── models/             # Modèles Sequelize (User, Project, Task)
├── routes/             # Définition des points d'entrée de l'API
├── migrations/         # Historique de la structure de la base de données
├── seeders/            # Données de test initiales
├── .env                # Variables d'environnement (non inclut sur Git)
├── server.js           # Point d'entrée principal de l'application
└── package.json        # Dépendances et scripts
```

<div id="preuves"></div>

> ### Aperçu et Preuves de Fonctionnement

1. Structure du Projet (MVC)
L'organisation des fichiers montre une séparation claire des responsabilités, incluant désormais le dossier `middlewares` pour la sécurité JWT.
<img width="348" height="826" alt="newreadme3" src="https://github.com/user-attachments/assets/61030713-8486-473c-b70d-769d2e3a039f" />

3. Modélisation de la Base de Données
Le schéma relationnel (Designer) illustre les tables `users`, `projects` et `tasks` avec leurs clés primaires et étrangères gérées par Sequelize.
<img width="808" height="803" alt="newreadme1" src="https://github.com/user-attachments/assets/ab88d4b9-47bb-4fe6-8d22-0c453caccf0a" />

4. Sécurité des Données (Bcrypt)
Preuve du travail de sécurisation : les mots de passe des utilisateurs sont hachés avec Bcrypt avant le stockage, garantissant qu'aucune donnée sensible n'apparaît en clair.
<img width="1657" height="877" alt="newreadme2" src="https://github.com/user-attachments/assets/a74e6d9c-3817-4440-82f6-dfb86cd519d1" />

5. Validation de l'API (Live)
Test final de la route de base confirmant que l'API est opérationnelle et que toutes les routes CRUD et Auth sont prêtes à l'emploi.
<img width="1148" height="417" alt="newreadme4" src="https://github.com/user-attachments/assets/1b720245-146b-49b9-8dd1-14f38a440877" />

<div id="conclusion"></div>

> ### Conclusion  
Ce projet nous a permis de mettre en pratique l'intégralité du cycle de développement d'une API REST : de la modélisation des données avec **Sequelize** à la sécurisation des échanges avec **JWT**. Grâce à une répartition claire des rôles et une communication constante, nous avons livré une solution fonctionnelle, robuste et prête pour une intégration frontend.  

<div id="contacts"></div>

> ### Contacts de l'Équipe
* **Maram Bougossa** - [GitHub](https://github.com/YuuMii05)
* **Joao Victor** - [GitHub](https://github.com/kiseij660)
* **Damien Cuba** - [GitHub](https://github.com/Dams117)


---
<p align="right"><a href="#top">Retour au menu</a></p>
