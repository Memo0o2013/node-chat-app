let socket = io();


function scrollToBottom () {
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');

    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    };
};

socket.on('connect' , function ()  {
    console.log('Connected to Server');

});

socket.on('disconnect' , function ()  {
    console.log('Disconnected from Server');
});

socket.on('newMessage' , function(message) {
    let formattedMessage = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template , {
        text: message.text,
        from: message.from,
        createdAt: formattedMessage
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage' , function(message) {
    let formattedMessage = moment(message.createdAt).format('h:mm a');

    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template , {
        from: message.from,
        url: message.url,
        createdAt: formattedMessage
    });

    jQuery('#messages').append(html);
    scrollToBottom();
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