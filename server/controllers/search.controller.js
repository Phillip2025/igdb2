var mongoose = require('mongoose');
var Game = mongoose.model('Game');
chalk = require('chalk');

exports.getGamesByTerm = function(req, res, next, term) {
	console.log("Peticion por nombre: " + term );
	var regex = new RegExp('^.*'+term+'.*$', "i");
	Game.find({gameTitle: regex}).exec( function(err, games) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno de servidor'
			});
		}
		if (games.length === 0) {
			console.log(chalk.red("No hay similitudes"));
			return res.json({
				message: 'No hay similitudes'
			});
		}
		req.games = games;
		next();
	});
};

exports.getGamesByLetter = function(req, res) {
	var letter = req.query.letter;
	console.log("Peticion por letra" + letter);
	var regex = new RegExp('^' + letter + '.*$', 'i');
	Game.find({gameTitle: regex}).select('gameTitle').sort('rating').exec( function(err, games) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno de servidor'
			});
		}
		if (games.length === 0) {
			console.log(chalk.red("No hay similitudes"));
			return res.json({
				message: 'No hay juegos que comiencen por esa letra'
			});
		}
		res.json(games);
		
	});
};

exports.getLatestGames = function(req, res) {
	console.log("Peticion de ultimos juegos");
	Game.find().sort('-created').limit(12).exec(function (err, games) {
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

exports.read = function(req, res) {
		res.json(req.games);
};