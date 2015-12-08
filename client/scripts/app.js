// YOUR CODE HERE:
// var message = {
//   username: 'Liza',
//   text: 'jello',
//   roomname: '4chan'
// };
$(document).ready(function(){
  $('#send').on('click', function(e) {
    e.preventDefault();
    app.handleSubmit();
  })
  $("#fetch").on("click", function(e){
    e.preventDefault();
    app.fetch()
  })
  $('#clear').on('click', function(e) {
    e.preventDefault();
    app.clearMessages()
  })
})


var app = {};

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

app.init= function(){

}

app.handleSubmit = function(){
    var message = { username: "Liza", text : $("#submitText").val() , roomname: "4chan"}
    console.log(message);
    app.send(message)
}

app.send = function(message){
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
}
app.fetch = function(){
  console.log("got here");
  $("#chats").html("");
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: data retrieved', data.results);

       for(var i = 0; i < data.results.length; i++) {
            if(typeof data.results[i].text === "string"){
              var message = { username: data.results[i].username, text: data.results[i].text}
              app.addMessage(message);
            }
          
       }
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to retrieve', data);
      }
    });

};

app.clearMessages = function() {
  $('#chats').html('');
}

app.addMessage = function(message){
  $("#chats").append("<div><a class='username' href ='#'>" + message.username + "</a></span>: " + message.text+ "</div>").on("click", function(){
    app.addFriend();
  });
}
app.addRoom = function(roomname) {
  $('#roomSelect').append('<div>' + roomname + '</div>');
}

app.addFriend = function(){
 // console.log("here");
}




// $(document).ready(function(){
//   $('#submitButton').on('click', function(e){
//     e.preventDefault();
//     message.text = $("#submitText").val();
//     $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//       url: 'https://api.parse.com/1/classes/chatterbox',
//       type: 'POST',
//       data: JSON.stringify(message),
//       contentType: 'application/json',
//       success: function (data) {
//         console.log('chatterbox: Message sent', data);
//       },
//       error: function (data) {
//         // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//         console.error('chatterbox: Failed to send message', data);
//       }
//     });
//   })
// })

