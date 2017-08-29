$(document).ready(function(){

    // add listeners to buttons

    /*****************
        USER SIGN UP and SIGN IN BUTTONS
    ******************/ 
    $("#signupButton").on("click",function(event){
        event.preventDefault();
        if ($("#signupUser").val()==="") {
            $("#signupUser").addClass("has-error");
            return false;
        }
        else if ($("#signupPass").val()==="") {
            return false;
        }

        // validated form; attempt new user creation
        else {
            // remove any text from inputs
            $("#signupUser","#signupPass").val("");
            var userInfo = {
                "username": $("#signupUser").val().trim(),
                "password": $("#signupPass").val().trim()
            };
            // the signup method (in ajax.js) takes the user object plus error and success callback fns as arguments
            ajax.signup( userInfo,
                // error callback
                function(response) {
                    console.log(response)
                },
                // success callback
                function(response) {
                    console.log(response)
                }
            );

        };
    }) // end click function for user sign up

    $("#signinButton").on("click",function(event){
        event.preventDefault();
        if ($("#signinUser").val()==="") {
            return false;
        }
        else if ($("#signinPass").val()==="") {
            return false;
        }

        // validated form; attempt new user creation
        else {
            console.log("validated. moving on");
            // remove any text from inputs
            $("#signinUser","#signinPass").val("");
            var userInfo = {
                "username": $("#signinUser").val().trim(),
                "password": $("#signinPass").val().trim()
            };
            // the signin method (in ajax.js) takes the user object plus error and success callback fns as arguments
            ajax.signin( userInfo,
                // error callback
                function(response) {
                    console.log(response)
                },
                // success callback
                function(response) {
                    console.log(response)
                }
            );

        };
    }); // end click function for user sign in

/*****************
 * FRIENDS OF TOUR OPERATIONS
 ****************/

// get all friends of tour
$("#friendsButton").on("click",function(){
    ajax.getFriends( 
        // error callback
        function(response) {
            console.log("There was an error:",response.message);
        },
        // success callback
        function(response) {
            console.log("Successful:",response);
            renderFriends(response);
            // to do: create a function to render friends list to page and call it here; we'll do it that way because we'll call ajax.getFriends() from other places, not just as a click function. 
            // The renderFriends() function must include adding data-id attributes both to a "remove" button and the element containing the friend name
        }
    )
}) // end click function for Friends of Tour list button

// add Friend of Tour
$("#addFriendButton").on("click",function(){
    if ($("#friendName").val()==="") 
        return false
    else {
        var friend = {"name": $("#friendName").val()};
        console.log("friend:",friend);
        ajax.addFriend( friend,
        //error callback
        function(response){
            console.log("Error:",response)
        },
    
        //success callback
        function(response){
            console.log(response);
            // after adding, get full list again
            ajax.getFriends(
                // error callback
                function(response) {
                    console.log("There was an error:",response.message);
                },
                // success callback
                function(response) {
                    console.log(response);
                    renderFriends(response);
                }
            );   
        });
    };    
}); // end click function for getting Friends of Tour list

// update Friend of Tour
$(".updateFriendButton").on("click", function(){
    // todo: matchup jQuery selector here ($(this)) with what we use in HTML
    var id = $(this).attr("data-id");
    var friend = { 
        "name": $(".friendContainer['data-id'=id]").val().trim(), 
        "id": id
    };
    ajax.updateFriend(friend,
        // error callback
        function(response){
            console.log("There was an error:",response.message);
        },
        //success callback
        function(response){
            console.log(response);
            // after adding, get full list again
            ajax.getFriends(
                // error callback
                function(response) {
                    console.log("There was an error:",response.message);
                },
                // success callback
                function(response) {
                    console.log(response);
                    renderFriends(response);
                }
            );   
        });
}); // end click function for updating Friends of Tour item


$(".removeFriendButton").on("click",function(){
    ajax.removeFriend( friendID,
    //error callback
    function(response){
        console.log("There was an error:",response.message)
    },
    //success callback
    function(response){
        console.log(response);
        ajax.getFriends(
            // error callback
            function(response) {
                console.log("There was an error:",response.message);
            },
            // success callback
            function(response) {
                console.log("Successful:",response);
                renderFriends(response);
            }
        );
    });
});

/*****************
 * LOCATIONS OPERATIONS
 ****************/

// get all locations
$("#locationsButton").on("click",function(){
    ajax.getLocations( 
        // error callback
        function(response) {
            console.log("There was an error:",response.message);
        },
        // success callback
        function(response) {
            console.log(response);
            // to do: need renderLocations() function that lists all locations; must include data-id attribute in location container for each location, and in update and remove buttons
            renderLocations(response);

        }
    )
}) // end click function for Friends of Tour list button

// add location
$("#addLocationButton").on("click",function(){
    if ($("#locName").val()==="") 
        return false
        else {
            var name = $("#locName").val();
    
            if ($("#locDesc").val()==="") 
                return false
                else {
                    var description = $("#locDesc").val().trim();
    
                        var type = $("#type input:radio:checked").val();
                        var map = $("#shouldMap input:radio:checked").val();
                        var address = $("#locAddress").val().trim();        
                        var image = $("#locImage").val().trim();
                        var pos = {"lat": $("#locPosLat").val().trim(),"lng":$("#locPosLng").val().trim()}; 
                        var thisLocation = 
                        {
                            "name": name,
                            "type": type,
                            "map": map,
                            "address": address,
                            "description": description,
                            "image": image,
                            "pos": pos
                        };
                    }
                };
        
        console.log("location:",thisLocation);
        ajax.postLocation( thisLocation,
        //error callback
        function(response){
            console.log("Error:",response)
        },
    
        //success callback
        function(response){
            console.log(response);
            renderLocations(response);
        });    
            
    }); // end click function for adding location button

    // update location
    $("#updateLocationButton").on("click",function(){
        // todo: matchup jQuery selectors here with what we use in HTML
        var id = $("#")
        if ($("#locName").val()==="") 
            return false
            else {
                var name = $("#locName").val();
        
                if ($("#locDesc").val()==="") 
                    return false
                    else {
                        var description = $("#locDesc").val().trim();
        
                            var type = $("#type input:radio:checked").val();
                            var map = $("#shouldMap input:radio:checked").val();
                            var address = $("#locAddress").val().trim();        
                            var image = $("#locImage").val().trim();
                            var pos = {"lat": $("#locPosLat").val().trim(),"lng":$("#locPosLng").val().trim()}; 
                            var thisLocation = 
                            {
                                "name": name,
                                "type": type,
                                "map": map,
                                "address": address,
                                "description": description,
                                "image": image,
                                "pos": pos
                            };
                        }
                    };
            
            console.log("location:",thisLocation);
            ajax.updateLocation( thisLocation,
            //error callback
            function(response){
                console.log("Error:",response)
            },
        
            //success callback
            function(response){
                console.log(response);
                renderLocations(response);
            });    
    }); // end click function for updating Location item

})// end doc ready

/*************
 * Other helper functions 
 * ***************/

function renderLocations(locations) {
     console.log(locations);
 };

function renderFriends(friends) {
     console.log(friends)
 };

