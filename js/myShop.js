$(document).ready(function() {
    setEnvVar();
    checkIfUserLoggedIn();


});

$(window).load(function() {
    $('.msgPanel').hide();

});

// Here
// var endpointAccount = "http://production--store--account--e4e520.prd.shipped-cisco.com"
// var endpointCart = "http://production--store--cartbackend--2329ec.prd.shipped-cisco.com"
// var endpointCatalog = "http://production--store--catalogbackend--62e4c9.prd.shipped-cisco.com"

function init() {
    $("#btnLogin").click(function() {
        btnLoginCall();
    });

    $("#btnRegister").click(function() {
        btnRegisterCall();
    });

    $("#btnPassword").click(function() {
        btnForgotPasswordCall();
    });

    $(".alert").hide()
    loadItems();
    loadCart();
}

function setEnvVar() {
    $.ajax({
        url: '/endpoints',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            if (data.Account) {
                endpointAccount = data.Account;
            }
            if (data.Catalog) {
                endpointCatalog = data.Catalog;
            }
            if (data.Cart) {
                endpointCart = data.Cart;
            }
            init();
        },
        error: function(request, error) {
            console.log("Endpoint not working");
        }
    });
}
//Param -- L = to visible loginPanel, R = to visisble Register Panel, P = to visible forgot password panel.
function loginPanelVisiblity(param) {
    $('#myLoginModal').modal('show');
    if (param == "R") {
        $("#forgotPasswordPanel").hide();
        $("#registerPanel").show();
        $("#loginPanel").hide();
    } else if (param == "P") {
        $("#forgotPasswordPanel").show();
        $("#registerPanel").hide();
        $("#loginPanel").hide();
    } else if (param == 'S') {
        removeUserInfo();
        loginPanelVisiblity('L')
    } else {
        //Default Login Panel
        $("#forgotPasswordPanel").hide();
        $("#registerPanel").hide();
        $("#loginPanel").show();
    }
}

function btnLoginCall() {
    $('#myLoginModal').modal('hide');
    var email = $("#txtLoginEmail").val();
    var pass = $("#txtLoginPassword").val();
    // alert('Your email :- ' + email + "   and pass is:-  " + pass);
    // curl -i -X GET -H "Content-Type: application/json" http://localhost:8888/v1/catalog/1?mock=true
    $(".msgPanel").show();
    $.ajax({
        url: endpointAccount + '/v1/account/',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            username: email,
            password: pass
        }),
        success: function(data) {
            console.log('Data: ' + JSON.stringify(data));
            $("#txtLoginEmail").val('');
            $("#txtLoginPassword").val('');
            $('#success-alert').html("Welcome to Online Shopping Center " + JSON.stringify(data.username) + " !");
            $("#success-alert").alert();
            $("#success-alert").fadeTo(2000, 500).slideUp(1000, function() {
                $("#success-alert").hide()
            });

            setupUserInfo(data.username);
        },
        error: function(request, error) {
            console.log('ERROR: ' + JSON.stringify(request));
            $("#txtLoginEmail").val('');
            $("#txtLoginPassword").val('');
            $('#danger-alert').html(JSON.stringify(request.responseJSON.message));
            $("#danger-alert").alert();
            $("#danger-alert").fadeTo(2000, 500).slideUp(1000, function() {
                $("#success-alert").hide()
            });
        }
    });
}

function btnRegisterCall() {
    $('#myLoginModal').modal('hide');
    alert('Call service to data for Register user..');
}

function btnForgotPasswordCall() {
    $('#myLoginModal').modal('hide');
    alert('Call service to data for Forgot Password user..');
}

function btnForgotPasswordCall() {
    $('#myLoginModal').modal('hide');
    alert('Call service to data for Forgot Password user..');
}

function removeUserInfo() {
    localStorage.removeItem("username");
    $('#user-email').html('');
    $('.after-login').toggleClass('hide');
    $('.before-login').toggleClass('hide');
}

function setupUserInfo(email) {
    console.log(email)
    if (email == null){
      localStorage.setItem("username", "demo");
      $('#user-email').html("demo");
    }else {
      localStorage.setItem("username", email);
      $('#user-email').html(email);
    }
    $('.after-login').toggleClass('hide');
    $('.before-login').toggleClass('hide');
}

function checkIfUserLoggedIn() {
    var useremail = localStorage.getItem("username");
    if (useremail != null) {
        setupUserInfo(useremail);
    } else {
        loginPanelVisiblity('L');
    }
}

function btnAddToCart(item_id) {
    var username = localStorage.getItem("username")
    $('.msgPanel').show();
    $.ajax({
        url: endpointCart + '/v1/cart/' + item_id, //+ '?mock=true',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            username: username
        }),

        success: function(data) {
            // alert('Data: ' + JSON.stringify(data));
            $('#success-alert').html(JSON.stringify(data.message));
            $("#success-alert").alert();
            $("#success-alert").fadeTo(2000, 500).slideUp(1500, function() {
                $("#success-alert").hide()
            });
        },
        error: function(request, error) {
            $('#danger-alert').html("Something went wrong, Please try again.");
            $("#danger-alert").alert();
            $("#danger-alert").fadeTo(2000, 500).slideUp(1500, function() {
                $("#danger-alert").hide()
            });
        }
    });
}

function btnRemoveCartItem(item_id) {
    var username = localStorage.getItem("username")
        // $('.msgPanel').show();
    $.ajax({
        url: endpointCart + '/v1/cart/' + item_id, //+'?mock=true',
        type: 'DELETE',
        dataType: 'json',
        data: JSON.stringify({
            username: username
        }),
        success: function(data) {

            location.reload();
            $('#success-alert').html(JSON.stringify(data));
            $("#success-alert").alert();
            $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
                $("#success-alert").hide()
            });
        },
        error: function(request, error) {
            // $('#tr_' + item_id).remove();
            // elem = $("[id^=tr_]")
            // if (elem.length == 0) {
            //   $('#shoppingCart').hide();
            // }
            $('#danger-alert').html(JSON.stringify(request));
            $("#danger-alert").alert();
            $("#danger-alert").fadeTo(2000, 500).slideUp(500, function() {
                $("#danger-alert").hide()
            });
        }
    });
}


function btnCheckout() {
    // //ajax call .. to your get all iteams api

    $.ajax({
        url: endpointCart + '/v1/order/',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            alert('Data: ' + JSON.stringify(data));
            $('#success-alert').html("<div class='alert alert-success'>" + JSON.stringify(data) + "</div>");
            $("#success-alert").alert();
            $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
                $("#success-alert").hide()
            });
            window.location.href = 'index.html';
        },
        error: function(request, error) {
            // alert("Request: " + JSON.stringify(request));
            $('#danger-alert').html("<div class='alert alert-error'>" + JSON.stringify(request) + "</div>");
            $("#danger-alert").alert();
            $("#danger-alert").fadeTo(2000, 500).slideUp(500, function() {
                $("#danger-alert").hide()
            });
        }
    });
}

function loadItems() {
    var htmlProductAPI = "";

    $.ajax({
        url: endpointCatalog + '/v1/catalog/',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Insert HTML
            for (var i = 0, l = data.items.length; i < l; i++) {
                htmlProductAPI += myProductHtmlTempl(data.items[i]);
            }
            $('#prodSection').html(htmlProductAPI);
        },
        error: function(request, error) {
            // alert("Error: " + JSON.stringify(request));
        }
    });
}

function loadCart() {
    var htmlCartAPI = "";
    var count = 0;
    var subtotal = 0;
    var username = localStorage.getItem("username")
    console.log(username);
    if (username == null) {
      username = "demo"
    }
    $.ajax({
        url: endpointCart + '/v1/cart/',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            username: username
        }),
        success: function(cartData) {
            // Insert HTML
            if (cartData.length == 0) {
                $('#shoppingCart').html("Cart Empty " + '<a href="index.html" type="button" class="btn btn-default">' +
                    '<span class="glyphicon glyphicon-shopping-cart"></span> Continue Shopping' +
                    '</a>');
            }
            for (var i = 0, l = cartData.length; i < l; i++) {
                var item = cartData;
                $.ajax({
                    url: endpointCatalog + '/v1/catalog/' + item[i].item_id,
                    type: 'GET',
                    dataType: 'json',
                    success: function(itemData) {
                        // Insert HTML
                        // alert(item[count].item_id);
                        htmlCartAPI += cartHtmlTempl(itemData.name, itemData.image, itemData.price, item[count].quantity, item[count].item_id);
                        subtotal += (itemData.price * item[count].quantity);
                        // Check if last loop
                        if (count == (l - 1)) {
                            htmlCartAPI += '<tr><td>   </td><td>   </td><td>   </td><td><h5>Subtotal</h5></td><td class="text-right"><h5><strong>$' + subtotal + '</strong></h5></td></tr>' +
                                '<tr><td>   </td><td>   </td><td>   </td><td><h5>Estimated shipping</h5></td><td class="text-right"><h5><strong>$6.94</strong></h5></td></tr>' +
                                '<tr><td>   </td><td>   </td><td>   </td><td><h3>Total</h3></td><td class="text-right"><h3><strong>$' + (subtotal + 6.94) + '</strong></h3></td></tr>' +
                                '<tr>    <td>   </td><td>   </td><td>   </td><td>' +
                                '<a href="index.html" type="button" class="btn btn-default">' +
                                '<span class="glyphicon glyphicon-shopping-cart"></span> Continue Shopping' +
                                '</a></td><td><button type="button" class="btn btn-success">Checkout <span class="glyphicon glyphicon-play"></span></button></td></tr>';
                            $('#shoppingCart').html(htmlCartAPI);
                            $('#shoppingCart').on('click', '.btn-success', function() {
                                btnCheckout();
                            });
                        }
                        count++
                    },
                    error: function(request, error) {
                        // alert("Error: " + JSON.stringify(request));
                    },
                });
            }
        },
        error: function(request, error) {
            console.log("Error: " + JSON.stringify(request))
        },
    });
}

function myProductHtmlTempl(item) {
    var html = '<div class="col-md-3 hero-feature"><div class="thumbnail"><img src="' + item.image + '" alt="" style="height:150px">' +
        '<div class="caption"><h3>' + item.name + '</h3><p>' + item.description + '</p></div><div>' +
        ' <a href="#" id="btnAddToCart' + item.item_id + '" class="btn btn-primary">Add to Cart!</a> <a href="#" class="btn btn-default">$' + item.price + '</a></div>' +
        '</div></div>';

    // Register button
    // alert("btnAddToCart"+item.item_id);
    $('#prodSection').on('click', '#btnAddToCart' + item.item_id, function() {

        btnAddToCart(item.item_id);
    });
    return html;
}

function cartHtmlTempl(name, image, price, quantity, item_id) {

    var html = '<tr id="tr_' + item_id + '">' +
        '<td class="col-md-6">' +
        '<div class="media">' +
        '<a class="pull-left" href="#"> <img class="media-object" src="' + image + '" style="width: 72px; height: 72px;"> </a>' +
        '<div class="media-body">' +
        '<h4 class="media-heading"><a href="#">' + name + '</a></h4>' +
        //'<h5 class="media-heading"> by <a href="#">Brand name</a></h5>' +
        //'<span>Status: </span><span class="text-success"><strong>In Stock</strong></span>' +
        '</div>' +
        '</div></td>' +
        '<td class="col-md-1" style="text-align: center">' +
        // '<input type="email" class="form-control" id="exampleInputEmail1" value="' + quantity + '">' +
        +quantity +
        '</td>' +
        '<td class="col-md-1 text-center"><strong>$' + price + '</strong></td>' +
        '<td class="col-md-1 text-center"><strong>$' + (price * quantity) + '</strong></td>' +
        '<td class="col-md-1">' +
        '<button id="btnRemoveCartItem' + item_id + '" type="button" class="btn btn-danger">' +
        '<span class="glyphicon glyphicon-remove"></span> Remove' +
        '</button></td>' +
        '</tr>';

    $('#shoppingCart').on('click', '#btnRemoveCartItem' + item_id, function() {

        btnRemoveCartItem(item_id);

    });

    return html
}
