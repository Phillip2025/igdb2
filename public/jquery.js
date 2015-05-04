$(function() {
  $( "#tags" ).autocomplete({
    source: function(request, response) {
      $.ajax({
        url: "search/" + request.term + '/1',
        dataType: "json",
      	success: function(data) {
          
      		if (data.length > 0) {
            var array = [];
            for (var i = 0; i< data.length; i++) {
              array.push(data[i].gameTitle);
            }
      			response(array);
      		}
      		else {
      			response([data.message]);
      		}
      	}
      });
    }
  });
});