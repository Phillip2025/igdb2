//declaracion de app y sus dependencias
var app = angular.module('igdbAngular', ['ui.router', 'controllers', 'directives', 'ngAnimate', 'ui.bootstrap', 'ui.autocomplete', 'pascalprecht.translate', 'tmh.dynamicLocale']);  


//state provider
app.config(function($stateProvider, $urlRouterProvider, $translateProvider, $compileProvider, tmhDynamicLocaleProvider) {

	//Produccion
	//$compileProvider.debugInfoEnabled(false);

	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('home', {
		url: '/',
		templateUrl: 'main.html',
	})
	.state('search', {
		url: '/search/:term',
		templateUrl: 'search.html'
	})
	.state('game', {
		url: '/games/:id',
		templateUrl: 'game.html'
	})
	.state('perfil',{
		url:'/perfil',
		templateUrl:'perfil.html'
	})
	.state('platforms',{
		url: '/platforms',
		templateUrl: 'platforms.html'
	})
	.state('platform',{
		url: '/platforms/:id',
		templateUrl: 'platform.html'
	})
	.state('newplatform',{
		url: '/admin/newplatform',
		templateUrl: 'newplatform.html'
	})
	.state('updateplatform',{
		url:'/edit/:id',
		templateUrl:'updateplatform.html'
	})

	$translateProvider
	.translations('es', translationsES)
	.translations('en', translationsEN)
	.preferredLanguage('es')
	.useSanitizeValueStrategy(null);

	tmhDynamicLocaleProvider
	.localeLocationPattern('js/ext/angular-locale_{{locale}}.js');

});

app.run(function ($rootScope, $location, $http) {
    $http.get('/confirmlogin')
        .success(function (user) {
        	$rootScope.user = user;
        })
        .error(function (err) {
        	console.log("Error: " + err);
        });
});

app.constant('esrbENG', 
	['T - Teen','M - Mature','E - Everyone','E10+ - Everyone 10+','RP - Rating Pending','EC - Early Childhood']
);

app.constant('esrbESP',
	['16','18','TP','10','RP','3']
);

app.constant('players',
	['1', '2', '3', '4+']
);

app.constant('genres',
	['Shooter','Action','Flight Simulator','Role-Playing','Adventure',
			'Sandbox','Fighting','Racing','Horror','MMO','Platform',
			'Puzzle','Strategy','Stealth','Sports','Construction and Management Simulation',
			'Vehicle Simulation','Life Simulation','Music']
);

var translationsES = {
	SLOGAN_1: "Contamos con ",
	SLOGAN_2: " juegos al menos!",
	NAV: {
		GAMES: "Juegos",
		PLATFORMS: "Plataformas",
		API: "Json Api",
		ABOUT: "¿Quienes somos?",
		SEARCH_PLACEHOLDER: "Busca tu juego",
	},
	LAST_GAMES: "Últimos juegos añadidos",
	GAME: {
		TITLE: "Titulo",
		ALTERNATE_TITLES: "Títulos alternativos",
		PLATFORM: "Plataforma",
		OTHER_PLATFORMS: "Otras plataformas",
		RELEASE_DATE: "Fecha de lanzamiento",
		ESRB: "Calificación por edades",
		PLAYERS: "Jugadores",
		COOP: "Cooperativo",
		COOPVALUES: {
			YES: 'Si',
			NO: 'No'
		},
		OVERVIEW: "Descripción",
		PUBLISHER: "Editor",
		DEVELOPER: "Desarrollador",
		GENRES: "Géneros",
		RATING: "Calificación",
		BANNERS: "Banners",
		SCREENSHOTS: "Capturas de pantalla",
		FANARTS: "Imágenes de usuarios",
		COMMENTS: "Comentarios",
		NO_COMMENTS: "No hay comentarios, que esperas para ser el primero?",
		ADD_COMMENT: "Publicar comentario"
	},
	PLATFORM: {
		PLATFORM: "Plataforma",
		OVERVIEW: "Descripción",
		DEVELOPER: "Desarrollador",
		MANUFACTURER: "Fabricante",
		CPU: "Procesador",
		MEMORY: "Memoria",
		GRAPHICS: "Grafica",
		SOUND: "Sonido", 
		DISPLAY: "",
		MEDIA: "",
		MAXCONTROLLERS: "Maximo de Controladores",
		BANNERS: "Banners",
		SCREENSHOTS: "Capturas de pantalla",
		FANARTS: "Imágenes de usuarios"
	},
	NEW_USER_FORM: "Registro de nuevo usuario",
	USER: {
		USERNAME: "Nombre de usuario",
		PASSWORD: "Password",
		NAME: "Nombre",
		SURNAME: "Apellidos",
		EMAIL: "E-Mail",
		PICTURE: "Imagen de perfil"
	}
};

var translationsEN = {
	SLOGAN_1: "Counting with at least ",
	SLOGAN_2: " games!",
	NAV: {
		GAMES: "Games",
		PLATFORMS: "Platforms",
		API: "Json Api",
		ABOUT: "About us",
		SEARCH_PLACEHOLDER: "Search your game",
	},
	LAST_GAMES: "Last added games",
	GAME: {
		TITLE: "Title",
		ALTERNATE_TITLES: "Alternate titles",
		PLATFORM: "Platform",
		OTHER_PLATFORMS: "Other plataforms",
		RELEASE_DATE: "Release date",
		ESRB: "ESRB Rating",
		PLAYERS: "Players",
		COOP: "Cooperative",
		COOPVALUES: {
			YES: 'Yes',
			NO: 'No'
		},
		OVERVIEW: "Overview",
		PUBLISHER: "Publisher",
		DEVELOPER: "Developer",
		GENRES: "Genres",
		RATING: "Rating",
		BANNERS: "Banners",
		SCREENSHOTS: "Screenshots",
		FANARTS: "Fanart",
		COMMENTS: "Comments",
		NO_COMMENTS: "There are no comments, what are you waiting to write the first one?",
		ADD_COMMENT: "Add comment"
	},
	PLATFORM:{
		PLATFORM: "Platform",
		OVERVIEW: "Overview",
		DEVELOPER: "Developer",
		MANUFACTURER: "Manufacturer",
		CPU: "CPU",
		MEMORY: "Memory",
		GRAPHICS: "Graphics",
		SOUND: "Sound", 
		DISPLAY: "Display",
		MEDIA: "Media",
		MAXCONTROLLERS: "Controllers",
		BANNERS: "Banners",
		SCREENSHOTS: "Screenshots",
		FANARTS: "Fanarts"
	},
	NEW_USER_FORM: "User Sign Up",
	USER: {
		USERNAME: "Username",
		PASSWORD: "Password",
		NAME: "Name",
		SURNAME: "Surname",
		EMAIL: "Email",
		PICTURE: "Profile picture"
	}
};