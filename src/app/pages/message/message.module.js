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

    angular.module("BlurAdmin.pages.message",["BlurAdmin.pages.message.list"]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('message', {
                url: '/message',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '消息管理',
                sidebarMeta: {
                    icon: 'ion-android-mail',
                    order: 50,
                },
            });
    }
})();