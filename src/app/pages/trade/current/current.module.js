/**
 * Create with IntelliJ IDEA
 * Project name : blur-admin-1.2.0
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-20
 * Time : 上午11:16
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module("BlurAdmin.pages.trade.current",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('trade.current', {
                url: '/current',
                templateUrl: 'app/pages/trade/current/current_list.html',
                controller: "CurrentCtrl",
                title: '实时订单',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 0,
                },
            });
    }
})();