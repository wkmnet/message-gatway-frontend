/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-26
 * Time : 下午7:21
 * ---------------------------------
 *
 */

(function(){
    'use strict'

    angular.module('BlurAdmin.pages.agency.new')
        .controller('NewAgencyCtrl', NewAgencyCtrl);

    /** @ngInject */
    function NewAgencyCtrl($scope, $http, toastr) {

        $scope.agency = {"expire_age":1};

        $scope.saveAgency = function () {
            console.log("save agency:",$scope.agency);


            $http.post("/api/agency",$scope.agency).success(function(response){
                console.log("response:",response);
                if(response.success){
                    toastr.success('数据保存成功!');
                    $scope.user = {};
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
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

      //  $scope.getAgencyNo();

        $scope.checkAgency = function () {
            if(!$scope.agency.agency_no){
                toastr.error("平台编号为空！");
                return;
            }
            if(!$scope.agency.agency_name){
                toastr.error("平台名称为空！");
                return;
            };
            if(!$scope.agency.expire_age || $scope.agency.expire_age < 1){
                toastr.error("超时时间不能少于1分钟！");
                return;
            };
            if(!$scope.agency.agency_key){
                toastr.error("平台密钥不能为空！");
                return;
            };

            $scope.saveAgency();


        };



    }

})();