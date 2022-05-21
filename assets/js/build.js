


function build()
{




_("tb_dashboard").innerHTML = `<h1>Build</h1>

<h3>Info</h3>
<h4>Builder : Pkg</h4>
<h4>Nodejs Version : ${process.version}</h4>
<h4>ip de l'Host Anell <input type="text" id="ip_host" value="${ipa.address()}"></h4><br>
<div id="xterm-conteneur"></div>

`;





}


function build_js()
{
al = 0;
  var log;


_("status").innerHTML = "Starting socket for build";

var ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});
term = new Terminal({cols : 130, rows : 31});    
term.open(_("xterm-conteneur"))


if(!fs.existsSync(basepath + "temp")) fs.mkdirSync(basepath + "temp");



if(!fs.existsSync(basepath + "temp/build.js")) fs.copySync("client/client.js" ,basepath + "temp/client.js");
if(!fs.existsSync(basepath + "temp/package.json")) fs.copySync("client/package.json" ,basepath + "temp/package.json");
if(!fs.existsSync(basepath + "temp/package-lock.json")) fs.copySync("client/package-lock.json" ,basepath + "temp/package-lock.json");
if(!fs.existsSync(basepath + "temp/end.bat")) fs.copySync("client/end.bat" ,basepath + "temp/end.bat");





clientjscontent = fs.readFileSync("client/client.js", "utf8");
clientjscontent = clientjscontent.replace("@<HOST_ANELL_IP@", _("ip_host").value);
if(fs.existsSync(basepath + "temp/client.js")) fs.unlinkSync(basepath + "temp/client.js")

fs.writeFileSync(basepath + "temp/client.js", clientjscontent);

ptyProcess.write("cd " + basepath + `temp/; npm i ; pkg client.js ; .\\end.bat \r`);

ptyProcess.on("data", (data)=> {
  log += data
  
  
  
 if(data.includes("Finish Build[] Anell Detect end"))
 {

if(fs.existsSync(basepath + "temp/client-win.exe") && fs.existsSync(basepath + "temp/client-linux") && fs.existsSync(basepath + "temp/client-macos") && al == 0)
{
al = 1;


  alert("Finish Build Successfully");
  var zip = new AdmZip();
  if(fs.existsSync("client.zip")) fs.unlinkSync("client.zip");

  if(!fs.existsSync(basepath + "temp/out-anell/")) fs.mkdirSync(basepath + "temp/out-anell/");
  if(fs.existsSync(basepath + "temp/out-anell/client.zip")) fs.unlinkSync(basepath + "temp/out-anell/client.zip");

alert("Zipping");




  zip.addFile("client-win.exe", Buffer.from(fs.readFileSync(basepath + "temp/client-win.exe"), "utf8"), "Client windows ");
  zip.addFile("client-linux", Buffer.from(fs.readFileSync(basepath + "temp/client-linux"), "utf8"), "Client Linux ");
  zip.addFile("client-macos", Buffer.from(fs.readFileSync(basepath + "temp/client-macos"), "utf8"), "Client Macos ");



zip.writeZip(basepath + "temp/out-anell/client.zip");
open(basepath + "temp/out-anell/");  

return;
}else
{

}



 }else{ 
  
  
  term.write(data)
 }
  
  
})











}