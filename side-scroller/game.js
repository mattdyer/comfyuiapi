const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// Game configuration
const config = {
    gravity: 0.5,
    jumpStrength: -12,
    moveSpeed: 3,
    groundLevel: 50,
    canvasWidth: 800,
    canvasHeight: 600
};

// Loading images
const images = {
    player: new Image(),
    zombie: new Image()
};
images.player.src = 'assets/images/player.png';
images.zombie.src = 'assets/images/zombie.png';

let score = 0;
let gameState = 'playing'; // playing, gameover

// Player object
const player = {
    x: 100,
    y: 300,
    width: 50,
    height: 50,
    vx: 0,
    vy: 0,
    isGrounded: false
};

// Enemies
const enemies = [];

// Level configuration
const level = {
    enemies: [
        { x: 600, y: 450, type: 'zombie' },
        { x: 900, y: 450, type: 'zombie' },
        { x: 1300, y: 450, type: 'zombie' },
        { x: 1700, y: 450, type: 'zombie' },
        { x: 2100, y: 450, type: 'zombie' }
    ],
    width: 3000
};

// Input handling
const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

function init() {
    canvas.width = config.canvasWidth;
    canvas.height = config.canvasHeight;
    
    // Initialize enemies
    level.enemies.forEach(enemyData => {
        enemies.push({
            x: enemyData.x,
            y: canvas.height - config.groundLevel - 50,
            width: 50,
            height: 50,
            vx: -2,
            type: enemyData.type,
            isDead: false
        });
    });

}

function update() {
    if (gameState !== 'playing') return;

    // Player movement
    if (keys['ArrowLeft']) {
        player.vx = -config.moveSpeed;
    } else if (keys['ArrowRight']) {
        player.vx = config.moveSpeed;
    } else {
        player.vx = 0;
    }

    // Jump logic
    if (keys['Space'] && player.isGrounded) {
        player.vy = config.jumpStrength;
        player.isGrounded = false;
    }

    player.vy += config.gravity;
    player.x += player.vx;
    player.y += player.vy;

    // Ground collision
    const currentGroundY = canvas.height - config.groundLevel;
    if (player.y + player.height > currentGroundY) {
        player.y = currentGroundY - player.height;
        player.vy = 0;
        player.isGrounded = true;
    }

    // Boundaries
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > level.width) player.x = level.width - player.width;

    // Update enemies
    enemies.forEach(enemy => {
        if (enemy.isDead) return;

        enemy.x += enemy.vx;
        if (enemy.x < 0) enemy.x = 0;

        // Collision detection
        const isColliding = (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        );

        if (isColliding) {
            // Check if player is jumping on top of enemy
            const isHittingFromAbove = player.vy > 0 && 
                                     player.y + player.height < enemy.y + 25 && 
                                     player.y + player.height > enemy.y;

            if (isHittingFromAbove) {
                // Kill enemy
                enemy.isDead = true;
                player.vy = config.jumpStrength * 0.7; // Bounce off enemy
                score += 10;
                scoreElement.innerText = score;
            } else {
                // Player hit by enemy
                gameState = 'gameover';
            }
        }
    });

    // Restart logic
    if (keys['KeyR']) {
        location.reload();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Camera follow
    const cameraX = Math.max(0, Math.min(player.x - canvas.width / 2, level.width - canvas.width));

    ctx.save();
    ctx.translate(-cameraX, 0);

    // Draw Ground
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(0, canvas.height - config.groundLevel, level.width, config.groundLevel);

    // Draw Enemies
    enemies.forEach(enemy => {
        if (!enemy.isDead) {
            if (images.zombie.complete && images.zombie.naturalWidth !== 0) {
                ctx.drawImage(images.zombie, enemy.x, enemy.y, enemy.width, enemy.height);
            } else {
                ctx.fillStyle = 'green';
                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            }
        }
    });
    
    // Draw Player
    if (images.player.complete && images.player.naturalWidth !== 0) {
        ctx.drawImage(images.player, player.x, player.y, player.width, player.height);
    } else {
        ctx.fillStyle = 'red';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    ctx.restore();

    if (gameState === 'gameover') {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '40px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        ctx.font = '24px Courier New';
        ctx.fillText('Press R to restart', canvas.width / 2, canvas.height / 2 + 50);
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

init();
loop();
