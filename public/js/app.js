$(function() {

    var audioContext = new AudioContext();

    var osc = audioContext.createOscillator();
    var gainOsc = audioContext.createGain();
    var isPlaying = false;

    function playOsc() {



        osc.type = "sawtooth";
        osc.frequency.value = Math.floor(Math.random() * (900 - 50 + 1) + 50);;
        osc.detune.value = 0;
        osc.connect(gainOsc);

        gainOsc.gain.value = 1;

        gainOsc.connect(audioContext.destination);

        if (!isPlaying) {
            osc.start(audioContext.currentTime);
            isPlaying = true;
        } else {
            osc.stop(audioContext.currentTime);
            osc = audioContext.createOscillator();
            isPlaying = false;
        }
    }




    var socket = io.connect();



    $(".osc").on("click", function() {
        playOsc();
        socket.emit("server", playOsc())
    })


    socket.on("client", function(data) {
        playOsc()
    })


})