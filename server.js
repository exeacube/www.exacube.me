require('dotenv').config();
require('colors');

const express = require('express');
const path    = require('node:path');
const axios   = require('axios');

const app  = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST || `http://127.0.0.1:${PORT}`;

// ───────────────────────────────────────────
//  Middleware
// ───────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/iconify', express.static(path.join(__dirname, 'node_modules', '@iconify', 'iconify', 'dist')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ───────────────────────────────────────────
//  Pages
// ───────────────────────────────────────────
app.get('/',       (req, res) => res.render('index'));
app.get('/services',   (req, res) => res.render('shop'));
app.get('/contact',(req, res) => res.render('contact'));
app.get('/dashboard',(req, res) => res.render('redirectDashboard'));
app.get('/discord',(req, res) => res.render('redirectDiscord'));
app.get('/cgu-cgv',(req, res) => res.render('cgu-cgv'));

// ───────────────────────────────────────────
//  404
// ───────────────────────────────────────────
app.use((req, res) => res.status(404).render('404'));

// ───────────────────────────────────────────
//  Start
// ───────────────────────────────────────────
app.listen(PORT, () => {
    console.log('\n' + '═'.repeat(48).cyan);
    console.log('  🧊 Exacube Website'.green.bold);
    console.log(`  ➜  ${HOST}`.yellow);
    console.log('═'.repeat(48).cyan + '\n');
});
