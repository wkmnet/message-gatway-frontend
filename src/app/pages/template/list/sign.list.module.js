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

    angular.module("BlurAdmin.pages.template.list",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('template.list', {
                url: '/list',
                templateUrl: 'app/pages/template/list/list.html',
                controller: "TemplateListCtrl",
                title: '短信模板列表',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 26,
                },
            });
    }
})();

