(function(root) {
	root.Viewer = {
		scene: new THREE.Scene(),
		renderer: new THREE.WebGLRenderer(),
		camera: new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ),
		ambientLight: new THREE.AmbientLight(0xbbbbbb),
		directionalLight: new THREE.DirectionalLight(0xffffff),
		init: function(id){
			var that = this,
				canvasDiv = $('#'+canvasDivID);

			// camera
			that.camera.position.y = 1;
			that.camera.position.z = 6;

			//renderer
			that.renderer.setSize( canvasDiv.width(), window.innerHeight );
			 window.addEventListener( 'resize', function(){
			 	that.camera.aspect = canvasDiv.width()/window.innerHeight;
			    that.camera.updateProjectionMatrix();
			 	that.renderer.setSize( canvasDiv.width(), window.innerHeight );
			 }, false );
			document.getElementById(id).appendChild( that.renderer.domElement );

			// lighting
			that.directionalLight.position.set(1, 1, 1).normalize();
			that.scene.add(that.directionalLight);
			that.scene.add(that.ambientLight);

			return that;
		},
		render: function (interpolation) {
			this.renderer.render(this.scene, this.camera);
		},
		addCharacters: function (characters) {
			for(var i=0; i<characters.length; i++){
				this.scene.add( characters[i].model );
			}
		}
	}

})(this);