function move(ele,json,callback){
    clearInterval(ele.a);
    ele.a = setInterval(() => {
        var onoff = true;
        for(var i in json){
            if( i == "opacity"){
                var iNow = parseFloat(getStyle(ele,i))*100;
            }else{
                var iNow = parseFloat(getStyle(ele,i));
            }
            var speed = (json[i] - iNow)/8;
            speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);
            if(i == "opacity"){
                ele.style[i] = (iNow + speed)/100;
            }else{
                ele.style[i] = iNow + speed + "px";
            }
            if(json[i] != iNow){
                onoff = false;
            }
        }
        if(onoff){
            clearInterval(ele.a);
            callback && callback();
        }
    }, 30);
}

function getStyle(ele,attr){
    if(ele.currendStyle){
        return ele.currendStyle[attr];
    }else{
        return getComputedStyle(ele,false)[attr];
    }
}

