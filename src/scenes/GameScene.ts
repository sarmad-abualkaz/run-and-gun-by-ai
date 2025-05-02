import { Player } from '../objects/Player';
import { Bullet } from '../objects/Bullet';

export class GameScene extends Phaser.Scene {
    private player!: Player;
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private score: number = 0;
    private isPaused: boolean = false;

    // UI elements
    private healthText!: Phaser.GameObjects.Text;
    private ammoText!: Phaser.GameObjects.Text;
    private scoreText!: Phaser.GameObjects.Text;
    private pauseMenu!: Phaser.GameObjects.Container;

    // Bullet group and shooting
    private bullets!: Phaser.GameObjects.Group;
    private spaceKey!: Phaser.Input.Keyboard.Key;
    private lastShootTime: number = 0;
    private shootDelay: number = 250; // Minimum time between shots in milliseconds

    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Set up background
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000033).setOrigin(0);

        // Create platforms
        this.platforms = this.physics.add.staticGroup();
        
        // Ground platform
        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
        
        // Additional platforms
        this.platforms.create(600, 400, 'platform');
        this.platforms.create(200, 300, 'platform');
        this.platforms.create(500, 200, 'platform');
        this.platforms.create(100, 150, 'platform');
        
        // Create player
        this.player = new Player(this, 100, 450);

        // Set up collisions
        this.physics.add.collider(this.player, this.platforms);

        // Create bullet group
        this.bullets = this.add.group({
            classType: Bullet,
            runChildUpdate: true
        });

        // Set up controls
        if (this.input && this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
            this.input.keyboard.on('keydown-ESC', () => this.togglePause());
            this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        }
        
        // Set up UI
        this.createHUD();
        this.createPauseMenu();
    }

    update() {
        if (this.isPaused) return;

        // Player movement and direction handling
        if (this.cursors && this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.setDirection('left');
        } else if (this.cursors && this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.setDirection('right');
        } else {
            this.player.setVelocityX(0);
        }

        // Jump
        if (this.cursors && this.cursors.up.isDown) {
            this.player.jump();
        }

        // Dash
        if (this.cursors && this.cursors.shift.isDown) {
            this.player.dash(this.cursors.right.isDown ? 'right' : 'left');
        }

        // Shooting
        if (this.spaceKey && this.spaceKey.isDown) {
            const currentTime = this.time.now;
            if (currentTime - this.lastShootTime >= this.shootDelay) {
                this.shoot();
                this.lastShootTime = currentTime;
            }
        }

        // Update HUD
        this.updateHUD();
    }

    private createHUD() {
        this.healthText = this.add.text(16, 16, 'Health: 100', { fontSize: '24px', color: '#ffffff' });
        this.ammoText = this.add.text(16, 48, 'Ammo: 30', { fontSize: '24px', color: '#ffffff' });
        this.scoreText = this.add.text(16, 80, 'Score: 0', { fontSize: '24px', color: '#ffffff' });
    }

    private updateHUD() {
        const stats = this.player.getStats();
        this.healthText.setText(`Health: ${stats.health}`);
        this.ammoText.setText(`Ammo: ${stats.ammo}`);
        this.scoreText.setText(`Score: ${this.score}`);
    }

    private createPauseMenu() {
        this.pauseMenu = this.add.container(400, 300);
        this.pauseMenu.setDepth(100);
        this.pauseMenu.setVisible(false);

        const bg = this.add.rectangle(0, 0, 400, 300, 0x000000, 0.8);
        const resumeText = this.add.text(0, -50, 'Resume', { fontSize: '32px' })
            .setOrigin(0.5)
            .setInteractive();
        const mainMenuText = this.add.text(0, 50, 'Main Menu', { fontSize: '32px' })
            .setOrigin(0.5)
            .setInteractive();

        resumeText.on('pointerdown', () => this.togglePause());
        mainMenuText.on('pointerdown', () => {
            this.togglePause();
            this.scene.start('MainMenuScene');
        });

        this.pauseMenu.add([bg, resumeText, mainMenuText]);
    }

    private togglePause() {
        this.isPaused = !this.isPaused;
        this.physics.pause();
        this.pauseMenu.setVisible(this.isPaused);
    }

    private shoot() {
        if (this.player.shoot()) {
            const direction = this.player.getFacingDirection();
            const offsetX = direction === 'right' ? 20 : -20;
            
            const bullet = new Bullet(this, this.player.x + offsetX, this.player.y);
            this.bullets.add(bullet);
            this.add.existing(bullet);
            this.physics.add.existing(bullet);
            
            // Ensure bullet has no gravity
            const bulletBody = bullet.body as Phaser.Physics.Arcade.Body;
            bulletBody.setAllowGravity(false);
            bulletBody.setGravity(0, 0);
            
            bullet.fire(direction);
        }
    }
}