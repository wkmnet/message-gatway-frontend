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

    angular.module("BlurAdmin.pages.d_template.list",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('d_template.list', {
                url: '/list',
                templateUrl: 'app/pages/d_template/list/list.html',
                controller: "DingTemplateListCtrl",
                title: '钉钉模板列表',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 26,
                },
            });
    }
})();

