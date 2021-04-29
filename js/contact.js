document.getElementById('msg').addEventListener('keyup', function() {
    document.getElementById('compteur').innerHTML = msg.value.length;
});