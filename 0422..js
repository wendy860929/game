let ga={ //全域資料較好管理
    lib:{},ctx:null, audio:null,
    res:{
        total:4,loaded:0  ,  //我有四個資源 有幾個資源跑完了
        sounds:{
            bullet:"bullet.mp3",explosion:"explosion.mp3"
        },
        imgs:{
            plane:"plane.png",explosion:"explosion.png"
        }
    },
    game:{  //遊戲資料(在遊戲中跑元素)
        id:0,circle:0, //回合數
        particles:null,plane:null,
        key:{
            space:false,left:false,top:false,right:false,bottom:false  //預設我們沒有按住鍵盤
        }
    }
};
// 定義需要用到的類別
ga.lib.Bulletsystem=class{
    constructor(){
      
        this.bullets=[]

    }
    update(){
        if(ga.game.circle%6==0){ //六的倍數的話塞一顆子彈
        this.bullets.push(new ga.lib.Bullet())
        }  //子彈密度低一點
        for(let i=0;i<this.bullets.length;i++){
            let die=this.bullets[i].update()
            if(die){
                this.bullets.splice(i,1)
                i--
            }
        }
    }
    render(){
        for(let i=0;i<this.bullets.length;i++){
            this.bullets[i].render()          
            }
        
    }
}
ga.lib.Bullet=class{
    constructor(){
        this.x=0
        this.y=Math.random*ga.ctx.canvas.height;
        this.vx=Math.random()*1.5+0.5
        this.vy=0
        this.size=1
    }
    update(){
        this.x+=this.vx
        this.y+=this.vy
        return this.x>ga.ctx.canvas.width
    }
    render(){
        ga.ctx.save()
        ga.ctx.fillStyle="white";
        ga.ctx.beginPath()
        ga.ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
        ga.ctx.restore()
    }
    }
ga.lib.Plane=class{
    constructor(){
        this.x=ga.ctx.canvas.width/2;
        this.y=ga.ctx.canvas.height/2;
        this.size=20
    }
    update(){
        let speed=1;   //加了速度就不會因為鍵盤控制保護系統而延遲了 

        let key=ga.game.key
        if(key.space){
            speed*=2
        }
        if(key.left){
            this.x-=speed
        }
        if(key.top){
            this.y-=speed
        }
        if(key.right){
            this.x+=speed
        }
        if(key.bottom){
            this.y+=speed
        }
     
        return false
    }
    render(){
        ga.ctx.save(); //儲存原始canvas的設定  例如畫筆、顏色
        //然後畫飛機
        ga.ctx.drawImage(
            ga.res.imgs.plane,
            this.x-this.size/2, this.y-this.size/2,
            this.size,this.size
        )
        if(ga.game.key.space){  //加小爆炸
            ga.ctx.drawImage(
                ga.res.imgs.explosion,
                this.x-5,this.y+10,
                10,10
            )
        }
        //畫飛機可以改變設定
        //畫完飛機恢復原本的設定
        ga.ctx.restore() //取回上一次的儲存的設定
    }

}