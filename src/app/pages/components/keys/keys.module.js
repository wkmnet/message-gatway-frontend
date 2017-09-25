/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-26
 * Time : 下午7:09
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module("BlurAdmin.pages.components.keys",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('components.keys', {
                url: '/keys',
                templateUrl: 'app/pages/components/keys/keys.html',
                controller: "KeysCtrl",
                title: '签名管理',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 150,
                },
            });
    }
})();