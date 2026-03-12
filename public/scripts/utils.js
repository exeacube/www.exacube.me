/* ═══════════════════════════════════════
   utils.js — EgoriaMC
   Copie IP + Discord stats + Minecraft status
═══════════════════════════════════════ */

// ───────────────────────────────────────
//  Copie IP (hero & how-to-play)
// ───────────────────────────────────────
function copyIP(el) {
    const text = el.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
        const hint = el.nextElementSibling;
        if (!hint) return;
        hint.textContent = '✓ Copié !';
        hint.style.color = '#7F48B4';
        setTimeout(() => {
            hint.textContent = 'cliquer pour copier';
            hint.style.color = '';
        }, 2000);
    });
}

function copyStepIP(el) {
    const text = el.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
        const original = el.textContent;
        el.textContent = '✓ Copié !';
        el.style.borderColor = 'rgba(127, 72, 180, 0.6)';
        setTimeout(() => {
            el.textContent = original;
            el.style.borderColor = '';
        }, 2000);
    });
}

// ───────────────────────────────────────
//  Minecraft — joueurs en ligne
// ───────────────────────────────────────
(async function loadMinecraftStatus() {
    try {
        const res  = await fetch('/api/minecraft/status');
        const data = await res.json();

        const onlineEl = document.getElementById('mc-online');
        if (onlineEl && data.players) {
            onlineEl.textContent = `${data.players.online} / ${data.players.max} en ligne`;
        }

        const statusDot = document.querySelector('.green-circle');
        if (statusDot) {
            statusDot.style.background = data.online ? '#22c55e' : '#ef4444';
            statusDot.style.boxShadow  = data.online
                ? '0 0 6px #22c55e'
                : '0 0 6px #ef4444';
        }

        const statusText = document.querySelector('.status');
        if (statusText && data.online !== undefined) {
            const span = statusText.querySelector('span:not(.green-circle)');
            if (span) span.textContent = data.online ? 'Serveur en ligne' : 'Serveur hors ligne';
        }
    } catch {
        // silencieux
    }
})();

// ───────────────────────────────────────
//  Discord — stats + icône + salons
// ───────────────────────────────────────
const GUILD_ID = '1467642369661997099';

const CHANNEL_CATEGORIES = {
    'Serveur': [
        '1467642370500853785',
        '1467642370500853788',
        '1478811009182597182'
    ],
    'Discussion': [
        '1467642370689466390',
        '1467642370689466393',
        '1480911006560419932'
    ]
};

// Stats (membres, online, icône)
(async function loadDiscordStats() {
    try {
        const res  = await fetch('/api/discord/stats');
        const data = await res.json();
        if (!data.success) return;

        const onlineEl  = document.getElementById('discord-online');
        const membersEl = document.getElementById('discord-members');
        const widgetEl  = document.getElementById('widget-online-count');

        if (onlineEl)  onlineEl.textContent  = `${data.online} en ligne`;
        if (membersEl) membersEl.textContent  = `${data.total} membres`;
        if (widgetEl)  widgetEl.textContent   = `${data.online} membres en ligne`;

        // Icône du serveur
        if (data.icon) {
            const iconEl = document.querySelector('.widget-server-icon');
            if (iconEl) {
                iconEl.innerHTML = `<img
                    src="https://cdn.discordapp.com/icons/${GUILD_ID}/${data.icon}.png?size=64"
                    alt="${data.name}"
                />`;
            }
        }
    } catch {
        const onlineEl  = document.getElementById('discord-online');
        const membersEl = document.getElementById('discord-members');
        const widgetEl  = document.getElementById('widget-online-count');
        if (onlineEl)  onlineEl.textContent  = 'En ligne';
        if (membersEl) membersEl.textContent  = 'membres';
        if (widgetEl)  widgetEl.textContent   = 'Serveur actif';
    }
})();

// Noms des salons
(async function loadDiscordChannels() {
    try {
        const res  = await fetch('/api/discord/channels');
        const data = await res.json();
        if (!data.success) return;

        const nameMap = {};
        data.channels.forEach(c => { nameMap[c.id] = c.name; });

        const container = document.querySelector('.widget-channels');
        if (!container) return;
        container.innerHTML = '';

        for (const [category, ids] of Object.entries(CHANNEL_CATEGORIES)) {
            const cat = document.createElement('div');
            cat.className   = 'widget-category';
            cat.textContent = category;
            container.appendChild(cat);

            ids.forEach(id => {
                const link       = document.createElement('a');
                link.href        = `https://discord.com/channels/${GUILD_ID}/${id}`;
                link.target      = '_blank';
                link.rel         = 'noopener noreferrer';
                link.className   = 'widget-channel';
                link.textContent = `# ${nameMap[id] ?? id}`;
                container.appendChild(link);
            });
        }
    } catch {
        // Fallback HTML statique
    }
})();
