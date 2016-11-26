var myApp = angular.module('myApp', []);

myApp.controller('MyController', function ($scope, $http) {

	$http.get("js/data.json").then(function(response) {
		$scope.spells = response.data;
	});

});