var games = require('../controllers/games.controller');
var user = require('../controllers/users.controller');

module.exports = function(app) {

	app.route("/games/:id/comments/:com")
		.put(user.requiresLogin, games.updateComment)
		.delete(user.requiresLogin, games.deleteComment);

	app.route("/games/:id/comments")
		.post(user.requiresLogin, games.insertComment);

	//los ratings creo que van a ir al user, tiene mas logica
	/*app.route("games/:id/ratings")
		.put(user.requiresLogin, games.editRating)
		.delete(user.requiresLogin, games.deleteRating);

	app.route("games/:id/ratings")
		.post(user.requiresLogin, games.addRating);*/
	/*app.route("games/:id/ratings")
		.post(user.requiresLogin, games.addRating);	*/
	app.post('/games/:id/ratings', user.requiresLogin, games.addRating);
	app.route("/games/:id")
		.get(games.read)
		.put(user.requiresLogin, user.hasAuthorization, games.updateGame)
		.delete(user.requiresLogin, user.hasAuthorization, games.deleteGame);

	app.route("/games")
		.get(games.getAllGames)
		.post(user.requiresLogin, user.hasAuthorization, games.insertGame);

	app.get('/count', games.getCount);

	app.param('id', games.getGameById);
	
	app.get('/platform', games.getPlatform);
};