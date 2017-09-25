/**
 * Create with IntelliJ IDEA
 * Project name : blur-admin-1.2.0
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-20
 * Time : 上午11:31
 * ---------------------------------
 *
 */
(function(){
    'use strict'

    angular.module('BlurAdmin.pages.trade.history')
        .controller('HistoryCtrl', HistoryCtrl).controller("HistoryOrderModalCtrl",HistoryOrderModalCtrl);

    /** @ngInject */
    function HistoryCtrl($scope, $http, toastr,$uibModal,cfpLoadingBar,commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};

        $scope.data = {};

        $scope.query = {};

        $scope.showDatePicker = false;
        
        $scope.channel = {};

        $scope.queryHistoryTrade = function () {
            cfpLoadingBar.start();
            var url = "/api/trade/history?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&order_no=" + ($scope.param.order_no || "") +
                "&out_trade_no=" + ($scope.param.out_pay_order || "") +
                "&channel=" + ($scope.param.channel || "") +
                "&status=" + ($scope.param.status || "") +
                "&trans_type=" + ($scope.param.trans_type || "") +
                "&start=" + ($scope.param.start || "") +
                "&end=" + ($scope.param.end || "");

            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                } else {
                    toastr.error(resp.message);
                }
                cfpLoadingBar.complete();
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
                cfpLoadingBar.complete();
            });

        };

        $scope.queryBtn = function(){
            $scope.param.page = 1;
            $scope.queryHistoryTrade();
        }

     /*   $scope.page = function (p) {
            $scope.param.page = p;
            $scope.queryHistoryTrade();
        };
*/
        $scope.queryHistoryTrade();

       
        /*$( "#start" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat:"yy-mm-dd",
            onClose: function( selectedDate ) {
                $( "#end" ).datepicker( "option", "minDate", selectedDate );
            }
        });

        $( "#end" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat:"yy-mm-dd",
            onClose: function( selectedDate ) {
                $( "#start" ).datepicker( "option", "maxDate", selectedDate );
            }
        });*/

        $scope.selectDate = function () {
            $scope.showDatePicker = !$scope.showDatePicker;
        }

        $scope.changeDate = function (modelName, newDate) {
            console.log("modelName:" + modelName + "---newDate:" + newDate);
            if("start" == modelName){
                $scope.param.start = newDate.format("YYYY-MM-DD");
            } else {
                $scope.param.end = newDate.format("YYYY-MM-DD");
            }
        }

        $scope.clearDate = function () {
            $scope.param.start = "";
            $scope.param.end = "";
        }

        $scope.closeDatePicker = function () {
            $scope.showDatePicker = false;
        }
        
        //查询渠道
        $scope.selectChannel = function () {
            var url = "/api/merchant";
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.channel = resp.data;
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
            
        };
        $scope.selectChannel();

        //发送通知
       /* $scope.sendMessge = function(order_no){
            console.log("order_no : " + order_no);
            var url = "/api/trade/sendMessage?order_no=" + order_no;
            $http.get(url).success(function(resp){
                if(resp.success){
                    toastr.success("发送通知成功！");
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };*/

        $scope.refundConfirm = function(order_no,amount_pay){
            commonService.confirm($scope,'确认对话框','您确定要退款订单 ' + order_no +' 吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.refund(order_no,amount_pay);
                }
            });
        };


        //发送通知
        $scope.refund = function(order_no,amount_pay){
            console.log("order_no : " + order_no);
            var url = "/api/trade/refund?order_no=" + order_no + "&amount_pay=" + amount_pay;
            $http.get(url).success(function(resp){
                if(resp.success){
                    toastr.success("申请退款成功！");
                    $scope.queryHistoryTrade();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };
/*
        $scope.btns = [];
        $scope.createBtn = function(){
            $scope.btns = [];
            //var num = Math.ceil($scope.data.totalRow /  $scope.data.pageSize);
            var num = $scope.data.totalPage;
            console.log("num : " + num);
            for (var i = 0;i< num;i++) {
                $scope.btns.push(i);
            }
            console.log("btns : " + $scope.btns);
        };
*/



    /*    $scope.open = function(id) {
            console.log("index :" + id);
            // $scope.queryTradeById(id);
            $uibModal.open({
                animation: true,
                templateUrl: "app/pages/trade/order_info.html",
                controller:"HistoryOrderModalCtrl",
                resolve: {
                    order:function(){
                        console.log("order :" + $scope.data.list[id].order_no);
                        return $scope.data.list[id];
                    }
                }
            });
        };*/
        

      $scope.org_order = {};
        $scope.org = false;
        $scope.queryOrgTrade = function(org_id) {
            console.log("org_id: " + org_id);
            if(org_id){
                $scope.queryTradeById(org_id);
                $scope.org = true;
            }else{
                $scope.org_order = {};
                $scope.org = false;

            }

        };
        $scope.queryTradeById = function(id){
            console.log("id: " + id);
            var url = "/api/trade/history/" + id;
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.org_order = resp.data;

                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };


       // $scope.openOrder = false;
        $scope.openList = true;
        
        

        $scope.order={};
        $scope.open = function(index){
            $scope.order = $scope.data.list[index];
          //  $scope.openOrder = true;
            $scope.openList = false;
            console.log("org_id : " + $scope.data.list[index].org_id);
            $scope.queryOrgTrade($scope.data.list[index].org_id);
        };

        $scope.goBack = function(){
          //  $scope.openOrder = false;
            $scope.openList = true;
        };


   
    };



    function HistoryOrderModalCtrl($scope, $http, toastr,$uibModal,order) {
        $scope.order = order;
        $scope.org_order = {};

 
        $scope.queryTradeById = function(id){
            console.log("id: " + id);
            var url = "/api/trade/history/" + id;
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.org_order = resp.data;

                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };

        $scope.queryOrgTrade = function(org_id) {
            console.log("org_id: " + org_id);
            if(org_id){
                $scope.queryTradeById(org_id);
                $scope.org = true;
            }else{
                $scope.org_order = {};
                $scope.org = false;

            }

        };

       
        $scope.queryOrgTrade($scope.order.org_id);



       $scope.back = false;
        $scope.org = false;

        $scope.goBack = function(){
            $scope.order=order;
            $scope.back = false;
            $scope.org = true;
        }
        $scope.goOrg = function(){
            $scope.order=$scope.org_order;
            $scope.back=  true;
            $scope.org = false;
        }


    }
   

})();