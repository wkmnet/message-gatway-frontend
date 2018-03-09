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

    angular.module("BlurAdmin.pages.tool.redis",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('tool.redis', {
                url: '/redis',
                template: '<ui-view></ui-view>',
                controller: "RedisListCtrl",
                title: 'Redis管理',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 0,
                }
            }).state('tool.redis.list', {
            url: '/list',
            templateUrl: 'app/pages/tool/redis/redis_list.html',
            title: 'Redis管理',
            controller: "RedisListCtrl",
            controllerAs: "redisListCtrl"
        }).state('tool.redis.edit', {
            url: '/edit/:resource/:redis',
            templateUrl: 'app/pages/tool/redis/edit/redis.html',
            title: '编辑参数',
            controller: "EditRedisCtrl",
            controllerAs: "editRedisCtrl"
        });
        $urlRouterProvider.when('/tool/redis','/tool/redis/list');
    }
})();