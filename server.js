var express=require('express');

var application=express();
application.use(express.static("public"));
application.listen("4000",function () {
    console.log('Application Running at Port 4000');
});