var spellControllers = angular.module('spellControllers', ['ngAnimate', 'ngSanitize']);

spellControllers.controller('ListController', function ($scope, $http) {

	$http.get("js/data.json").then(function(response) {
		$scope.spells = response.data;
		$scope.artistOrder = 'name';
	});

});

spellControllers.controller('DetailsController', function ($scope, $http, $routeParams, $sce) {

	$http.get("js/data.json").then(function(response) {
		$scope.spells = response.data;
		$scope.whichItem = $routeParams.itemId;
		$scope.detailDesc = $scope.spells[$scope.whichItem].desc;


		if($routeParams.itemId > 0 ) {
			$scope.prevItem = Number($routeParams.itemId) - 1;
		} else {
			$scope.prevItem = $scope.spells.length - 1;
		}

				if($routeParams.itemId < $scope.spells.length - 1 ) {
			$scope.nextItem = Number($routeParams.itemId) +1;
		} else {
			$scope.nextItem = 0;
		}

	});

});

