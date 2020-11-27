const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
});



app.post("/",function(req,res){
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;
  const data={
       members:[{
         email_address:email,
         status:"subscribed",
         merge_fields:{
           FNAME:firstname,
           LNAME:lastname
         }
       }]
    };

  const jsonData = JSON.stringify(data);
  const url = "https://us2.api.mailchimp.com/3.0/lists/6b14635a8d";
  const options = {
    method:"POST",
    auth:"kartik:fd3cfa701566b90eea7322aeac003082-us2"

  }
  const request = https.request(url,options,function(response){
   if ( response.statusCode === 200){
     res.sendFile(__dirname+"/success.html");
   }
   else {
     res.sendFile(__dirname+"/failure.html");
   }
   response.on("data",function(data){
    
      console.log(JSON.parse(data));    
    })
  })
  request.write(jsonData);
  request.end();
   
});




app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(4000,function(){
    console.log("Newsletter-Signup started at port 4000");

})