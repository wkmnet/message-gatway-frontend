/**
 * Create with IntelliJ IDEA
 * Project name : message-gatway-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-11
 * Time : 上午11:29
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.schedule_trigger', [
        'BlurAdmin.pages.schedule_trigger.list',
        'BlurAdmin.pages.schedule_trigger.new'
    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('schedule_trigger', {
                url: '/schedule_trigger',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '触发器管理',
                sidebarMeta: {
                    icon: 'icon ion-ios-stopwatch-outline',
                    order: 46,
                },
            });
    }

})();
