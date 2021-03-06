import React from 'react';
import $ from 'jquery';
import imgRainier from './bin/background-images/rainier.jpg';

class Canvas extends React.Component {
	constructor() {
		super();
		this.updateAnimationState = this.updateAnimationState.bind(this);
		this.state = {
			width: 800,
			height: 600,
			clouds: [],
			counter: 0
		}
	}
	
	componentDidMount() {
		window.addEventListener("resize", this.resetCanvas.bind(this));
		this.initCanvas();
		this.rAF = requestAnimationFrame(this.updateAnimationState)
	}

	// remove event listener for window resize
	componentWillUnmount() {
		window.removeEventListener("resize", this.resetCanvas.bind(this));
		cancelAnimationFrame(this.rAF);
	}
	
	// animation loop
	updateAnimationState() {
		const canvas = this.refs.canvas;
		const img = this.refs.image;
		const ctx = canvas.getContext("2d");

		drawScene(this.state, ctx, img);
		this.rAF = requestAnimationFrame(this.updateAnimationState)
	}

	// inital init of canvas
	initCanvas() {
		const img = this.refs.image;
	
		img.onload = () => {
			this.updateCanvas()
		}
	}

	// update frame when window resizes
	resetCanvas() {
		this.setState({clouds: []});
		this.updateCanvas();
	}

	updateCanvas() {
		const img = this.refs.image;
		const canvas = this.refs.canvas;
		const height = $(window).height() * .6;
		const width = Math.min($(window).width(), img.width);
		const ctx = canvas.getContext("2d");
		var clouds = [];

		// set canvas dimensions
		canvas.height = height;
		canvas.width = width;

		// create randomly generated cloud objects if not already created
		if (this.state.clouds.length === 0) {
			clouds = createClouds(0.3, canvas);
		} else {
			clouds = this.state.clouds
		}

		// update state
		this.setState({ width: width, height: height, clouds: clouds, counter: 1 })
		
		drawScene(this.state, ctx, img);
	}

	render() {
		return (
			<div className="cover-photo">
				<canvas ref="canvas" width={this.state.width} height={this.state.height} data-paper-resize />
				<img ref="image" src={imgRainier} className="hidden" alt="Mt. Rainier" />
			</div>
		)
	}
}

function drawScene(state, context, img) {
	drawImage(state, context, img);
	drawFog(state, context);
}

function drawImage(state, context, img) {
	const width = $(window).width();
	const height = $(window).height() * 0.6;

	// clear canvas
	context.clearRect(0, 0, width, height);

	// calculate x-offset to center image
	// const divisor = Math.max(img.width/width, 1);   // never let width go beyond photo capability
	
	const imgWidth = img.width;
	const imgHeight = img.height;
	const xOffset = Math.min(0, (width - imgWidth) / 2);
	const yOffset = Math.min(0, (height - imgHeight) / 2);
	context.drawImage(img, xOffset, yOffset, imgWidth, imgHeight);
}

// draw fog on canvas
function drawFog(state, context) {
	var colorFog = 238;
	var opacity = 0.25;
	var width = state.width;
	var height = state.height;
	var clouds = state.clouds;
	var counter = state.counter;
	
	// iterate through every cloud
	for (var i = 0; i < clouds.length; i++) {
		var cloud = clouds[i];
		var x_begin = cloud.x;
		var y_begin = cloud.y;
		var cloudPoints = cloud.curvePoints;
		var dx = cloud.dx;

		var x_end = cloudPoints[cloudPoints.length - 1].end_x;

		// start shape draw
		context.fillStyle = "rgba(" + colorFog + ", " + colorFog + ", " + colorFog + ", " + opacity + ")";
		context.beginPath();
		context.moveTo(x_begin, y_begin);

		// draw quadratic curve points, and update the x values
		for (var j = 0; j < cloudPoints.length; j++) {
			var curve = cloudPoints[j];
			var end_x = curve.end_x;
			var end_y = curve.end_y;
			var control_x = curve.control_x;
			var control_y = curve.control_y;

			context.quadraticCurveTo(control_x, control_y, end_x, end_y);
			curve.control_x += dx;
			curve.end_x += dx;
		}

		// fill rest of shape
		context.lineTo(x_end, height);
		context.lineTo(x_begin, height);
		context.closePath();
		context.fill();

		// increment x property of cloud object
		cloud.x += dx;

		// push new cloud points if end of cloud is approaching viewport
		if (x_end > -(width/1440) * 500) {
			var newCloudPoints = createCloudPoints(x_end, cloud.y, width, height);
			cloud.curvePoints = cloudPoints.concat(newCloudPoints);
		}

		// only check for every 10 iterations of counter
		if (counter % 50 === 0) {
			// shift and remove cloud points if past the viewport
			while (cloudPoints.length > 1 && cloudPoints[0].end_x > width + width/14) {
				cloud.y = cloudPoints.shift().end_y;
			}
			// restart counter
			   counter = 1;
		}
		counter++;
	}
}

// creates array of cloud objects
function createClouds(fog_height, canvas) {
	var ctx_width = canvas.width;
	var ctx_height = canvas.height;
	var ratio_x = ctx_width/1440;
	var ratio_y = ctx_height/768;

	// instantiate cloud objects(cloud-points, speed)
	var clouds = [];

	var radians = 0;
	while (radians < Math.PI/2) {
		// y "start" of clouds
		var yStart = ctx_height - (ctx_height * fog_height * (1-ratio_x*0.5)) - (100 * Math.sin(radians) * ratio_y);
		// velocity of cloud
		var velocity = Math.sin((Math.PI / 2) - radians) * ratio_x * 2;
		// genereate random cloud points
		var cloudPoints = createCloudPoints(ctx_width, yStart, ctx_width, ctx_height);
		
		// create cloud object
		var cloud = {
			curvePoints: cloudPoints,
			x: ctx_width,
			y: yStart,
			dx: velocity
		};

		// add cloud to global array
		clouds.push(cloud);	

		radians += Math.PI / 20;
	}
	return clouds;
}

// assign points for curvatures of cloud
function createCloudPoints(x_begin, y_begin, ctx_width, ctx_height) {
	var cloudCurvePoints = [];		// instantiate array of cloud points to return

	var curve_x = x_begin;
	var cloud_length = ctx_width + 500;

	while (curve_x > x_begin - cloud_length) {
		var quadCurvePoints = newCloudPoints(curve_x, y_begin, ctx_width, ctx_height);		// creates object of points used for draw()
		cloudCurvePoints.push(quadCurvePoints);
		curve_x = quadCurvePoints.end_x;
	}

	return cloudCurvePoints;
}

// assign one set of points
function newCloudPoints(curve_x, y_begin, ctx_width, ctx_height) {
	var ratio_w = ctx_width/1440;
	var ratio_y = ctx_height/1000;
	// change in x
	var x_rand = (Math.ceil(Math.random() * 60) + 100) * ratio_w;
	// change in y
	var y_rand = y_begin + ((Math.ceil(Math.random() * 30) - 15) * ratio_y);
	// curve height
	var curveHeight = y_rand - (Math.ceil(Math.random() * 50) * ratio_w);
	
	var x_new = curve_x - x_rand;

	// create object of quadratric curve points
	var quadCurvePoints = {
		control_x: curve_x - (x_rand/2),
		control_y: curveHeight,
		end_x: x_new,
		end_y: y_rand
	}

	return quadCurvePoints;
}

export default Canvas;