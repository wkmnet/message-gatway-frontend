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

    angular.module("BlurAdmin.pages.schedule_job.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('schedule_job.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewScheduleJobCtrl",
                title: '新建定时任务',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('schedule_job.new.create', {
            url: '/create',
            templateUrl: 'app/pages/schedule_job/new/schedule_job.html',
            title: '新建定时任务',
            controller: "NewScheduleJobCtrl",
            controllerAs: "newScheduleJobCtrl"
        }).state('schedule_job.new.edit', {
            url: '/edit/:schedule_job',
            templateUrl: 'app/pages/schedule_job/new/edit/schedule_job.html',
            title: '编辑定时任务',
            controller: "EditScheduleJobCtrl",
            controllerAs: "editScheduleJobCtrl"
        });
        $urlRouterProvider.when('/schedule_job/new','/schedule_job/new/create');
    }
})();