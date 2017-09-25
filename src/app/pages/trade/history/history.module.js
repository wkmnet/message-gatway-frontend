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

    angular.module("BlurAdmin.pages.trade.history",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('trade.history', {
                url: '/history',
                templateUrl: 'app/pages/trade/history/history_list.html',
                controller: "HistoryCtrl",
                title: '历史订单',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 50,
                },
            });
    }
})();