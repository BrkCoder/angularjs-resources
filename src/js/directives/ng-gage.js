/**
 * Created by Brk
 * ng-gage script.
 * AngularJS directive wrapper
 * which enables you to create
 * dynamic gage components.
 * Date Modified: 1-8-15
 * Date Created: 30-6-15
 */
/**
 * Technical Comments:
 * First we define to which set of components the directive will be trigger by: Element(E) || Attribute(A) || Class(C).
 * Second we define inner scope for current directive.
 * Third we define template and link function.
 */
'use strict';
angular.module('ngGage',[])
    .directive('ngJustGage',['$timeout',function($timeout){
    return{
        restrict: 'EA',
        scope: {
            id:'@',
            class:'@',
            min: '=',
            max: '=',
            title: '@',
            value: '=',
            showMinMax : '=',
            gaugeColor : '=',
            label: '=',
            startAnimationTime: '=',
            startAnimationType: '=',
            refreshAnimationTime : '=',
            refreshAnimationType: '=',
            gaugeWidthScale: '=',
            options: '='
        },
        template:'<div id="{{id}}-gage" class="{{class}}"></div>',
        link:function(scope, element, attrs){
            $timeout(function(){

                var options = {
                    id: scope.id+'-gage',
                    min: scope.min || 0,
                    max: scope.max || 100,
                    title: scope.title,
                    value: scope.value,
                    showMinMax: scope.showMinMax || false,
                    gaugeColor: scope.gaugeColor || '#ffffff',
                    label: scope.label,
                    startAnimationTime: scope.startAnimationTime,
                    startAnimationType: scope.startAnimationType,
                    refreshAnimationTime : scope.refreshAnimationTime,
                    refreshAnimationType:  scope.refreshAnimationType,
                    gaugeWidthScale: scope.gaugeWidthScale || 1
                };

                if(scope.options){
                    for(var k in scope.options){
                        options[k] = scope.options[k];
                    }
                }

                var plot = new JustGage(options);

                scope.$watch('value',function(currentValue){
                    if(typeof (currentValue) !== "undefined"){
                        plot.refresh(currentValue);
                        return true;
                    }else{
                        console.log('current value is undefined!');
                        return false;
                    }
                },true);

                scope.$watch('max',function(currentMax){
                    if(typeof (currentMax) !== "undefined"){
                        plot.refresh(scope.value,currentMax);
                        return true;
                    }else{
                        console.log('current max is undefined!');
                        return false;
                    }
                },true);

            });
        }
    }

}]);

