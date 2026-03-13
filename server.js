require('dotenv').config();
require('colors');

const express = require('express');
const path    = require('node:path');
const axios   = require('axios');

const app  = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST || `http://127.0.0.1:${PORT}`;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});



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
app.get('/contact', (req, res) => res.render('contact', { success: null, error: null }));
app.get('/dashboard',(req, res) => res.render('redirectDashboard'));
app.get('/discord',(req, res) => res.render('redirectDiscord'));
app.get('/cgu-cgv',(req, res) => res.render('cgu-cgv'));

app.post('/contact', async (req, res) => {
    const { nom, email, sujet, message } = req.body;

    // Validation basique
    if (!nom || !email || !sujet || !message) {
        return res.render('contact', { success: null, error: 'Tous les champs sont obligatoires.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.render('contact', { success: null, error: 'Adresse email invalide.' });
    }

    try {
        await transporter.sendMail({
            from:    `"EgoriaMC Contact" <${process.env.SMTP_USER}>`,
            to:      process.env.MAIL_TO,
            replyTo: email,
            subject: `[Contact] ${sujet}`,
            html: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#141414;color:#cfcfcf;padding:2rem;border-radius:8px;">
                    <h2 style="color:#b07de0;margin-bottom:1.5rem;">Nouveau message — EgoriaMC</h2>
                    <table style="width:100%;border-collapse:collapse;">
                        <tr><td style="padding:0.5rem 0;color:#666;width:120px;">Nom</td><td style="color:#fff;">${nom}</td></tr>
                        <tr><td style="padding:0.5rem 0;color:#666;">Email</td><td style="color:#fff;">${email}</td></tr>
                        <tr><td style="padding:0.5rem 0;color:#666;">Sujet</td><td style="color:#fff;">${sujet}</td></tr>
                    </table>
                    <hr style="border-color:#2a2a2a;margin:1.5rem 0;">
                    <p style="color:#666;margin-bottom:0.5rem;">Message</p>
                    <p style="color:#fff;line-height:1.7;white-space:pre-wrap;">${message}</p>
                </div>
            `,
        });
        res.render('contact', { success: 'Ton message a bien été envoyé. On te répond sous 24h !', error: null });
    } catch (err) {
        console.error('SMTP error:', err);
        res.render('contact', { success: null, error: 'Une erreur est survenue. Réessaie plus tard.' });
    }
});

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
