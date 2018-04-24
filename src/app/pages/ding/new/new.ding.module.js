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

    angular.module("BlurAdmin.pages.ding.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('ding.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewDingCtrl",
                title: '新建钉钉群',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('ding.new.create', {
                url: '/create',
                templateUrl: 'app/pages/ding/new/ding.html',
                title: '新建钉钉',
                controller: "NewDingCtrl",
                controllerAs: "newDingCtrl"
            }).state('ding.new.edit', {
                url: '/edit/:ding',
                templateUrl: 'app/pages/ding/new/edit/ding.html',
                title: '编辑钉钉',
                controller: "EditDingCtrl",
                controllerAs: "editDingCtrl"
            });
        $urlRouterProvider.when('/ding/new','/ding/new/create');
    }
})();