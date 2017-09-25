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

    angular.module("BlurAdmin.pages.components.upload",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('components.upload', {
                url: '/upload',
                templateUrl: 'app/pages/components/upload/upload.html',
                controller: "UploadCtrl",
                title: '上传文件',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 0,
                },
            });
    }
})();