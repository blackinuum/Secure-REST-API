# 🔐 Secure REST API avec Authentification JWT & Vérification JWS

Ce projet met en œuvre une **API REST sécurisée** basée sur **Node.js**, **Express.js**, **React.js**, et **MySQL**, intégrant les mécanismes modernes d’**authentification JSON Web Token (JWT)** et de **signature JSON Web Signature (JWS)** pour garantir l’intégrité et la confidentialité des échanges entre le client et le serveur.

---

## 🚀 Objectif du projet

Le but est de concevoir une API **robuste, scalable et sécurisée** qui :
- Authentifie les utilisateurs via des **tokens JWT signés cryptographiquement**.
- Vérifie la validité et l’intégrité des données à l’aide de **signatures JWS**.
- Protège les communications contre les attaques (MITM, Token Replay, Token Theft).
- Implémente un **contrôle d’accès basé sur les rôles (RBAC)**.
- Respecte les bonnes pratiques OWASP pour la sécurité des API.

---

## 🧩 Technologies utilisées

| Catégorie | Outils / Technologies |
|------------|----------------------|
| Frontend | **React.js** |
| Backend | **Node.js** + **Express.js** |
| Base de données | **MySQL** |
| Authentification | **JWT (JSON Web Token)** |
| Signature numérique | **JWS (JSON Web Signature)** |
| Outil de test API | **Insomnia** |
| IDE | **Visual Studio Code** |

---

## ⚙️ Fonctionnement général

### 🔑 1. Authentification JWT
- Le client s’authentifie via email et mot de passe.
- Le serveur génère un **token JWT signé** contenant les informations utilisateur (id, rôle, expiration).
- Le client utilise ce token dans les en-têtes `Authorization: Bearer <token>` pour chaque requête.
- Le serveur vérifie la signature et l’expiration avant d’accorder l’accès.

### 🧾 2. Vérification de Signature JWS
- Chaque requête ou payload sensible est **signé numériquement**.
- Le serveur vérifie la **signature cryptographique (HMAC, RSA, ou ECDSA)** avant d’insérer ou de traiter les données.
- Toute modification détectée (attaque MITM) est bloquée.

### 🧱 3. Contrôle d’accès (RBAC)
- Les rôles (`admin`, `user`, etc.) sont intégrés dans le token JWT.
- Le serveur accorde ou refuse l’accès aux routes selon les permissions du rôle.

---

## 🔐 Bonnes pratiques de sécurité mises en œuvre

- Stockage sécurisé des tokens (HTTP-only cookies)
- Utilisation obligatoire du protocole **HTTPS**
- Mécanisme de **rotation et expiration des tokens**
- **Prévention des attaques** : MITM, XSS, Token Replay, CSRF
- **Gestion des rôles** et principe du moindre privilège

---

## 🧪 Tests et validation

- Tests d’API effectués via **Insomnia**
- Vérification des statuts HTTP, messages d’erreur et intégrité des tokens
- Scénarios de test :  
  - Authentification correcte / incorrecte  
  - Token expiré ou falsifié  
  - Accès refusé selon le rôle  
  - Tentative d’injection ou modification des données signées  

---

## 🧠 Points forts du projet

- Mise en œuvre complète d’une **authentification moderne sans session serveur**.  
- Séparation claire du **frontend React** et du **backend Express**.  
- Intégration réelle de **concepts cryptographiques** (JWS, HMAC, RSA).  
- Projet idéal pour démontrer des compétences en **développement web sécurisé** et **tests de sécurité applicative**.

---

## 📸 Exemples de fonctionnement

- **Connexion utilisateur**
- **Génération et stockage du JWT**
- **Vérification de la signature JWS avant insertion**
- **Blocage d’une tentative MITM**
- **Contrôle d’accès selon le rôle**

---

## 🧭 Structure du projet

📦 secure-rest-api-jwt-jws
┣ 📂 backend
┃ ┣ 📜 server.js
┃ ┣ 📜 routes/
┃ ┣ 📜 middleware/
┃ ┣ 📜 controllers/
┃ ┗ 📜 config/
┣ 📂 frontend
┃ ┣ 📜 src/
┃ ┣ 📜 components/
┃ ┗ 📜 App.js
┗ 📜 README.md

yaml
Copier le code

---

## 👥 Équipe
- **BERHIL Tarik**
- **BAZOURHI Mohamed Saad**
- **ELKADI Ayoub**
- **IZM Karim**  
🧭 Encadré par **Prof. ELMENDILI Fatna**

---

## 📚 Conclusion

Ce projet démontre la capacité à concevoir une **API REST sécurisée et testable**, intégrant les principes d’authentification moderne et de signature numérique.  
Il combine à la fois des compétences en **développement full-stack** et en **sécurité des applications web**.

---

## 📜 Licence
Projet académique – Usage éducatif et démonstratif.
