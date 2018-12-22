let socket = io();

socket.on('connect' , function ()  {
    console.log('Connected to Server');

});

socket.on('disconnect' , function ()  {
    console.log('Disconnected from Server');
});

socket.on('newMessage' , function(message) {
    let formattedMessage = moment(message.createdAt).format('h:mm a');
    console.log('newMessage' , message);
    let li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedMessage} : ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage' , function(message) {
    let formattedMessage = moment(message.createdAt).format('h:mm a');
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} ${formattedMessage}: `);
    a.attr('href' , message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit' , function (e) {
    e.preventDefault();
    let messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage' , {
        from: "Memo0o",
        text: messageTextBox.val()
    } , function () {
        messageTextBox.val('')
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click' , function () {
    if(!navigator.geolocation) return alert('your browser is old.');

    locationButton.attr('disabled' , 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createMessageLocation' , {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    } , function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
});