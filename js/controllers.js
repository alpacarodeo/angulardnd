var spellControllers = angular.module('spellControllers', []);

spellControllers.controller('ListController', function ($scope, $http) {

	$http.get("js/data.json").then(function(response) {
		$scope.spells = response.data;
		$scope.artistOrder = 'name';
	});

});

spellControllers.controller('DetailsController', function ($scope, $http, $routeParams) {

	$http.get("js/data.json").then(function(response) {
		$scope.spells = response.data;
		$scope.whichItem = $routeParams.itemId;
	});

});

