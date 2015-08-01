/**
 * Created by Brk.
 * ng-jquery-date-picker script.
 * AngularJS directive wrapper
 * which enables you to create
 * dynamic  jquery ui date picker components.
 * Date Modified: 20-7-16
 * Date Created: 1-8-16
 */
/**
 * Technical Comments:
 * First we define to which set of components the directive will be trigger by: Element(E) || Attribute(A) || Class(C).
 * Second we define inner scope for current directive.
 * Third we define template and link function.
 * In our current case:
 * The directive will be trigger by Attribute.
 * The inner scope will contains the following fields:
 * 1.defaultDate : date to highlight on first opening if the field is blank
 * 2.altField and altFormat: Alternative field(input element) that is to be updated with
 * the selected date from the datepicker and altFormat determine the format on which the altField will be show.
 * 3.dayNames/dayNamesMin/dayNamesShort: The list of day names in their long format , short format and minimised format.
 * 4.duration: Control the speed at which the datepicker appears, you have 3 options: "slow","normal" and "fast".
 * 5.maxDate/minDate: The maximum selectable date and the minimum selectable date.
 * 6.monthNames/monthNamesShort: The list of month names in their long format , short format and minimised format.
 * 7.numberOfMonths: The number of months to show at once.
 * 8.nextText/prevText: The text to display for the next/previous month link.
 * 9.showOn/ShowAnim: When the datepicker should appear. The datepicker can appear when the field receives focus ("focus"),
 * when a button is clicked ("button"), or when either event occurs ("both")/The name of the animation used to show and hide the datepicker.
 * 10.buttonImage/buttonImageOnly/buttonText:
 * 4 watchers on the following fields: defaultDate/disabled/maxDate/minDate.
 */
'use strict';
angular.module('ngDatePicker',[]).
    directive('ngJqueryDatePicker',function(){

        return{
            restrict: 'A',
            scope:{
                id:'@',
                class:'@',
                title: '@',
                state: '=',
                defaultDate: '=',
                disabled: '=',
                altField: '=',
                altFormat: '=',
                appendText: '=',
                autoSize: '=',
                changeMonth: '=',
                changeYear: '=',
                constrainInput: '=',
                currentText: '=',
                dateFormat: '=',
                dayNames: '=',
                dayNamesMin: '=',
                dayNamesShort: '=',
                duration: '=',
                firstDay: '=',
                gotoCurrent: '=',
                hideIfNoPrevNext: '=',
                isRTL: '=',
                maxDate: '=',
                minDate: '=',
                monthNames: '=',
                monthNamesShort: '=',
                navigationAsDateFormat: '=',
                nextText: '=',
                numberOfMonths: '=',
                selectOtherMonths: '=',
                shortYearCutoff: '=',
                showAnim: '=',
                showButtonPanel: '=',
                showCurrentAtPos: '=',
                showMonthAfterYear: '=',
                showOn: '=',
                showOtherMonths: '=',
                showWeek: '=',
                stepMonths: '=',
                weekHeader: '=',
                yearRange: '=',
                yearSuffix: '=',
                onSelect: '=',
                onOpen: '=',
                onClose: '='


            },
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                var watchers = [];
                var options = {
                    dateFormat: scope.dateFormat || 'dd.mm.yy',
                    defaultDate: scope.defaultDate || null,
                    disabled: scope.disabled || false,
                    altField: scope.altField || "",
                    altFormat: scope.altFormat || "",
                    appendText: scope.appendText || "",
                    autoSize: scope.autoSize || false,
                    changeMonth: scope.changeMonth || false,
                    changeYear: scope.changeYear || false,
                    constrainInput: scope.constrainInput || true,
                    currentText: scope.currentText || "Today",
                    dayNames: scope.dayNames || [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
                    dayNamesMin: scope.dayNamesMin || [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
                    dayNamesShort: scope.dayNamesShort || [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                    duration: scope.duration || "normal",
                    firstDay: scope.firstDay || 0,
                    gotoCurrent: scope.gotoCurrent || false,
                    hideIfNoPrevNext: scope.hideIfNoPrevNext || false,
                    isRTL: scope.isRTL || false,
                    maxDate: scope.maxDate || null,
                    minDate: scope.minDate || null,
                    monthNames: scope.monthNames || [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                    monthNamesShort: scope.monthNamesShort || [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                    navigationAsDateFormat: scope.navigationAsDateFormat || false,
                    nextText: scope.nextText || "Next",
                    numberOfMonths: scope.numberOfMonths || 1,
                    selectOtherMonths: scope.selectOtherMonths || false,
                    shortYearCutoff: scope.shortYearCutoff || "+10",
                    showAnim: scope.showAnim || "show",
                    showButtonPanel: scope.showButtonPanel || false,
                    showCurrentAtPos: scope.showCurrentAtPos || 0,
                    showMonthAfterYear: scope.showMonthAfterYear || false,
                    showOn: scope.showOn || "focus",
                    showOtherMonths: scope.showOtherMonths || false,
                    showWeek: scope.showWeek || false,
                    stepMonths: scope.stepMonths || 1,
                    weekHeader: scope.weekHeader || "Wk",
                    yearRange: scope.yearRange || "c-10:c+10",
                    yearSuffix: scope.yearSuffix || "",
                    onSelect:function (date) {
                        if(scope.onSelect && typeof scope.onSelect == "function"){
                            ngModelCtrl.$setViewValue(date);
                            scope.$apply();
                        }
                    }
                };

                 //Initialize jquery date picker
                 element.datepicker(options);

                 //Define watchers
                 var initWatchers = scope.$watch( "ready", function(){
                     watchers.push( scope.$watch( "defaultDate", function(){
                            console.log('defaultDate',scope.defaultDate);
                            element.datepicker( "option", "defaultDate", scope.defaultDate );

                     }));

                     watchers.push( scope.$watch( "disabled", function(){
                            console.log('disabled',scope.disabled);
                            element.datepicker("option","disabled",false);
                            element.datepicker( "refresh" );
                     }));

                     watchers.push( scope.$watch( "maxDate", function(){
                            console.log('maxDate',scope.maxDate);
                            element.datepicker( "option", "maxDate", scope.maxDate );
                         element.datepicker( "refresh" );
                     }));

                     watchers.push( scope.$watch( "minDate", function(){

                            element.datepicker( "option", "minDate", scope.minDate );
                            element.datepicker( "refresh" );

                     }));

                 });
                initWatchers();

            }

        }
});
