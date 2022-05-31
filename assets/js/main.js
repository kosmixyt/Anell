const fs = require('fs-extra');
const { ipcRenderer } = require('electron')
const ipa = require('ip');
const AdmZip = require('adm-zip');
dist_url = "https://happy-villani.195-154-174-181.plesk.page/anell.json"
const { v4: uuidv4 } = require('uuid');
var readlineSync = require('readline-sync');
var isLocal = require('is-local-ip');
const pathm = require('path-extra');
var ss = require('socket.io-stream');
var pjson = require('./package.json');
const open = require("open");
const child_process = require('child_process');
const os = require('os');
var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
var basepath = os.platform() === 'win32' ? 'C:/' : "/";

if(!fs.existsSync("screen")) fs.mkdirSync("screen");
const electron = require('electron')
const http = require('http');
const { createServer } = require("http");
const { Server } = require("socket.io");
const { buildserver } = require("socket.io");
const client = require("socket.io-client");
const httpServer = createServer();
const pty = require("node-pty");
const io = new Server(httpServer, {});
allow_explore = 0;

document.getElementById("homebtn_div").click();
authorizedscrensocketid = "none"
document.addEventListener('DOMContentLoaded', () => {
});
act = false;
activexterm = "";
const port = 98;
isxterm = false; 

clients = [];


cf = "config.json";
configon = JSON.parse(fs.readFileSync(cf));






io.on("connection", (socket) => {
if(selected_btn == "clientbtn_div") render_array();
client_count();
console.log("client connected")
socket.on("disconnect", () => {
  client_count();
console.log("client disconnected")

if(selected_btn == "clientbtn_div") render_array();

if(socket.id == activexterm) { 

  alert("Xterm Current client disconnected")
  document.getElementById("clientbtn_div").click();
  setTimeout(function(){
    document.getElementById("clientbtn_div").click();
    }, 1000)
  

}

if(socket.id == allow_explore) { 

  alert("File manager Current client disconnected")
  document.getElementById("clientbtn_div").click();
  setTimeout(function(){
  document.getElementById("clientbtn_div").click();
  }, 1000)

}

}) 

socket.on("closewinresult", (data, name) => {
console.log(data, name)
  if(data){

    noty({

      text: 'Sucessfully killed ' + name

    })
  }else
  {
    noty({
      text: 'Successfully killed' + name
  })

}
})

socket.on("res-explorer", (json, error, path) => {
  document.getElementById("manager").innerHTML = "";
console.log("receive data for explorer");
if(socket.id == allow_explore)
{ 
   if(error !== false)
  {
alert("Error : " + error);
return;
  }
if(selected_btn !== ("explorer_" + socket.id))
{

console.log("Wrong File explorer")
return;
}

for(i = 0; i < json.length; i++)

{

if(json[i].type == "directory")
{
toadd = `<div  class="directory"><a href="" onclick="link_browse(event, '${path}', '${json[i].file_name}/')"><img src="./assets/img/folder.svg" class="directory-svg" style="width: 20px; height: 20px;"> ${json[i].file_name}</a>  Size : ${json[i].size}</div>`

}else
{
    toadd = `<div  class="file"><a href="" onclick="event.preventDefault(); downloadfile('${path}', '${json[i].file_name}')"><img src="./assets/img/file.svg" class="file-svg" style="width: 20px; height: 20px;"> ${json[i].file_name} </a>  Size : ${json[i].size} </div>`
}


document.getElementById("manager").innerHTML += toadd



}

}else
{
  console.log("Receiving explore data didn't allowed")
}





})


socket.on("xterm-output", (output) => {
if(socket.id == activexterm)
{
  
  term.write(output);
}else
{
  console.log("Receive data but isnt displayed xterm")
}


})



socket.on("auth", (auuid) => 
{

a = check_auth(auuid);
if(typeof(a) == 'boolean')
{

console.log("Auth failed: for ip : " + socket.request.connection.remoteAddress);
console.log("Quiering Register for " + socket.request.connection.remoteAddress);
socket.emit("need_register");

socket.on("register", (config) => 
{
console.log("Registered Successfully " + socket.request.connection.remoteAddress)
configaddclient(config);
configupdate();
updatesocketid(config.uuid_pc.os, socket.id);
authed(socket);


})

return;

}else
{
console.log("Auth succeeded: for ip : " + socket.handshake.address + " At port " + socket.handshake.port);
configupdate();
updatesocketid(auuid, socket.id);
authed(socket);
}

})











  });







  httpServer.listen(port);
  message = "Server listening on port 3000...";
console.log(message);
status(message)



function authed(socket)
{
  console.log("Authed Creating endpoints")
  id = check_auth_id(socket.id);
  configon.config[id].dynamic = { "machineuptime" : "No data", "scriptuptime" : "No data", "activewin":{ title : "No data"}}
  if(selected_btn == "clientbtn_div") render_array();
  socket.on("dynamic-data", (data) => {

    
    console.log("Receive data");
    id = check_auth_id(socket.id);
     configon.config[id].dynamic = data;
      configupdate();
  if(selected_btn == "clientbtn_div") render_array();
      
      })

    
   ss(socket).on("screenshot-desktop-res", function(img) {
if(authorizedscrensocketid == socket.id)
{
    codeimage = makeid(25);
    fs.writeFileSync("screen/"+ codeimage + ".base64", img);
    selected_btn = "screenshot";
    _("tb_dashboard").innerHTML = `<center><h1>Screenshot of ${socket.id}</h1><br><img style="weight: 50%; height: 50%; border: 5px solid red;" src="data:image/png;base64,${img}"><br><button onclick="more('${socket.id}')">Back</button><br><h2>Download</h2><a download="screen.png" href="data:image/png;base64,${img}">Download</a></center>`;
authorizedscrensocketid = "none"

}else
{
console.log("Not authorized to receive screenshot")

}
    })
    
    
    
  

    













}