/**
 * Created by Brk.
 * ng-jquery-date-picker script.
 * AngularJS directive wrapper
 * which enables you to create
 * dynamic  jquery ui date picker components.
 * Date Modified: 1-8-15
 * Date Created: 20-7-15
 */
/**
 * General comments:
 * The directive life cycle:
 * First phase : the compile phase we conduct template DOM manipulation.
 * the compile function will return linking function.
 * Second phase: the linking phase,we conduct a registration process of DOM listeners,
 * we change the content and the behavior of an element after the compilation process has been finished
 * and the element has been added to the DOM tree.
 */
/**
 * Technical Comments:
 * First we define to which set of components the directive will be trigger by: Element(E) || Attribute(A) || Class(C).
 * Second we define inner scope for current directive.
 * Third we define template and link function.
 * In our current case:
 * The directive will be trigger by Element only.
 * The inner scope will contains the following fields:
 * 1.dateFormat: define the format of date output.
 * 2.defaultDate : date to highlight on first opening if the field is blank
 * 3.altField and altFormat: Alternative field(input element) that is to be updated with
 * the selected date from the datepicker and altFormat determine the format on which the altField will be show.
 * 4.dayNames/dayNamesMin/dayNamesShort: The list of day names in their long format , short format and minimised format.
 * 5.duration: Control the speed at which the datepicker appears, you have 3 options: "slow","normal" and "fast".
 * 6.maxDate/minDate: The maximum selectable date and the minimum selectable date.
 * 7.monthNames/monthNamesShort: The list of month names in their long format , short format and minimised format.
 * 8.yearSuffix : Additional text to display after the year in the month headers.
 * 9.nextText: The text to display for the next/previous month link.
 * 10.showOn/ShowAnim: When the datepicker should appear. The datepicker can appear when the field receives focus ("focus"),
 * when a button is clicked ("button"), or when either event occurs ("both")/The name of the animation used to show and hide the datepicker.
 * After defining the inner scope, we define 2 attributes:
 * replace: 'true'
 * transclude: 'false'
 * we have define these attributes in the following manner, because we want to replace
 * the element with the result of the defined directive,
 * also we don't require automatic transculation of element's content.
 * we define the compile method which will return a closure(the linking function).
 * In the linking function we define all the necessary DOM listeners & jquery objects &
 * 4 watchers on the following attributes: disabled/max-date/min-date.
 */

'use strict';
var jUtils = angular.module('ngJqueryUtils',[]);

jUtils.directive('ngJqueryDatePicker',function($parse){
    return{
        restrict: "E",
        scope:{
            id: "@",
            class: '@',
            title: '@',
            inline: '@',
            dateFormat: '@',
            defaultDate: '@',
            altField: '@',
            altFormat: '@',
            dayNames: '@',
            dayNamesMin: '@',
            dayNamesShort: '@',
            duration: '@',
            maxDate: '@',
            minDate: '@',
            monthNames: '@',
            monthNamesShort: '@',
            showOn: '@',
            showAnim: '@',
            disabled: '@',
            appendText: '@',
            autoSize: '@',
            changeMonth: '@',
            changeYear: '@',
            constrainInput: '@',
            currentText: '@',
            firstDay: '@',
            gotoCurrent: '@',
            hideIfNoPrevNext: '@',
            isRTL: '@',
            navigationAsDateFormat: '@',
            nextText: '@',
            selectOtherMonths: '@',
            shortYearCutoff: '@',
            showButtonPanel: '@',
            showCurrentAtPos: '@',
            showMonthAfterYear: '@',
            showOtherMonths: '@',
            showWeek: '@',
            stepMonths: '@',
            weekHeader: '@',
            yearRange: '@',
            yearSuffix: '@'
        },
        replace:true,
        transclude: false,

        compile: function (element, attrs) {

            var template = "<input type='text' id='" + attrs.id + 'ng-jquery-date-picker'+ "'"+
                " class="+attrs.class+" placeholder="+attrs.placeholder+" >" +"</input>";

            var ngModelAttr = $parse(attrs.ngModel);

            element.replaceWith($(template));

            return function(scope, element, attrs) {

                var watchers = [];

                var options = {
                    inline: scope.$eval(scope.inline) || true,
                    dateFormat: scope.dateFormat || 'dd.mm.yy',
                    defaultDate: scope.defaultDate || null,
                    altField: scope.altField || "",
                    altFormat: scope.altFormat || "" ,
                    dayNames:(typeof(scope.dayNames) !==  "undefined") ? elements2Array(scope.dayNames) :
                        [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
                    dayNamesShort: (typeof(scope.dayNamesShort) !==  "undefined") ? elements2Array(scope.dayNamesShort) :
                        [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                    dayNamesMin: (typeof(scope.dayNamesMin) !==  "undefined") ? elements2Array(scope.dayNamesMin) :
                        [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ] ,
                    duration: scope.duration || "normal",
                    maxDate: scope.maxDate || null,
                    minDate: scope.minDate || null,
                    monthNames: (typeof(scope.monthNames)  !==  "undefined") ? elements2Array(scope.monthNames) :
                        [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                    monthNamesShort: (typeof(scope.monthNamesShort) !==  "undefined") ? elements2Array(scope.monthNamesShort) :
                        [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                    numberOfMonths: 1,
                    showOn: scope.showOn || "focus",
                    showAnim: scope.showAnim || "show",
                    disabled: scope.$eval(scope.disabled) || false,
                    appendText: scope.appendText || "",
                    autoSize: scope.$eval(scope.autoSize) || false,
                    changeMonth: scope.$eval(scope.changeMonth) || false,
                    changeYear: scope.$eval(scope.changeYear) || false,
                    constrainInput: scope.$eval(scope.constrainInput) || true,
                    currentText: scope.currentText || "Today",
                    firstDay: scope.firstDay || 0,
                    gotoCurrent: scope.$eval(scope.gotoCurrent) || false,
                    hideIfNoPrevNext: scope.$eval(scope.hideIfNoPrevNext) || false,
                    isRTL: scope.$eval(scope.isRTL) || false,
                    navigationAsDateFormat: scope.$eval(scope.navigationAsDateFormat) || false,
                    nextText: '@',
                    selectOtherMonths: scope.$eval(scope.selectOtherMonths) || false,
                    shortYearCutoff: scope.shortYearCutoff || "+10",
                    showButtonPanel: scope.$eval(scope.showButtonPanel) || false,
                    showCurrentAtPos: scope.showCurrentAtPos || 0,
                    showMonthAfterYear: scope.$eval(scope.showMonthAfterYear) || false,
                    showOtherMonths: scope.$eval(scope.showOtherMonths) || false,
                    showWeek: scope.$eval(scope.showWeek) || false,
                    stepMonths: scope.stepMonths || 1,
                    weekHeader: scope.weekHeader || "Wk",
                    yearRange: scope.yearRange || "c-10:c+10",
                    yearSuffix: scope.yearSuffix || "",
                    onSelect: updateContent,
                    onClose: updateContent,
                    onDestroy: clearContent
                }

                function updateContent() {

                    scope.$apply(function (scope) {
                        ngModelAttr.assign(scope, new Date(element.datepicker("getDate")));
                    });
                };

                function clearContent(){
                    watchers = [];
                }

                function elements2Array(str) {
                    return str.split(',');
                };

                element.datepicker(options);

                watchers.push(scope.$watch( 'disabled', function(newValue, oldValue){
                    if(typeof (newValue) !== "undefined" && newValue != oldValue ){
                        console.log('disabled new-value',newValue);
                        element.datepicker( "option", "disabled", scope.$eval(newValue) );
                        return true;
                    }else{
                        console.log('disabled value is undefined!');
                        return false;
                    }
                },true));

                watchers.push(scope.$watch('max-date', function(newValue, oldValue){
                    if(typeof (newValue) !== "undefined" && newValue != oldValue){
                        console.log('max-date new-value',newValue);
                        element.datepicker( "option", "max-date", scope.$eval(newValue) );
                        return true;
                    }else{
                        console.log('max date is undefined!');
                        return false;
                    }
                },true));

                watchers.push(scope.$watch('min-date', function(newValue, oldValue){
                    if(typeof (newValue) !== "undefined" && newValue != oldValue){
                        console.log('min-date new-value',newValue);
                        element.datepicker( "option", "min-date", scope.$eval(newValue) );
                        return true;
                    }else{
                        console.log('min date is undefined!');
                        return false;
                    }
                },true));

            };
        }
    }
});

jUtils.directive('ngJqueryProgressbar',function($parse){
    return {
        restrict: "E",
        scope: {
            id: '@',
            class: '@',
            value: '@',
            max: '@',
            disabled: '@',
            width: '@',
            color: '@',
            labelText: '@',
            labelColor: '@'
        },
        replace:true,
        transclude: false,
        compile: function (element, attrs) {

            var template = "<div id='" + attrs.id + '-progressbar' + "'" + " class=" + attrs.class + ">" + "</div>";
            var elementId = attrs.id + '-progressbar';
            element.replaceWith($(template));

            return function (scope, element, attrs) {
                var options = {
                    value: scope.$eval(scope.value) || 0,
                    max: scope.$eval(scope.max) || 100,
                    disabled: scope.$eval(scope.disabled) || false,
                    onChange: processChange,
                    onProgressbarComplete: processComplete,
                    onProgressbarCreate: processCreate
                }

                function processChange() {
                    console.log('progressbar has been changed!');
                }

                function processComplete() {
                    console.log('progressbar has been completed!');
                }

                function processCreate() {
                    console.log('progressbar has been created!');
                }

                //init Progressbar element
                $(element).progressbar(options);

                //style Progressbar element
                if(typeof (scope.width) !== "undefined" && scope.width != '' ) {
                    $(element).css('width', scope.width);
                }
                if(typeof (scope.color) !== "undefined" && scope.color != '' ) {
                    $("#" + elementId + " " + ".ui-progressbar-value").css('background', scope.color);
                    $("#" + elementId + " " + ".ui-progressbar-value").css('border', '1px solid '+scope.color);
                }

                //define watchers:
                scope.$watch('value', function (newValue, oldValue) {
                    if (typeof (newValue) !== "undefined" && newValue != oldValue) {
                        // plot.refresh(currentValue);
                        return true;
                    } else {
                        console.log('current value is undefined!');
                        return false;
                    }
                }, true);

                scope.$watch('max', function (newValue, oldValue) {
                    if (typeof (newValue) !== "undefined" && newValue != oldValue) {
                        // plot.refresh(scope.value,currentMax);
                        return true;
                    } else {
                        console.log('current max value is undefined!');
                        return false;
                    }
                }, true);

                scope.$watch('disabled', function (newValue, oldValue) {
                    if (typeof (newValue) !== "undefined" && newValue != oldValue) {
                        // plot.refresh(scope.value,currentMax);
                        return true;
                    } else {
                        console.log('current disabled value is undefined!');
                        return false;
                    }
                }, true);

            }
        }


    }
});
