/**
 * Created by Brk.
 * ng-jquery-date-picker script
 */
'use strict';
angular.module('ngDatePicker',[]).
    directive('ngJqueryDatePicker',function(){

        return{
            restrict: 'A',  // restricted only to Attribute fields
            scope:{         // define inner scope with the relevant attributes
                id:'@',
                class:'@',
                title: '@',
                state: '=',
                dateValue: '=',
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
                    defaultDate: scope.dateValue || null,
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
                            var id = attrs.id;
                            console.log('id',id);
                        }
                    }
                };

                 //Initialize jquery date picker
                 element.datepicker(options);

                 //Define watchers
                 var initWatchers = scope.$watch( "ready", function(){
                     watchers.push( scope.$watch( "dateValue", function(){
                            console.log('dateValue',scope.dateValue);
                            element.datepicker( "option", "defaultDate", scope.dateValue );

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
