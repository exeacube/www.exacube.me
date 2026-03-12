# 🌐 www.exacube.me

Site vitrine officiel d'**EgoriaMC** — hébergeur Minecraft 100% gratuit à vie, hébergé en France.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com)
[![EJS](https://img.shields.io/badge/EJS-5.x-B4CA65?style=flat)](https://ejs.co)
[![MySQL](https://img.shields.io/badge/MySQL2-3.x-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com)
[![License](https://img.shields.io/badge/License-BSL--1.0-blue?style=flat)](./LICENSE)

---

## ✨ Aperçu

Site web complet de présentation et de vente des offres EgoriaMC :

- **Page d'accueil** — Hero, Comment ça marche, Grille des offres, Points forts, CTA final
- **Page /services** — Détail des 3 plans + options à la carte (RAM, SSD, Ports)
- **Navigation sticky** avec backdrop blur + **Footer** responsive
- **Page 404** personnalisée
- Redirections `/dashboard` et `/discord`

---

## 🛠️ Stack technique

| Couche | Technologie | Version |
|---|---|---|
| Runtime | Node.js | v18+ |
| Framework | Express.js | 5.x |
| Templating | EJS | 5.x |
| Base de données | MySQL2 | 3.x |
| HTTP Client | Axios | 1.x |
| Auth | Bcrypt | 6.x |
| Styles | CSS natif (sans framework) | — |
| Icônes | @iconify/iconify | 3.x |
| Fonts | Press Start 2P + Outfit | Google Fonts |
| Variables d'env | dotenv | 17.x |
| Logs console | colors | 1.x |

---

## 📁 Structure du projet

```
www.exacube.me/
├── public/
│   ├── css/
│   │   ├── main.css          # Reset, base, typographie, scrollbar
│   │   ├── index.css         # Nav, Hero, How it works, Pricing, Features, CTA
│   │   └── services.css      # Page /services
│   └── medias/               # Images, logo, bannière
├── views/
│   ├── partials/
│   │   ├── nav.ejs           # Navbar sticky
│   │   └── footer.ejs        # Footer avec liens + réseaux sociaux
│   ├── index.ejs             # Page d'accueil
│   ├── shop.ejs              # Boutique / offres
│   ├── contact.ejs           # Page de contact
│   ├── cgu-cgv.ejs           # CGU, CGV, Mentions légales
│   ├── redirectDashboard.ejs # Redirection vers le panel
│   ├── redirectDiscord.ejs   # Redirection Discord
│   └── 404.ejs               # Page d'erreur 404
├── server.js                 # Serveur Express + routes
├── .env.example              # Variables d'environnement à copier
├── package.json
└── README.md
```

---

## 🚀 Installation

### Prérequis

- Node.js **v18** ou supérieur
- npm
- Une instance MySQL (pour les fonctionnalités liées à l'API)

### 1. Cloner le projet

```bash
git clone https://github.com/exeacube/www.exacube.me.git
cd www.exacube.me
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Édite le fichier `.env` :

```env
PORT=3000                                       # Port du serveur web
HOST=http://127.0.0.1:3000/                     # URL locale complète
SESSION_SECRET=ton_secret_ici                   # Secret de session

API_URL=https://api.exacube.me/v1/web/          # URL de l'API Exacube
API_KEY=ta_cle_api                              # Clé API Exacube
```

### 4. Lancer le serveur

```bash
# Développement
npm run dev

# Production (systemd)
npm start
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000)

---

## 🗺️ Routes disponibles

| Méthode | Route | Vue | Description |
|---|---|---|---|
| GET | `/` | `index.ejs` | Page d'accueil |
| GET | `/services` | `shop.ejs` | Boutique — offres & add-ons |
| GET | `/contact` | `contact.ejs` | Page de contact |
| GET | `/cgu-cgv` | `cgu-cgv.ejs` | CGU, CGV, Mentions légales |
| GET | `/dashboard` | `redirectDashboard.ejs` | Redirection vers le panel |
| GET | `/discord` | `redirectDiscord.ejs` | Redirection Discord |
| — | `*` | `404.ejs` | Page d'erreur 404 |

---

## 📦 Offres présentées

### Gratuit — 0€ / à vie
- 3 Go RAM · 2 cœurs CPU · 16 Go SSD
- Slots illimités · Panel Custom · DDoS · Domaine offert · Backups auto
- 1 serveur par compte

### Private Node — à partir de 4,99€/mois
- Réseau de 2 à 8 serveurs + BungeeCord dédié
- Support prioritaire

### Custom Metal — Sur mesure
- Infrastructure configurée avec un technicien
- Matériel dédié · Prix selon les besoins

### Add-ons à la carte

| Add-on | Prix |
|---|---|
| RAM supplémentaire | 0,99€ / Go / mois |
| Stockage SSD | 0,49€ / Go / mois |
| Port supplémentaire | 0,49€ / port / mois |

---

## ⚙️ Production (systemd)

Le script `npm start` démarre le service systemd `exacubeWebsite.service`.

Exemple de fichier `/etc/systemd/system/exacubeWebsite.service` :

```ini
[Unit]
Description=Exacube Website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/www.exacube.me
ExecStart=/usr/bin/node server.js
Restart=on-failure
EnvironmentFile=/var/www/www.exacube.me/.env

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable exacubeWebsite
sudo systemctl start exacubeWebsite
sudo systemctl status exacubeWebsite
```

---

## 🤝 Contribution

1. Fork le projet
2. Crée une branche (`git checkout -b feature/ma-feature`)
3. Commit tes changements (`git commit -m 'feat: ajout de ma feature'`)
4. Push la branche (`git push origin feature/ma-feature`)
5. Ouvre une Pull Request

---

## 📄 Licence

Ce projet est sous licence **BSL-1.0**. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

---

## 🔗 Liens

- 🌐 Site : [www.exacube.me](https://www.exacube.me)
- 💬 Discord : [discord.egoria.xyz](https://discord.exacube.me)

---

<p align="center">Fait avec ❤️ par <strong>neophitt</strong> & l'équipe EgoriaMC — Hébergé en France 🇫🇷</p>
