((app) => {
    'use strict'
    app.component('contenttable', {
        templateUrl: 'js/components/table.html',
        controller: ['$http', 'StudentService', function($http, StudentService) {
            angular.extend(this, {
                $onInit() {
                    StudentService.get().then((res) => {
                        // get table
                        this.students = res.data
                        let student = this.students
                            //get middleAge
                        let totalAge = 0
                        for (let i = 0; i < this.students.length; i++) {
                            totalAge += this.students[i].age
                            this.middleAge = totalAge / this.students.length
                        }
                    })
                },
                add() {
                    StudentService.add().then((res) => {

                    })
                }
            })
        }]
    })
})(angular.module('app.table', ['app.content']))
