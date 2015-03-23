angular.module('boipelo').factory('PreferencesFactory', PreferencesFactory);
PreferencesFactory.$inject = ['$localStorage'];

function PreferencesFactory($localStorage) {
	
	return {
		setLanguage: setLanguage,
		getLanguage: getLanguage
	};
	
	function setLanguage(languageCode){
		$localStorage.language = languageCode;
	}
	
	function getLanguage(languageCode){
		return $localStorage.language;
	}
}