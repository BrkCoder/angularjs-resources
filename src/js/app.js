/**
 * Created by Brk
 * main app script.
 * Date Modified: 2-7-16
 * Date Created: 30-6-16
 */
angular.module('app', ['ngGage']).controller('myController', function($scope) {
    $scope.value1 = 42;
    $scope.value2 = 42;
    setInterval(function(){
        $scope.$apply(function() {
            $scope.value1 = getRandomInt(10, 90);
            $scope.value2 = getRandomInt(10, 90);
        });
    }, 1000);
});
