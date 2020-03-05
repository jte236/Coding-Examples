/**
 * @author Jack Teegarden
 * @description Built this as a class project to demeostrate javascript skills
 * this is a space shooting game. you have 100 seconds to hit as many eneimes as possible.
 * 
 * Thomes Woeste: helped me with code
 * 
 * @created Feb 21, 2020
 * @modified Mar 4th, 2020
 * @copyright
 */

/* 
------------------------------
------- INPUT SECTION -------- 
------------------------------
*/

/**
 * This class binds key listeners to the window and updates the controller in attached player body.
 * 
 * @typedef InputHandler
 */
class InputHandler {
	key_code_mappings = {
		button: {
			32: {key: 'space', state: 'action_1'},
			82: {key: 'r', state: 'action_2'}
		},
		axis: {
			68: {key: 'right', state: 'move_x', mod: 1},
			65: {key: 'left', state: 'move_x', mod: -1},
			87: {key: 'up', state: 'move_y', mod: -1},
			83: {key: 'down', state: 'move_y', mod: 1}
		}
	};
	player = null;

	constructor(player) {
		this.player = player;

		// bind event listeners
		window.addEventListener("keydown", (event) => this.keydown(event), false);
		window.addEventListener("keyup", (event) => this.keyup(event), false);
	}

	/**
	 * This is called every time a keydown event is thrown on the window.
	 * 
	 * @param {Object} event The keydown event
	 */
	keydown(event) {
		this.player.raw_input[event.keyCode] = true;
	}

	/**
	 * This is called every time a keyup event is thrown on the window.
	 * 
	 * @param {Object} event The keyup event
	 */
	keyup(event) {
		delete this.player.raw_input[event.keyCode];
	}

	resetController() {
		// reset all buttons to false
		for (let mapping of Object.values(this.key_code_mappings.button)) {
			this.player.controller[mapping.state] = false;
		}

		// reset all axis to zero
		for (let mapping of Object.values(this.key_code_mappings.axis)) {
			this.player.controller[mapping.state] = 0;
		}
	}

	pollController() {
		this.resetController();

		// poll all bound buttons
		for (let [key_code, mapping] of Object.entries(this.key_code_mappings.button)) {
			if (this.player.raw_input[key_code] === true) {
				this.player.controller[mapping.state] = true;
			}
		}

		// poll all bound axis
		for (let [key_code, mapping] of Object.entries(this.key_code_mappings.axis)) {
			if (this.player.raw_input[key_code] === true) {
				this.player.controller[mapping.state] += mapping.mod;
			}
		}
	}
}

/* 
------------------------------
------- BODY SECTION  -------- 
------------------------------
*/

/**
 * Represents a basic physics body in the world. It has all of the necessary information to be
 * rendered, checked for collision, updated, and removed.
 * 
 * @typedef Body
 */
class Body {
	position = {x: 0, y: 0};
	velocity = {x: 0, y: 0};
	size = {width: 15, height: 15};
	//health = 100;

	/**
	 * Creates a new body with all of the default attributes
	 */
	constructor() {
		// generate and assign the next body id
		this.id = running_id++;
		// add to the entity map
		entities[this.id] = this;
	}

	/**
	 * @type {Object} An object with two properties, width and height. The passed width and height
	 * are equal to half ot the width and height of this body.
	 */
	get half_size() {
		return {
			width: this.size.width / 2,
			height: this.size.height / 2
		};
	}

	/**
	 * @returns {Boolean} true if health is less than or equal to zero, false otherwise.
	 */
	isDead() {
		//return this.health <= 0;
		return timeLeftinGame <= 0 ;
	}

	/**
	 * Updates the position of this body using the set velocity.
	 * 
	 * @param {Number} delta_time Seconds since last update
	 */
	update(delta_time) {
		// move body
		this.position.x += delta_time * this.velocity.x;
		this.position.y += delta_time * this.velocity.y;
	}

	/**
	 * This function draws a green line in the direction of the body's velocity. The length of this
	 * line is equal to a tenth of the length of the real velocity
	 * 
	 * @param {CanvasRenderingContext2D} graphics The current graphics context.
	 */
	draw(graphics) {
		graphics.strokeStyle = '#00FF00';
		graphics.beginPath();
		graphics.moveTo(this.position.x, this.position.y);
		graphics.lineTo(this.position.x + this.velocity.x / 10, this.position.y + this.velocity.y / 10);
		graphics.stroke();

	}

	/**
	 * Marks this body to be removed at the end of the update loop
	 */
	remove() {
		queued_entities_for_removal.push(this.id);
	}
}

/**
 * Represents an player body. Extends a Body by handling input binding and controller management.
 * 
 * @typedef Player
 */
class Player extends Body {
	// this controller object is updated by the bound input_handler
	controller = {
		move_x: 0,
		move_y: 0,
		action_1: false
	};
	raw_input = {};
	speed = 10;
	input_handler = null;

	/**
	 * Creates a new player with the default attributes.
	 */
	constructor() {
		super();
		this.timer = 0;
		this.spawn_rate = 0.1;

		// bind the input handler to this object
		this.input_handler = new InputHandler(this);

		// we always want our new players to be at this location
		this.position = {
			x: config.canvas_size.width / 2,
			y: config.canvas_size.height - 100
		};
	}

	/**
	 * Draws the player as a triangle centered on the player's location.
	 * 
	 * @param {CanvasRenderingContext2D} graphics The current graphics context.
	 */
	draw(graphics) {
		graphics.fillStyle = '#ffffff';
		graphics.strokeStyle = '#ffffff';
		graphics.beginPath();
		graphics.moveTo(
			this.position.x,
			this.position.y - this.half_size.height
		);
		graphics.lineTo(
			this.position.x + this.half_size.width,
			this.position.y + this.half_size.height
		);
		graphics.lineTo(
			this.position.x + this.half_size.width/2,
			this.position.y + this.half_size.height
		);
		graphics.lineTo( 
			this.position.x + this.half_size.width/2,
			this.position.y + this.half_size.height/2
		);
		graphics.lineTo(
			this.position.x - this.half_size.width/2,
			this.position.y + this.half_size.height/2
		);
		graphics.lineTo(
			this.position.x - this.half_size.width/2,
			this.position.y + this.half_size.height
		);
		graphics.lineTo(
			this.position.x - this.half_size.width,
			this.position.y + this.half_size.height
		);
		graphics.lineTo(
			this.position.x,
			this.position.y - this.half_size.height
		);
		//graphics.stroke();
		graphics.fill();

		// draw velocity lines
		super.draw(graphics);
	}

	/**
	 * Updates the player given the state of the player's controller.
	 * 
	 * @param {Number} delta_time Time in seconds since last update call.
	 */
	update(delta_time) {

		 if(this.controller.move_y == 0)
		 {
			this.velocity.x = this.speed * this.controller.move_x;
			this.position.x = this.position.x + this.velocity.x;
			this.velocity.x = 0;

		 }
		 else if(this.controller.move_x == 0)
		 {
			 this.velocity.y = this.speed * this.controller.move_y;
			 this.position.y = this.position.y + this.velocity.y;
			 this.velocity.y = 0;
		 }
		 else if(this.controller.move_x == 1 && this.controller.move_y == 1){
			 this.velocity.x = Math.sqrt(this.speed**2 + this.speed**2) * this.controller.move_x;
			 this.velocity.y = Math.sqrt(this.speed**2 + this.speed**2) * this.controller.move_y;
			 this.position.x = this.position.x + this.velocity.x/2;
			 this.position.y = this.position.y + this.velocity.y/2;
			 this.velocity.x = 0;
			 this.velocity.y = 0;
		 }
		 else if(this.controller.move_x == 1 && this.controller.move_y == -1){
			this.velocity.x = Math.sqrt(this.speed**2 + this.speed**2) * this.controller.move_x;
			this.velocity.y = Math.sqrt(this.speed**2 + this.speed**2) * this.controller.move_y;
			this.position.x = this.position.x + this.velocity.x/2;
			this.position.y = this.position.y + this.velocity.y/2;
			this.velocity.x = 0;
			this.velocity.y = 0;
		}
		else if(this.controller.move_x == -1 && this.controller.move_y == 1){
			this.velocity.x = Math.sqrt(this.speed**2 + this.speed**2) * this.controller.move_x;
			this.velocity.y = Math.sqrt(this.speed**2 + this.speed**2) * this.controller.move_y;
			this.position.x = this.position.x + this.velocity.x/2;
			this.position.y = this.position.y + this.velocity.y/2;
			this.velocity.x = 0;
			this.velocity.y = 0;
		}
		else if(this.controller.move_x == -1 && this.controller.move_y == -1){
			this.velocity.x = Math.sqrt(this.speed**2 + this.speed**2) * this.controller.move_x;
			this.velocity.y = Math.sqrt(this.speed**2 + this.speed**2) * this.controller.move_y;
			this.position.x = this.position.x + this.velocity.x/2;
			this.position.y = this.position.y + this.velocity.y/2;
			this.velocity.x = 0;
			this.velocity.y = 0;
		}
	
		//sets timer so proctile spawn rate is set
		this.timer += delta_time;

		//controlles the projectile spawn
		if(this.timer >= this.spawn_rate){
			this.timer = 0;
			if(this.controller.action_1 == true)
			{
				
				new projectile();
			}
		}

		// update position
		super.update(delta_time);

		// clip to screen
		this.position.x = Math.min(Math.max(0, this.position.x), config.canvas_size.width);
		this.position.y = Math.min(Math.max(0, this.position.y), config.canvas_size.height);
	}
}

/**
 * Represents a basic physics body in the world. It has all of the necessary information to be
 * rendered, checked for collision, updated, and removed.
 * 
 * @typedef enemy
 */
class enemy extends Body
{
	speed = 500;

	/**
	 * Creates a new enemy with the default attributes.
	*/
	constructor(){
		super();

		// we always want our new enemies to be at this location
		this.position = {
			x: config.canvas_size.width * Math.random(),
			y: config.canvas_size.height - 800
		};
	}

	/**
	 * Draws the enemies as triangles centered at spawn location
	 * 
	 * @param {CanvasRenderingContext2D} graphics The current graphics context.
	*/
	draw(graphics) {
		graphics.strokeStyle = '#ff0000';
		graphics.fillStyle = '#ff0000';
		graphics.beginPath();
		graphics.moveTo( 
			this.position.x,
			this.position.y + this.half_size.height
		);
		graphics.lineTo( 
			this.position.x - this.half_size.width/2,
			this.position.y + this.half_size.height/2
		);
		graphics.lineTo(
			this.position.x - this.half_size.width,
			this.position.y - this.half_size.height
		);
		graphics.lineTo(
			this.position.x - this.half_size.width/2,
			this.position.y - this.half_size.height
		);
		graphics.lineTo( 
			this.position.x - this.half_size.width/2,
			this.position.y - this.half_size.height/2
		);
		graphics.lineTo(
			this.position.x + this.half_size.width/2,
			this.position.y - this.half_size.height/2
		);
		graphics.lineTo(
			this.position.x + this.half_size.width/2,
			this.position.y - this.half_size.height
		);
		graphics.lineTo(
			this.position.x + this.half_size.width,
			this.position.y - this.half_size.height
		);
		graphics.lineTo( 
			this.position.x + this.half_size.width/2,
			this.position.y + this.half_size.height/2
		)
		graphics.lineTo( 
			this.position.x,
			this.position.y + this.half_size.height
		);
		//graphics.stroke();
		graphics.fill();

		// draw velocity lines
		super.draw(graphics);

	}

	/**
	 * Updates the enemy given the state of the player's controller.
	 * 
	 * @param {Number} delta_time Time in seconds since last update call.
	*/
	update(delta_time)
	{
		this.position.y = this.position.y + 3;

		// update 
		super.update(delta_time);

		//sets the despawn point for the game
		if(this.position.y > -70 + config.canvas_size.height){
			this.remove();
		}
	}
}

/**
 * Sets up a procetile class with physics, updating, and removal built in.
 * 
 * @typedef projectile
 */
class projectile extends Body{
	speed = 15;

	/**
	 * Creates a new projectile with the default attributes.
	*/
	constructor(){
		super();
		
		this.position = {
			x: entities[0].position.x,
			y: entities[0].position.y - 20
		};
	}

	/**
	 * Draws the projectile
	 * its just a striaght line
	 * 
	 * @param {CanvasRenderingContext2D} graphics The current graphics context.
	*/
	draw(graphics) {
		graphics.strokeStyle = '#39ff14';
		graphics.fillStyle = '#39ff14';
		graphics.beginPath();
		graphics.moveTo(
			this.position.x,
			this.position.y + this.half_size.height
		);
		graphics.lineTo(this.position.x, this.position.y+20);
			
		//graphics.stroke();
		graphics.stroke();

		// draw velocity lines
		super.draw(graphics);

	}

	/**
	 * Updates the location of the projectile
	 * sets the velocity of the projectile
	 * sets a despawn point for the projectile
	 * 
	 * @param {Number} delta_time Time in seconds since last update call.
	*/
	update(delta_time)
	{
		// update 
		super.update(delta_time);
		this.velocity.y = this.speed * -1;
		this.position.y = this.position.y + this.velocity.y;
		if(this.position.y > Math.min(Math.max(0, this.position.y), config.canvas_size.height)){
			this.remove();
		}
	}
}

/**
 * has an update function and spawns enemies
 * 
 * @typedef Enemy_spawner
 */
class Enemy_spawner {

	constructor(){
		this.timer = 0;
		this.spawn_rate = 0.15;
	}

	/**
	 * When it updates it spawns a new enemy at a random location out of sight
	 * 
	 * @param {Number} delta_time Seconds since last update
	 */
	update(delta_time) {

		this.timer += delta_time;

		if(this.timer >= this.spawn_rate){
			this.timer = 0;
			new enemy();
			totalNumOfEnemies++;
		}
	}
}

/**
 * Creates collusions between player and enemies and enemies and projectiles
 * 
 * @typedef Collision_Handler
 */
class Collision_Handler{

	/**
	 * creates a new collison handler 
	*/
	constructor(){
	}

	/**
	 * checks to see if a collsion is present
	 * 
	 * @param {object} entity1 item one being compared
	 * @param {object} entity1 item two being compared
	 * 
	 * @returns {boolean} 
	 */
	checkCollision(entity1, entity2){
		if(entity1.position.x < entity2.position.x + 17 &&
		   entity1.position.x + 17 > entity2.position.x &&
		   entity1.position.y < entity2.position.y + 17 &&
		   entity1.position.y + 17 > entity2.position.y){
				return true;
			}
	}

	/**
	 * When it updates it assess what type of collison is occuring and applies the following code
	 * 
	 * @param {Number} delta_time Seconds since last update
	 */
	update(delta_time){
		Object.values(entities).forEach((entity1) => {
			Object.values(entities).forEach(entity2 => {
				if(this.checkCollision(entity1, entity2) && entity1.id !== entity2.id){
					if(entity1.id == 0){
						timeLeftinGame = timeLeftinGame - 3;
						numOfCollisions += 3;
						entity2.remove();
					}
					else if(entity2.id == 0){
						entity1.remove();
					}
					else{
						enemysHit++;
						entity1.remove();
						entity2.remove();
					}
				}
			});
		});
	}
		
}


/* 
------------------------------
------ CONFIG SECTION -------- 
------------------------------
*/

const config = {
	graphics: {
		// set to false if you are not using a high resolution monitor
		is_hi_dpi: true
	},
	canvas_size: {
		width: 300,
		height: 500
	},
	update_rate: {
		fps: 60,
		seconds: null
	}
};

config.update_rate.seconds = 1 / config.update_rate.fps;

// grab the html span
const game_state = document.getElementById('game_state');
const healthAmount = document.getElementById('healthAmount');

// grab the html canvas
const game_canvas = document.getElementById('game_canvas');
game_canvas.style.width = `${config.canvas_size.width}px`;
game_canvas.style.height = `${config.canvas_size.height}px`;

const graphics = game_canvas.getContext('2d');

// for monitors with a higher dpi
if (config.graphics.is_hi_dpi) {
	game_canvas.width = 2 * config.canvas_size.width;
	game_canvas.height = 2 * config.canvas_size.height;
	graphics.scale(2, 2);
} else {
	game_canvas.width = config.canvas_size.width;
	game_canvas.height = config.canvas_size.height;
	graphics.scale(1, 1);
}

/* 
------------------------------
------- MAIN SECTION  -------- 
------------------------------
*/

/** @type {Number} last frame time in seconds */
var last_time = null;

/** @type {Number} A counter representing the number of update calls */
var loop_count = 0;

/** @type {Number} A counter that is used to assign bodies a unique identifier */
var running_id = 0;

/** @type {Object<Number, Body>} This is a map of body ids to body instances */
var entities = null;

/** @type {Array<Number>} This is an array of body ids to remove at the end of the update */
var queued_entities_for_removal = null;

/** @type {Player} The active player */
var player = null;

/* You must implement this, assign it a value in the start() function */
var enemy_spawner = null;

/* You must implement this, assign it a value in the start() function */
var collision_handler = null;

/** @type {Number} A counter that is used to count the number of enemies the player shoots */
let enemysHit = 0;

/** @type {Number} A counter that is used to count the total number of enemies spawn during a game */
let totalNumOfEnemies = 0;

/** @type {Number} A variable that tracks and records the players score */
let score = 0;

/** @type {Number} A counter that is used to count down the time left in the game */
let timeLeftinGame = 0;

/** @type {Number} A counter that is used to make the timeleftinGame counter count at a real second */
let gameTimer = 0;

/** @type {Number} A variable that is used to set up the game clock */
let spawnRate = 0.5;

/** @type {Number} A counter that is used to count how many times an enemy hits a player */
let numOfCollisions = 0;

/**
 * This function updates the state of the world given a delta time.
 * 
 * @param {Number} delta_time Time since last update in seconds.
 */
function update(delta_time) {
	// poll input
	player.input_handler.pollController();

	// move entities
	Object.values(entities).forEach(entity => {
		entity.update(delta_time);
	});

	// detect and handle collision events
	if (collision_handler != null) {
		collision_handler.update(delta_time);
	}

	// remove enemies
	queued_entities_for_removal.forEach(id => {
		delete entities[id];
	})
	queued_entities_for_removal = [];

	// spawn enemies
	if (enemy_spawner != null) {
		enemy_spawner.update(delta_time);
	}

	// allow the player to restart when dead
	if (player.isDead() && player.controller.action_2) {
		start();
	}

	//runs things during game while player isn't dead
	if(!player.isDead()){

		//100 is time of game since I took health out and made it fuel
		score = Math.floor(30 * enemysHit + 100)
		
		//sets the in game timer to count down by a real second
		gameTimer += delta_time;
		if(gameTimer >= spawnRate){
			gameTimer = 0;
			timeLeftinGame -= 1;
		}
	}
}

/**
 * This function draws the state of the world to the canvas.
 * 
 * @param {CanvasRenderingContext2D} graphics The current graphics context.
 */
function draw(graphics) {
	// default font config
	graphics.font = "10px Arial";
	graphics.textAlign = "left";

	// draw background (this clears the screen for the next frame)
	graphics.fillStyle = '#000000';
	graphics.fillRect(0, 0, config.canvas_size.width, config.canvas_size.height);

	// for loop over every eneity and draw them
	Object.values(entities).forEach(entity => {
		entity.draw(graphics);
	});

	// game over screen
	if (player.isDead()) {
		enemy_spawner = null;
		graphics.fillStyle = '#39ff14'
		graphics.font = "30px Consolas";
		graphics.textAlign = "center";
		graphics.fillText('Game Over', config.canvas_size.width / 2, -300 + config.canvas_size.height);
		graphics.fillText(`Score: ${score}`, config.canvas_size.width / 2, -250 + config.canvas_size.height)
		
		graphics.font = "20px Consolas";
		graphics.textAlign = "center";
		graphics.fillText(`Number of Enemies Hit: ${enemysHit/2}`, config.canvas_size.width / 2, -200 + config.canvas_size.height);
		graphics.fillText(`Number of Seconds Alive: ${100 - numOfCollisions}`, config.canvas_size.width / 2, -180 + config.canvas_size.height);
		graphics.fillText(`Total Number of Enemies: ${totalNumOfEnemies}`, config.canvas_size.width / 2, -160 + config.canvas_size.height);
		graphics.fillText('press r to restart', config.canvas_size.width / 2, -140 + config.canvas_size.height);
	}

	//in game screen and graphics
	if(!player.isDead()){
		graphics.fillStyle = '#39ff14'
		graphics.font = "20px Consolas";
		graphics.textAlign = "right";
		graphics.fillText(`Fuel Left: ${timeLeftinGame}`, -180 + config.canvas_size.width, -10 + config.canvas_size.height);

	}


}

/**
 * This is the main driver of the game. This is called by the window requestAnimationFrame event.
 * This function calls the update and draw methods at static intervals. That means regardless of
 * how much time passed since the last time this function was called by the window the delta time
 * passed to the draw and update functions will be stable.
 * 
 * @param {Number} curr_time Current time in milliseconds
 */
function loop(curr_time) {
	// convert time to seconds
	curr_time /= 1000;

	// edge case on first loop
	if (last_time == null) {
		last_time = curr_time;
	}

	var delta_time = curr_time - last_time;

	// this allows us to make stable steps in our update functions
	while (delta_time > config.update_rate.seconds) {
		update(config.update_rate.seconds);
		draw(graphics);

		delta_time -= config.update_rate.seconds;
		last_time = curr_time;
		loop_count++;
	}

	window.requestAnimationFrame(loop);
}


function start() {
	entities = [];
	queued_entities_for_removal = [];
	running_id = 0;
	enemysHit = 0;
	timeOfDeath = 0;
	gameTimer = 0;
	timeLeftinGame = 100;
	player = new Player();
	enemy_spawner = new Enemy_spawner();
	collision_handler = new Collision_Handler();
}

// start the game
start();


// start the loop
window.requestAnimationFrame(loop);