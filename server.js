let http = require("http");

let fs = require("fs");

let url = require("url");

let querystring = require("querystring");

//req是客户端到服务端
//res是服务端到客户端
http.createServer((req,res)=>{
    if(req.url != "/favicon.ico"){
        var objUrl = url.parse(req.url,true);

        console.log(objUrl)
        switch(objUrl.pathname){
            case "/abc":
                ajaxHandle(req,res,objUrl);
                break;
            default:
                readFile(req,res,objUrl.pathname);
                
        }
    }
}).listen("7666","localhost",()=>{
    console.log("服务器开启")
});

function ajaxHandle(req,res,url){
    let data = {};
    let postData = {};
    // get
    let getData = url.query;
    //post
    let str = "";
    req.on("data",(msg)=>{
        str += msg;
    });
    req.on("end",()=>{
        //字符："user=admin&padd=123"
        postData = str;

        data = getData || postData;
    
        data = querystring.parse(data);
    
        var u = data.user;
        var p = data.pass;

        //假装从数据库拿到数据了
        var mysql = [{
            user:"admin",
            pass:"123",
        },{
            user:"root",
            pass:"123456"
        }];

        var onoff =ture;
        mysql.forEach((v,i)=>{
            if(v.user == u && v.pass== p){
                onoff = false;
                res.write("成功")
            }
        })
        if(onoff==true){
            res.write("失败")
        }
        
        res.end();
    })

}


function readFile(req,res,path){
    fs.readFile("./pets"+path,(error,data)=>{
        if(error == null){
            res.write(data);
        }else{
            res.write("404");
        }
        res.end();
    })
}

