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

    angular.module("BlurAdmin.pages.schedule_trigger.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('schedule_trigger.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewScheduleTriggerCtrl",
                title: '新建触发器',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('schedule_trigger.new.create', {
            url: '/create',
            templateUrl: 'app/pages/schedule_trigger/new/schedule_trigger.html',
            title: '新建触发器',
            controller: "NewScheduleTriggerCtrl",
            controllerAs: "newScheduleTriggerCtrl"
        }).state('schedule_trigger.new.edit', {
            url: '/edit/:schedule_trigger',
            templateUrl: 'app/pages/schedule_trigger/new/edit/schedule_trigger.html',
            title: '编辑触发器',
            controller: "EditScheduleTriggerCtrl",
            controllerAs: "editScheduleTriggerCtrl"
        });
        $urlRouterProvider.when('/schedule_trigger/new','/schedule_trigger/new/create');
    }
})();