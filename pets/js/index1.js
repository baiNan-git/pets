(function(){
    class account{
        constructor(){
            this.out = document.querySelector(".out");
            this.int = document.querySelector(".int");
            this.intShop = document.querySelector(".shop");
            this.getCookie();
            this.addEvent();
        }
        getCookie(){
           
            if(getCookie("user") && getCookie("pass")){
                this.out.style.display = "block";
                this.int.style.display = "none";
            }else{
                this.out.style.display = "none";
                this.int.style.display = "block";
            }
        }
        addEvent(){
            let that = this;
            this.out.onclick = function(){
                setCookie("user",1,{expires:-1});
                setCookie("pass",1,{expires:-1});
                // location.href = "http://localhost:7666/index.html";
                that.getCookie();
            }
            this.intShop.onclick = function(){
                if(getCookie("user") && getCookie("pass")){
                    location.href = "http://localhost:7666/shopCar.html";
                }else{
                    location.href = "http://localhost:7666/login.html";
                }
            }
        }
    }
    
    new account();

})();