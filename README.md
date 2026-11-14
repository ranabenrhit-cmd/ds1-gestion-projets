# DS1 - API REST de Gestion de Projets et Tâches

Mini-projet ISIDS : API REST réalisée avec Express.js et MongoDB.

## Auteur
Ben Rhit Rana 

## Technologies

- Node.js et Express.js
- MongoDB et Mongoose
- JSON Web Token (authentification)
- bcryptjs (cryptage des mots de passe)


L'API est disponible sur `http://localhost:3000`.

## Structure du projet

```
src/
  config/        connexion à MongoDB
  middlewares/   auth (token JWT), authorize (rôles), errorHandler
  users/         modèle, service, contrôleur et routes des utilisateurs
  projects/      modèle, service, contrôleur et routes des projets
  tasks/         modèle, service, contrôleur et routes des tâches
  utils/         fonctions communes (erreurs, tri et recherche)
  server.js      point d'entrée
```
Chaque fonctionnalité suit le même découpage : les routes appellent le contrôleur,
qui appelle le service, qui utilise le modèle.

## Authentification

Les routes protégées attendent le token dans l'en-tête : Authorization: Bearer <token>

Le token est obtenu avec la route de connexion et reste valable un jour.

## Routes

### Utilisateurs

| Méthode |         Route        |   Accès  |    Description              |
|   ---   |          ---         |    ---   |      ---                    |
|   POST  | `/api/auth/register` |  public  | Inscription                 |
|   POST  | `/api/auth/login`    |  public  | Connexion, renvoie le token |
|   GET   | `/api/auth/me`       | connecté | Utilisateur connecté        |
|   GET   | `/api/auth/users`    | manager  | Liste des utilisateurs      |


Exemple d'inscription :

```json
{
  "nom": "Rana",
  "login": "rana",
  "password": "motdepasse123",
  "role": "user"
}
```

### Projets
| Méthode |         Roue        |          Accès          |                  Description                   |
|   ---   |          ---        |           ---           |                      ---                       |
|   POST  | `/api/projects`     |       connecté          |             Créer un projet                    |
|   GET   | `/api/projects`     |       connecté          | Ses projets ; tous les projets pour le manager |
|   GET   | `/api/projects/:id` | propriétaire ou manager |               Voir un projet                   |
|   PUT   | `/api/projects/:id` | propriétaire ou manager |             Modifier un projet                 |
|  DELETE | `/api/projects/:id` | propriétaire ou manager |         Supprimer un projet et ses tâches      |

Statuts acceptés : `en cours`, `terminé`, `en pause`.



### Tâches

| Méthode |              Route               |       Accès                                  |       Description                   |
|   ---   |               ---                |        ---                                   |           ---                       |
|   POST  | `/api/projects/:projectId/tasks` | connecté                                     | Créer une tâche dans un projet      |
|   GET   | `/api/projects/:projectId/tasks` | propriétaire ou manager                      | Tâches d'un projet                  |
|   PUT   | `/api/tasks/:id`                 | propriétaire, manager ou utilisateur assigné | Modifier une tâche                  |
| DELETE  | `/api/tasks/:id`                 | propriétaire ou manager                      | Supprimer une tâche                 |
|  PATCH  | `/api/tasks/:id/assign`          | manager                                      | Affecter une tâche à un utilisateur |

Statuts acceptés : `todo`, `doing`, `done`.


## Tri et recherche

Les deux routes de liste acceptent des paramètres facultatifs dans l'URL :

| Paramètre |                        Rôle                             |
|   ---     |                       ---                               |
|  `search` | recherche dans le nom du projet ou le titre de la tâche |
|  `statut` | filtre par statut                                       |
|  `sort`   | champ de tri : `nom`, `statut`, `createdAt` (projets) ; `titre`, `statut`, `deadline`, `createdAt` (tâches) |
|  `order`  | `asc` ou `desc` (par défaut `desc`)                     |

Exemples :

```
GET /api/projects?search=site&sort=nom&order=asc
GET /api/projects/:projectId/tasks?statut=todo&sort=deadline&order=asc
```
