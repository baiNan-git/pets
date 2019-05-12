;(function(){

    class Car{
        constructor(){
            this.list = document.querySelector(".shop_list");
            this.list1 = document.querySelector(".shop_list .list1");
            this.wu = document.querySelector(".wu");
            this.url = "http://localhost:7666/js/data.json";

            this.init();
            this.addEvent();

        }
        init(){
            
            
            let that = this;
            ajaxGet(this.url).then(function(res){
                that.res = JSON.parse(res);
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
                    if(this.res[i].goodsId==this.goods[j].id){
                        str +=`<div class="list1" index="${this.goods[j].id}">
                                    <input class="check" type="checkbox">
                                    <img class="imgs" src="${this.res[i].img}" alt="">
                                    <a class="user" href="#">${this.res[i].name}</a>
                                    <span class="price">${this.res[i].price}</span>
                                    <input class="num" type="number" min="1" value="${this.goods[j].num}">
                                    <span class="money">${this.res[i].price}</span>
                                    <button class="delete">删除</button>
                                </div>`;
                    }
                    this.list.innerHTML = str;
                }
                console.log(this.list.innerHTML)
                if(this.list.innerHTML){
                    console.log(1);
                    this.wu.style.display="none";
                }else{
                    this.wu.style.display="block";
                }
            }
        }
        addEvent(){
            let that = this;
            this.list.addEventListener("input",function(eve){
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                if(target.className == "num"){
                    that.num = target.value;
                    that.id = target.parentNode.getAttribute("index");

                    that.changeCookie(function(i){
                        that.goods[i].num = that.num;
                    })
                }
            });

            this.list.addEventListener("click",function(eve){
                let e = eve || window.event;
                let target = e.tarfet || e.srcElement;
                if(target.className == "delete"){
                    that.id = target.parentNode.getAttribute("index");
                    target.parentNode.remove();

                    that.changeCookie(function(i){
                        that.goods.splice(i,1);
                    })
                }
                that.display();
            })
        }
        changeCookie(callback){
            for(var i=0;i<this.goods.length;i++){
                if(this.goods[i].id == this.id){
                    callback(i);
                }
            }
            setCookie("goods",JSON.stringify(this.goods));
        }


    }
    
    new Car();

})();