// 'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrlimit=10&format=json&callback=JSON_CALLBACK&prop=extracts&prop=extracts&exintro&exsentences=3&exlimit=max&gsrsearch=' + searchTerm + '&callback=?'
// `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json&formatversion=2&callback=?`

// `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrlimit=10&format=json&prop=extracts&prop=extracts&exintro&exsentences=3&exlimit=max&formatversion=2&gsrsearch=${searchTerm}&callback=?`

$(document).ready(() => {
	onLoad();
});

var onLoad = () => {
	console.log('started');
	document.getElementById("text-in").focus();
	handleClick();
};

var handleClick = () => {
	$("#submit").on('click', () => {
		var searchTerm = $("#text-in").val();
		search(searchTerm);
		$("#text-in").val("");
		return false;
	});
};

var search = (searchTerm) => {
	$.ajax({
		type: 'POST',
		url: `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json&formatversion=2&callback=?`,
		dataType: "jsonp",
		format: "json",
		crossDomain: true,
		headers: { 'Api-User-Agent': 'WikiApp' },
		success: function(data){
			getWikis(data);
		}
	});
};
	
var getWikis = (data) => {
	// var data = result.query.pages;
	
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
};



