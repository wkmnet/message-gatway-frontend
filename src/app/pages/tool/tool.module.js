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

    angular.module('BlurAdmin.pages.tool', [
        'BlurAdmin.pages.tool.redis',
        'BlurAdmin.pages.tool.user_group_list',
    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('tool', {
                url: '/tool',
                template: '<ui-view></ui-view>',
                abstract: true,
                title: '工具箱',
                sidebarMeta: {
                    icon: 'ion-ios-briefcase',
                    order: 101,
                },
            });
    }

})();
