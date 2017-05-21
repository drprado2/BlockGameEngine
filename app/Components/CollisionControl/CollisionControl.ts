class CollisionControl{
    willCollide(objectsScenario: Array<ObjectDefault>, objectMoved: ObjectDefault): boolean{
        objectsScenario.forEach(objectScenario => {
            objectScenario.getOnlyCollideBodyBlocks().forEach(blockObjectScenario => {
                objectMoved.getOnlyCollideBodyBlocks().forEach(blockObjectMoved => {
                    let distanceX = blockObjectMoved.positionX - blockObjectScenario.positionX;
                    distanceX = distanceX >= 0 ? distanceX : distanceX * -1;
                    if (distanceX >= 0 && distanceX < blockObjectMoved.width) {
                        let distanceY = blockObjectMoved.positionY - blockObjectScenario.positionY;
                        distanceY = distanceY >= 0 ? distanceY : distanceY * -1;
                        if (distanceY >= 0 && distanceY < blockObjectMoved.height) {
                            return true;
                        }
                    }
                });
            });
        });
        return false; 
    }
}