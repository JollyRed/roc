
(function(root) {

	// key input
	var Key = {
		_pressed: {},

		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		W: 87,
		A:65,
		S:83,
		D:68,
		isDown: function(keyCode) {
			return this._pressed[keyCode];
		},
		onKeydown: function(event) {
			this._pressed[event.keyCode] = true;
		},
		onKeyup: function(event) {
			delete this._pressed[event.keyCode];
		}
	};

	// mouse input
	var Mouse = {
		pressed: {},
		position: {x: -1,y: -1},
		startposition: {x: -1,y: -1},
		stopposition: {x: -1,y: -1},
		LEFT: 1,
		RIGHT: 3,
		isDown: function(keyCode) {
			return this.pressed[keyCode];
		},
		onMousedown: function(event) {
			this.pressed[event.which] = true;
			this.startposition = {x: event.x,y: event.y};
			this.stopposition = {x: -1,y: -1};
			this.position = {x: event.x,y: event.y};
		},
		onMouseup: function(event) {
			delete this.pressed[event.which];
			this.stopposition = {x: event.x,y: event.y};
			this.position = {x: event.x,y: event.y};
		},
		onMousemove: function(event) {
			this.position = {x: event.x,y: event.y};
		}
	};

	// Key and Mouse Handling
	root.InputHandler = {
	 	key: Key,
		mouse: Mouse,
		init: function(id) {
			var objectToWatch = document.getElementById(id);

			// disable keys
			window.addEventListener("keydown", function(e) {
			// space and arrow keys
			if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
			}
			}, false);

			// track key input
			window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
			window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

			// track mouse input
			objectToWatch.addEventListener('mouseup', function(event) { Mouse.onMouseup(event); }, false);
			objectToWatch.addEventListener('mousedown', function(event) { Mouse.onMousedown(event); }, false);
			objectToWatch.addEventListener('mousemove', function(event) { Mouse.onMousemove(event); }, false);

			return this;
		}
	};

})(this);