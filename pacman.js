( function() {
	// define area nad basic 'world' rules
	let pacmanWorld = document.createElement('canvas');
	pacmanWorld.id = "pacman-world";
	pacmanWidth = pacmanWorld.width = 712;
	pacmanHeight = pacmanWorld.height = 512;

	document.body.appendChild(pacmanWorld);

	let context = pacmanWorld.getContext('2d');

	var reCreateBoard = createBoard = function() {
		context.fillStyle = "blue";
		context.fillRect( 0, 0, pacmanWidth, pacmanHeight );
		//createBeigns.RedEnemy();
	}

	/* variables to define position of pacman */

	let PacmanBasics = {
		PacmanX: 0,
		PacmanY: 0,
		PacmanSpeed: 10,
		createPacman: function() {
			let loadBeignsImages = new Image();
			loadBeignsImages.src = "pac.png";
			return loadBeignsImages.onload = function Pacman() {
				//default
				if ( PacmanBasics.PacmanX % 2 === 0 ) {
					context.drawImage(loadBeignsImages, 320, 0, 32, 32, 0, 0, 32, 32);
				} 
				PacmanPowers.move();
			}
		},
		pacmanWeapon: function() {
			let loadWeapon = new Image();
			loadWeapon.src = "ask-hand.png";
			return loadWeapon.onload = function Weapon() {
				//context.drawImage(loadWeapon, 0, 0, 520, 520, 100, 0, 32, 32);
				PacmanPowers.attack();
			}
		} 
	};

	let PacmanPowers = {
		move: function() {
			let x = 0;
			let y = 0;
			let direction = 0;
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
				

				if ( event.keyCode === 39 ) {
					PacmanBasics.PacmanX+=PacmanBasics.PacmanSpeed;
					direction = "right";
				}
				if ( event.keyCode === 40 ) {				
					PacmanBasics.PacmanY+=PacmanBasics.PacmanSpeed;
					direction = "down";	
				}
				if ( event.keyCode === 37 ) {					
					PacmanBasics.PacmanX-=PacmanBasics.PacmanSpeed;
					direction = "left";
				}
				if ( event.keyCode === 38 ) {					
					PacmanBasics.PacmanY-=PacmanBasics.PacmanSpeed;
					direction = "up";
				}

				//draw Pacman one step ahead
				if ( x % 2 ===  0 ) {
					if ( direction === "right" ) {
						context.drawImage(loadBeignsImages, 320, 0, 32, 32, PacmanBasics.PacmanX, PacmanBasics.PacmanY, 32, 32);
					} else if ( direction === "left" ) {
						context.drawImage(loadBeignsImages, 352, 64, 32, 32, PacmanBasics.PacmanX, PacmanBasics.PacmanY, 32, 32);
					} else if ( direction === "down" ) {
						context.drawImage(loadBeignsImages, 320, 32, 32, 32, PacmanBasics.PacmanX, PacmanBasics.PacmanY, 32, 32);
					} else if ( direction === "up" ) {
						context.drawImage(loadBeignsImages, 320, 96, 32, 32, PacmanBasics.PacmanX, PacmanBasics.PacmanY, 32, 32);
					}
					
				} else if ( x % 2 ===  1 ) {
					if ( direction === "right" ) {
					context.drawImage(loadBeignsImages, 352, 0, 32, 32, PacmanBasics.PacmanX, PacmanBasics.PacmanY, 32, 32);
					} else if ( direction === "left" ) {
						context.drawImage(loadBeignsImages, 320, 64, 32, 32, PacmanBasics.PacmanX, PacmanBasics.PacmanY, 32, 32);
					} else if ( direction === "down" ) {
						context.drawImage(loadBeignsImages, 352, 32, 32, 32, PacmanBasics.PacmanX, PacmanBasics.PacmanY, 32, 32);
					} else if ( direction === "up" ) {
						context.drawImage(loadBeignsImages, 352, 96, 32, 32, PacmanBasics.PacmanX, PacmanBasics.PacmanY, 32, 32);
					}
				} 
			});
		},
		attack: function() {
			document.addEventListener('keydown', function(event) {
				//let currentPosition = x;
				let attackX = PacmanBasics.PacmanX;
				let attackY = PacmanBasics.PacmanY;
				let weap = new Image();
				let attackSpeed = 100;
				weap.src = "ask-hand.png";
				context.fillStyle = "blue";
				
				if ( event.keyCode === 32 ) {
					
					let attack = setInterval( function() {
						//attackX += 4;
						context.fillRect(attackX+32, attackY, 32, 32);
						attackX += 5;
						//createBeigns.Pacman();
						context.drawImage(weap, 0, 0, 520, 520, attackX+32, attackY, 32, 32);
					if ( attackX === 700 ) clearInterval( attack );
					}, 10);
									
				};
			}, false);

		},
		clearPacmanPreviousPosition: function() {
			let currentpositionX = PacmanBasics.PacmanX;
			let currentpositionY = PacmanBasics.PacmanY;
			return context.fillRect(currentpositionX, currentpositionY, 32, 32);
		},
		stayInside: function() {
			if ( PacmanBasics.PacmanX > pacmanWidth) {
					PacmanBasics.PacmanX = 0;
				}
			if ( PacmanBasics.PacmanX < 0 ) {
				PacmanBasics.PacmanX = pacmanWidth;
			}
			if ( PacmanBasics.PacmanY > pacmanHeight ) {
				PacmanBasics.PacmanY = 0;
			}
			if ( PacmanBasics.PacmanY < 0 ) {
				PacmanBasics.PacmanY = pacmanHeight;
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
	function CreateEnemy( x, y, speed, imageX, imageY ) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.imageX = imageX;
		this.imageY = imageY;
	}

	CreateEnemy.prototype.moveEnemy = function(x,y,speed){
			//decide on enemies direction

			var counter3 = 0;
			setInterval( iLikeToMoveIt, 50 );
			var direction = "right";
			var that = this;
			function iLikeToMoveIt() {
				//start default movement
				
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

					if ( EnemyBasics.life() !== 0 ) {
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
			
			this.y = 0;

		}
		if ( y < 0 ) {
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

	

	let EnemyBasics = {
		redEnemyX: 100,
		redEnemyY: 0,
		redEnemySpeed: 10,
		redEnemyX2: 350,
		redEnemyY2: 200,
		redEnemy2Speed: 15,
		direction: function() {
			return ActivateEnemyPowers.choseDirection()
		},
		direction2: function() {
			return ActivateEnemyPowers2.choseDirection()
		},
		createRedEnemy: function() {
			let loadEnemies = new Image();
			loadEnemies.src = "pac.png";
			return loadEnemies.onload = function () {
				context.drawImage(loadEnemies, 0, 0, 32, 32, 100, 0, 32, 32);			
				//ActivateEnemyPowers.move();	
				//setInterval( ActivateEnemyPowers.testMove, 2000)				
				// set "fluid" moving, but need previous state to be deleted
				ActivateEnemyPowers.testMove();
			}
			
		},
		createYellowEnemy: function() {
			let loadEnemies = new Image();
			loadEnemies.src = "pac.png";
			return loadEnemies.onload = function () {

				context.drawImage(loadEnemies, 64, 0, 32, 32, 350, 200, 32, 32);			
				//ActivateEnemyPowers.move();	
				//setInterval( ActivateEnemyPowers.testMove, 2000)				
				// set "fluid" moving, but need previous state to be deleted
				ActivateEnemyPowers2.testMove();
			}
			
		},
		life: function() {
			return 3;
		},
		
	};

	let ActivateEnemyPowers = {
		testMove: function(){
			//decide on enemies direction

			var counter3 = 0;
			setInterval( iLikeToMoveIt, 50 );
			var direction = "right";
			function iLikeToMoveIt() {
				//start default movement
				
				counter3++;
				if ( counter3 == 30 ) {
					direction = EnemyBasics.direction();
					counter3=0;
				}

				let loadEnemies = new Image();
				loadEnemies.src = "pac.png";

				if ( direction === "right" ) {
					
						ActivateEnemyPowers.stayInside( EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, "right" );

						if ( EnemyBasics.life() !== 0 ) {
							context.fillRect(EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, 32, 32);

							EnemyBasics.redEnemyX += EnemyBasics.redEnemySpeed;

							context.drawImage(loadEnemies, 0, 0, 32, 32, EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, 32, 32);
						}					
				}

			
				if ( direction === "left" ) {
					
					ActivateEnemyPowers.stayInside( EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, "left" );

					if ( EnemyBasics.life() !== 0 ) {
						context.fillRect(EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, 32, 32);

						EnemyBasics.redEnemyX -= EnemyBasics.redEnemySpeed;
						
						context.drawImage(loadEnemies, 0, 0, 32, 32, EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, 32, 32);
					}
				}

				if ( direction === "up" ) {
					
					ActivateEnemyPowers.stayInside( EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, "up" );

					if ( EnemyBasics.life() !== 0 ) {
						context.fillRect(EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, 32, 32);

						EnemyBasics.redEnemyY -= EnemyBasics.redEnemySpeed;
						
						context.drawImage(loadEnemies, 0, 0, 32, 32, EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, 32, 32);
						
					}
				}

				if ( direction === "down" ) {
					
					ActivateEnemyPowers.stayInside( EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, "down" );

					if ( EnemyBasics.life() !== 0 ) {
						context.fillRect(EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, 32, 32);

						EnemyBasics.redEnemyY += EnemyBasics.redEnemySpeed;
						
						context.drawImage(loadEnemies, 0, 0, 32, 32, EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, 32, 32);
						
					}
				}

			}
		},
		move: function() {
			setInterval( function() {
				let loadEnemies = new Image();
				loadEnemies.src = "pac.png";
				
				//every 2 second change direction
				var direction = EnemyBasics.direction(); 
				
				
				// move right
				if ( direction === "right" ) {
					setInterval( function() {

					ActivateEnemyPowers.stayInside( EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, "right" );

					if ( EnemyBasics.life() !== 0 ) {
						context.drawImage(loadEnemies,0, 0, 32, 32, EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, 32, 32);
						EnemyBasics.redEnemyX+=32;
						//EnemyBasics.redEnemyY+=0;
						//clear previous position
						context.fillRect(EnemyBasics.redEnemyX-64, EnemyBasics.redEnemyY, 32, 32);
					}
					

					}, 500);
				}

				// move left
				if ( direction === "left" ) {
					setInterval( function() {

					ActivateEnemyPowers.stayInside( EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, "left" );

					if ( EnemyBasics.life() !== 0 ) {
						context.drawImage(loadEnemies,0, 0, 32, 32, EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, 32, 32);
						EnemyBasics.redEnemyX-=32;
						//EnemyBasics.redEnemyY+=0;
						//clear previous position
						context.fillRect(EnemyBasics.redEnemyX+64, EnemyBasics.redEnemyY, 32, 32);
					}
					

					}, 500);
				}

				// move below
				if ( direction === "down" ) {
					setInterval( function() {

					ActivateEnemyPowers.stayInside( EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, "down" );

					if ( EnemyBasics.life() !== 0 ) {
						context.drawImage(loadEnemies,0, 0, 32, 32, EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, 32, 32);
						EnemyBasics.redEnemyY+=32;
						//EnemyBasics.redEnemyY+=0;
						//clear previous position
						context.fillRect(EnemyBasics.redEnemyX, EnemyBasics.redEnemyY-64, 32, 32);
					}
					

					}, 500);
				}

				// move on up
				if ( direction === "up" ) {
					setInterval( function() {

					ActivateEnemyPowers.stayInside( EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, "up" );

					if ( EnemyBasics.life() !== 0 ) {
						context.drawImage(loadEnemies,0, 0, 32, 32, EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, 32, 32);
						EnemyBasics.redEnemyY-=32;
						//EnemyBasics.redEnemyY+=0;
						//clear previous position
						context.fillRect(EnemyBasics.redEnemyX, EnemyBasics.redEnemyY+64, 32, 32);
					}
					

					}, 500);
				}
				if ( direction === "diagonal-down-right") {

					setInterval( function() {

					ActivateEnemyPowers.stayInside( EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, direction );

					if ( EnemyBasics.life() !== 0 ) {
						context.drawImage(loadEnemies,0, 0, 32, 32, EnemyBasics.redEnemyX, EnemyBasics.redEnemyY, 32, 32);
						EnemyBasics.redEnemyX+=32;
						EnemyBasics.redEnemyY+=32;
						//clear previous position
						context.fillRect(EnemyBasics.redEnemyX-64, EnemyBasics.redEnemyY-64, 32, 32);
					}
					

				}, 500);
				}
			
			
				EnemyBasics.redEnemyX++;
				EnemyBasics.redEnemyY++;
			}, 3000)
			


		},
		stayInside: function( x, y, direction ) {
			if ( x > pacmanWidth) {
					//delete enemy image, when horisontal right down
					context.fillRect(x-32, y-32, 32, 32);

					if ( direction === "right" ) {
						//delete enemy image
						context.fillRect(x-32, y, 32, 32);
					}
					
					EnemyBasics.redEnemyX = 0;
				}
			if ( x < 0 ) {
				if ( direction === "left" ) {
					//delete enemy image
					context.fillRect(x, y, 32, 32);
				}
				
				EnemyBasics.redEnemyX = pacmanWidth;
			}
			if ( y > pacmanHeight ) {

				if ( direction === "down" ) {
					//delete enemy image
					context.fillRect(x, y-32, 32, 32);
				}
				
				EnemyBasics.redEnemyY = 0;

			}
			if ( y < 0 ) {
				if ( direction === "up" ) {
					//delete enemy image
					context.fillRect(x, y, 32, 32);
				}
				EnemyBasics.redEnemyY = pacmanHeight;
				
			}
		},
		choseDirection: function() {
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
	}
	
	let ActivateEnemyPowers2 = {
			testMove: function(){
				//decide on enemies direction

				var counter = 0;
				setInterval( iLikeToMoveIt, 50 );
				var direction = "right";
				function iLikeToMoveIt() {
					//start default movement
					
					counter++;
					if ( counter == 30 ) {
						direction = EnemyBasics.direction2();
						counter=0;
					}
		
					let loadEnemies = new Image();
					loadEnemies.src = "pac.png";

					if ( direction === "right" ) {
						
							ActivateEnemyPowers2.stayInside( EnemyBasics.redEnemyX2, EnemyBasics.redEnemyY2, "right" );

							if ( EnemyBasics.life() !== 0 ) {
								context.fillRect(EnemyBasics.redEnemyX2, EnemyBasics.redEnemyY2, 32, 32);

								EnemyBasics.redEnemyX2 += EnemyBasics.redEnemy2Speed;

								context.drawImage(loadEnemies, 64, 0, 32, 32, EnemyBasics.redEnemyX2, EnemyBasics.redEnemyY2, 32, 32);
							}					
					}

				
					if ( direction === "left" ) {
						
						ActivateEnemyPowers2.stayInside( EnemyBasics.redEnemyX2, EnemyBasics.redEnemyY2, "left" );

						if ( EnemyBasics.life() !== 0 ) {
							context.fillRect(EnemyBasics.redEnemyX2, EnemyBasics.redEnemyY2, 32, 32);

							EnemyBasics.redEnemyX2 -= EnemyBasics.redEnemy2Speed;
							
							context.drawImage(loadEnemies, 64, 0, 32, 32, EnemyBasics.redEnemyX2, EnemyBasics.redEnemyY2, 32, 32);
						}
					}

					if ( direction === "up" ) {
						
						ActivateEnemyPowers2.stayInside( EnemyBasics.redEnemyX2, EnemyBasics.redEnemyY2, "up" );

						if ( EnemyBasics.life() !== 0 ) {
							context.fillRect(EnemyBasics.redEnemyX2, EnemyBasics.redEnemyY2, 32, 32);

							EnemyBasics.redEnemyY2 -= EnemyBasics.redEnemy2Speed;
							
							context.drawImage(loadEnemies, 64, 0, 32, 32, EnemyBasics.redEnemyX2, EnemyBasics.redEnemyY2, 32, 32);
							
						}
					}

					if ( direction === "down" ) {
						
						ActivateEnemyPowers2.stayInside( EnemyBasics.redEnemyX2, EnemyBasics.redEnemyY2, "down" );

						if ( EnemyBasics.life() !== 0 ) {
							context.fillRect(EnemyBasics.redEnemyX2, EnemyBasics.redEnemyY2, 32, 32);

							EnemyBasics.redEnemyY2 += EnemyBasics.redEnemy2Speed;
							
							context.drawImage(loadEnemies, 64, 0, 32, 32, EnemyBasics.redEnemyX2, EnemyBasics.redEnemyY2, 32, 32);
							
						}
					}

				}
			},
			stayInside: function( x, y, direction ) {
				if ( x > pacmanWidth) {
						//delete enemy image, when horisontal right down
						context.fillRect(x-32, y-32, 32, 32);

						if ( direction === "right" ) {
							//delete enemy image
							context.fillRect(x, y, 32, 32);
						}
						
						EnemyBasics.redEnemyX2 = 0;
					}
				if ( x < 0 ) {
					if ( direction === "left" ) {
						//delete enemy image
						context.fillRect(x, y, 32, 32);
					}
					
					EnemyBasics.redEnemyX2 = pacmanWidth;
				}
				if ( y > pacmanHeight ) {

					if ( direction === "down" ) {
						//delete enemy image
						context.fillRect(x, y, 32, 32);
					}
					
					EnemyBasics.redEnemyY2 = 0;

				}
				if ( y < 0 ) {
					if ( direction === "up" ) {
						//delete enemy image
						context.fillRect(x, y, 32, 32);
					}
					EnemyBasics.redEnemyY2 = pacmanHeight;
					
				}
			},
			choseDirection: function() {
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
		}
	function init() {
		createBoard();
		//new Object
		PacmanBasics.createPacman();
		PacmanBasics.pacmanWeapon();
		//create Beigns
		//createBeigns.Pacman();
		//createBeigns.Weapon();
		//EnemyBasics.createRedEnemy();
		//EnemyBasics.createYellowEnemy();

		/* CREATE ENEMIES */

		let newPinkEnemy = new CreateEnemy(400, 400, 10, 128, 0);
		let newRedEnemy = new CreateEnemy( 500, 200, 6, 0, 0);
		let newYellowEnemy = new CreateEnemy( 300, 200, 6, 96, 0);
		let newQQQEnemy = new CreateEnemy( 100, 200, 6, 160, 0);
		
		newPinkEnemy.load();
		newRedEnemy.load();
		newYellowEnemy.load();
		newQQQEnemy.load();
	}

	//start the game
	init();

} )();