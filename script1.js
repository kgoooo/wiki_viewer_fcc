//initialize the program
$(document).ready(() => {
	onLoad();
});
// sets focus on the text input to allow immediate typing, once clicked the rest of the program begins with handleClick.
var onLoad = () => {
	document.getElementById("text-in").focus();
	handleClick();
};
//sets up event listener for click on the Submit button.  
// Sets the search term for the API call from the text in the input field.
// clears the text field after submit and prevents page reload.
var handleClick = () => {
	$("#submit").on('click', () => {
		var searchTerm = $("#text-in").val();
		search(searchTerm);
		$("#text-in").val("");
		return false;
	});
};
// call to the api, upon success, getWikis is called.  log error if error.
var search = (searchTerm) => {
	$.ajax({
		type: 'POST',
		url: `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json&formatversion=2&callback=?`,
		dataType: "jsonp",
		format: "json",
		crossDomain: true,
		headers: { 'Api-User-Agent': 'WikiApp' },
		success: function(data){
			console.log(data);
			getWikis(data);
		},
		error: function(req, status, err) {
			console.log(err);
		}
	});
};
// clears UL and then adds the api response data to the DOM.  
var getWikis = (data) => {
	if(data[1].length === 0){
		$('#res').append(
			'<li>No matching results, please search again.</li>'
		);
	} else {
		$('#res').empty();

		for (var i = 0; i < data[1].length; i++) {
			var title = data[1][i];
			var extract = data[2][i];
			var link = data[3][i];

			$('#res').append(
				`<li class="result-box">
					<h3>${title}</h3>
					<span>${extract}</span>
					<br>
					<span><a href=${link}><strong>Open the full article</strong></a></span>
				</li>`
			);
		}
	}
};



