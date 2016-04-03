/**
 * Cytonn Technologies
 * @author Ndirangu Wilson <wndirangu@cytonn.com>
 */

//The filter makes the third character uppercase
 angular.module('nameFilter', []).filter('capitalize', function() {
   return function(input) {
     index=O;
     input =  input.charAt(index).toUpperCase() + input.substr(index + 1);
     return input ;
   };
 });
