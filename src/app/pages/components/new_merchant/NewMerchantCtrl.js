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

    angular.module('BlurAdmin.pages.components.new_merchant')
        .controller('NewMerchantCtrl', NewMerchantCtrl);

    /** @ngInject */
    function NewMerchantCtrl($scope, $http, toastr) {

        $scope.merchant = {};

        $scope.saveMerchant = function () {
            console.log("save merchant:",$scope.merchant);

            $http.post("/api/merchant",$scope.merchant).success(function(response){
                console.log("response:",response);
                if(response.success){
                    toastr.success('数据保存成功!');
                    $scope.merchant = {};
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };

        $scope.payMethod= {}
        $scope.selectAppChange = function(selected){
            console.log("selected pay app :",selected)
            if(selected == "wx"){
                console.log("wx")
                $scope.payMethod = [{"key":"NATIVE","value":"二维码支付"},{"key":"MWEB","value":"H5页面支付"},{"key":"JSAPI","value":"公众号支付"}]
                return
            }
            if(selected == "alipay"){
                console.log("alipay")
                $scope.payMethod = [{"key":"NATIVE","value":"二维码支付"},{"key":"QUICK_WAP_PAY","value":"手机网站支付"},{"key":"FAST_INSTANT_TRADE_PAY","value":"PC网站支付"}]
                return
            }
        };

        $scope.checkMerchant = function(){

            if(!$scope.merchant.merchant_no) {
                toastr.error("支付渠道编号不能为空!");
                return;
            };
            if(!$scope.merchant.merchant_name) {
                toastr.error("支付渠道名称不能为空!");
                return;
            };
            if(!$scope.merchant.pay_channel) {
                toastr.error("支付渠道不能为空!");
                return;
            };
            if(!$scope.merchant.pay_type) {
                toastr.error("支付方式不能为空!");
                return;
            };
            if(!$scope.merchant.mch_no) {
                toastr.error("收款商户不能为空!");
                return;
            };
            if(!$scope.merchant.app_id) {
                toastr.error("第三方应用ID不能为空!");
                return;
            };
            if(!$scope.merchant.notify_url) {
                toastr.error("回调不能为空!");
                return;
            };

            $scope.saveMerchant();
        };



    }
    
    

})();