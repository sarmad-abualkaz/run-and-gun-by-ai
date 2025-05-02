export class Player extends Phaser.Physics.Arcade.Sprite {
    private jumpCount: number = 0;
    private isDashing: boolean = false;
    private canDash: boolean = true;
    private dashCooldown: number = 1000; // 1 second
    private health: number = 100;
    private ammo: number = 30;
    private facingDirection: 'left' | 'right' = 'right';
    private directionIndicator: Phaser.GameObjects.Triangle;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set player properties
        this.setCollideWorldBounds(true);
        this.setBounce(0.1);

        // Create direction indicator
        this.directionIndicator = scene.add.triangle(
            x + 20, y,
            0, -8,
            16, 0,
            0, 8,
            0xff0000
        );
        this.directionIndicator.setDepth(1);
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        const body = this.body as Phaser.Physics.Arcade.Body;
        if (body.touching.down) {
            this.jumpCount = 0;
            this.canDash = true;
        }

        // Update direction indicator to always be at the middle height of the player
        const offsetX = this.facingDirection === 'right' ? 20 : -20;
        this.directionIndicator.setPosition(this.x + offsetX, this.y);
        this.directionIndicator.setRotation(this.facingDirection === 'right' ? 0 : Math.PI);
    }

    jump() {
        if (this.jumpCount < 2) {
            this.setVelocityY(-400);
            this.jumpCount++;
        }
    }

    dash(direction: 'left' | 'right') {
        if (!this.canDash || this.isDashing) return;

        this.isDashing = true;
        this.canDash = false;
        
        const dashVelocity = direction === 'left' ? -500 : 500;
        this.setVelocityX(dashVelocity);

        this.scene.time.delayedCall(200, () => {
            this.isDashing = false;
            this.setVelocityX(0);
        });

        this.scene.time.delayedCall(this.dashCooldown, () => {
            this.canDash = true;
        });
    }

    setDirection(direction: 'left' | 'right') {
        this.facingDirection = direction;
        this.setFlipX(direction === 'left');
    }

    getFacingDirection(): 'left' | 'right' {
        return this.facingDirection;
    }

    takeDamage(amount: number) {
        this.health = Math.max(0, this.health - amount);
        return this.health <= 0;
    }

    shoot(): boolean {
        if (this.ammo > 0) {
            this.ammo--;
            return true;
        }
        return false;
    }

    addAmmo(amount: number) {
        this.ammo += amount;
    }

    getStats() {
        return {
            health: this.health,
            ammo: this.ammo
        };
    }
}