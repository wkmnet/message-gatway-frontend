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

    angular.module("BlurAdmin.pages.agency.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('agency.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewAgencyCtrl",
                title: '新建平台',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('agency.new.create', {
                url: '/create',
                templateUrl: 'app/pages/agency/new/agency.html',
                title: '新建平台',
                controller: "NewAgencyCtrl",
                controllerAs: "newAgencyCtrl"
            }).state('agency.new.edit', {
                url: '/edit/:agency',
                templateUrl: 'app/pages/agency/new/edit/agency.html',
                title: '编辑平台',
                controller: "EditAgencyCtrl",
                controllerAs: "editAgencyCtrl"
            });
        $urlRouterProvider.when('/agency/new','/agency/new/create');
    }
})();