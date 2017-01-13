var socket = io('//localhost:3000');
var Href = "http://localhost:3000"
socket.on('init', function (data) {
	console.log(data);
	console.log(JSON.parse(data).text);
	var url = location.href;
	var temp = url.split('?');
	var temp2 = temp[1].split('=');
	console.log("token="+temp2[1]);
	socket.emit('init ack');
	socket.emit('init', JSON.stringify({token:temp2[1]}));
	load_friends();
});


socket.on('message', function (data) {
	console.log(data);
	socket.emit('message ack');
});
function select_friend(id){
	console.log(id);
	var tmp = document.location.href;
	var tmp2 = tmp.replace("index","chat")+"&friendID="+id;
	console.log(tmp2);
	document.location.href=tmp2;
}
function load_friends(){
	var list = [{name:"A", id:"a"},{name:"B", id:"b"},{name:"C", id:"c"}];
	friend_list = document.getElementById("friend_list");
	var tmp = "";
	for (var i in list){
		tmp = tmp + "<li id=\""+list[i].id+"\" onclick=\"select_friend(this.id)\">"+list[i].name+"</li>\n"
	}
	friend_list.innerHTML=tmp;
}

