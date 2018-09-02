( function() {
	// define area nad basic 'world' rules
	let pacmanWorld = document.createElement('canvas');
	pacmanWorld.id = "pacman-world";
	pacmanWidth = pacmanWorld.width = 712;
	pacmanHeight = pacmanWorld.height = 512;
	let pacmanLives = 3;
	let score = 0
	document.body.appendChild(pacmanWorld);

	let context = pacmanWorld.getContext('2d');

	var reCreateBoard = createBoard = function() {
		context.fillStyle = "blue";
		context.fillRect( 0, 0, pacmanWidth, pacmanHeight );
		context.fillStyle = "white";
		context.font = "20px Verdana";
		context.fillText("Pacman: " + pacmanLives + " Score: " + score, 10, 30);
		context.fillStyle = "blue";
	}

	function resultOfGame(obj) {
		var that = obj;
			//touch of enemies...
		if ( PacmanBasics.x <= (that.x + 26) && that.x <= ( PacmanBasics.x + 26 ) && PacmanBasics.y <= ( that.y + 26 ) && that.y <= ( PacmanBasics.y + 26) ) {
			//... takes Pacman lives
			pacmanLives--;
			//clear background and add new text. Primitive.
			context.fillStyle = "blue";
			context.fillRect( 0, 0, pacmanWidth, 40 );
			context.fillStyle = "white";
			context.font = "20px Verdana";
			context.fillText("Pacman: " + pacmanLives + " Score: " + score, 10, 30);
			context.fillStyle = "blue";
			detectCollison(PacmanBasics, obj);
			//send Pacman to default position
			context.fillRect( PacmanBasics.x, PacmanBasics.y, 32, 32 );
			PacmanBasics.x = 0;
			PacmanBasics.y = 40;
			
		}
	}

	function detectCollison(pacman, enemy) {
		if ( pacman.x <= (enemy.x + 26) && enemy.x <= ( pacman.x + 26 ) && pacman.y <= ( enemy.y + 26 ) && enemy.y <= ( pacman.y + 26 ) ) {
			alert("Huoston, we got a problem!");
		}

	}
	/* variables to define position of pacman */

	let PacmanBasics = {
		x: 0,
		y: 40,
		PacmanSpeed: 10,
		createPacman: function() {
			let loadBeignsImages = new Image();
			loadBeignsImages.src = "pac.png";
			return loadBeignsImages.onload = function Pacman() {
				//default
				if ( PacmanBasics.x % 2 === 0 ) {
					context.drawImage(loadBeignsImages, 320, 0, 32, 32, 0, 40, 32, 32);
				} 
				PacmanPowers.move();
			}
		},
		attack: function(obj) {
			var that = this;
			document.addEventListener('keydown', function(event) {
				//let currentPosition = x;
				let attackX = that.x;
				let attackY = that.y;
				let weap = new Image();
				let attackSpeed = 100;
				weap.src = "ask-hand.png";
				context.fillStyle = "blue";
				
				if ( event.keyCode === 32 ) {
					if ( direction === "right") {
						let attack = setInterval( function() {

						context.fillRect(attackX+32, attackY, 32, 32);
						attackX += 5;

						context.drawImage(weap, 0, 0, 520, 520, attackX+32, attackY, 32, 32);
						
						//detect when weapon hit the target
						if ( attackX <= (obj.x + 26) && obj.x <= ( attackX + 26 ) && attackY <= ( obj.y + 26 ) && obj.y <= ( attackY + 26 ) ) {
							alert("Die motherfucker!");
						}
						
						//clear weapon when it leave the board
						if ( attackX >= 700 ) clearInterval( attack );
						}, 10);


					}
					if ( direction === "left") {
						let attack = setInterval( function() {
						//attackX += 4;
						context.fillRect(attackX-32, attackY, 32, 32);
						attackX -= 5;
						//createBeigns.Pacman();
						context.drawImage(weap, 0, 0, 520, 520, attackX-32, attackY, 32, 32);

						//detect when weapon hit the target
						if ( attackX <= (obj.x + 26) && obj.x <= ( attackX + 26 ) && attackY <= ( obj.y + 26 ) && obj.y <= ( attackY + 26 ) ) {
							alert("Die motherfucker!");
						}

						//clear weapon when it leave the board
						if ( attackX <= 0 ) clearInterval( attack );
						}, 10);
					}
					if ( direction === "up") {
						let attack = setInterval( function() {
						//attackX += 4;
						context.fillRect(attackX, attackY-32, 32, 32);
						attackY -= 5;
						//createBeigns.Pacman();
						context.drawImage(weap, 0, 0, 520, 520, attackX, attackY-32, 32, 32);
						
						//detect when weapon hit the target
						if ( attackX <= (obj.x + 26) && obj.x <= ( attackX + 26 ) && attackY <= ( obj.y + 26 ) && obj.y <= ( attackY + 26 ) ) {
							alert("Die motherfucker!");
						}

						//clear weapon when it leave the board
						if ( attackY <= 60 ) {
							clearInterval( attack );
							context.fillRect(attackX, 30, 32, 32);
						}
							
						}, 10);
					}

					if ( direction === "down") {
						let attack = setInterval( function() {
						//attackX += 4;
						context.fillRect(attackX, attackY+32, 32, 32);
						attackY += 5;
						//createBeigns.Pacman();
						context.drawImage(weap, 0, 0, 520, 520, attackX, attackY+32, 32, 32);
						
						//detect when weapon hit the target
						if ( attackX <= (obj.x + 26) && obj.x <= ( attackX + 26 ) && attackY <= ( obj.y + 26 ) && obj.y <= ( attackY + 26 ) ) {
							alert("Die motherfucker!");
						}

						//clear weapon when it leave the board
						if ( attackY >= 512 ) {
							clearInterval( attack );
							//context.fillRect(attackX, 60, 32, 32);
						}
							
						}, 10);
					}
					//detect when target is hit
					
									
				};
			}, false);

		},
	};
	let direction = 0;

	let PacmanPowers = {
		testX: 0,
		move: function() {
			let x = 0;
			let y = 0;
			document.addEventListener('keydown', function(event){
				//console.log( event.keyCode );
				/* increase values below so '%' operator could be used */
				x++;
				y++;
				
				let loadBeignsImages = new Image();
				loadBeignsImages.src = "pac.png";

				//clear previous position of pacman head
				//reCreateBoard();
				PacmanPowers.clearPacmanPreviousPosition();
				PacmanPowers.stayInside();
				
				if ( pacmanLives > 0) {
					if ( event.keyCode === 39 ) {
						PacmanBasics.x+=PacmanBasics.PacmanSpeed;
						direction = "right";
					}
					if ( event.keyCode === 40 ) {				
						PacmanBasics.y+=PacmanBasics.PacmanSpeed;
						direction = "down";	
					}
					if ( event.keyCode === 37 ) {					
						PacmanBasics.x-=PacmanBasics.PacmanSpeed;
						direction = "left";
					}
					if ( event.keyCode === 38 ) {					
						PacmanBasics.y-=PacmanBasics.PacmanSpeed;
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
				if ( x % 2 ===  0 ) {
					if ( direction === "right" ) {
						context.drawImage(loadBeignsImages, 320, 0, 32, 32, PacmanBasics.x, PacmanBasics.y, 32, 32);
					} else if ( direction === "left" ) {
						context.drawImage(loadBeignsImages, 352, 64, 32, 32, PacmanBasics.x, PacmanBasics.y, 32, 32);
					} else if ( direction === "down" ) {
						context.drawImage(loadBeignsImages, 320, 32, 32, 32, PacmanBasics.x, PacmanBasics.y, 32, 32);
					} else if ( direction === "up" ) {
						context.drawImage(loadBeignsImages, 320, 96, 32, 32, PacmanBasics.x, PacmanBasics.y, 32, 32);
					}
					
				} else if ( x % 2 ===  1 ) {
					if ( direction === "right" ) {
					context.drawImage(loadBeignsImages, 352, 0, 32, 32, PacmanBasics.x, PacmanBasics.y, 32, 32);
					} else if ( direction === "left" ) {
						context.drawImage(loadBeignsImages, 320, 64, 32, 32, PacmanBasics.x, PacmanBasics.y, 32, 32);
					} else if ( direction === "down" ) {
						context.drawImage(loadBeignsImages, 352, 32, 32, 32, PacmanBasics.x, PacmanBasics.y, 32, 32);
					} else if ( direction === "up" ) {
						context.drawImage(loadBeignsImages, 352, 96, 32, 32, PacmanBasics.x, PacmanBasics.y, 32, 32);
					}
				} 
			});
		},
		clearPacmanPreviousPosition: function() {
			let currentpositionX = PacmanBasics.x;
			let currentpositionY = PacmanBasics.y;
			return context.fillRect(currentpositionX, currentpositionY, 32, 32);
		},
		stayInside: function() {
			if ( PacmanBasics.x > pacmanWidth) {
					PacmanBasics.x = 0;
				}
			if ( PacmanBasics.x < 0 ) {
				PacmanBasics.x = pacmanWidth;
			}
			if ( PacmanBasics.y > pacmanHeight ) {
				PacmanBasics.y = 40;
			}
			if ( PacmanBasics.y < 40 ) {
				PacmanBasics.y = pacmanHeight;
			}
		}
	}


	/**
	
	    CREATE A FOOTPRINT FOR ALL THE ENEMIES
	
	 
		CreateEnemy arguments 
			x - x position in canvas,
			y - y position in canvs,
			speed - speed of the enemy,
			imageX - position x on "image table" ,
			imagey - position y on "image table"

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

			var counter3 = 0;
			setInterval( iLikeToMoveIt, 50 );
			var direction = "right";
			var that = this;
			function iLikeToMoveIt() {
				//start default movement

					resultOfGame(that);
					
				




				counter3++;
				if ( counter3 == 30 ) {
					direction = that.choseDirection();
					counter3=0;
				}

				let loadEnemies = new Image();
				loadEnemies.src = "pac.png";

				if ( direction === "right" ) {
					
						that.stayInside( that.x, that.y, "right" );

						if ( 1 !== 0 ) {
							context.fillRect( that.x, that.y, 32, 32);

							that.x += that.speed;

							context.drawImage(loadEnemies, that.imageX, that.imageY, 32, 32, that.x, that.y, 32, 32);
						}					
				}

			
				if ( direction === "left" ) {
					
					that.stayInside( that.x, that.y, "left" );

					if ( 1 !== 0 ) {
						context.fillRect( that.x, that.y, 32, 32);

						that.x -= that.speed;
						
						context.drawImage(loadEnemies, that.imageX, that.imageY, 32, 32, that.x, that.y, 32, 32);
					}
				}

				if ( direction === "up" ) {
					
					that.stayInside( that.x, that.y, "up" );

					if ( 1 !== 0 ) {
						context.fillRect( that.x, that.y, 32, 32);

						that.y -= that.speed;
						
						context.drawImage(loadEnemies, that.imageX, that.imageY, 32, 32, that.x, that.y, 32, 32);
						
					}
				}

				if ( direction === "down" ) {
					
					that.stayInside( that.x, that.y, "down" );

					if ( that.life !== 0 ) {
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
		createBoard();
		//new Object
		
		//create Beigns
		//createBeigns.Pacman();
		//createBeigns.Weapon();
		//EnemyBasics.createRedEnemy();
		//EnemyBasics.createYellowEnemy();

		/* CREATE ENEMIES */

		let PinkEnemy = new CreateEnemy(400, 400, 10, 128, 0, 3);
		let RedEnemy = new CreateEnemy( 500, 200, 6, 0, 0, 3);
		let YellowEnemy = new CreateEnemy( 300, 200, 6, 96, 0, 3);
		let QQQEnemy = new CreateEnemy( 100, 200, 6, 160, 0, 3);

		PacmanBasics.createPacman();
		PacmanBasics.attack(PinkEnemy);
		PacmanBasics.attack(RedEnemy);
		PacmanBasics.attack(YellowEnemy);
		PacmanBasics.attack(QQQEnemy);
		
		PinkEnemy.load();
		RedEnemy.load();
		YellowEnemy.load();
		QQQEnemy.load();
	}

	//start the game
	init();

} )();