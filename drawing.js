console.log("SUCCESS: drawing.js file has been loaded and executed!");

let backgroundElements = [];
let frame = 0; // Animation ke liye frame counter

// Background ko initialize karna
export function initializeBackground(canvas) {
    backgroundElements = [];
    // Stars
    for (let i = 0; i < 100; i++) {
        backgroundElements.push({
            type: 'star',
            x: Math.random() * canvas.width * 5,
            y: Math.random() * canvas.height * 2,
            size: Math.random() * 2 + 1,
            parallax: Math.random() * 0.4 + 0.1,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    // Naya Animated Text Background ke liye
    backgroundElements.push({
        type: 'animatedText',
        text: 'WE LOVE SOMNIA',
        x: canvas.width * 1.5,
        y: canvas.height * 0.4,
        size: 80,
        parallax: 0.3,
        color: '#be29ec' // Somnia Purple
    });
    backgroundElements.push({
        type: 'animatedText',
        text: '@0xPaulThomas',
        x: canvas.width * 3.5,
        y: canvas.height * 0.6,
        size: 60,
        parallax: 0.35,
        color: '#00e5ff' // Somnia Cyan
    });
}

// Background ko draw karna
export function drawBackground(ctx, camera, canvas) {
    ctx.fillStyle = '#0d0d1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    frame++;

    backgroundElements.forEach(el => {
        // Parallax effect ke liye calculations
        const drawX = (el.x - camera.x * el.parallax);
        const drawY = (el.y - camera.y * el.parallax);

        ctx.globalAlpha = el.opacity || 1;
        
        if (el.type === 'star') {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(drawX, drawY, el.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (el.type === 'animatedText') {
            const yBob = Math.sin(frame / 40 + el.x) * 20; // Text ko upar-neeche animate karega
            ctx.font = `${el.size}px 'Press Start 2P'`;
            ctx.fillStyle = el.color;
            ctx.textAlign = 'center';
            // Glow effect
            ctx.shadowColor = el.color;
            ctx.shadowBlur = 20;
            ctx.fillText(el.text, drawX, drawY + yBob);
            // Glow effect reset karna zaroori hai
            ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;
    });
}

// Naya PEPE jaisa Player
export function drawPlayer(ctx, player) {
    const x = player.x;
    const y = player.y;
    const w = player.width;
    const h = player.height;
    
    const bodyBob = player.onGround ? Math.sin(frame / 5) * 2 : 0;

    ctx.save();
    ctx.translate(x + w / 2, y + h / 2 + bodyBob);
    
    // Body (Pepe Green)
    ctx.fillStyle = '#39a543';
    ctx.beginPath();
    ctx.ellipse(0, 0, w / 1.5, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(-w/4, -h/3, w/4, 0, Math.PI * 2); // Left Eye
    ctx.arc(w/4, -h/3, w/4, 0, Math.PI * 2);  // Right Eye
    ctx.fill();
    
    // Pupils
    ctx.fillStyle = 'black';
    ctx.beginPath();
    const pupilX = player.facing > 0 ? -w/5 : -w/3;
    ctx.arc(pupilX + w/4, -h/3, w/10, 0, Math.PI * 2); // Left Pupil
    ctx.arc(pupilX + w/1.4, -h/3, w/10, 0, Math.PI * 2); // Right Pupil
    ctx.fill();

    // Player ke upar 'SOMI' naam
    ctx.font = "18px 'Press Start 2P'";
    ctx.fillStyle = "#f0f0f0";
    ctx.textAlign = "center";
    ctx.fillText("SOMI", 0, -h/2 - 30);

    // Player ke pet par 'SOMI'
    ctx.font = "bold 16px 'Press Start 2P'";
    ctx.fillStyle = "white";
    ctx.fillText("SOMI", 0, h/4);
    
    ctx.restore();
}

// === Baaki functions mein koi change nahi ===

export function drawEnemy(ctx, enemy) {
    const x = enemy.x;
    const y = enemy.y;
    const w = enemy.width;
    const h = enemy.height;
    
    const bob = Math.sin((frame + x) / 10) * 4;

    ctx.save();
    ctx.translate(x + w / 2, y + h / 2 + bob);

    // Body
    if (enemy.type === 'shooter') {
        ctx.fillStyle = '#f97316'; // Orange
    } else {
        ctx.fillStyle = '#ef4444'; // Red
    }
    ctx.beginPath();
    ctx.arc(0, 0, w / 2, 0, Math.PI * 2);
    ctx.fill();

    // Spikes (for patrol)
    if(enemy.type === 'patrol') {
        ctx.fillStyle = '#b91c1c';
        for(let i = 0; i < 8; i++) {
            ctx.rotate(Math.PI / 4);
            ctx.fillRect(-5, -h/2 - 5, 10, 10);
        }
    }

    // Eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, w / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(0, 0, w/8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

export function drawPlatform(ctx, p) {
    let color = '#64748b';
    if (p.type === 'moving') color = '#0ea5e9';
    if (p.type === 'falling') color = '#f59e0b';
    
    ctx.fillStyle = color;
    ctx.fillRect(p.x, p.y, p.width, p.height);
    // Top highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillRect(p.x, p.y, p.width, 5);
}

export function drawFlag(ctx, goal) {
    const poleX = goal.x + 10;
    const poleY = goal.y;
    const poleHeight = goal.h || 120;
    
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(poleX, poleY, 10, poleHeight);

    const flagY = poleY + Math.sin(frame / 20) * 10;
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(poleX + 10, flagY);
    ctx.lineTo(poleX + 70, flagY + 20);
    ctx.lineTo(poleX + 10, flagY + 40);
    ctx.closePath();
    ctx.fill();
}

export function drawCoin(ctx, coin) {
    const bob = Math.sin((frame + coin.x) / 8) * 3;
    const size = 30;
    
    ctx.save();
    ctx.translate(coin.x + size/2, coin.y + size/2 + bob);

    ctx.fillStyle = '#facc15'; // Gold
    ctx.beginPath();
    ctx.arc(0, 0, size/2, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(-5, -5, size/4, 0, Math.PI*2);
    ctx.fill();
    
    ctx.restore();
}

export function drawScore(ctx, score, canvas) {
    ctx.font = "24px 'Press Start 2P'";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(`SCORE: ${score}`, 20, 40);
}

export function drawParticles(ctx, particles) {
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 30;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    });
}
