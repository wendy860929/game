class Smokesystem{
    constructor(x,y){
        this.x=x;
        this.y=y
        this.life=500;
        this.smokes=[];
    }
    update(){
        this.life--;
        this.smokes.push(new Smoke(this.x,this.y))
        for(let i=0;i<this.smokes.length;i++){
            let die=this.smokes[i].update();
            if(die){
                this.smokes.splice(i,1)
                i--
            }
        }
        return this.life<=0
    }
    render(){
        //console.log("render");
        for(let i=0;i<this.smokes.length;i++){
            this.smokes[i].render();
        }
    }
}
class Smoke{
    constructor(x,y){
        this.x=x,
        this.y=y,
        this.vx=Math.random()*1-0.5  //-0.5~0.5
        this.vy=Math.random()*1.5-2  //-.05~-2
        this.size=15
        this.alpha=1  //透明度
        //思考有哪些必要的條件寫起來放等等調
    }
    update(){
        this.x+=this.vx;
        this.y+=this.vy;
        this.size+=0.35;
        this.alpha-=0.003;
        if(this.alpha<=0){
            this.alpha=0
        }
        return this.y<-100 || this.alpha<=0;
    }
    render(){
        ctx.globalAlpha=this.alpha;  //0~1  0最透明
        ctx.drawImage(smokeImage,
            this.x-this.size/2,this.y-this.size/2,this.size,this.size)
    }
}