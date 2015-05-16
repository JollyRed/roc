//initial setup
var that = this;
var canvasDivID = 'glcanvas';

var render_game = function (interpolation) {
	that.Viewer.render(interpolation);
};

var degrees = 0;
var update_game = function (simulationTimestep) {
	var movementrate = 0.005,
      move = {},
      rotate = {};

  move.x = (that.inputHandler.key.isDown(that.inputHandler.key.D) ? movementrate*simulationTimestep : 0) - ((that.inputHandler.key.isDown(that.inputHandler.key.A)) ? movementrate*simulationTimestep : 0);
  move.y = that.inputHandler.mouse.isDown(that.inputHandler.mouse.LEFT) ? (that.inputHandler.mouse.startposition.y - that.inputHandler.mouse.position.y)*movementrate : 0;
  move.z = ((that.inputHandler.key.isDown(that.inputHandler.key.S)) ? movementrate*simulationTimestep : 0) - ((that.inputHandler.key.isDown(that.inputHandler.key.W)) ? movementrate*simulationTimestep : 0);

  rotate.x = (that.inputHandler.key.isDown(that.inputHandler.key.DOWN) ? movementrate*simulationTimestep : 0) - ((that.inputHandler.key.isDown(that.inputHandler.key.UP)) ? movementrate*simulationTimestep : 0);
  rotate.y = (that.inputHandler.key.isDown(that.inputHandler.key.RIGHT) ? movementrate*simulationTimestep : 0) - ((that.inputHandler.key.isDown(that.inputHandler.key.LEFT)) ? movementrate*simulationTimestep : 0);
  rotate.z = 0;

  that.CharacterHandler.player.move(move.x,move.y,move.z);
  that.CharacterHandler.player.rotate(rotate.x,rotate.y,rotate.z);

  for (var i=0; i<that.CharacterHandler.nonplayers.length; i++){
    that.CharacterHandler.nonplayers[i].setPosition({
        x: -1.5*(i+1)*Math.cos((i+1)*degrees*Math.PI/180),
        y: -1.5*(i+1)*Math.sin((i+1)*degrees*Math.PI/180),
        z: 0
      });
  }
  degrees += 1;
  degrees = degrees < 360 ? degrees : 0;
};

//main game loop
var runGame = function () {
  that.Viewer.init(canvasDivID);
  that.Viewer.addCharacters([that.CharacterHandler.player]);
  that.Viewer.addCharacters(that.CharacterHandler.nonplayers);
	that.MainLoop.setUpdate(update_game);
	that.MainLoop.setDraw(render_game);
  that.inputHandler = that.InputHandler.init(canvasDivID);
	that.MainLoop.start();
}

$(document).ready( runGame );
