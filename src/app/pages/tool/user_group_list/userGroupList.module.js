/**
 * Create with IntelliJ IDEA
 * Project name : admin-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-24
 * Time : 下午2:44
 * ---------------------------------
 *
 */
(function () {
    'use strict';

    angular.module("BlurAdmin.pages.tool.user_group_list",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('tool.user_group_list', {
                url: '/user_group_list',
                templateUrl: 'app/pages/tool/user_group_list/userGroupList_list.html',
                controller: "UserGroupListCtrl",
                title: '用户分组管理',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 1,
                }
            })
    }
})();