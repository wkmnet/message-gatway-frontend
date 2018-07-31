/**
 * Create with IntelliJ IDEA
 * Project name : admin-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-24
 * Time : 下午2:42
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.redis', [
        'BlurAdmin.pages.redis.list',
        'BlurAdmin.pages.redis.new',
    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('redis', {
                url: '/redis',
                template: '<ui-view></ui-view>',
                abstract: true,
                title: 'Redis管理',
                sidebarMeta: {
                    icon: 'ion-ios-briefcase',
                    order: 101,
                },
            });
    }

})();
