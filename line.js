
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const b = canvas.getContext('2d');
const gui = new dat.GUI()


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const wave = {
    y: canvas.height / 2,
    length: 0.02,
    amplitude: -15,
    frequency: 0.019
}

gui.add(wave, 'y', 0, canvas.height)
gui.add(wave, 'length', -0.01, 0.01)
gui.add(wave, 'amplitude', -300, 300)
gui.add(wave, 'frequency', 0.01, 1)

let increment = wave.frequency;


function animateLines() {
    requestAnimationFrame(animateLines);
    c.fillStyle = 'rgba(249,247,243, 0.1)'
    c.clearRect(0,0, canvas.width, canvas.height)

    c.beginPath()
    c.moveTo(0, canvas.height / 2)

    function complexWaves(i) {
        y = Math.sin(i * .003 + increment) * wave.amplitude * Math.sin(increment);
        y += Math.sin(i * 0.005 + increment) * 23 * Math.sin(increment/3);
        // y += Math.sin(i * -0.01) * 25 * Math.sin(increment/2)
        // y += Math.sin(i * 0.015) * 11 * Math.sin(increment)
        return y;
    }

    function complexWaves2(i) {
        y = Math.sin(i * 0.005 + increment) * 47 * Math.sin(increment);
        // y += Math.sin(i * 0.03 + increment) * 39 * Math.sin(increment/4);
        y += Math.sin(i * -0.008) * 25 * Math.sin(increment-3)
        y += Math.sin(i * 0.015) * 11 * Math.sin(increment)
        return y;
    }

    for (let i = 0; i < canvas.width; i++ ) {
        let mywave = wave.y / 2 + complexWaves(i);

        c.lineTo(
            i, 
            mywave
        )


     }

    c.strokeStyle = 'hsl(257.76, 61.58%, 60.2%)'
    c.stroke()

    b.beginPath()
    b.moveTo(0, canvas.height / 2 + 50)

    for (let i = 0; i < canvas.width; i++ ) {
        let mywave2 = wave.y / 2 + complexWaves2(i);

        b.lineTo(
            i, 
            mywave2
        )
    }
    b.strokeStyle = 'rgba(48, 188, 237, 100)'
    b.stroke()

    increment += wave.frequency;
}
animateLines();

