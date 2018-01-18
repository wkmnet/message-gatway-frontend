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

    angular.module("BlurAdmin.pages.price.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('price.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewPriceCtrl",
                title: '新建价格',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('price.new.create', {
            url: '/create',
            templateUrl: 'app/pages/price/new/price.html',
            title: '新建价格',
            controller: "NewPriceCtrl",
            controllerAs: "newPriceCtrl"
        }).state('price.new.edit', {
            url: '/edit/:price',
            templateUrl: 'app/pages/price/new/edit/price.html',
            title: '编辑价格',
            controller: "EditPriceCtrl",
            controllerAs: "editPriceCtrl"
        });
        $urlRouterProvider.when('/price/new','/price/new/create');
    }
})();