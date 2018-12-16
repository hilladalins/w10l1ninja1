$(document).ready(function () {
    $('#add-user').click(addUser);
    $('#get-users').click(getUsers);
    $('#delete-user').click(deleteUser);
})

function addUser() {
    var user = $('input').val();
    $.ajax({
        type:'POST',
        url: 'http://localhost:7000/addUser',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "name": user
        }),
        error: function (msg) {
            alert(msg.responseText);
        }
    })
}


function deleteUser() {
    var user = $('input').val();
    $.ajax({
        type:'DELETE',
        url: 'http://localhost:7000/deleteUser',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "name": user
        }),
        error: function (msg) {
            alert(msg.responseText);
        }
    })
}

function getUsers() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:7000/getUsers',
        dataType: 'json',
        success: function (users) {
        var table = $("#table")
            table.empty();
            for (var i=0; i<users.length; i++){
                var new_row = $("<tr/>")
                new_row.text(users[i].name)
                table.append(new_row);
            }
        },
    })
}

