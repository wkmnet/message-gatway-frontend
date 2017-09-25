/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, $http, $window,$location, baConfig, baUtil) {
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    $scope.monitor = {"cpu":0,"memory":0,"linuxCpu":0,"linuxMemory":0};
    $scope.charts = [{
      color: pieColor,
      description: '虚拟机CPU',
      stats: '100',
      icon: 'person',
    }, {
      color: pieColor,
      description: '虚拟机内存',
      stats: '100',
      icon: 'money',
    }, {
      color: pieColor,
      description: '系统CPU',
      stats: '100',
      icon: 'face',
    }, {
      color: pieColor,
      description: '系统内存',
      stats: '100',
      icon: 'refresh',
    }
    ];

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function (index) {
        if(index == 0) {
          var chart = $(this);
          chart.easyPieChart({
            easing: 'easeOutBounce',
            onStep: function (from, to, percent) {
              $(this.el).find('.percent').text($scope.monitor.cpu);
            },
            barColor: chart.attr('rel'),
            trackColor: 'rgba(0,0,0,0)',
            size: 84,
            scaleLength: 0,
            animation: 2000,
            lineWidth: 9,
            lineCap: 'round',
          });
        } else if(index == 1) {
            var chart = $(this);
            chart.easyPieChart({
                easing: 'easeOutBounce',
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text($scope.monitor.memory);
                },
                barColor: chart.attr('rel'),
                trackColor: 'rgba(0,0,0,0)',
                size: 84,
                scaleLength: 0,
                animation: 2000,
                lineWidth: 9,
                lineCap: 'round',
            });
        } else if(index == 2) {
            var chart = $(this);
            chart.easyPieChart({
                easing: 'easeOutBounce',
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text($scope.monitor.linuxCpu);
                },
                barColor: chart.attr('rel'),
                trackColor: 'rgba(0,0,0,0)',
                size: 84,
                scaleLength: 0,
                animation: 2000,
                lineWidth: 9,
                lineCap: 'round',
            });
        } else {
            var chart = $(this);
            chart.easyPieChart({
                easing: 'easeOutBounce',
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text($scope.monitor.linuxMemory);
                },
                barColor: chart.attr('rel'),
                trackColor: 'rgba(0,0,0,0)',
                size: 84,
                scaleLength: 0,
                animation: 2000,
                lineWidth: 9,
                lineCap: 'round',
            });
        }
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        if(index == 0) {
            $(chart).data('easyPieChart').update($scope.monitor.cpu);
        } else if(index == 1){
            $(chart).data('easyPieChart').update($scope.monitor.memory);
        } else if(index == 2) {
            $(chart).data('easyPieChart').update($scope.monitor.linuxCpu);
        } else {
            $(chart).data('easyPieChart').update($scope.monitor.linuxMemory);
        }
      });
    }

    $http.get("/api/monitor").success(function(response) {
        $scope.monitor = response;
        loadPieCharts();
        updatePieCharts();
        $timeout(scanSystemMonitor,30000);
    });
    function scanSystemMonitor() {
        $http.get("/api/monitor").success(function(response) {
            $scope.monitor = response;
            console.log($scope.monitor);
            updatePieCharts();
            $timeout(scanSystemMonitor,30000);
        });
    }
    //跳转url
    // $timeout(redirection,20000);
    // function redirection() {
    //     console.log("---" + $location.path());
    //     $location.path('/auth.html').replace();
    //     $window.location.href = "http://127.0.0.1:8080/auth.html";
    //     console.log("---" + $location.path());
    //     $timeout(redirection,2000);
    // }
    //$timeout(scanSystemMonitor,1000);
    // $timeout(function () {
    //   loadPieCharts();
    //   updatePieCharts();
    // }, 1000);
  }
})();