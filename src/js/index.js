web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "key",
				"type": "string"
			},
			{
				"name": "contents",
				"type": "string"
			}
		],
		"name": "changeContents",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "email_id",
				"type": "string"
			},
			{
				"name": "mob_no",
				"type": "string"
			},
			{
				"name": "username",
				"type": "string"
			},
			{
				"name": "password",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "string"
			},
			{
				"name": "key",
				"type": "string"
			}
		],
		"name": "getContents",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "noOfUsers",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "users",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "email_id",
				"type": "string"
			},
			{
				"name": "mob_no",
				"type": "string"
			},
			{
				"name": "username",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var address = "0xd66d8a30ea5d88a7d73109a109a49e20ee3a3f03";

const myContract = web3.eth.contract(abi);
var contractInstance = myContract.at(address); 
var counter = 0;
var userAccount;
//console.log(web3.eth.accounts[2])

function transfer_register(){
	location.href="register.html";
}

function registerUser(){
	var x = document.getElementById('register')
	Name = x.elements[0].value;
	Mail = x.elements[1].value;
	Mob = x.elements[2].value;
	username = x.elements[3].value;
	password = "vikram";
	register(Name, Mail, Mob, username);
}

function register(Name, Mail, Mob, username){
	contractInstance.registerUser(
		Name, Mail, Mob, username, password,
		{
            gas: 300000,
            from: web3.eth.accounts[2]
         },
    	(err, result) => {
			if(result != null){
				text = "User "+Name+" registered successfully on Blockchain.";
				alert(text)
				counter++;
			}
			else{
				alert(Name);
			}
		}
	)
}

function userLogin(){
	var x = document.getElementById('login')
	username = x.elements[0].value;
	password = x.elements[1].value;
	login(username, password);
}

function getDetails(){
	var id = document.getElementById('details').elements[0].value;
	id = parseInt(id);
	var text = "";
	var structSize = 4;

	for(let j = 0; j < structSize; j++){
		text += contractInstance.users(id)[j] + "<br/>";
	}

	document.getElementById('userDetails').innerHTML = text;

}

function changeContents(){
	var key = document.getElementById('changeContents').elements[0].value;
	var contents = document.getElementById('changeContents').elements[1].value;
	contractInstance.changeContents(
		key, contents,
		{
            gas: 300000,
            from: web3.eth.accounts[2]
         },
    	(err, result) => {
			if(result != null){
				alert("content "+ contents+ " added successfully")
			}
			else{
				console.log('error')
			}
		}
	)
}

function getContents(){
	var username = document.getElementById('getContents').elements[0].value;
	var key = document.getElementById('getContents').elements[1].value;
	contractInstance.getContents(username, key, (err, result) => {
		if(result != null){
			alert(result)
		}
		else{
			console.log('error')
		}
	})
}
