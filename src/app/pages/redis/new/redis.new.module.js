/**
 * Create with IntelliJ IDEA
 * Project name : admin-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-24
 * Time : 下午2:44
 * ---------------------------------
 *
 */
(function () {
    'use strict';

    angular.module("BlurAdmin.pages.redis.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('redis.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewRedisCtrl",
                title: '新建数据',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 0,
                }
            }).state('redis.new.create', {
            url: '/create',
            templateUrl: 'app/pages/redis/new/redis.html',
            title: '新建数据',
            controller: "NewRedisCtrl",
            controllerAs: "newRedisCtrl"
        }).state('redis.new.edit', {
            url: '/edit/:resource/:db/:redis',
            templateUrl: 'app/pages/redis/new/edit/redis.html',
            title: '编辑数据',
            controller: "EditRedisCtrl",
            controllerAs: "editRedisCtrl"
        });
        $urlRouterProvider.when('/redis/new','/redis/new/create');
    }
})();