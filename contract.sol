pragma solidity ^0.4.20;

contract userAccount{
    struct User{
        string name;
        string email_id;
        string mob_no;
        string username;
        string[] contents;
    }
    bool success = false;
    User[] public users;
    mapping(string => uint) usernameToAccount;
    mapping(string => address) usernameToAddress;
    mapping(string => address) usernameTopassword;
    mapping(string => bool) uniqueEmail;
    mapping(address => bool) uniqueAddress;
    mapping(address => uint) addressToAccount;
    
    modifier authenticate(string username, address pwd){
        require(usernameTopassword[username] == pwd);
        _;
    }
    
    modifier existUsename(string username){
        require(usernameToAddress[username] == address(0));
        _;
    }
    
    modifier existemail(string email){
        require(uniqueEmail[email] == false);
        _;
    }
    
    modifier existAddress(){
        require(uniqueAddress[msg.sender] == false);
        _;
    }
    
    function registerUser(string name, string email_id, string mob_no, string username, string password) public existUsename(username) existAddress() existemail(email_id){
        address password1 = address(keccak256(password));
        string[] arr;
        uint id = users.push(User(name, email_id, mob_no, username, arr ))-1;
        usernameToAccount[username] = id;
        addressToAccount[msg.sender] = id;
        usernameTopassword[username] = password1;
        usernameToAddress[username] = msg.sender;
        uniqueEmail[email_id] = true;
        uniqueAddress[msg.sender] = true;
    }
    
    function noOfUsers() public view returns (uint){
        return users.length;
    }
    
    function changeContents(string contents) public {
        users[addressToAccount[msg.sender]].contents.push(contents)-1;
    }
    
    function getContents(string user, uint number) public view returns(string){
        return users[usernameToAccount[user]].contents[number];
    }
}
