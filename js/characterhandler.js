(function(root) {

	var Character = function(options) {
		var options = options ? options : {};
		this.geometry = options.geo ? options.geo : new THREE.BoxGeometry( 1, 1, 1 );
		//this.material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('http://threeleggedcats.weebly.com/uploads/5/2/2/3/52239135/1617350_orig.jpg') });
		//this.material = new THREE.MeshLambertMaterial();
		this.model = options.model ? options.model : new THREE.Mesh( this.geometry, new THREE.MeshLambertMaterial() );

	  this.setPosition = function(pos) {
	    this.model.position.x = pos.x ? pos.x : 0;
	    this.model.position.y = pos.y ? pos.y : 0;
	    this.model.position.z = pos.z ? pos.z : 0;
	  };
	  this.setPosition({x:(options.x ? options.x : 0), y:(options.y ? options.y : 0),z:(options.z ? options.z : 0)});

	  this.rotate = function(x,y,z){
	    this.model.rotation.x += x ? x : 0;
	    this.model.rotation.y += y ? y : 0;
	    this.model.rotation.z += z ? z : 0;
	  };

	  this.move = function(x,y,z){
	    this.model.position.x += x ? x : 0;
	    this.model.position.y = y ? y : 0;
	    this.model.position.z += z ? z : 0;

	    // this.model.position.x = this.model.position.x > 3 ? 3 : this.model.position.x;
	    // this.model.position.x = this.model.position.x < -3 ? -3 : this.model.position.x;
	    // this.model.position.z = this.model.position.z > 4 ? 4 : this.model.position.z;
	    // this.model.position.z = this.model.position.z < -2 ? -2 : this.model.position.z;
	  };
	}

	root.CharacterHandler = {
		player: new Character({x:0, y:0, z:0}),
		nonplayers: [new Character({x:2, y:0, z:-2}), new Character({x:-2, y:0, z:-4}), new Character({x:0, y:2, z:-6})]
	}

})(this);