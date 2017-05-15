class FrictionControl{
    haveFriction(objectsScenario: Array<ObjectDefault>, objectMoved: ObjectDefault): boolean{
        let collide = false;
        objectsScenario.forEach(object => {
            collide = object.willCollide(objectMoved);
            if(collide)
                return collide;
        })
        return collide
    }
}