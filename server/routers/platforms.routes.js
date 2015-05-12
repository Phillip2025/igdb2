var platforms = require('../controllers/platforms.controller');
var user = require('../controllers/users.controller');

module.exports = function(app) {

	app.route("/platforms/:id/comments/:com")
		.put(user.requiresLogin, platforms.updateComment)
		.delete(user.requiresLogin, platforms.deleteComment);

	app.route("/platforms/:id/comments")
		.post(user.requiresLogin, platforms.insertComment);

	//los ratings creo que van a ir al user, tiene mas logica
	/*app.route("platforms/:id/ratings")
		.put(user.requiresLogin, platforms.editRating)
		.delete(user.requiresLogin, platforms.deleteRating);

	app.route("platforms/:id/ratings")
		.post(user.requiresLogin, platforms.addRating);*/


	app.route("/platforms/:id")
		.get(platforms.read)
		.put(user.requiresLogin, user.hasAuthorization, platforms.updatePlatform)
		.delete(user.requiresLogin, user.hasAuthorization, platforms.deletePlatform);

	app.route("/allplatforms")
		.get(platforms.getAllPlatforms)
		.post(user.requiresLogin, user.hasAuthorization, platforms.insertPlatform);

	app.get('/count', platforms.getCount);

	app.param('id', platforms.getPlatformById);
	
};