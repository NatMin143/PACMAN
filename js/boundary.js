export class Boundary {
    static width =  35;
    static height = 35;
    
    constructor({ position, image }) {
        this.position = position;
        this.width = Boundary.width;
        this.height = Boundary.height;
        this.image = image
    }

    draw(c){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
    
}
