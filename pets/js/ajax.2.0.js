function ajaxGet(url,data){
    data = data || {};
    var str = "";
    for(var i in data){
        str = str + i + "=" + data[i] + "&";
    }
    var d = new Date();
    url = url + "?" + str + "_qqqz" + d.getTime();

    var p = new Promise(function(success,error){
        var ajax = new XMLHttpRequest();
        ajax.open("get",url);
        ajax.onreadystatechange = function(){
            if(ajax.readyState ==4 && ajax.status ==200){
                success(ajax.responseText);
            }else if(ajax.readyState == 4 && ajax.status != 200){
                error(ajax.status);
            }
        }
        ajax.send(null);
    })
    return p;
}

function ajaxPost(url,data){
    data = data ? data : {}
    var str ="";
    for(var i in data){
        str = str + i+ "=" + data[i] + "&";
    }
    
    var p = new Promise(function(success,error){
        var ajax = new XMLHttpRequest();
        ajax.open("post",url);//自己加的，对吗？
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                success(ajax.responseText);
            }else if(ajax.readyState == 4 && ajax.status !=200){
                error(ajax.status);
            }
        }
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(str.slice(0,str.length-1));
    })
    return p;
}
// var p = ajaxPost(url,{});
// p.then(function(){
// },function(){
// })
// ajaxPost(url,{}).then(function(){},function(){})


function jsonp(url,data){
    var str = "";
    for(var i in data){
        str = str + i + "=" + data[i] + "&";
    }
    var d = new Date();
    url = url + "?" + str + "_qqqz" + d.getTime();

    var script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script)

    var p = new Promise(function(success){
        
        window[data[data.column]] = function(res){
            success(res);
        }
    })
    return p;
}
// jsonp(url,{}).then(function(){},function(){})
