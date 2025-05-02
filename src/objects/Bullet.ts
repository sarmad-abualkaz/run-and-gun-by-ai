export class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bullet');

        // Create a simple bullet sprite if it doesn't exist
        if (!scene.textures.exists('bullet')) {
            const graphics = scene.add.graphics();
            graphics.fillStyle(0xffff00);
            graphics.fillCircle(4, 4, 4);
            graphics.generateTexture('bullet', 8, 8);
            graphics.destroy();
        }

        // Disable gravity for the bullet
        if (this.body) {
            (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        }
    }

    fire(direction: 'left' | 'right') {
        const speed = 400;
        const velocityX = direction === 'left' ? -speed : speed;
        this.setVelocityX(velocityX);
        this.setVelocityY(0); // Ensure no vertical movement

        // Destroy bullet after 1 second
        this.scene.time.delayedCall(1000, () => {
            this.destroy();
        });
    }
}