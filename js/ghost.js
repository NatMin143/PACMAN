// ghost.js
export class Ghost {
    static speed = 5;
    constructor({ position, velocity, color }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 16;
        this.color = color;
        this.previousDirection = '';
        this.prevCollisions = [];
    }

    draw(c) {
        // Draw the ghost body (circle)
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();

        const zigzagHeight = 8; // Height of the zigzag peaks
        const zigzagWidth = 5; // Width of each zigzag segment
        const zigzagCount = 5; // Number of zigzag segments

        c.beginPath();
        for (let i = 0; i <= zigzagCount; i++) {
            const xOffset = (i - zigzagCount / 2) * zigzagWidth; // Center the zigzag
            const yOffset = this.radius + (i % 2 === 0 ? zigzagHeight : -zigzagHeight); // Alternate peaks
            c.lineTo(this.position.x + xOffset, this.position.y + yOffset);
        }
        c.lineTo(this.position.x + zigzagCount * zigzagWidth / 2, this.position.y + this.radius); // Close the zigzag at the bottom
        c.lineTo(this.position.x - zigzagCount * zigzagWidth / 2, this.position.y + this.radius); // Back to the starting point
        c.closePath();
        c.fillStyle = this.color;
        c.fill();

        // Draw the eyes
        const eyeRadius = 3; // Radius of the eyes
        const eyeOffsetX = 6; // Horizontal offset from the center
        const eyeOffsetY = 4; // Vertical offset from the center

        // Left eye
        c.beginPath();
        c.arc(this.position.x - eyeOffsetX, this.position.y - eyeOffsetY, eyeRadius, 0, Math.PI * 2);
        c.fillStyle = 'white'; // Eye color
        c.fill();
        c.closePath();

        // Right eye
        c.beginPath();
        c.arc(this.position.x + eyeOffsetX, this.position.y - eyeOffsetY, eyeRadius, 0, Math.PI * 2);
        c.fillStyle = 'white'; // Eye color
        c.fill();
        c.closePath();

        // Draw pupils
        const pupilRadius = 1;
        const pupilOffsetX = 1;

        // Left pupil
        c.beginPath();
        c.arc(this.position.x - eyeOffsetX, this.position.y - eyeOffsetY, pupilRadius, 0, Math.PI * 2);
        c.fillStyle = 'black';
        c.fill();
        c.closePath();

        // Right pupil
        c.beginPath();
        c.arc(this.position.x + eyeOffsetX, this.position.y - eyeOffsetY, pupilRadius, 0, Math.PI * 2);
        c.fillStyle = 'black';
        c.fill();
        c.closePath();
    }

    update(c) {
        this.draw(c);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}