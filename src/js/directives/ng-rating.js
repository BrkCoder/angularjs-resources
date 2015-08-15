'use strict';
(function(){
    angular.module('ngRating',[])
        .directive('ngStarRating',function(){
            return{
            restrict: 'EA',
            scope:{
                id: '@',
                class : '@',
                ratingValue: '=ngModel',// value derived from ngModel value.
                ratingMax: '=?', // optional (default is 5).
                ratingMin: '=?' // optional (default is 0).
            },
            template:   '<ul class="{{class}} star-rating" id="{{id}}-ng-star-rating" >' +
                        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggleRating($index)">' +
                        ' &#9733' + // filled star
                        ' </li>' +
                        '</ul>',
            link: function(scope,element,attrs){
                if(typeof (scope.ratingMax) == "undefined"){
                    scope.ratingMax = 5;
                }

                if(typeof (scope.ratingMin) == "undefined"){
                    scope.ratingMin = 0;
                }

                scope.toggleRating = function(index){
                    scope.ratingValue = index + 1;
                }

                function updateRating() {
                    scope.stars = [];
                    var ratingValue = Math.round(Math.max(Math.min(scope.ratingMax,scope.ratingValue),scope.ratingMin))
                    for (var i = 0; i < scope.ratingMax; i++) {
                        scope.stars.push({ filled: i < ratingValue });

                    }
                };

                scope.$watch('ratingValue', function(oldValue, newValue) {
                    if (typeof(newValue) !== "undefined" ) {
                        updateRating();
                    }
                });
            }
        }});
})();
