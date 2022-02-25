// get token from PEM login
var loginToken = "eyJhbGciOiJIUzI1NiI......";

var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/DataChangeDispatcherMpos", { accessTokenFactory: () => loginToken }).build();

// we could join multiple groups
var groupName = "group123";

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (outgoingMessage) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${outgoingMessage.user} says ${outgoingMessage.message}`;
});

connection.start().then(function () {
    connection.invoke("AddToGroup", {groupName}).then(()=>{
        document.getElementById("sendButton").disabled = false;
    }).catch(function (err) {
        return console.error(err.toString());
    });


}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", {user, message}).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("sendButtonGroup").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessageGroup", {user, message ,groupName}).catch(function (err) {
        return console.error(err.toString());
    });

    event.preventDefault();
});


document.getElementById("sendButtonNotOurGroup").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessageGroupNotOur", {user, message}).catch(function (err) {
        return console.error(err.toString());
    });

    event.preventDefault();
});