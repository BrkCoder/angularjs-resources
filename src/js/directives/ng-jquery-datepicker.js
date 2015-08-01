/**
 * Created by Brk.
 * ng-jquery-date-picker script.
 * AngularJS directive wrapper
 * which enables you to create
 * dynamic  jquery ui date picker components.
 * Date Modified: 1-8-16
 * Date Created: 20-7-16
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
 * 8.numberOfMonths: The number of months to show at once.
 * 9.nextText: The text to display for the next/previous month link.
 * 10.showOn/ShowAnim: When the datepicker should appear. The datepicker can appear when the field receives focus ("focus"),
 * when a button is clicked ("button"), or when either event occurs ("both")/The name of the animation used to show and hide the datepicker.
 * 4 watchers on the following fields: defaultDate/disabled/maxDate/minDate .
 */
'use strict';
angular.module('ngDatePicker',[]).
    directive('ngJqueryDatePicker',function($parse){
        return{
            restrict: "E",
            scope:{
                id: "@",
                class: '@',
                title: '@',
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
                numberOfMonths: '@',
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
            //define the compile function
            compile: function (element, attrs) {

                var ngModelAttr = $parse(attrs.ngModel);
                var template = "<input type='text' id='" + attrs.id + 'ng-jquery-date-picker'+ "'"+
                                " class="+attrs.class+" >" +"</input>";
                element.replaceWith($(template));

                //return a closure
                return function(scope, element, attrs) {

                    var updateProcedure = function () {

                        scope.$apply(function (scope) {
                            ngModelAttr.assign(scope, new Date(element.datepicker("getDate")));
                        });
                    };

                    var elements2Array = function (str) {
                        return str.split(',');
                    }
                    console.log('scope.dayNamesMin',scope.dayNamesMin);
                    //define datepicker options
                    var options = {
                        inline: true,
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
                        numberOfMonths: scope.numberOfMonths || 1,
                        showOn: scope.showOn || "focus",
                        showAnim: scope.showAnim || "show",
                        disabled: scope.disabled || false,
                        appendText: scope.appendText || "",
                        autoSize: scope.autoSize || false,
                        changeMonth: scope.changeMonth || false,
                        changeYear: scope.changeYear || false,
                        constrainInput: scope.constrainInput || true,
                        currentText: scope.currentText || "Today",
                        firstDay: scope.firstDay || 0,
                        gotoCurrent: scope.gotoCurrent || false,
                        hideIfNoPrevNext: scope.hideIfNoPrevNext || false,
                        isRTL: scope.isRTL || false,
                        navigationAsDateFormat: scope.navigationAsDateFormat || false,
                        nextText: '@',
                        selectOtherMonths: scope.selectOtherMonths || false,
                        shortYearCutoff: scope.shortYearCutoff || "+10",
                        showButtonPanel: scope.showButtonPanel || false,
                        showCurrentAtPos: scope.showCurrentAtPos || 0,
                        showMonthAfterYear: scope.showMonthAfterYear || false,
                        showOtherMonths: scope.showOtherMonths || false,
                        showWeek: scope.showWeek || false,
                        stepMonths: scope.stepMonths || 1,
                        weekHeader: scope.weekHeader || "Wk",
                        yearRange: scope.yearRange || "c-10:c+10",
                        yearSuffix: scope.yearSuffix || "",
                        onClose: updateProcedure,
                    }

                    //init jquery ui datepicker object
                    element.datepicker(options);

                };

                //scope.$watch(modelAccessor, function (val) {
                //    var date = new Date(val);
                //    element.datepicker("setDate", date);
                //});

                //Define watchers
                //var initWatchers = scope.$watch( "ready", function(){
                //    watchers.push( scope.$watch( "defaultDate", function(){
                //        console.log('defaultDate',scope.defaultDate);
                //        element.datepicker( "option", "defaultDate", scope.defaultDate );
                //
                //    }));
                //
                //    watchers.push( scope.$watch( "disabled", function(){
                //        console.log('disabled',scope.disabled);
                //        element.datepicker("option","disabled",false);
                //        element.datepicker( "refresh" );
                //    }));
                //
                //    watchers.push( scope.$watch( "maxDate", function(){
                //        console.log('maxDate',scope.maxDate);
                //        element.datepicker( "option", "maxDate", scope.maxDate );
                //        element.datepicker( "refresh" );
                //    }));
                //
                //    watchers.push( scope.$watch( "minDate", function(){
                //
                //        element.datepicker( "option", "minDate", scope.minDate );
                //        element.datepicker( "refresh" );
                //
                //    }));
                //
                //});
                //initWatchers();
            }
        }
    })
