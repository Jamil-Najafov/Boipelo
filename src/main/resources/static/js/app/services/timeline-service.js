angular.module('boipelo').service("timelineService", timelineService);
timelineService.$inject = [ '$q', 'SpringDataRestAdapter', 'api' ];

function timelineService($q, SpringDataRestAdapter, api) {

	this.getTimeline = getTimeline;

	// Resource discovery using the api service and angular-spring-data-rest.
	// Takes long but is more elegant as you don't need to hard code URIs but
	// only the resource link relations (rels).
	function getTimeline(userId) {

		var deferred = $q.defer();

		getApiBase()
				.then(
						function(apiBase) {

							// Discover the users URI by it's rel ('users').
							var usersResource = apiBase._resources('users');

							usersResource.get({
								id : userId
							}).$promise
									.then(function(user) {

										processedUser = SpringDataRestAdapter
												.process(user);

										var timelineResource = processedUser
												._resources('timeline');

										timelineResource.get().$promise
												.then(function(timeline) {

													SpringDataRestAdapter
															.process(
																	timeline,
																	[
																			'poster',
																			'comments',
																			'commenter' ],
																	true).$promise
															.then(function(
																	processedTimeline) {

																deferred
																		.resolve(processedTimeline._embeddedItems ? processedTimeline._embeddedItems
																				: []);

															})
												})
									})
						})

		return deferred.promise;
	}

	function getApiBase() {

		return api.getBase().then(function(apiBase) {
			return apiBase;
		});
	}

}