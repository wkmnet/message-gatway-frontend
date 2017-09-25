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

    angular.module('BlurAdmin.pages.trade.current')
        .controller('CurrentCtrl', CurrentCtrl).controller("CurrentOrderModalCtrl",CurrentOrderModalCtrl);



    /** @ngInject */
    function CurrentCtrl($scope, $http, toastr,$uibModal,cfpLoadingBar,commonService) {
        
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};

        $scope.data = {};

        $scope.query = {};

        $scope.showDatePicker = false;
        
        $scope.channel = {};

        $scope.queryTrade = function () {
            cfpLoadingBar.start();
            var url = "/api/trade?page=" + ($scope.param.page || "") +
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
                    //设置butten组
                  //  $scope.createBtn();
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
            $scope.queryTrade();
        }
      /*  $scope.page = function (p) {
            console.log("p:" + p);
            $scope.param.page = p;
            $scope.queryTrade();
        };*/
        
     /*   $scope.btns = [];
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
        $scope.queryTrade();

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

/*        $scope.refundConfirm = function (order_no, amount_pay) {
            var msg = "确定要退款订单 " + order_no + " 吗？";
            if (confirm(msg) == true) {
                $scope.refund(order_no, amount_pay);
            } else {
                console.log("取消删除")
            }
        };*/
        $scope.refundConfirm = function(order_no,amount_pay){
            commonService.confirm($scope,'确认对话框','您确定要退款订单 ' + order_no +' 吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.refund(order_no,amount_pay);
                }
            });
        };
        
        //退款
        $scope.refund = function(order_no,amount_pay){
            console.log("order_no : " + order_no);
            console.log("order_no : " + order_no);
            var url = "/api/trade/refund?order_no=" + order_no + "&amount_pay=" + amount_pay;
            $http.get(url).success(function(resp){
                if(resp.success){
                    toastr.success("申请退款成功！");
                    $scope.queryTrade();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };

        $scope.fix = function(order_no){
            commonService.confirm($scope,'确认对话框','您确定要补单 ' + order_no +' 吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.fix_order(order_no);
                }
            });
        };

        //补单
        $scope.fix_order = function(order_no){
            console.log("order_no : " + order_no);
            var url = "/api/trade/fix?order_no=" + order_no;
            $http.get(url).success(function(resp){
                if(resp.success){
                    toastr.success("申请补单成功！");
                    $scope.queryTrade();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };

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
            var url = "/api/trade/" + id;
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

        $scope.openList = true;
        $scope.order={};
        $scope.open = function(index){
            $scope.order = $scope.data.list[index];
            $scope.openList = false;
            console.log("org_id : " + $scope.data.list[index].org_id);
            $scope.queryOrgTrade($scope.data.list[index].org_id);
        };
        $scope.close = function(){
            $scope.openList = true;
        };


/*        $scope.open = function(id) {
            console.log("index :" + id);
           // $scope.queryTradeById(id);
            $uibModal.open({
                animation: true,
                templateUrl: "app/pages/trade/order_info.html",
                controller:"CurrentOrderModalCtrl",
                resolve: {
                    order:function(){
                        console.log("order :" + $scope.data.list[id].order_no);
                        return $scope.data.list[id];
                    }
                }
            });
        };*/

    }

    
    function CurrentOrderModalCtrl($scope, $http, toastr,$uibModal,order) {
        $scope.order = order;
        $scope.org_order = {};
        $scope.org = false;
        $scope.queryTradeById = function(id){
            console.log("id: " + id);
            var url = "/api/trade/" + id;
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