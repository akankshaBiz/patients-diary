/**
 * Created by LEGEND on 04-02-2017.
 */
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
    var flag = false;
  /*  $scope.searchData = {
        firstname: '',
        lastname: '',
        DOB: '',
        age: '',
        gender: '',
        comments: ''
    };*/
    $scope.searchData = [];
    $scope.validate = function(event){

        //alert($scope.firstname);
        var obj = document.getElementById(event.target.id);
        //console.log(obj);
        //console.log(document.getElementById("first-name"));
        if(obj.value=="" || obj.value==undefined){

            //document.getElementById('validSign1').style.display = 'block';
            obj.nextElementSibling.className += " error-block";
            obj.nextElementSibling.innerHTML ="error:"+obj.id+" is a mandatory field";
           // obj.focus();
        }
        else{
            obj.nextElementSibling.style.display ="none";
            flag = true;
        }
    };
    $scope.getAge = function ()
    {
        var today = new Date();
        var birthDate = new Date($scope.DOB);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        {
            age--;
        }
        document.getElementById('userAge').value = age+" years";
        $scope.age=age+" years";
    };

    $scope.newEntry = function () {
        if($scope.firstname=="" || $scope.firstname==undefined){
            alert("Please fill firstname");
            return;
        }
        else if($scope.lastname=="" || $scope.lastname==undefined){
            alert("Please fill lastname");
            return;
        }
        else if($scope.DOB=="" || $scope.DOB==undefined){
            alert("Please fill DOB");
            return;
        }
        else if($scope.age=="" || $scope.age==undefined){
            alert("Please fill age");
            return;
        }
        else if($scope.gender=="" || $scope.gender==undefined){
            alert("Please fill gender");
            return;
        }
        else if($scope.comments=="" || $scope.comments==undefined){
            alert("Please fill comments");
            return;
        }

    var userEntry = {
        firstname: $scope.firstname,
        lastname: $scope.lastname,
        DOB: $scope.DOB,
        age: $scope.age,
        gender: $scope.gender,
        comments: $scope.comments
    };
    //console.log($scope.firstname);
    $scope.searchData.push({
        firstname: $scope.firstname,
        lastname: $scope.lastname,
        DOB: $scope.DOB,
        age: $scope.age,
        gender: $scope.gender,
        comments: $scope.comments
    });
        console.log("user entry ",userEntry.firstname,userEntry.lastname,userEntry.DOB,userEntry.age,userEntry.gender,userEntry.comments);
    $http.post('/newEntry', userEntry).success(function (data) {
        console.log("entry saved");

        alert("user entered successfully");
        $scope.firstname="";
        $scope.lastname="";
        $scope.DOB="";
        $scope.age="";
        $scope.gender="";
        $scope.comments="";
    })
        .error(function (data) {
            console.log("error ");
        })
};
        $http.get('/userEntry').success(function (data) {
            console.log("search data "+data);
            for(var i=0; i<data.length;i++){
                $scope.searchData.push({
                    firstname: data[i].firstname,
                    lastname: data[i].lastname,
                    DOB: data[i].DOB,
                    age: data[i].age,
                    gender: data[i].gender,
                    comments: data[i].comments
                });
            }
           /* $scope.searchData.push({
                firstname: data.firstname,
                lastname: data.lastname,
                DOB: data.DOB,
                age: data.age,
                gender: data.gender,
                comments: data.comments
            });
*/
        })
            .error(function (data) {
                console.log("error in search "+data);
            });
});


$(document).ready(function() {
    $("#departing").datepicker({
        showOn:"button",
        buttonImage: "../images/cal.png",
        buttonImageOnly: true,
        maxDate: "+0d",
        changeMonth:true,
        changeYear:true
    });

});
