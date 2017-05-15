abstract class ObjectDefault{
    private bodyBlocks: Array<Rectangle>;

    constructor(bodyBlocks: Array<Rectangle>){
        this.bodyBlocks = bodyBlocks;
     }

    draw(canvas: CanvasManipulator): void{
        this.bodyBlocks.forEach(block => block.draw(canvas.contextCanvas));
    }

    refresh(canvas: CanvasManipulator): void{
        this.draw(canvas);
    }

    selfDestroy(canvas: CanvasManipulator): void{
        this.bodyBlocks.forEach(block => block.selfDestroy(canvas.contextCanvas));
    }

    willCollide(targetObject: ObjectDefault): boolean{
        this.bodyBlocks.forEach(block => {
            targetObject.bodyBlocks.forEach(blockTarget => {
                let distanceX = block.positionX - blockTarget.positionX;
                distanceX = distanceX >= 0 ? distanceX : distanceX * -1;
                if (distanceX >= 0 && distanceX < blockTarget.width) {
                    let distanceY = block.positionY - blockTarget.positionY;
                    distanceY = distanceY >= 0 ? distanceY : distanceY * -1;
                    if (distanceY >= 0 && distanceY < blockTarget.height) {
                        return true;
                    }
                }
            })
        })
        return false; 
    }
}