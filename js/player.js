export class Player {
    static speed = 7;
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 16;
        this.radians = 0.75;
        this.openRate = 0.12;
        this.rotation = 0;
    }

    draw(c) {
        c.save();
        c.translate(this.position.x, this.position.y);
        c.rotate(this.rotation);
        c.translate(-this.position.x, -this.position.y);
        c.beginPath();

        // Draw the mouth opening and closing
        c.arc(this.position.x, this.position.y, this.radius, this.radians, Math.PI * 2 - this.radians);
        
        c.lineTo(this.position.x, this.position.y);
        c.fillStyle = 'yellow';
        c.fill();
        c.closePath();
        c.restore();
    }

    update(c) {
        this.draw(c);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Update radians for mouth opening and closing
        if (this.radians < 0 || this.radians > 0.75) {
            this.openRate = -this.openRate; // Reverse the opening rate
        }
        this.radians += this.openRate; // Adjust radians for mouth animation
    }
}