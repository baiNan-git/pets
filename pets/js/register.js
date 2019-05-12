

(function(){
    "use strict";

    class Register{
        constructor(){
            this.tel = document.querySelector(".tel");
            this.lbox = document.querySelector(".l-box");
            this.successBox = document.querySelector(".success");
            this.pass = document.querySelector(".pass");
            this.pass2 = document.querySelector(".pass2");
            this.zhu = document.querySelector(".zhu");
            this.t1 = document.querySelector(".t1");
            this.t2 = document.querySelector(".t2");
            this.t3 = document.querySelector(".t3");
            this.t4 = document.querySelector(".t4");

            this.p1 = document.querySelector(".p1");
            this.p2 = document.querySelector(".p2");
            this.p3 = document.querySelector(".p3");

            this.pt1 = document.querySelector(".pt1");
            this.pt2 = document.querySelector(".pt2");
            this.pt3 = document.querySelector(".pt3");
            // console.log(this.tel)

            this.addEvent();
        }
        addEvent(){
            let that = this;
            // console.log(this.tel)
            let tel = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            let pass = /^[a-zA-Z]([A-Z\da-z]){5,20}$/;
            this.tel.onblur = function(){
            //    let str = "1333333333"
            //    console.log(tel.test(str))
               if(that.tel.value==""){
                    that.t1.style.display="block";
                    that.t3.style.display="none";
                    that.t2.style.display="none";
                    that.t4.style.display="none";
               }else{
                   if(tel.test(that.tel.value)){
                    that.t2.style.display="block";
                    that.t1.style.display="none";
                    that.t3.style.display="none";
                    that.t4.style.display="none";
                   }else{
                    that.t1.style.display="none";
                    that.t2.style.display="none";
                    that.t4.style.display="none";
                    that.t3.style.display="block";
                   }
               }
            }
            this.pass.onblur = function(){
                
                if(that.pass.value==""){
                    that.p1.style.display="block";
                    that.p3.style.display="none";
                    that.p2.style.display="none";
               }else{
                   if(pass.test(that.pass.value)){
                    that.p2.style.display="block";
                    that.p1.style.display="none";
                    that.p3.style.display="none";
                   }else{
                    that.p1.style.display="none";
                    that.p2.style.display="none";
                    that.p3.style.display="block";
                   }
               }
            }
            this.pass2.onblur = function(){
                if(that.pass2.value ==""){
                    that.pt1.style.display="block";
                    that.pt2.style.display="none";
                    that.pt3.style.display="none";
                }else{
                    if(that.pass.value == that.pass2.value){
                        that.pt1.style.display="none";
                        that.pt2.style.display="block";
                        that.pt3.style.display="none";
                    }else{
                        that.pt1.style.display="none";
                        that.pt2.style.display="none";
                        that.pt3.style.display="block";
                    }
                }
            }
            this.zhu.onclick = function(){
                if(tel.test(that.tel.value) && pass.test(that.pass.value) && that.pass.value == that.pass2.value){
                    var telValue = that.tel.value;
                    var passValue = that.pass.value;
                    that.setCookie(telValue,passValue);
                }

            }
        }
        setCookie(telValue,passValue){
            this.data = getCookie("data");
            let that = this;
            if(this.data == ""){
                this.data = [{
                    tel:telValue,
                    pass:passValue
                    
                }];
                this.lbox.style.display = "none";
                this.successBox.style.display = "block";
                setInterval(() => {
                    location.href="http://localhost:7666/login.html";
                }, 3000);
            }else{
                this.data = JSON.parse(this.data);
                console.log(this.data)
                let onoff = true;
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].tel == telValue){
                        console.log(1)
                        that.t4.style.display="block";
                        that.t1.style.display="none";
                        that.t2.style.display="none";
                        that.t3.style.display="none";
                        onoff = false;
                        break;
                    }
                }
                if(onoff){
                    this.data.push({
                        tel:telValue,
                        pass:passValue
                    })
                    this.lbox.style.display = "none";
                    this.successBox.style.display = "block";
                    setInterval(() => {
                        location.href="http://localhost:7666/login.html";
                    }, 3000);
                }
            }

            setCookie("data",JSON.stringify(this.data),{expires:3});
        }
    }

    new Register();

})();