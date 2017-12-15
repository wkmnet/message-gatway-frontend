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

    angular.module("BlurAdmin.pages.platform.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('platform.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewPlatformCtrl",
                title: '新建平台',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('platform.new.create', {
                url: '/create',
                templateUrl: 'app/pages/platform/new/platform.html',
                title: '新建平台',
                controller: "NewPlatformCtrl",
                controllerAs: "newplatformCtrl"
            }).state('platform.new.edit', {
                url: '/edit/:platform',
                templateUrl: 'app/pages/platform/new/edit/platform.html',
                title: '编辑平台',
                controller: "EditPlatformCtrl",
                controllerAs: "editPlatformCtrl"
            });
        $urlRouterProvider.when('/platform/new','/platform/new/create');
    }
})();