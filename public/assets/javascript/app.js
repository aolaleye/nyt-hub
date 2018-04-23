//AJAX DELETE function for deleting a saved article
// $(".delete").on("click", function () {
        
//     var artID = $(this).attr("data-artid");
//     $.ajax({
//         url: "/article/" + artID,
//         type: 'DELETE',
//         success: function(result) {
//             location.reload();
//         }
//     });

//     location.reload();
    
// })

// $("#noMessage").hide();

// //function to show the modal
// function showModal(data) {
//     $("#modalNotes").empty();

//     if (data.note) {
//         $("#modalNotes").append("<div class='card mod'>" +
//             "<div class='card-block notesDiv'>" +
//             "<form action='/note/" + data.note._id + "' method='POST'>" +
//             "<button class='btn btn-primary float-right del' type='submit'>" +
//             "Remove" +
//             "</button>" +
//             "</form>" +
//             data.note.body +
//             "</div>" +
//             "<div id='articleinfo' style='display:none'>" + data._id + "</div>" +
//             "</div>");

//         $('#articlenoteModal').modal('show');
//     } else {

//         $("#modalNotes").append("<div class='card mod'>" +
//             "<div class='card-block'>" +
//             "No notes for this article yet!" +
//             "</div>" +
//             "<div id='articleinfo' style='display:none'>" + data._id + "</div>" +
//             "</div>");
//         $('#articlenoteModal').modal('show');
//     }
// }

// //click handler to add a note
// $(".addNote").on("click", function () {
//     //get the article database _id
//     var artID = $(this).attr("data-artid");
//     //make a GET request to /article/:id
//     $.ajax({
//         url: "/article/" + artID,
//         method: "GET"
//     }).done(function (data) {
//         showModal(data);
//     });
// });

// //click handler to save a note
// $("#saveNote").on("click", function () {
//     //get the note text and the article database _id
//     var newnote = $("#textarea").val().trim();
//     var artID = $("#articleinfo").text();

//     if (newnote !== "") {
//         //make a POST requestto /article/:id
//         $.ajax({
//             url: "/article/" + artID,
//             method: "POST",
//             data: {
//                 body: newnote
//             }
//         }).done(function () {
//             location.assign("/saved");
//         });
//     } else {
//         $("#noMessage").show();
//     }
// });

// $("#noArticlesHomeLink").on("click", function () {
//     location.assign("/");
// });