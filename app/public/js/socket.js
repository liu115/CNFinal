var socket = io('//localhost:3000');

socket.on('init', function (data) {
  console.log(data);
  console.log(JSON.parse(data).text);
  socket.emit('init ack');
});


socket.on('message', function (data) {
  console.log(data);
  socket.emit('message ack');
});

function switch_page(index){
	if(index == 0){
		document.location.href="http://localhost:3000/register";
	}else if(index ==1){
		document.location.href="http://localhost:3000/login";
	}else{
		document.location.href="http://localhost:3000/index";
	}
}
function login(account, pswd){
	$.post('/login', { id:account, password:pswd }, function(data){
		console.log("res:"+data);
		switch_page(2);
	});
}
function get_login_info(){
	var account_text = document.getElementById("login_account");
	var password_text = document.getElementById("login_pswd");
	var account = account_text.value;
	var password = password_text.value;
	console.log("account:"+account);
	console.log("pswd:"+password);
	//if permit
	login(account, password);
}
function get_register_info(){
	var account = document.getElementById("register_account").value;
	var pswd = document.getElementById("register_pswd").value;
	var cpswd = document.getElementById("register_cpswd").value;
	console.log("account:"+account);
	console.log("pswd:"+pswd);
	console.log("cpswd:"+cpswd);
	
	if (pswd.valueOf() == cpswd.valueOf()&&cpswd.valueOf()!=""){
		console.log("equals");
		switch_page(1);
	}
}
function select_friend(id){
	console.log(id);
}
function load_friends(){
	var list = ["A","B","C"];
	friend_list = document.getElementById("friend_list");
	var tmp = "";
	for (var i in list){
		tmp = tmp + "<li id=\""+list[i]+"\" onclick=\"enter_chatroom(this.id)\">"+list[i]+"</li>\n"
	}
	friend_list.innerHTML=tmp;
}
