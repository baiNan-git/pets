;(function(){
    "use strict";

    class Login{
        constructor(){
            this.user = document.querySelector(".f1 .user");
            this.pass = document.querySelector(".f2 .pass");
            this.span1 = document.querySelector(".f1 span");
            this.span2 = document.querySelector(".f2 span");
            this.check = document.querySelector(".check");
            this.auto = document.querySelector(".auto");
            this.save = document.querySelector(".save");
            this.btn = document.querySelector(".btn");

            this.getCookie();
        }
        getCookie(){
            this.data = getCookie("data")!="" ? JSON.parse(getCookie("data")) : [];
            // console.log(this.data)
            this.user.value = getCookie("user");
            this.pass.value = getCookie("pass");


            this.addEvent();
        }
        addEvent(){
            let that = this;
            let tel = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            this.user.onblur = function(){
                if(that.user.value==""|| !tel.test(that.user.value)){
                    console.log(1)
                     that.span1.style.display="block";
                }else{
                    that.span1.style.display="none";
                }
             }
            this.btn.onclick = function(){

                for(var i=0;i<that.data.length;i++){
                    if(that.user.value==that.data[i].tel && that.pass.value == that.data[i].pass){
                        if(that.check.checked){
                            that.setCookie();
                        }
                        that.set1Cookie();
                        location.href = "http://localhost:7666/index.html";
                    }else{
                        if(that.user.value!=that.data[i].tel){
                            that.span1.style.display = "block";
                        }
                        if(that.pass.value != that.data[i].pass){
                            that.span2.style.display = "block";
                        }
                    }
                }    
            }
        }
        setCookie(){
            console.log(this.user.value)
            setCookie("user",this.user.value,{expires:3});
            setCookie("pass",this.pass.value,{expires:3});
        }
        set1Cookie(){
            console.log(this.user.value)
            setCookie("user",this.user.value);
            setCookie("pass",this.pass.value);
        }
    }

    new Login();


})();