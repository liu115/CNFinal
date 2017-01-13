var socket = io('//localhost:3000');
var Href = "http://localhost:3000"
socket.on('init', function (data) {
	console.log(data);
	console.log(JSON.parse(data).text);
	socket.emit('init ack');
	load_friends();
});


socket.on('message', function (data) {
	console.log(data);
	socket.emit('message ack');
});
window.onload = init;
function init(){
	var url = location.href;
	var Cookie = document.cookie;
	var value = readCookie("token");
	console.log("token="+value);
	socket.emit('init', JSON.stringify({token:value}), function(data){
		console.log("res="+data);
		var res = JSON.parse(data);
		if(res.success=='true'){
			var list = res.friends;
			load_friends(list);
		}else{
			
		}
	});
}
function readCookie(name) {
	name += '=';
	for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--){
		if (!ca[i].indexOf(name))
			return ca[i].replace(name, '');
	}
}

function select_friend(id){
	console.log(id);
	var tmp = document.location.href+"chat/"+id;
	console.log(tmp);
	document.location.href=tmp;
}
function load_friends(list){
	//var list = [{name:"A", id:"1"},{name:"B", id:"2"},{name:"C", id:"3"}];
	friend_list = document.getElementById("friend_list");
	var tmp = "";
	console.log("list="+list);
	for (var i in list){
		tmp = tmp + "<li id=\""+list[i].userId+"\" onclick=\"select_friend(this.id)\">"+list[i].name+"</li>\n"
	}
	friend_list.innerHTML=tmp;
}

