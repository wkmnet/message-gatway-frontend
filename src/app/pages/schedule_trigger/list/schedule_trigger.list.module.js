/**
 * Create with IntelliJ IDEA
 * Project name : message-gatway-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-11
 * Time : 下午1:13
 * ---------------------------------
 *
 */


(function () {
    'use strict';

    angular.module("BlurAdmin.pages.schedule_trigger.list",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('schedule_trigger.list', {
                url: '/list',
                templateUrl: 'app/pages/schedule_trigger/list/list.html',
                controller: "ScheduleTriggerListCtrl",
                title: '触发器列表',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 26,
                },
            });
    }
})();

