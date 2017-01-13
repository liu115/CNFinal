var url = location.href;
console.log("url="+url);
var tmp = url.split("/");
var token = readCookie("token");
var friend_id = tmp[tmp.length-1];
console.log("token:"+token);
console.log("id:"+friend_id);
var socket = io('//localhost:3000/chat', {to:friend_id});
window.onload = init;
socket.on('init', function (data) {
  console.log(data);
  console.log(JSON.parse(data).text);
  socket.emit('init ack');
});
socket.on('message', function (data) {
  console.log(data);
  socket.emit('message ack');
});
function init(){
	request_history();
	document.getElementById("msgblock").addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode == 13) {
			sendmsg();
		}
	});
}
function request_history(){
	socket.emit('history', JSON.stringify({"to":friend_id, "token":token}), function(data){
		console.log("history"+data);
		var res = JSON.parse(data);
		if(res.success=='true'){
			var ul = document.getElementById("message");
			var list = res.message;
			var tmp = "";
			for(var i in list){
				tmp = tmp + "<li>"+list[i].from+": "+list[i].content+"</li>";
			}
			ul.innerHTML=tmp;
		}else{
			request_history();
		}
	});
}
function sendmsg(){
	var msg_box = document.getElementById("msgblock");
	var msg = msg_box.value;
	if(msg!=""){
		socket.emit('message', JSON.stringify({"token":token, "id":friend_id, "message":msg}), function(){
			msg_box.value="";
			console.log("send");	
		});
	}
}
function readCookie(name) {
	name += '=';
	for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--){
		if (!ca[i].indexOf(name))
			return ca[i].replace(name, '');
	}
}

