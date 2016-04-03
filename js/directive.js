/**
 * Cytonn Technologies
 * @author Ndirangu Wilson <wndirangu@cytonn.com>
 */

//The directive adds the world information to the index page

angular.module('Directive', [])
.controller('displayControl', ['$scope', function($scope) {
  $scope.world = {
    continents: 'Africa,Asia,Europe,America,Actic',
    location: 'earth',
    age:'3 billion years'
  };
}])
.directive('worldInfo', function() {
  return {
    template: '<p><h3>Continents:</h3>  <h4>{{world.continents}}</h4> </hr> <h3>location:<h3> <h4>{{world.location}}</h4> </hr> <h3>Age:</h3> <h4>{{world.age}}</h4></p>'
  };
});
