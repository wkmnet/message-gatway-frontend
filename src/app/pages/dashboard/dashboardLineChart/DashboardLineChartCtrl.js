/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardLineChartCtrl', DashboardLineChartCtrl);

  /** @ngInject */
  function DashboardLineChartCtrl($scope, $http, toastr, baConfig, layoutPaths, baUtil) {
    var layoutColors = baConfig.colors;
    var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;
    /*var chartData = [
      { date: new Date(2012, 11), value: 0, value0: 0 },
      { date: new Date(2013, 0), value: 15000, value0: 19000},
      { date: new Date(2013, 1), value: 30000, value0: 20000},

      { date: new Date(2013, 2), value: 25000, value0: 22000},
      { date: new Date(2013, 3), value: 21000, value0: 25000},
      { date: new Date(2013, 4), value: 24000, value0: 29000},
      { date: new Date(2013, 5), value: 31000, value0: 26000},
      { date: new Date(2013, 6), value: 40000, value0: 25000},
      { date: new Date(2013, 7), value: 37000, value0: 20000},
      { date: new Date(2013, 8), value: 18000, value0: 22000},
      { date: new Date(2013, 9), value: 5000, value0: 26000},
      { date: new Date(2013, 10), value: 40000, value0: 30000},
      { date: new Date(2013, 11), value: 20000, value0: 25000},
      { date: new Date(2014, 0), value: 5000, value0: 13000},

      { date: new Date(2014, 1), value: 3000, value0: 13000},
      { date: new Date(2014, 2), value: 1800, value0: 13000},
      { date: new Date(2014, 3), value: 10400, value0: 13000},
      { date: new Date(2014, 4), value: 25500, value0: 13000},
      { date: new Date(2014, 5), value: 2100, value0: 13000},
      { date: new Date(2014, 6), value: 6500, value0: 13000},
      { date: new Date(2014, 7), value: 1100, value0: 13000},
      { date: new Date(2014, 8), value: 17200, value0: 13000},
      { date: new Date(2014, 9), value: 26900, value0: 13000},
      { date: new Date(2014, 10), value: 14100, value0: 13000},
      { date: new Date(2014, 11), value: 35300, value0: 13000},
      { date: new Date(2015, 0), value: 54800, value0: 13000},
      { date: new Date(2015, 1), value: 49800, value0: 13000}
    ];*/

    function loadCurrentTrade() {
        $http.get("/api/order/current").success(function(resp){
            if(resp.success){
                $scope.data = resp.data;
                createNewChart();
            } else {
                toastr.error(resp.message)
            }
        });
    }

    loadCurrentTrade();

    function createNewChart(){
        var chartData = [];
        $scope.data.list.forEach(function(value,index,array){
            chartData.push({date: new Date(value.date), total: value.total,success: value.success,
                refund: value.refund,cancel: value.cancel,timeout: value.timeout})
        });
        var chart = AmCharts.makeChart("amchart", {
            "type": "serial",
            "theme": "light",
            "marginRight": 80,
            "dataProvider": chartData,
            "valueAxes": [{
                "position": "left",
                "title": "订单数量"
            }],
            "graphs": [{
                "id": "g0",
                "lineColor": baUtil.hexToRGB(graphColor, 0.1),
                "fillAlphas": 1,
                "valueField": "total",
                "balloonText": "<div style='margin:5px; font-size:19px;'>总订单:<b>[[value]]</b></div>"
            },{
                "id": "g1",
                "lineColor": baUtil.hexToRGB(graphColor, 0.3),
                "fillAlphas": 1,
                "valueField": "success",
                "balloonText": "<div style='margin:5px; font-size:19px;'>成功单:<b>[[value]]</b></div>"
            },{
                "id": "g2",
                "lineColor": baUtil.hexToRGB(graphColor, 0.5),
                "fillAlphas": 1,
                "valueField": "refund",
                "balloonText": "<div style='margin:5px; font-size:19px;'>退款单:<b>[[value]]</b></div>"
            },{
                "id": "g3",
                "lineColor": baUtil.hexToRGB(graphColor, 0.7),
                "fillAlphas": 1,
                "valueField": "cancel",
                "balloonText": "<div style='margin:5px; font-size:19px;'>取消单:<b>[[value]]</b></div>"
            },{
                "id": "g4",
                "lineColor": baUtil.hexToRGB(graphColor, 0.9),
                "fillAlphas": 1,
                "valueField": "timeout",
                "balloonText": "<div style='margin:5px; font-size:19px;'>超时单:<b>[[value]]</b></div>"
            }],
            "chartCursor": {
                "categoryBalloonDateFormat": "JJ:NN, MM-DD",
                "cursorPosition": "mouse"
            },
            "categoryField": "date",
            "categoryAxis": {
                "minPeriod": "mm",
                "parseDates": true
            },
            "export": {
                "enabled": true,
                "dateFormat": "YYYY-MM-DD HH:NN:SS"
            }
        });

        chart.addListener("dataUpdated", zoomChart);
        // when we apply theme, the dataUpdated event is fired even before we add listener, so
        // we need to call zoomChart here
        zoomChart();
        // this method is called when chart is first inited as we listen for "dataUpdated" event
        function zoomChart() {
            // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
            chart.zoomToIndexes(0, chartData.length - 1);
        }

    }


    function createChart(){

        var chartData = [];
        $scope.data.list.forEach(function(value,index,array){
          chartData.push({date: new Date(value.date), value: value.total, value0: value.success})
        });

        var chart = AmCharts.makeChart('amchart', {
          type: 'serial',
          theme: 'blur',
          marginTop: 15,
          marginRight: 15,
          dataProvider: chartData,
          categoryField: 'date',
          categoryAxis: {
            parseDates: true,
            gridAlpha: 0,
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText
          },
          valueAxes: [
            {
              minVerticalGap: 50,
              gridAlpha: 0,
              color: layoutColors.defaultText,
              axisColor: layoutColors.defaultText
            }
          ],
          graphs: [
            {
              id: 'g0',
              bullet: 'none',
              useLineColorForBulletBorder: true,
              lineColor: baUtil.hexToRGB(graphColor, 0.3),
              lineThickness: 1,
              negativeLineColor: layoutColors.danger,
              type: 'smoothedLine',
              valueField: 'value0',
              fillAlphas: 1,
              fillColorsField: 'lineColor'
            },
            {
              id: 'g1',
              bullet: 'none',
              useLineColorForBulletBorder: true,
              lineColor: baUtil.hexToRGB(graphColor, 0.5),
              lineThickness: 1,
              negativeLineColor: layoutColors.danger,
              type: 'smoothedLine',
              valueField: 'value',
              fillAlphas: 1,
              fillColorsField: 'lineColor'
            }
          ],
          chartCursor: {
           categoryBalloonDateFormat: 'JJ:NN, DD MMMM',//MM YYYY
            categoryBalloonColor: '#4285F4',
            categoryBalloonAlpha: 0.7,
            cursorAlpha: 0,
            valueLineEnabled: true,
            valueLineBalloonEnabled: true,
            valueLineAlpha: 0.5
          },
          dataDateFormat: 'YYYY-MM-DD HH:NN:SS',
          export: {
            enabled: true
          },
          creditsPosition: 'bottom-right',
          zoomOutButton: {
            backgroundColor: '#fff',
            backgroundAlpha: 0
          },
          zoomOutText: '',
          pathToImages: layoutPaths.images.amChart
        });
        chart.addListener('rendered', zoomChart);
        zoomChart();
        if (chart.zoomChart) {
            chart.zoomChart();
        }
        function zoomChart() {
            chart.zoomToDates(new Date($scope.data.start), new Date($scope.data.end));
        }
    }

  }
})();