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

    angular.module("BlurAdmin.pages.sign.list",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('sign.list', {
                url: '/list',
                templateUrl: 'app/pages/sign/list/list.html',
                controller: "SignListCtrl",
                title: '签名列表',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 0,
                },
            });
    }
})();

