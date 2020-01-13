// Canvas Setup
let canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	dpi,
	w,
	h,
	particles = [],
	maxParticles = 100,
	radius = 5;

const Tau = Math.PI * 2,
	  ConnectionDist = 100,
      Msqrt = Math.sqrt,
      Mrandom = Math.random;

function handleResize(){

	dpi = window.devicePixelRatio;

	w = ctx.canvas.width = window.innerWidth*dpi;
	h = ctx.canvas.height = window.innerHeight*dpi;
}
window.onresize = () => handleResize();
handleResize();

function createParticles() {
	let vRange = 2,
		vModifier = .5;
	for (let i = 0; i < maxParticles; i++) {
		particles.push({
			x: Mrandom() * w - radius,
			y: Mrandom() * h - radius,
			xv: Mrandom() * vRange - vModifier,
			yv: Mrandom() * vRange - vModifier,
			strokeColour: {h:0, s:1}
		});
	}
}

function update() {
	let p;
	for (let loop = particles.length, i = 0; i < loop; i++) {
		p = particles[i];
		// move
		p.x += p.xv;
		p.y += p.yv;
		// keep in bounds
		if (p.x < 0) {
			p.x = 0;
			p.xv *= -1;
		}
		else if (p.x > w) {
			p.x = w;
			p.xv *= -1;
		}
		if (p.y < 0) {
			p.y = 0;
			p.yv *= -1;
		}
		else if (p.y > h) {
			p.y = h;
			p.yv *= -1;
		}
	}
}

function connect(){
	let p1, p2;
	for (let i = 0; i < maxParticles-1; i++) {
		for (let j = i + 1; j < maxParticles; j++) {
			p1 = particles[i];
			p2 = particles[j];
			currentDist = dist(p2.x, p1.x, p2.y, p1.y);
			if (currentDist < ConnectionDist) {
				ctx.beginPath();
				ctx.moveTo(p1.x, p1.y);
				ctx.strokeStyle = 'hsla('+p1.strokeColour.h+', '+p1.strokeColour.h+'%, 15%, ' + (1 - currentDist * 0.01) + ')';
				// ctx.strokeStyle = p1.fillColour;
				ctx.lineTo(p2.x, p2.y, p1.x, p1.y);
				ctx.stroke();
			}
		}
	}
}

function draw() {
	let p, d;
	for (let loop = particles.length, i = 0; i < loop; i++) {
		p = particles[i];
		d = dist(0,p.x, 0,p.y);
		p.fillColour = 'hsla(' + d + ' , ' + (d * .1) + '%, 30%, 1)';
		p.strokeColour = {h:d, s:(d*.01)};
		ctx.beginPath();
		ctx.fillStyle = p.fillColour;
		ctx.arc(p.x, p.y, radius, 0, Tau);
		ctx.fill();
	}
}

function dist(x1, x2, y1, y2) {
	let a = x1 - x2,
		b = y1 - y2;
	return Msqrt(a * a + b * b);
}

function animate() {
	canvas.width = w;
	update();
	connect();
	draw();
    requestAnimationFrame(animate);
    
	ctx.fillStyle = "#FFFFFF";
	ctx.textBaseline = 'middle'; 
	ctx.textAlign = 'center';
	
	if(window.innerWidth <= 768){
		ctx.font = window.innerWidth / 10 + 'px Ubuntu';
	}else if(window.innerWidth > 768 && window.innerWidth <= 1024){
		ctx.font = window.innerWidth / 12 + 'px Ubuntu';
	}else{
		ctx.font = window.innerWidth / 20 + 'px Ubuntu';
	}
    
	ctx.fillText('Casimir Rönnlöf', w/2, h/2);
	
	if(window.innerWidth <= 768){
		ctx.font = window.innerWidth / 20 + 'px Ubuntu';
	}else if(window.innerWidth > 768 && window.innerWidth <= 1024){
		ctx.font = window.innerWidth / 27 + 'px Ubuntu';
	}else{
		ctx.font = window.innerWidth / 60 + 'px Ubuntu';
	}

	ctx.fillText('I like math and programming', w/2, h/1.75);
}

createParticles();
animate();