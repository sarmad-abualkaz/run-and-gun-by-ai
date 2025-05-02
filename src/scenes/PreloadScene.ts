export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Create temporary graphics for placeholder assets
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x00ff00);
        playerGraphics.fillRect(0, 0, 32, 32);
        playerGraphics.generateTexture('player', 32, 32);
        playerGraphics.destroy();

        const platformGraphics = this.add.graphics();
        platformGraphics.fillStyle(0x888888);
        platformGraphics.fillRect(0, 0, 200, 20);
        platformGraphics.generateTexture('platform', 200, 20);
        platformGraphics.destroy();
    }

    create() {
        this.scene.start('MainMenuScene');
    }
}