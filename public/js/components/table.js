((app) => {
    'use strict'
    app.component('contenttable', {
        templateUrl: 'js/components/table.html',
        controller: ['$http', function($http) {
            angular.extend(this, {
                $onInit() {
                    $http.get('/students.json').then((res) => {
                        // get table
                        this.students = res.data
                        let student = this.students
                    })
                }
            })
        }]
    })
})(angular.module('app.table', ['app.content']))
