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

    angular.module('BlurAdmin.pages.email_list.list', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('email_list.list', {
                url: '/list',
                templateUrl: 'app/pages/email_list/list/list.html',
                controller:'EmailCtrl',
                title: '邮件列表',
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 50,
                },
            });
    }

})();
