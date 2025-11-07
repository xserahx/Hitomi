// src/entities/enemy.js
PP.entities = PP.entities || {};
PP.entities.enemy = {};

// Funzione per creare i nemici
PP.entities.enemy.create = function(scene, positions) {
    const enemies = [];

    for (let pos of positions) {
        const enemy = scene.add.rectangle(pos.x, pos.y, 40, 60, 0xff0000);
        scene.physics.add.existing(enemy);
        enemy.body.setCollideWorldBounds(true);

        // Parametri realistici per il movimento
        enemy.speed = pos.speed || 80;            // velocità di movimento
        enemy.detectionRange = pos.detection || 250; // distanza di rilevamento
        enemy.deadZone = pos.deadZone || 5;      // zona di inattività vicino al player

        enemies.push(enemy);
    }

    return enemies;
};

// Funzione di update dei nemici
PP.entities.enemy.update = function(scene, enemies, player) {
    for (let enemy of enemies) {
        const dx = player.x - enemy.x;

        // Logica movimento
        if (Math.abs(dx) < enemy.detectionRange) {
            if (dx > enemy.deadZone) {
                enemy.body.setVelocityX(enemy.speed);
            } else if (dx < -enemy.deadZone) {
                enemy.body.setVelocityX(-enemy.speed);
            } else {
                enemy.body.setVelocityX(0);
            }
        } else {
            enemy.body.setVelocityX(0);
        }
    }
};

