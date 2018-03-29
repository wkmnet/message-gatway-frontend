

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .directive('dashboardColumnLineChart', dashboardColumnLineChart);

    /** @ngInject */
    function dashboardColumnLineChart() {
        return {
            restrict: 'E',
            controller: 'DashboardColumnLineChartCtrl',
            templateUrl: 'app/pages/dashboard/dashboardColumnLineChart/dashboardColumnLineChart.html'
        };
    }
})();