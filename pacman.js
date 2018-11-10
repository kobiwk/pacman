( function() {
	"use strict"

	// define area nad basic 'world' rules
	let pacmanWorld = document.createElement('canvas');
	let pacmanWidth = pacmanWorld.width = 712;
	let pacmanHeight = pacmanWorld.height = 512;
	let pacmanLives = 3;
	let score = 0;
	let blockEnemy = false;
	let EnemyGhost;
	let test;
	let openMouth = 0; 
	pacmanWorld.id = "pacman-world";


	document.body.appendChild(pacmanWorld);

	let context = pacmanWorld.getContext('2d');

	let BasicRules = {
		/* Create board, game title and score */
		createBoard: function() {
			context.fillStyle = "blue";
			context.fillRect( 0, 0, pacmanWidth, pacmanHeight );
			context.fillStyle = "white";
			context.font = "20px Verdana";
			context.fillText("Pacman: " + pacmanLives + " Score: " + score, 10, 30);
			context.fillStyle = "blue";
		},
		resultOfGame: function(obj) {
			var that = obj;
			//touch of the enemies...
			if ( PacmanX <= (that.x + 26) && that.x <= ( PacmanX + 26 ) && PacmanY <= ( that.y + 26 ) && that.y <= ( PacmanY + 26) ) {
				//... takes Pacman lives
				pacmanLives--;
				//clear background and add new text. Primitive.
				context.fillStyle = "blue";
				context.fillRect( 0, 0, pacmanWidth, 40 );
				context.fillStyle = "white";
				context.font = "20px Verdana";
				context.fillText("Pacman: " + pacmanLives + " Score: " + score, 10, 30);
				context.fillStyle = "blue";
				BasicRules.detectCollison(new DefinePacman, obj);
				
				//send Pacman to default position
				context.fillRect( x, y, 32, 32 );
				PacmanX = 0;
				PacmanY = 40;
				// stop moving of Pacman, after he collide with an enemy
				if ( keyState[37] || keyState[38] || keyState[39] || keyState[40] ) {
					keyState[37] = false;
					keyState[38] = false;
					keyState[39] = false;
					keyState[40] = false;
				}

				//THE END
				if ( pacmanLives == 0 ) {
					//block moving of enemies
					blockEnemy = true;
				}
			}
		},
		/* detect when enemy kills poor Pacman */
		detectCollison: function(pacman, enemy) {
			if ( PacmanX <= (enemy.x + 26) && enemy.x <= ( PacmanX + 26 ) && PacmanY <= ( enemy.y + 26 ) && enemy.y <= ( PacmanY + 26 ) ) {
				alert("Houston, we got a problem!");
			}
		},
		/* detect when enemy is hit with Pacman's weapon */
		detectHit: function( move_direction, attackX, attackY, weapon, obj ) {
	
			if ( direction === move_direction ) {
				let attack = setInterval( function() {

				if ( move_direction === "right" ) {
					context.fillRect(attackX+32, attackY, 32, 32);
					attackX += 5;

					context.drawImage(weapon, 0, 0, 520, 520, attackX+32, attackY, 32, 32);
					
					//clear weapon when it leave the board
					if ( attackX >= 700 ) clearInterval( attack );			
				}

				if ( move_direction === "left" ) {
					context.fillRect(attackX-32, attackY, 32, 32);
							attackX -= 5;

					context.drawImage(weapon, 0, 0, 520, 520, attackX-32, attackY, 32, 32);
					//clear weapon when it leave the board
					if ( attackX <= 0 ) clearInterval( attack );	
				}

				if ( move_direction === "up" ) {
					context.fillRect(attackX, attackY-32, 32, 32);
					attackY -= 5;

					context.drawImage(weapon, 0, 0, 520, 520, attackX, attackY-32, 32, 32);

					//clear weapon when it leave the board
					if ( attackY <= 60 ) {
						clearInterval( attack );
						context.fillRect(attackX, 30, 32, 32);
					}	
				}
				
				if ( move_direction === "down" ) {
					let attack = setInterval( function() {

						context.fillRect(attackX, attackY+32, 32, 32);
						attackY += 5;

						context.drawImage(weapon, 0, 0, 520, 520, attackX, attackY+32, 32, 32);
						
						//clear weapon when it leave the board
						if ( attackY >= 512 ) {
							clearInterval( attack );
							//context.fillRect(attackX, 60, 32, 32);
						}
					}, 10);
				}

				//detect when weapon hit the target
				if ( attackX <= (obj.x + 26) && obj.x <= ( attackX + 26 ) && attackY <= ( obj.y + 26 ) && obj.y <= ( attackY + 26 ) ) {
					//alert("Die motherfucker!");
					test = true;
					/* create new Enemy after current Enemy is hit */
					EnemyGhost = new CreateEnemy(400, 400, 10, 128, 0, 3);
					EnemyGhost.load();

					//remove enemy after hit, and bring him back after 5 seconds, on other position
		
					context.fillRect( obj.x, obj.y, 32, 32 );
					
					obj.x = 1600;
					obj.y = 40;
					
					// stop moving of Pacman, after he crush his enemy
					if ( keyState[37] || keyState[38] || keyState[39] || keyState[40] ) {
						keyState[37] = false;
						keyState[38] = false;
						keyState[39] = false;
						keyState[40] = false;
					}

				}
				}, 10);
			}
		} 
	}

	let PacmanX = 0;
	let PacmanY = 40;
	let PacmanSpeed = 10;
	let direction = 0;
	let keyState = {};

	/* variables to define position of pacman */
	function DefinePacman() {
	}

	DefinePacman.prototype = {
		createPacman: function() {
			let loadBeignsImages = new Image();
			loadBeignsImages.src = "pac.png";
			return loadBeignsImages.onload = function() {
				//default
				if ( PacmanX % 2 === 0 ) {
					context.drawImage(loadBeignsImages, 320, 0, 32, 32, 0, 40, 32, 32);
				} 
			}
		},
		attack: function(obj){
			var that = this;
			document.addEventListener('keypress', function(event) {
				//let currentPosition = x;
				let attackX = PacmanX;
				let attackY = PacmanY;
				let weap = new Image();
				let attackSpeed = 100;
				weap.src = "ask-hand.png";
				context.fillStyle = "blue";
				 
				if ( event.keyCode === 32 ) {
					BasicRules.detectHit( "right", attackX, attackY, weap, obj );
					BasicRules.detectHit( "left", attackX, attackY, weap, obj );
					BasicRules.detectHit( "up", attackX, attackY, weap, obj );
					BasicRules.detectHit( "down", attackX, attackY, weap, obj );
				};
			}, false);
		},
		move: function() {
			let loadBeignsImages = new Image();
			loadBeignsImages.src = "pac.png";
			
			//create effect of Pacman mouth opening
			openMouth++;

			//clear previous position of pacman head
			const clearPos = new DefinePacman();
			clearPos.clearPacmanPreviousPosition();
			clearPos.stayInside();
			if ( pacmanLives > 0) {
				if ( keyState[39] ) {
					PacmanX+=PacmanSpeed;
					direction = "right";
				} else if ( keyState[40] ) {				
					PacmanY+=PacmanSpeed;
					direction = "down";	
				} else if ( keyState[37] ) {					
					PacmanX-=PacmanSpeed;
					direction = "left";
				} else if ( keyState[38] ) {					
					PacmanY-=PacmanSpeed;
					direction = "up";
				}
			} else {
				context.fillStyle = "blue";
				context.fillRect( 0, 0, pacmanWidth, 40 );
				context.fillStyle = "white";
				context.font = "20px Verdana";
				context.fillText("Pacman: " + pacmanLives + " Score: " + score + " THIS IS THE END OF YOU LOSER!!!!", 10, 30);
				context.fillStyle = "blue";
			}
				

			//draw Pacman one step ahead
			if ( openMouth % 2 ===  0 ) {
				if ( direction === "right" ) {
					context.drawImage(loadBeignsImages, 320, 0, 32, 32, PacmanX, PacmanY, 32, 32);
				} else if ( direction === "left" ) {
					context.drawImage(loadBeignsImages, 352, 64, 32, 32, PacmanX, PacmanY, 32, 32);
				} else if ( direction === "down" ) {
					context.drawImage(loadBeignsImages, 320, 32, 32, 32, PacmanX, PacmanY, 32, 32);
				} else if ( direction === "up" ) {
					context.drawImage(loadBeignsImages, 320, 96, 32, 32, PacmanX, PacmanY, 32, 32);
				}
				
			} else if ( openMouth % 2 ===  1 ) {
				if ( direction === "right" ) {
				context.drawImage(loadBeignsImages, 352, 0, 32, 32, PacmanX, PacmanY, 32, 32);
				} else if ( direction === "left" ) {
					context.drawImage(loadBeignsImages, 320, 64, 32, 32, PacmanX, PacmanY, 32, 32);
				} else if ( direction === "down" ) {
					context.drawImage(loadBeignsImages, 352, 32, 32, 32, PacmanX, PacmanY, 32, 32);
				} else if ( direction === "up" ) {
					context.drawImage(loadBeignsImages, 352, 96, 32, 32, PacmanX, PacmanY, 32, 32);
				}
			}
			setTimeout( clearPos.move,50 );
		},
		clearPacmanPreviousPosition: function(){
			let currentpositionX = PacmanX;
			let currentpositionY = PacmanY;
			return context.fillRect(currentpositionX, currentpositionY, 32, 32);
		},
		stayInside: function(obj) {
			if ( PacmanX > pacmanWidth) {
				PacmanX = 0;
			}
			if ( PacmanX < 0 ) {
				PacmanX = pacmanWidth;
			}
			if ( PacmanY > pacmanHeight ) {
				PacmanY = 40;
			}
			if ( PacmanY < 40 ) {
				PacmanY = pacmanHeight;
			}
		}
	}

	
/* LISTEN FOR ARROWS, MAKE PACMAN MOVING SMOOTHER */
document.addEventListener('keydown', function(event){
	keyState[event.keyCode || event.which] = true;
}, true);
document.addEventListener('keyup', function(event){
	keyState[event.keyCode || event.which] = false;
}, false);

		

	/**
	
	    CREATE A FOOTPRINT FOR ALL THE ENEMIES
	
	 
		CreateEnemy arguments 
			x - x position in canvas,
			y - y position in canvs,
			speed - speed of the enemy,
			imageX - position x on "image table" ,
			imageY - position y on "image table"

		CreateEnemy.choseDirection - returns "left" || "right" || "up" || "down";

		CreateEnemy.stayInside - keeps enemy inside of canvas world

		CreateEnemy.load - load enemy, believe it or not

	*/
	function CreateEnemy( x, y, speed, imageX, imageY, life ) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.imageX = imageX;
		this.imageY = imageY;
		this.life = life;
	}

	CreateEnemy.prototype.moveEnemy = function(x,y,speed){
			//decide on enemies direction

			var controlNMEMoving = 0;
			setInterval( iLikeToMoveIt, 50 );
			var direction = "right";
			var that = this;
			function iLikeToMoveIt() {
				//start default movement
				if ( blockEnemy === false ) {
					BasicRules.resultOfGame(that);
					controlNMEMoving++;
					if ( controlNMEMoving == 20 ) {
						direction = that.choseDirection();
						controlNMEMoving=0;
					}
					let loadEnemies = new Image();
					loadEnemies.src = "pac.png";

					if ( direction === "right" ) {
						that.stayInside( that.x, that.y, "right" );
						context.fillRect( that.x, that.y, 32, 32);
						that.x += that.speed;
						context.drawImage(loadEnemies, that.imageX, that.imageY, 32, 32, that.x, that.y, 32, 32);
					}
		
					if ( direction === "left" ) {	
						that.stayInside( that.x, that.y, "left" );
						context.fillRect( that.x, that.y, 32, 32);
						that.x -= that.speed;
						context.drawImage(loadEnemies, that.imageX, that.imageY, 32, 32, that.x, that.y, 32, 32);
					}

					if ( direction === "up" ) {
						that.stayInside( that.x, that.y, "up" );
						context.fillRect( that.x, that.y, 32, 32);
						that.y -= that.speed;
						context.drawImage(loadEnemies, that.imageX, that.imageY, 32, 32, that.x, that.y, 32, 32);
					}

					if ( direction === "down" ) {
						that.stayInside( that.x, that.y, "down" );
						context.fillRect( that.x, that.y, 32, 32);
						that.y += that.speed;			
						context.drawImage(loadEnemies, that.imageX, that.imageY, 32, 32, that.x, that.y, 32, 32);
					}
				}
			}
		};

	CreateEnemy.prototype.choseDirection = function() {
			function getRandomInt(max) {
			  return Math.floor(Math.random() * Math.floor(max));
			}
			var ran = getRandomInt(4);
			if ( ran === 0 ) {
				return "right";
			}
			if ( ran === 1 ) {
				return "left";
			}
			if ( ran === 2 ) {
				return "down";
			}
			if ( ran === 3 ) {
				return "up";
			}
		}

	CreateEnemy.prototype.stayInside = function( x, y, direction ) {
		if ( x > pacmanWidth) {
				//delete enemy image, when horisontal right down
				context.fillRect(x-32, y-32, 32, 32);

				if ( direction === "right" ) {
					//delete enemy image
					context.fillRect(x-32, y, 32, 32);
				}
				
				this.x = 0;
			}
		if ( x < 0 ) {
			if ( direction === "left" ) {
				//delete enemy image
				context.fillRect(x, y, 32, 32);
			}
			this.x = pacmanWidth;
		}
		if ( y > pacmanHeight ) {
			if ( direction === "down" ) {
				//delete enemy image
				context.fillRect(x, y-32, 32, 32);
			}
			this.y = 40;
		}
		if ( y < 40 ) {
			if ( direction === "up" ) {
				//delete enemy image
				context.fillRect(x, y, 32, 32);
			}
			this.y = pacmanHeight;
		}
	};

	

	CreateEnemy.prototype.load = function() {
		let loadEnemies = new Image();
		loadEnemies.src = "pac.png";
		var that = this;
		return loadEnemies.onload = function () {
			context.drawImage(loadEnemies, this.imageX,this.imageY, 32, 32, that.x, that.y, 32, 32);			
			//ActivateEnemyPowers.move();	
			//setInterval( ActivateEnemyPowers.testMove, 2000)				
			// set "fluid" moving, but need previous state to be deleted
			that.moveEnemy(that.x, that.y, that.speed);
		}
	}




	function init() {
		BasicRules.createBoard();
		//new Object
		
		//create Beigns
		//createBeigns.Pacman();
		//createBeigns.Weapon();
		//EnemyBasics.createRedEnemy();
		//EnemyBasics.createYellowEnemy();

		/* CREATE ENEMIES */
		let newPacman = new DefinePacman();
		let PinkEnemy = new CreateEnemy(400, 400, 10, 128, 0, 3);
		let RedEnemy = new CreateEnemy( 500, 200, 6, 0, 0, 3);
		let YellowEnemy = new CreateEnemy( 300, 200, 6, 96, 0, 3);
		let QQQEnemy = new CreateEnemy( 100, 200, 6, 160, 0, 3);

        newPacman.createPacman();
        newPacman.attack(PinkEnemy);
        newPacman.attack(RedEnemy);
        newPacman.attack(YellowEnemy);
        newPacman.attack(QQQEnemy);
        if ( test ){
        	newPacman.attack(EnemyGhost);
        }
        newPacman.move();

		PinkEnemy.load();
		//RedEnemy.load();
		//YellowEnemy.load();
		QQQEnemy.load();
	}

	//start the game
	init();

} )();