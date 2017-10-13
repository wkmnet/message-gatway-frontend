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

    angular.module("BlurAdmin.pages.param.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('param.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewParamCtrl",
                title: '新建参数',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('param.new.create', {
            url: '/create',
            templateUrl: 'app/pages/param/new/param.html',
            title: '新建参数',
            controller: "NewParamCtrl",
            controllerAs: "newParamCtrl"
        }).state('param.new.edit', {
            url: '/edit/:param',
            templateUrl: 'app/pages/param/new/edit/param.html',
            title: '编辑参数',
            controller: "EditParamCtrl",
            controllerAs: "editParamCtrl"
        });
        $urlRouterProvider.when('/param/new','/param/new/create');
    }
})();