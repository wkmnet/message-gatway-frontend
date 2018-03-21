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

    angular.module('BlurAdmin.pages.email_list', ['BlurAdmin.pages.email_list.list']).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('email_list', {
                url: '/email_list',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '邮件管理',
                sidebarMeta: {
                    icon: 'ion-email',
                    order: 2,
                },
            });
    }

})();
