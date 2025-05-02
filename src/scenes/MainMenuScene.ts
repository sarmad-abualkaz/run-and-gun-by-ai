export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        const { width, height } = this.scale;

        // Title
        this.add.text(width / 2, height / 3, 'SPACE RUNNER', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Play button
        const playButton = this.add.text(width / 2, height / 2, 'Play', {
            fontSize: '32px',
            color: '#ffffff'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.scene.start('GameScene');
        })
        .on('pointerover', () => playButton.setTint(0x00ff00))
        .on('pointerout', () => playButton.clearTint());

        // Settings button
        const settingsButton = this.add.text(width / 2, height / 2 + 50, 'Settings', {
            fontSize: '32px',
            color: '#ffffff'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => settingsButton.setTint(0x00ff00))
        .on('pointerout', () => settingsButton.clearTint());
    }
}