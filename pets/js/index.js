;(function(){
 "use strict";

    class wheel{
        constructor(){
            this.left = document.querySelector(".wheel .left");
            this.right = document.querySelector(".wheel .right");
            this.img = document.querySelectorAll(".wheel a");
            this.box = document.querySelector(".wheel");
            

            this.index = 0;
            this.iPrve = this.img.length-1;
            this.addEvent();
            this.wheelTime();

        }
        addEvent(){
            let that = this; 
            this.left.onclick = function(){
                that.leftClick();
            }
            this.right.onclick = function(){
                that.rightClick();
            }
            this.box.onmouseover = function(){
                clearInterval(that.timer);
            }
            this.box.onmouseout = function(){
                that.wheelTime();
            }
            
        }
        leftClick(){
            if(this.index==0){
                this.index=this.img.length-1;
                this.iPrve=0;
            }else{
                this.index--;
                this.iPrve = this.index+1;
            }
            this.move(1);
        }
        rightClick(){
            if(this.index==this.img.length-1){
                this.index=0;
                this.iPrve=this.img.length-1;
            }else{
                this.index++;
                this.iPrve = this.index-1;
            }
            this.move(-1);
        }
        move(type){
            this.img[this.iPrve].style.left = 0;
            move(this.img[this.iPrve],{left:this.img[0].offsetWidth * type});

            this.img[this.index].style.left = this.img[0].offsetWidth * -type +"px";
            move(this.img[this.index],{left:0});
        }
        wheelTime(){
            let that = this;
            this.timer = setInterval(() => {
                that.rightClick();
            }, 2000);
        }
    }

    new wheel();


    class Fiery{
        constructor(options){
            this.m2Box = document.querySelector(".main2_box");
            this.m3Box = document.querySelector(".m3_box");
            this.m4Box = document.querySelector(".main4_b .c_t");
            this.num = options.num;
            this.num2 = options.num2;
            this.num3 = options.num3;
            this.url = "http://localhost:7666/js/data.json";
            this.init();
        }
        init(){
            let that =this;
            ajaxGet(this.url).then(function(res){
                that.res = JSON.parse(res);
                console.log(that.res)
                that.display();
            });
        }
        display(){
            let str = "";
            let str1 = "";
            let str2 = "";
            for(var i=0;i<this.num;i++){
               str += `<div class="box_n" index="${this.res[i].goodsId}">
                            <a href="#"><img src="${this.res[i].img}" alt=""></a>
                            <p class="over">${this.res[i].name}</p>
                            <div class="box_b">
                                <span class="s1">${this.res[i].price}</span>
                                <span class="s2">已售6366</span>
                            </div>
                        </div>`;
            }
            this.m2Box.innerHTML = str;
            for(var i=0;i<this.num2;i++){
               str1 += `<div class="main_b" index="${this.res[i].goodsId}">
                            <a class="te" href="#"><img src="${this.res[i].img}" alt=""></a>
                            <div class="imgs">
                                <a href="#"><img src="${this.res[i].img}" alt=""></a>
                                <a href="#"><img src="${this.res[i].img}" alt=""></a>
                            </div>
                        </div>`;
            }
            this.m3Box.innerHTML = str1;
            for(var i=0;i<this.num3;i++){
               str2 += `<div class="box_n" index="${this.res[i].goodsId}">
                            <a href="#"><img src="${this.res[i].img}" alt=""></a>
                            <p class="over">${this.res[i].name}</p>
                            <div class="box_b">
                                <span class="s1">${this.res[i].price}</span>
                                <span class="s2">已售6366</span>
                            </div>
                        </div>`;
            }
            this.m4Box.innerHTML = str2;
        }
    }

    new Fiery({
        num:6,
        num2:3,
        num3:8
    });    
})();