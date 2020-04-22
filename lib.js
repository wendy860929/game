class wall{
    constructor(x){
        this.x=x;
    }
    update(){
        return false;
    }
    render(){
        ctx.fillStyle="blue";
        ctx.fillRect(this.x,0,10,ctx.canvas.height);
        ctx.fillStyle="black"
    }
}
class RectSystem{
    constructor(startX,startY){
        this.startX=startX;
        this.startY=startY;
        this.vx=1
        this.rects=[]
    }
    update(){
        this.startX+=this.vx;
        if(this.startX>=ctx.canvas.width){
            this.vx=-1;
        }else if(this.startX<=0){
            this.vx=1
        }
        this.rects.push(new Rect(this.startX,this.startY))
    
        //更新底下的每一個元件
        for(let i=0;i<this.rects.length;i++){
            let die=this.rects[i].update()
            if(die){
                this.rects.splice(i,1);
                i--
            }
        }

    }
    render(){
        ctx.fillRect(
            this.startX-20,this.startY-20,
            40,40
        )
        for(let i=0;i<this.rects.length;i++){
           this.rects[i].render()
    }
}
}
class Rect{
    constructor(x,y,vx,vy){
        this.x=x;
        this.y=y;
        this.vx=Math.random()*2+1; //0~2
        this.vy=0
    }
    update(){
        this.x+=this.vx;
        this.y+=this.vy;
        this.vy+=0.01  //速度一直加模擬重利加速度
        //回傳true代表可以清除這個物件
        //跑到cansvas外面就可以清除
        return this.x>300  ||this.x<0||
            this.y>ctx.canvas.height || this.y<0;
    }
    render(){
        ctx.fillRect(this.x,this.y,5,5)
    }
}