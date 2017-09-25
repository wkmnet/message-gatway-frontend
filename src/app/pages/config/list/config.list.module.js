/**
 * Create with IntelliJ IDEA
 * Project name : blur-admin-1.2.0
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-20
 * Time : 上午11:16
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module("BlurAdmin.pages.config.list",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('config.list', {
                url: '/list',
                templateUrl: 'app/pages/config/list/list.html',
                controller: "ConfigListCtrl",
                title: '配置列表',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 0,
                },
            });
    }
})();