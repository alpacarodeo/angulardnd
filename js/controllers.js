var spellControllers = angular.module('spellControllers', ['ngAnimate', 'ngSanitize', 'ngMaterial']);

/* safely parse html with ngSanitize
*/
spellControllers.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
spellControllers.controller('ListController', function ($scope, $http) {

	/* what
	*/
	Object.defineProperty($scope, "queryFilter", {
      get: function() {
          var out = {};
          out[$scope.queryBy || "$"] = $scope.query;
          return out;
      	}
  	});
	/* grab json data
	*/
	$http.get("js/data.json").then(function(response) {
		$scope.spells = response.data;
		console.log("Response.data: " + response.data);
		$scope.spellOrder = 'name';
	});


	/* check all boxes at once
	https://material.angularjs.org/latest/demo/checkbox */
	$scope.items = ["Bard", "Druid", "Ranger", "Cleric", "Sorcerer", "Paladin", "Wizard", "Warlock"];
	$scope.selected = [];
	$scope.toggle = function(item, list) {
		var idx = list.indexOf(item);
		if (idx > -1) {
			list.splice(idx,1);
		} else {
			list.push(item);
		}
	};
	$scope.exists = function(item, list) {
		return list.indexOf(item) > -1;
	};
	$scope.isIndeterminate = function() {
		return ($scope.selected.length !== 0 &&
				$scope.selected.length !== $scope.items.length);
	};

	$scope.isChecked = function() {
		return $scope.selected.length === $scope.items.length;
	};

	$scope.toggleAll = function() {
		if ($scope.selected.length === $scope.items.length) {
			$scope.selected = [];
		} else if ($scope.selected.length === 0 || $scope.selected.length > 0 ) {
			$scope.selected = $scope.items.slice(0);
		}
	};
	$scope.toggleAll();
	/* end */


	$scope.classFilter = function(item) {
		spellClasses = item.class;
		spellName = item.name;
		console.log(item.name + ": " + item.class);
		var flag = false;
		
		selected = $scope.selected;
		angular.forEach(selected, function(value,key) {
			if (spellClasses.match(value)) {
				console.log(value + " is able to cast " + spellName);

				flag = true;;
			}
		});

		return flag;

		

	};


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

