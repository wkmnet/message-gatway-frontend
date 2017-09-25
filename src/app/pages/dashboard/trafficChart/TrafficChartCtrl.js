/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('TrafficChartCtrl', TrafficChartCtrl);

  /** @ngInject */
  function TrafficChartCtrl($http, $scope, toastr, baConfig, colorHelper) {

    $scope.transparent = baConfig.theme.blur;
    var dashboardColors = baConfig.colors.dashboard;
    function loadOrderData() {
      $http.get("/api/order/count").success(function(resp){
        if(resp.success){
          $scope.data = resp.data;
          createChart();
        } else {
          toastr.error(resp.message)
        }
      });
    }

    function createChart() {
        $scope.doughnutData = [
            {
                value: 2000,
                color: dashboardColors.white,
                highlight: colorHelper.shade(dashboardColors.white, 15),
                label: 'Other',
                percentage: 87,
                order: 1,
            }, {
                value: 1000,
                color: dashboardColors.surfieGreen,
                highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
                label: 'Referral Traffic',
                percentage: 70,
                order: 3,
            }, {
                value: 1200,
                color: dashboardColors.silverTree,
                highlight: colorHelper.shade(dashboardColors.silverTree, 15),
                label: 'Direct Traffic',
                percentage: 38,
                order: 2,
            }, {
                value: 400,
                color: dashboardColors.gossip,
                highlight: colorHelper.shade(dashboardColors.gossip, 15),
                label: 'Ad Campaigns',
                percentage: 17,
                order: 0,
            },
        ];
        if($scope.data.list.length != 4){
          console.log("order-count-list-size:" + $scope.data.list.length);
        } else {
            $scope.data.list.forEach(function(value, index,array){
                $scope.doughnutData[index].label = value.label;
                $scope.doughnutData[index].value = value.value;
                $scope.doughnutData[index].percentage = value.percentage;
            });
            console.log("处理完成统计结果:" + $scope.data.list.length);
        }
        var ctx = document.getElementById('chart-area').getContext('2d');
        window.myDoughnut = new Chart(ctx).Doughnut($scope.doughnutData, {
            segmentShowStroke: false,
            percentageInnerCutout : 64,
            responsive: true
        });
    }

    //初始化表格数据
    loadOrderData();

      /*{
          value: 1500,
              color: dashboardColors.blueStone,
              highlight: colorHelper.shade(dashboardColors.blueStone, 15),
              label: 'Search engines',
              percentage: 22,
              order: 4,
      }*/
  }
})();