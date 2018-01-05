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

    angular.module('BlurAdmin.pages.sms.notice', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('sms.notice', {
                url: '/notice',
                templateUrl: 'app/pages/sms/notice/notice.html',
                controller:'SmsNoticeCtrl',
                title: '发送通知短信',
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 50,
                },
            });
    }

})();
