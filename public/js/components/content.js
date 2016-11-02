((app) => {
    'use strict'
    app.component('content', {
        templateUrl: 'js/components/content.html',
        controller: ['$http', function($http) {
            angular.extend(this, {
                $onInit() {
                    $http.get('/students.json').then((res) => {
                        // get table
                        this.students = res.data
                        let student = this.students
                            // variable
                        let totalAge = 0
                        let middleAge = 0
                        let f = 0
                        let m = 0
                        let longueurNom = 0

                        for (let i = 0; i < this.students.length; i++) {
                            // get middleAge
                            totalAge += this.students[i].age
                            this.middleAge = totalAge / this.students.length
                                //get longestName
                            if (this.students[i].nom.length > longueurNom) {
                                longueurNom = this.students[i].nom.length;
                                this.nomLePlusLong = this.students[i].nom;
                            }
                            //get parity
                            if (this.students[i].sexe === "M") {
                                m += 1
                            } else {
                                f += 1
                            }
                            this.pariteM = `${ m * 100 / this.students.length } %`
                            this.pariteF = `${ f * 100 / this.students.length } %`
                        }

                        //get alphabeticOrder
                        let alphabeticOrder = this.students.sort(function(currName, nextName) {
                            if (currName.nom.toUpperCase() > nextName.nom.toUpperCase()) {
                                return 1
                            } else if (currName.nom.toUpperCase() < nextName.nom.toUpperCase()) {
                                return -1
                            } else {
                                return 0
                            }
                        })
                        let list = ""
                        for (let i = 0; i < this.students.length; i++) {
                            list += `${'<li>'}${this.students[i].nom} ${this.students[i].prenom}${'</li>'}`
                        }
                        this.listAlphabetic = list

                        // get byAge
                        let ageOrder = this.students.sort(function(currName, nextName) {
                            if (currName.age > nextName.age) {
                                return 1
                            } else if (currName.age < nextName.age) {
                                return -1
                            } else {
                                return 0
                            }
                        })
                        let listAge = ""
                        for (let i = 0; i < this.students.length; i++) {
                            listAge += `${"<li>"}${this.students[i].nom} ${this.students[i].prenom} qui a ${this.students[i].age}${"</li>"}`
                        }
                        this.listByAge = listAge

                        //Geocoding
                        let map = new google.maps.Map(document.getElementById('map'), {
                            zoom: 5,
                            center: new google.maps.LatLng(45, 2.6)
                        });
                        let geocoder = new google.maps.Geocoder();
                        geocodeAddress(geocoder, map);
                        let address
                        let contentString

                        function geocodeAddress(geocoder, resultsMap) {
                            student.forEach(function(val) {
                                geocoder.geocode({
                                    'address': val.address
                                }, function(results) {
                                    resultsMap.setCenter(results[0].geometry.location)
                                    let marker = new google.maps.Marker({
                                        map: resultsMap,
                                        position: results[0].geometry.location
                                    })
                                    $http.get(`${ 'http://api.openweathermap.org/data/2.5/weather?q='}${student.city}${ '&appid=39d104ba804c4dba1133789f92fe239f&units=metric'}`).then((res) => {
                                        let json = res.data
                                        let main = `The Weather in ${student.city} : <span style="text-transform : capitalize;">${json.weather[0].description}</span>`
                                        let temperature = `The temperature is : ${ (json.main.temp).toFixed(1)}°C`
                                        let icon = `${ 'http://openweathermap.org/img/w/'}${json.weather[0].icon}${ '.png'}`
                                        contentString = `<h5>${student.Prenom} ${student.nom}</h5>
                                                                            <div id="infoWeather">
                                                                            <br>
                                                                            <div>${main}<br>${temperature}</div>
                                                                            <div><img src="${icon}"></div>
                                                                            </div>`
                                        let infowindow = new google.maps.InfoWindow({
                                            content: contentString
                                        })
                                        marker.addListener('click', function() {
                                            infowindow.open(map, marker)
                                        })
                                    })
                                })
                            })
                        }
                    })
                }
            })
        }]
    })
})(angular.module('app.content', []))
