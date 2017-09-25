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

    angular.module('BlurAdmin.pages.user.list')
        .controller('AgencyListCtrl', AgencyListCtrl);

    /** @ngInject */
    function AgencyListCtrl($scope, $http, toastr,cfpLoadingBar,commonService) {
        $scope.tablePageSize = 5;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};
        

        $scope.data = {};

        $scope.queryAgency = function () {
            cfpLoadingBar.start();
            var url = "/api/agency?page=" + ($scope.param.page || "") + 
                "&page_size=" + ($scope.param.page_size || "") +
                "&agency_no=" + ($scope.param.agency_no || "") + 
                "&agency_name=" + ($scope.param.agency_name || "") + 
                "&status=" + ($scope.param.status || "");
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                    //$scope.createBtn();
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
            $scope.queryAgency();
        }

       /* $scope.page = function (p) {
            $scope.param.page = p;
            $scope.queryAgency();
        };
*/
        $scope.queryAgency();

        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除 ' + name +' 平台吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteAgency(id);
                }
            });
        };
        $scope.deleteAgency = function (id) {
            $http.delete("/api/agency/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryAgency();
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
            $http.put("/api/agency/" + id,{"status":status}).success(function(response){
                if(response.success){
                    $scope.queryAgency();
                }else{
                    toastr.error(response.message)
                }
            }).error(function(resp,status){
                console.log("status",status);
                toastr.error(resp);
            });

        };

        $scope.getAgencyNo = function(){
            $http.get("/api/agency/getAgencyNo").success(function(response){
                if(response.success){
                    $scope.agency.agency_no=response.data;
                }else{
                    toastr.error(response.message)
                }

            }).error(function(resp,status){
                console.log("status",status);
                toastr.error(resp);
            });
        };

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
        };*/
    }

})();