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

    angular.module("BlurAdmin.pages.user.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('user.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewUserCtrl",
                title: '新建用户',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('user.new.create', {
                url: '/create',
                templateUrl: 'app/pages/user/new/user.html',
                title: '新建用户',
                controller: "NewUserCtrl",
                controllerAs: "newUserCtrl"
            }).state('user.new.edit', {
                url: '/edit/:user',
                templateUrl: 'app/pages/user/new/edit/user.html',
                title: '编辑用户',
                controller: "EditUserCtrl",
                controllerAs: "editUserCtrl"
            });
        $urlRouterProvider.when('/user/new','/user/new/create');
    }
})();