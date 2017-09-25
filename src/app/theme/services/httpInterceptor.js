/**
 * @author wukm
 *
 */
(function () {
    'use strict';

    var app = angular.module('BlurAdmin.theme');
    app.factory('HttpInterceptor', ['$q','$window',HttpInterceptor]);

    /** @ngInject */
    function HttpInterceptor($q,$window) {
        return {
            request: function(config){
                console.log("config",config);
                return config;
            },
            requestError: function(err){
                console.error("err", err);
                return $q.reject(err);
            },
            response: function(res){
                console.log("resp", res);
                return res;
            },
            responseError: function(err){
                console.log("resp-error", err);
                if(-1 === err.status) {
                    // 远程服务器无响应
                } else if(500 === err.status) {
                    // 处理各类自定义错误
                } else if(501 === err.status) {
                    // ...
                } else if(403 === err.status) {
                    $window.location.href = "/auth";
                }
                return $q.reject(err);
            }
        };
    }
    app.config(['$httpProvider', function($httpProvider){
        $httpProvider.interceptors.push(HttpInterceptor);
    }]);
})();