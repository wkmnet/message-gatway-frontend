/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-9-22
 * Time : 下午4:45
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .service('commonService', commonService);

    /** @ngInject */
    function commonService($uibModal) {
        this.confirm = function (scope,title,body) {
            scope.confirm_title = title;
            scope.confirm_body = body;
            var items = {};
            var modalConfig = {
                animation: true,
                templateUrl: 'app/theme/components/template/dialog.html',
                size: 'md',
                scope: scope,
                resolve: {
                    items: function () {
                        return items;
                    }
                }
            };
            // if(!scope.ok){
            //     scope.ok = function () {
            //         $uibModalInstance.close($scope.currentNode);
            //     }
            // }
            // if(!scope.cancel){
            //     scope.cancel = function () {
            //         $uibModalInstance.dismiss('cancel');
            //     }
            // }
            return $uibModal.open(modalConfig).result;
        }
    }
    // function commonService($modal) {
    //     var modalDefaults = {
    //         backdrop: true,
    //         keyboard: true,
    //         modalFade: true,
    //         templateUrl: 'app/theme/components/template/dialog.html'
    //     };
    //
    //     var modalOptions = {
    //         closeButtonText: '取消',
    //         actionButtonText: '确认',
    //         headerText: '确认通知',
    //         bodyText: '确认消息体消息'
    //     };
    //
    //     this.showModal = function (customModalDefaults, customModalOptions) {
    //         if (!customModalDefaults) customModalDefaults = {};
    //         customModalDefaults.backdrop = 'static';
    //         return this.show(customModalDefaults, customModalOptions);
    //     };
    //
    //     this.show = function (customModalDefaults, customModalOptions) {
    //         //Create temp objects to work with since we're in a singleton service
    //         var tempModalDefaults = {};
    //         var tempModalOptions = {};
    //
    //         //Map angular-ui modal custom defaults to modal defaults defined in service
    //         angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
    //
    //         //Map modal.html $scope custom properties to defaults defined in service
    //         angular.extend(tempModalOptions, modalOptions, customModalOptions);
    //
    //         if (!tempModalDefaults.controller) {
    //             tempModalDefaults.controller = function ($scope, $modalInstance) {
    //                 $scope.modalOptions = tempModalOptions;
    //                 $scope.modalOptions.ok = function (result) {
    //                     $modalInstance.close(result);
    //                 };
    //                 $scope.modalOptions.close = function (result) {
    //                     $modalInstance.dismiss('cancel');
    //                 };
    //             };
    //         }
    //
    //         return $modal.open(tempModalDefaults).result;
    //     };
    // }
})();