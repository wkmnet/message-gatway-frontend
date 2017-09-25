/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-26
 * Time : 下午5:59
 * ---------------------------------
 *
 */

(function(){
    'use strict'

    angular.module('BlurAdmin.pages.components.merchant')
        .controller('MerchantListCtrl', MerchantListCtrl);

    /** @ngInject */
    function MerchantListCtrl($scope, $http, toastr,cfpLoadingBar,commonService) {

        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};

        $scope.data = {};

        $scope.queryMerchant = function () {
            cfpLoadingBar.start();
            var url = "/api/merchant?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&merchant_no=" + ($scope.param.merchant_no || "") +
                "&merchant_name=" + ($scope.param.merchant_name || "") +
                "&status=" + ($scope.param.status || "");
            
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                 //   $scope.createBtn();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };
        $scope.queryBtn = function(){
            $scope.param.page = 1;
            $scope.queryMerchant();
        }

       /* $scope.page = function (p) {
            $scope.param.page = p;
            $scope.queryMerchant();
        };*/

        $scope.queryMerchant();

        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除 ' + name +' 支付渠道吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteMerchant(id);
                }
            });
        };

        $scope.deleteMerchant = function (id) {
            $http.delete("/api/merchant/" + id).success(function(resp){
                if(resp.success){
                    $scope.queryMerchant();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };
        
        $scope.switchStatus = function(id,status){
            console.log("id:",id);
            console.log("status",status);
            $http.put("/api/merchant/" + id,{"status":status}).success(function(response){
                if(response.success){
                    $scope.queryMerchant();
                }else{
                    toastr.error(response.message)
                }
            }).error(function(resp,status){
                console.log("status",status);
                toastr.error(resp);
            });
            
        };

   /*     $scope.btns = [];
        $scope.createBtn = function(){
            $scope.btns = [];
            //var num = Math.ceil($scope.data.totalRow /  $scope.data.pageSize);
            var num = $scope.data.totalPage;
            console.log("num : " + num);
            for (var i = 0;i< num;i++) {
                $scope.btns.push(i);
            }
            console.log("btns : " + $scope.btns);
        };*/

    }

})();