var mongoose = require('mongoose');
var Game = mongoose.model('Game');
chalk = require('chalk');

exports.getGameById = function(req, res, next, id) {
	console.log("Peticion de juego con id " + id);
	var pattern = new RegExp("^[0-9]+$");
	if (!pattern.test(id)) {
		return res.status(400).send({
			message: 'Id invalido'
		});
	}
	Game.findById(id, function(err, game) {
		if (err) return next(err);
		if (!game) {
			console.log(chalk.red("Juego con id " + id + " no encontrado"));
			return res.status(404).send({
				message: 'Juego no encontrado'
			});
		}
		req.game = game;
		next();
	});
};

exports.getCount = function(req, res) {
	Game.count(function (err, count) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno de servidor'
			});
		}
		res.json({'count': count});
	});
};

exports.read = function(req, res) {
	console.log("Peticion de visualizacion");
	res.json(req.game);
};

exports.insertGame = function(req, res) {
	console.log("Peticion de insercion");
	var game = new Game(req.body);

	//Inicializacion de arrays en banner, screenshot y fanart
	var img = {};
	game.images.banner.push(img);
	game.images.screenshot.push(img);
	game.images.fanart.push(img);
	console.log(game);
	game.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(game);
	});
};

exports.updateGame = function(req, res) {
	console.log("Peticion de update");
	var game = new Game(req.body);
	//fix linux: borramos el id para insertar
	game._id = undefined;
	Game.findOneAndUpdate({_id: req.body._id}, game, function (err) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Error interno de servidor'
			});
		}
		//recuperamos el id
		game._id = req.body._id
		res.json(game);
	});
};

exports.deleteGame = function(req, res) {
	console.log("Peticion de borrado");
	var game = req.game;
	game.remove(function(err) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(game);
	});
};

exports.getAllGames = function(req, res){
	console.log("Peticion a todos los juegos");
	Game.find().sort('-releaseDate').exec(function(err, games){
		if(err){
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		else{
			res.json(games);
		}
	});
};

exports.insertComment = function (req, res) {
	console.log("Añadiendo comentario de " + req.user._id + " para el juego " + req.game._id);
	var game = req.game;
	console.log(req.body);
	game.comments.push(req.body);
	game.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(game);
	});
};

exports.updateComment = function (req, res) {
	console.log("Editando comentario de " + req.user._id + " para el juego " + req.game._id);
	var game = req.game;
	console.log(req.body);
	game.comments.push(req.body);
	game.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(game);
	});
};

exports.deleteComment = function (req, res) {
	console.log("Borrando comentario de " + req.user._id + " para el juego " + req.game._id);
	console.log("Id de comentario: " + req.params.com);
	var game = req.game;
	game.comments.pull(req.params.commentId);
	game.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(game);
	});
};

exports.addRating = function (req, res) {
	console.log("Añadiendo rating de " + req.user._id + " para el juego " + req.game._id);
	var game = req.game;
	var aux = 0;	
	var encontrado = false;
	if (game.ratings.length !=0){
		for (var i = 0; i < game.ratings.length; i++){
			if (game.ratings[i].userId == req.user._id){
				encontrado = true;
			}
		}
		if (!encontrado){
			game.ratings.push(req.body);
		}else{
			console.log("Ya votaste este juego");
		}
	} else{
		game.ratings.push(req.body);
	}
	for (var j = 0; j < game.ratings.length;j++){
		aux += game.ratings[j].rate;
	}
	game.rating = (game.rating + aux)/(game.ratings.length+1);
	
	//console.log(req.body);
	game.save(function(err) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(game);
	});
};

exports.getBestGamesByPlatform = function (req, res) {
	var id = req.params.platformId;
	console.log("Mejores juegos para plataforma con id" + id);
	Game.find({'platformId': id}).sort('-rating').limit(12).exec(function (err, games) {
		if (err) {
			res.status(500).send({
				msg: 'Error interno del servidor'
			});
		}
		res.json(games);
	});
};
