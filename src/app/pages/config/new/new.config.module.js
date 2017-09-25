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

    angular.module("BlurAdmin.pages.config.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('config.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewConfigCtrl",
                title: '新建配置',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('config.new.create', {
                url: '/create',
                templateUrl: 'app/pages/config/new/config.html',
                title: '新建配置',
                controller: "NewConfigCtrl",
                controllerAs: "newConfigCtrl"
            }).state('config.new.edit', {
                url: '/edit/:config',
                templateUrl: 'app/pages/config/new/edit/config.html',
                title: '编辑配置',
                controller: "EditConfigCtrl",
                controllerAs: "editConfigCtrl"
            });
        $urlRouterProvider.when('/config/new','/config/new/create');
    }
})();