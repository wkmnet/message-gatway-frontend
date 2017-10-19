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

    angular.module('BlurAdmin.pages.sms.list', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('sms.list', {
                url: '/list',
                templateUrl: 'app/pages/sms/list/list.html',
                controller:'SmsCtrl',
                title: '短信列表',
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 50,
                },
            });
    }

})();
