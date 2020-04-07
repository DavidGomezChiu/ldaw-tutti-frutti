function showToast(message){
    console.log('El mensaje es: '+message);
    $.toast({
        text:message,
        position: 'top-right'
    })
}
window.socket = null;
function connectToSocketIo(){
    let server = window.location.protocol+'//'+window.location.host;
    window.socket = io.connect(server);

    window.socket.on('toast', function(data){
        showToast(data.message);
    });
}

function messageToServer(message){
    window.socket.emit('message-to-server', message)
}

$(function(){
    connectToSocketIo();
})