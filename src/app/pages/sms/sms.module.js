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

    angular.module('BlurAdmin.pages.sms', ['BlurAdmin.pages.sms.list']).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('sms', {
                url: '/sms',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '短信管理',
                sidebarMeta: {
                    icon: 'ion-email',
                    order: 0,
                },
            });
    }

})();
