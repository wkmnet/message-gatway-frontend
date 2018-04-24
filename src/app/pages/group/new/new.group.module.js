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

    angular.module("BlurAdmin.pages.group.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('group.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewGroupCtrl",
                title: '新建分组',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('group.new.create', {
                url: '/create',
                templateUrl: 'app/pages/group/new/group.html',
                title: '新建分组',
                controller: "NewGroupCtrl",
                controllerAs: "newGroupCtrl"
            }).state('group.new.edit', {
                url: '/edit/:group',
                templateUrl: 'app/pages/group/new/edit/group.html',
                title: '编辑分组',
                controller: "EditGroupCtrl",
                controllerAs: "editGroupCtrl"
            });
        $urlRouterProvider.when('/group/new','/group/new/create');
    }
})();