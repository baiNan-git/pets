;(function(){
    "use strict";
    class Shopdata{
        constructor(){
            this.bbbox = document.querySelector(".data .margin");
            this.url = "http://localhost:7666/js/data.json";

            

            this.init();
            
        }
        init(){
            let that = this;
            ajaxGet(this.url).then(function(res){
                // console.log(res);
                that.res = JSON.parse(res);
                // console.log(that.res)
                that.getCookie();
            })
        }
        getCookie(){
            this.goods = getCookie("goods")!="" ? JSON.parse(getCookie("goods")) : [];
            this.display();
        }
        display(){
            let str = "";
            for(var i=0;i<this.res.length;i++){
                for(var j=0;j<this.goods.length;j++){
                    if(this.res[i].goodsId==this.goods[j].id1){
                        str +=`<div class="data_t" index="${this.goods[j].id1}">
                        <div class="data_t1">
                            <div class="loupe">
                                <img class="lu" src="${this.res[i].img}" alt="">
                                <span></span>
                            </div>
                            <div class="loupe_b"> 
                                <img src="${this.res[i].img}" alt="">
                            </div>
                            <div class="imgs">
                                <img src="${this.res[i].img}" alt="">
                                <img src="${this.res[i].img}" alt="">
                                <img src="${this.res[i].img}" alt="">
                                <img src="${this.res[i].img}" alt="">
                                <img src="${this.res[i].img}" alt="">
                            </div>
                        </div>
                        <div class="data_t2">
                            <h3 class="name_this">${this.res[i].name}</h3>
                            <p class="fest">[1.1-12-31]节日充500送50，领券最高立减230元！</p>
                            <div class="money">
                                <p class="p1"><span class="s1">价格：</span><span class="price">${this.res[i].price}</span></p>
                                <p class="p2"><span class="s1">原价:</span><s class="price_s">￥88.8</s></p>
                                <p class="p3"><span class="s1">活动：</span><span class="price_y">已优惠￥22.2元</span></p>
                            </div>
                            <div class="infor">
                                <p class="p1">
                                    <span>颜色：</span>
                                    <img src="images/f1.jpg" alt="">
                                    <img src="images/f2.jpg" alt="">
                                    <img src="images/f5.jpg" alt="">
                                </p>
                                <div class="p2">
                                    <span class="p2_s">尺码：</span>
                                    <p class="p2_s1">
                                        <span class="te">S-小号：20*20*4</span>
                                        <span>L-大号：40*40*4</span>
                                    </p>
                                </div>
                                <div class="p3">
                                    <span class="num_1">购买数量：</span>
                                    <p class="num_2">
                                        <span>-</span>
                                        <input type="text" value="1">
                                        <span>+</span>
                                    </p>
                                </div>
                                <div class="car">
                                    <button class="btn1">立即购买</button>
                                    <button class="btn2">加入购物车</button>
                                </div>
                            </div>
                        </div>
                        <div class="data_t3"></div>
                    </div>`;
                    }
                    this.bbbox.innerHTML = str;
                }
            }
            this.t1Box = document.querySelector(".data_t1");
            this.sBox = document.querySelector(".loupe");
            this.span = document.querySelector(".loupe span");
            this.sImg = document.querySelector(".loupe img");
            this.bBox = document.querySelector(".loupe_b");
            this.bImg = document.querySelector(".loupe_b img");
            // console.log(this.t1Box)
            this.addEvent();
        }
        addEvent(){
            let that = this;
            this.sBox.onmouseover = function(){
                that.show();
                this.onmousemove = function(eve){
                    var e = eve || window.event;
                    that.move({
                        x:e.pageX - (this.offsetLeft + this.parentNode.offsetLeft),
                        y:e.pageY - (this.offsetTop + this.parentNode.offsetTop)
                    })
                }
            }
            this.sBox.onmouseout = function(){
                that.hide();
            }
            
        }
        show(){
            // console.log(1)
            this.span.style.display = "block";
            this.bBox.style.display = "block";
            this.sImg.style.opacity = 0.6;

        }
        hide(){
            this.span.style.display = "none";
            this.bBox.style.display = "none";
            this.sImg.style.opacity = 1;
        }
        move(pos){
            // console.log(pos.x)
            let l = pos.x - this.span.offsetWidth/2;
            let t = pos.y - this.span.offsetHeight/2;
            if(l<0) l=0;
            if(t<0) t=0;
            (l>this.sBox.offsetWidth - this.span.offsetWidth) &&
            (l=this.sBox.offsetWidth - this.span.offsetWidth);

            (t>this.sBox.offsetHeight - this.span.offsetHeight) &&
            (t=this.sBox.offsetHeight - this.span.offsetHeight);

            this.span.style.left = l + "px";
            this.span.style.top = t + "px";

            var x = l/(this.sBox.offsetWidth-this.span.offsetWidth);
            var y = t/(this.sBox.offsetHeight-this.span.offsetHeight);
            
            this.bImg.style.left = -x * (this.bImg.offsetWidth-this.bBox.offsetWidth) + "px";
            this.bImg.style.top = -y * (this.bImg.offsetHeight-this.bBox.offsetHeight) + "px";
        }
    }

    new Shopdata();




})();