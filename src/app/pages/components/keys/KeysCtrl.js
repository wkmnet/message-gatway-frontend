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

    angular.module('BlurAdmin.pages.components.keys')
        .controller('KeysCtrl', KeysCtrl);

    /** @ngInject */
    function KeysCtrl($scope, $http, toastr,commonService) {

        $scope.merchant = {};

        $scope.data = {};
        
        $scope.md5 = {};

        $scope.wxSignType = ["MD5"];

        $scope.alipaySignType = ["RSA2"];

        $scope.signType = {};

        $scope.queryMerchant = function () {
            var url = "/api/merchant";
            $http.get(url).success(function(resp){
                if(resp.data){
                    $scope.data = resp.data;
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };
        $scope.queryMerchant();
        
        //根据支付渠道，查询签名类型
        $scope.querySignTypeByMerchantId = function(merchantId){
            $http.get("/api/merchant/" + merchantId).success(function(response){
                if(response.data) {
                    $scope.merchant.pay_channel = response.data.pay_channel;
                    $scope.merchant.sign_type = response.data.sign_type;

                    if($scope.merchant.pay_channel){
                        //1.根据支付渠道，显示应有的签名类型
                        if($scope.merchant.pay_channel == "wx"){
                            //如果是微信，就显示微信的签名类型
                            console.log("wx")
                            $scope.signType = $scope.wxSignType;

                        }else if($scope.merchant.pay_channel == "alipay"){
                            //如果是支付宝，就显示支付宝的签名类型
                            console.log("alipay")
                            $scope.signType = $scope.alipaySignType;
                        }

                    }else{
                        //没有支付渠道，支付类型数组置空
                        $scope.signType = {};
                        //设置签名类型为空
                        $scope.merchant.sign_type = "";

                    }
                     //设置签名类型
                    $scope.selectSignTypeChange($scope.merchant.sign_type);

                }
            });
            
        }
        //支付渠道选择改变
        $scope.selectMerchantChange = function(merchantId){
            console.log("merchantId ", merchantId);
            $scope.querySignTypeByMerchantId(merchantId);
        }
        
        
        //根据支付渠道id和签名类型，查询密钥
        $scope.showKey = function(sign_type){
            
            $scope.merchant.merchant_id = $scope.merchant.id;
            
                $http.get("/api/sign/" + $scope.merchant.id + "?sign_type=" + $scope.merchant.sign_type).success(function (res) {
                    //如果有密钥，则显示各个密钥
                    if (res.data) {
                        $scope.merchant.sign = res.data.sign;
                        $scope.merchant.public_sign = res.data.public_sign;
                        $scope.merchant.private_sign = res.data.private_sign;
                        $scope.merchant.signId = res.data.id;
                        //如果有密钥，可以删除
                        $("#deleteBtn").show();

                    }else{
                        //如果没有密钥，隐藏删除按钮
                        $("#deleteBtn").hide();
                        $scope.merchant.sign="";
                        $scope.merchant.public_sign="";
                        $scope.merchant.private_sign="";
                        $scope.merchant.signId="";
                    }

                   
                }).error(function (data, status) {
                    console.log("status:", status);
                    toastr.error(data);
                });
            
            
        }
        
        $scope.selectSignTypeChange = function(sign_type) {
            console.log("sign_type : " + sign_type);
            //如果有签名类型，则设置对应的编辑框，并显示签名
            if (sign_type) {

                if (sign_type == "MD5") {
                    $("#publicSignDiv").hide();
                    $("#privateSignDiv").hide();
                    $("#mdgSignDiv").show();
                } else if (sign_type == "RSA2") {
                    $("#mdgSignDiv").hide();
                    $("#publicSignDiv").show();
                    $("#privateSignDiv").show();
                }else{
                    $("#mdgSignDiv").show();
                    $("#publicSignDiv").show();
                    $("#privateSignDiv").show();
                }
                
                $scope.showKey(sign_type);
            }else{//如果没有签名类型

                //没有签名类型就显示所有输入框，并把输入框都置空
                $("#deleteBtn").hide();
                $("#mdgSignDiv").show();
                $("#publicSignDiv").show();
                $("#privateSignDiv").show();
                $scope.merchant.sign="";
                $scope.merchant.public_sign="";
                $scope.merchant.private_sign="";
                $scope.merchant.signId = "";
            }

        }


        $scope.saveSign = function(){
            console.log("$scope.merchant.signId:",$scope.merchant.signId);

            if($scope.merchant.signId){
                $http.put("/api/sign/" + $scope.merchant.signId,$scope.merchant).success(function(response){
                    console.log("response:",response);
                    if(response.success){
                        toastr.success('数据更新成功!');
                        //  $("#deleteBtn").hide();
                        // $scope.merchant={};
                        console.log("merchant:",$scope.merchant);
                        console.log("merchant.signId:",$scope.merchant.signId);

                    }else{
                        toastr.error(response.message);
                    }


                }).error(function(data, status){
                    console.log("status:",status);
                    toastr.error(data);
                });

            }else{

                $http.post("/api/sign",$scope.merchant).success(function(response){
                    console.log("response:",response);
                    if(response.success){
                        toastr.success('数据保存成功!');
                        $scope.merchant={};
                        $("#deleteBtn").hide();
                    } else {
                        toastr.error(response.message);
                    }
                }).error(function(data, status){
                    console.log("status:",status);
                    toastr.error(data);
                });

            }


        }

        $scope.delete = function(){
            commonService.confirm($scope,'确认对话框','您确定要删除密钥吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteSign();
                }
            });
        };

        $scope.deleteSign = function(){
            console.log("id:",$scope.merchant.signId);
            console.log("sign_type:",$scope.merchant.sign_type);
            
            $http.delete("/api/sign/" + $scope.merchant.signId + "?sign_type=" + $scope.merchant.sign_type).success(function(res){
                console.log("res:",res);
                if(res.success){
                    toastr.success('数据删除成功!');
                    $("#deleteBtn").hide();
                    $scope.merchant={};
                } else {
                    toastr.error(res.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        }


    }

})();