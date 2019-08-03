import React from 'react';
import $ from 'jquery';
import sfImg from './images/sf.jpg';

class Canvas extends React.Component {
	
	
	componentDidMount() {
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext("2d");
		const img = this.refs.image;

		// set canvas dimensions
		canvas.width = $(window).width();
		canvas.height = $(window).height() * .75;

		// create randomly generated cloud objects
		const clouds = createClouds(0.30, canvas);
		
		// counter used for animation
		const counter = 1;

		img.onload = () => {
			// get the scale
			var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
			// get the top left position of the image
			var x = (canvas.width / 2) - (img.width / 2) * scale;
			var y = (canvas.height / 2) - (img.height / 2) * scale;
			ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
			
			drawFog(clouds, counter, ctx, canvas);
		}
	}

	render() {
		return (
			<div className="cover-photo">
				<canvas ref="canvas" width={640} height={425} />
				<img ref="image" src={sfImg} className="hidden" />
			</div>
		)
	}
}

// draw fog on canvas
function drawFog(clouds, counter, context, canvas) {
	console.log(clouds);

	// set opacity and color of clouds
	var colorFog = 238;
	var opacity = 0.25;
	var width = canvas.width;
	var height = canvas.height;

	// iterate through every cloud
	for (var i = 0; i < clouds.length; i++) {
		var cloud = clouds[i];
		var x_begin = cloud.x;
		var y_begin = cloud.y;
		var cloudPoints = cloud.curvePoints;
		var dx = cloud.dx;

		var x_end = cloudPoints[cloudPoints.length - 1].end_x;
		var cloud_length = x_begin - x_end;

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
		if (counter % 50 == 0) {
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