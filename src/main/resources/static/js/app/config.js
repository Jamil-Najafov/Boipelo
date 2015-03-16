var app = angular.module('boipelo', [ 'ngRoute', 'ngResource',
		'spring-data-rest', "angularFileUpload" ]);

app.config(function($routeProvider, $httpProvider,
		SpringDataRestAdapterProvider) {

	$routeProvider.when('/test', {
		controller : 'TestController',
		templateUrl : "js/app/test/test.html"
	}).when('/', {
		controller : 'HomeController',
		templateUrl : 'js/app/home/home.html'
	}).when('/profile/:login', {
		controller : 'ProfileController',
		templateUrl : 'js/app/profile/profile.html'
	}).when('/register', {
		controller : 'RegistrationController',
		templateUrl : 'js/app/registration/register.html'
	}).when('/login', {
		controller : 'LoginController',
		templateUrl : 'js/app/login/login.html'
	}).otherwise({
		templateUrl : 'js/app/pagenotfound.html'
	});

	$httpProvider.interceptors.push('httpInterceptor');
	
	//$httpProvider.defaults.cache = true;

	/*
	 * SpringDataRestAdapterProvider.config({ 'fetchFunction': function (url,
	 * key, data, fetchLinkNames, recursive) { // fetch the url and add the key
	 * to the data object
	 *  } });
	 */

});

/*app.run(function($http, $cacheFactory) {
    $http.defaults.cache = true;
});*/

/*
 * app.config(function (SpringDataRestAdapterProvider, $resource) {
 *  // set the new resource function SpringDataRestAdapterProvider.config({
 * 'resourcesFunction': function (url, paramDefaults, actions, options) { return
 * $resource(url + '/:id', paramDefaults, actions, options); } }); });
 */