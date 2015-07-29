/**
 * Created by Brk
 * main app script.
 * Date Modified: 2-7-16
 * Date Created: 30-6-16
 */
const INIT_VALUE = 50;
const INIT_SPEED = 20;
const INIT_RATE = 120;
const MAX_RATE = 200;
const MIN_RATE = 104;
const MAX_VALUE = 100;
const MIN_VALUE = 10;
const REFRESH_TIME = 900;
angular.module('app', ['ngGage','ngDatePicker']).controller('mainController', function($scope) {
    $scope.speed          = INIT_SPEED;
    $scope.heartRate      = INIT_RATE;
    $scope.electorals     = 70;
    $scope.grade          = 70;
    $scope.mandate        = 6;
    $scope.width          = 0.1;
    $scope.disabledFlag       = false;
    setInterval(function(){
        $scope.$apply(function() {
            $scope.speed = getRandomInt(MIN_VALUE, MAX_VALUE);
            $scope.heartRate = getRandomInt(MIN_RATE, MAX_RATE);
            $scope.electorals = getRandomInt(60, 540);
            $scope.mandate = getRandomInt(4, 120);
            $scope.grade = getRandomInt(55, 100);
            $scope.disabledFlag = !$scope.disabledFlag;
        });
    }, REFRESH_TIME);
});

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
