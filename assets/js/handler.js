function sethandle(){
document.getElementById("docs_link").addEventListener("click", async (event) => {
event.preventDefault();
    open(document.getElementById("docs_link").href);


})

document.getElementById("off_link").addEventListener("click", async (event) => {
    event.preventDefault();
    open(document.getElementById("off_link").href);
    
    })
    
    document.getElementById("github_link").addEventListener("click", async (event) => {
        event.preventDefault();
        open(document.getElementById("github_link").href);
        
        
        })


document.getElementById("homebtn_div").addEventListener("click", function(e) {

    resetstyle();
document.getElementById("homebtn_div").style.backgroundColor = "grey"
home();
selected_btn = "homebtn_div";

})
document.getElementById("clientbtn_div").addEventListener("click", function(e) {

    
    resetstyle();

    document.getElementById("clientbtn_div").style.backgroundColor = "grey"
render_array();
selected_btn = "clientbtn_div";

})


document.getElementById("networkbtn_div").addEventListener("click", function(e) {



    resetstyle();
    document.getElementById("networkbtn_div").style.backgroundColor = "grey"

    selected_btn = "networkbtn_div";

    network();

})
document.getElementById("buildbtn_div").addEventListener("click", function(e) {

    resetstyle();
    document.getElementById("buildbtn_div").style.backgroundColor = "grey"

    selected_btn = "buildbtn_div";
build();

})
document.getElementById("infobtn_div").addEventListener("click", function(e) {

resetstyle();
document.getElementById("infobtn_div").style.backgroundColor = "grey"
selected_btn = "infobtn_div";


})
}

function explore(sid)
{

auth_fm = sid

io.to(sid).emit("explore");


}

sethandle();
function resetstyle()
{
document.getElementById("homebtn_div").style.backgroundColor = "";
document.getElementById("networkbtn_div").style.backgroundColor = "";
document.getElementById("infobtn_div").style.backgroundColor = "";
document.getElementById("buildbtn_div").style.backgroundColor = "";
document.getElementById("clientbtn_div").style.backgroundColor = "";


}

function select_btn(id)
{
resetstyle()

document.getElementById(id).style.backgroundColor = "grey";

selected_btn = id;

}