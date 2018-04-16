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

    angular.module('BlurAdmin.pages.schedule_job', [
        'BlurAdmin.pages.schedule_job.list',
        'BlurAdmin.pages.schedule_job.new'
    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('schedule_job', {
                url: '/schedule_job',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '定时任务管理',
                sidebarMeta: {
                    icon: 'icon ion-ios-stopwatch',
                    order: 45,
                },
            });
    }

})();
