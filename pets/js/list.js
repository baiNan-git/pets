;(function(){
    "use strict";

    class List{
        constructor(){
            this.bbox = document.querySelector(".goods .margin");
            this.url = "http://localhost:7666/js/data.json";
            this.init();
            this.addEvent();
        }
        init(){
            var that = this;
            ajaxGet(this.url).then(function(res){
                // console.log(res);
                that.res = JSON.parse(res);
                // console.log(that.res);
                that.display();
            })
        }
        display(){
            // href="http://localhost:7666/shopdata.html"
            let str = "";
            for(var i=0;i<this.res.length;i++){
                str +=`<div class="goods_t" index="${this.res[i].goodsId}">
                            <a class="goods_t1" href="http://localhost:7666/shopdata.html"><img class="addd" src="${this.res[i].img}" alt=""></a>
                            <div class="goods_t2">
                                <span>${this.res[i].price}</span>
                                <p><span>0</span>付款</p>
                            </div>
                            <a class="goods_t3" href="#"><span>节日特惠</span>${this.res[i].name}</a>
                            <div class="goods_f">
                                <div class="goods_t4">
                                    <i></i>
                                    <span class="add">加入购物车</span>
                                </div>
                                <div class="goods_t5">
                                    <i></i>
                                    <span>收藏</span>
                                </div>
                            </div>
                        </div>`
            }
            this.bbox.innerHTML = str;
        }
        addEvent(){
            let that = this;
            this.bbox.addEventListener("click",function(eve){
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                if(target.className == "add"){
                    that.id = target.parentNode.parentNode.parentNode.getAttribute("index");

                    that.setCookie();
                }
                if(target.className == "addd"){
                    console.log(target.parentNode.parentNode)
                    that.id = target.parentNode.parentNode.getAttribute("index");
                    that.set1Cookie();
                } 
                 
            });
            
        }
        set1Cookie(){
            
            this.goods = getCookie("goods");
                this.goods = [{
                    id1:this.id
                }];
                console.log(this.goods)
            setCookie("goods",JSON.stringify(this.goods));
    }
        setCookie(){

            this.goods = getCookie("goods");
            console.log(this.id)
            if(this.goods == ""){
                this.goods = [{
                    id:this.id,
                    num:1
                }];
            }else{
                let onoff = true;
                this.goods = JSON.parse(this.goods);
                for(var i=0;i<this.goods.length;i++){
                    if(this.goods[i].id == this.id){
                        this.goods[i].num++;
                        onoff = false;
                        break;
                    }
                }
                if(onoff){
                    this.goods.push({
                        id:this.id,
                        num:1
                    })
                }
            } 
            setCookie("goods",JSON.stringify(this.goods));
        }
    }    
    new List();


})();