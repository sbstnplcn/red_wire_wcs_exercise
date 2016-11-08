((app) => {
    'use strict'
    app.service('StudentService', ['$http', class StudentService {

        constructor($http) {
            this.$http = $http
            this.currentStudent = null
        }

        get() {
            return this.$http.get('/users')
        }

        add() {
            let selectedStudent = {}
            return this.$http.post('/users', selectedStudent)
        }

        save(user) {
            if (user._id)
                return this.$http.put('/users/' + user._id, user)
            else
                return this.$http.post('/users', user)
        }

        delete(user) {
            return this.$http.delete('/users/' + user._id)
        }

        edit(user) {
            return this.$http.put('/users/' + user._id, user)
        }

        cancel() {
            let previous = {}
            return this.users[index] = previous[user._id]
        }

    }])
})(angular.module('app.services'))
