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

    angular.module("BlurAdmin.pages.components.new_merchant",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('components.new_merchant', {
                url: '/edit_merchant',
                template: '<ui-view></ui-view>',
                controller: "NewMerchantCtrl",
                title: '新建参数',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('components.new_merchant.new', {
                url: '/new',
                templateUrl: 'app/pages/components/new_merchant/merchant.html',
                title: '新建参数',
                controller: "NewMerchantCtrl",
                controllerAs: "newMerchantCtrl"
            }).state('components.new_merchant.edit', {
                url: '/edit/:merchant',
                templateUrl: 'app/pages/components/new_merchant/edit/merchant.html',
                title: '编辑参数',
                controller: "EditMerchantCtrl",
                controllerAs: "editMerchantCtrl"
            });
        $urlRouterProvider.when('/components/edit_merchant','/components/edit_merchant/new');
    }
})();