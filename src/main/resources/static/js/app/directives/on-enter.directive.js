angular.module('boipelo').directive('onKeyEnter', onKeyEnter);

function onKeyEnter() {
	return function(scope, element, attrs) {
		
		element.bind("keydown keypress", function(event) {
			if (event.which === 13) {
				scope.$apply(function() {
					scope.$eval(attrs.onKeyEnter);
				});

				event.preventDefault();
			}
		});
	};
}