/**
 * Create with IntelliJ IDEA
 * Project name : message-gatway-frontend
 * Package name :
 * Author : Wukunmeng
 * User : qxy
 * Date : 17-10-11
 * Time : 下午1:14
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module("BlurAdmin.pages.sign.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('sign.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewSignCtrl",
                title: '新建参数',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('sign.new.create', {
            url: '/create',
            templateUrl: 'app/pages/sign/new/sign.html',
            title: '新建签名',
            controller: "NewSignCtrl",
            controllerAs: "newSignCtrl"
        }).state('sign.new.edit', {
            url: '/edit/:sign',
            templateUrl: 'app/pages/sign/new/edit/sign.html',
            title: '编辑签名',
            controller: "EditSignCtrl",
            controllerAs: "editSignCtrl"
        });
        $urlRouterProvider.when('/sign/new','/sign/new/create');
    }
})();