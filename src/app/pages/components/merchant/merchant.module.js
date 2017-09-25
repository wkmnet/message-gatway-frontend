/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-26
 * Time : 下午5:52
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module("BlurAdmin.pages.components.merchant",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('components.merchant', {
                url: '/merchant',
                templateUrl: 'app/pages/components/merchant/merchant_list.html',
                controller: "MerchantListCtrl",
                title: '参数列表',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 0,
                },
            });
    }
})();