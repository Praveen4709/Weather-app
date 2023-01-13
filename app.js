const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const https=require("https");

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    const apikey="e50ac30ab1cb0ca8bd2cb76bb1b961f0";
    const query=req.body.cityname;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric"
    https.get(url,function(response){
        response.on("data",function(data){
            const wetherdata=JSON.parse(data);
            const temp=wetherdata.main.temp
            const icon=wetherdata.weather[0].icon
            const wthdescript=wetherdata.weather[0].description
            const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
           res.write("<p> The weather is currently "+wthdescript+"<p>");
           res.write("<h1> The temperature in "+query+ " is "+temp+" degree celsius</h1>");
           res.write("<img src="+imgurl+" >");
          res.send();
        })
    })
})




app.listen(3000,function(){
    console.log("server is running on 3000")
})