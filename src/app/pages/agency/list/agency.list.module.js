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

    angular.module("BlurAdmin.pages.agency.list",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('agency.list', {
                url: '/list',
                templateUrl: 'app/pages/agency/list/list.html',
                controller: "AgencyListCtrl",
                title: '平台列表',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 0,
                },
            });
    }
})();