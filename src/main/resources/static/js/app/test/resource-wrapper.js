angular.module('boipelo').factory('ResourceWrapper',
		[ '$resource', function($resource) {
			return function(url, paramDefaults, actions) {
				var searchUrl = url + "/Search/:searchCriteria"
				var MY_ACTIONS = {
					'query' : {
						method : 'GET',
						isArray : false
					},
					'update' : {
						method : 'PUT'
					},
					'search' : {
						method : 'GET',
						url : searchUrl,
						'params' : {
							searchCriteria : '@searchCriteria'
						},
						isArray : true
					}
				};
				actions = angular.extend({}, MY_ACTIONS, actions);
				return $resource(url, paramDefaults, actions);
			}
		} ])