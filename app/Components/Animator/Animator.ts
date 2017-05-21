class Animator{

    private interval: any;
    public miliSecInterval: number;
    public animatedObjects: Array<IMoveAble>;

    constructor(miliSecInterval: number, animatedObjects: Array<IMoveAble>){
        this.miliSecInterval = miliSecInterval;
        this.animatedObjects = animatedObjects;
    }

    public startAnimation(): void{
        this.interval = window.setInterval(this.animate.bind(this), this.miliSecInterval);
    }  

    public stopAnimation(): void{
        window.clearInterval(this.interval);
    }

    private animate(): void{
        this.animatedObjects.forEach(object => {
            object.move();
        });
    }
}