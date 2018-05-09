/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-26
 * Time : 下午7:52
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.producer.producer')
        .controller('ProducerCtrl', ProducerCtrl);

    /** @ngInject */
    function ProducerCtrl($stateParams,$http,$scope,toastr) {

        $scope.ids = "";
        $scope.batchNo="";

        $scope.realProducer = function() {
            console.log("ids :",$scope.ids);
            var url = "/api/producer/real_producer?ids=" + ($scope.ids || "") + "&batchNo=" + ($scope.batchNo || "");
            $http.get(url).success(function(response){
                console.log("response:",response);
                if(response.success){
                    toastr.success('视频提交成功!');
                    $scope.ids = "";
                    $scope.batchNo="";
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };
        
        


    }

})();