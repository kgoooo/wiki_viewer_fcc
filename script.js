// 'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrlimit=10&format=json&callback=JSON_CALLBACK&prop=extracts&prop=extracts&exintro&exsentences=3&exlimit=max&gsrsearch=' + searchTerm + '&callback=?'
$(document).ready(() => {
	console.log('started');
	$("#submit").on('click', () => {
		var searchTerm = $("#text-in").val();
		search(searchTerm);
		$("#text-in").val("");
		return false;
	});
	
	var search = (searchTerm) => {
		$.ajax({
			type: 'POST',
			url: `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrlimit=10&format=json&prop=extracts&prop=extracts&exintro&exsentences=3&exlimit=max&formatversion=2&gsrsearch=${searchTerm}&callback=?`,
			dataType: "jsonp",
			format: "json",
			crossDomain: true,
			headers: { 'Api-User-Agent': 'WikiApp' },
			success: function(data){
				getWikis(data);
			}
		});
		
		var getWikis = (result) => {
			var location = result.query.pages;
			
			for (var i = 0; i <= location.length; i++) {
				var title = location[i].title;
				var extract = location[i].extract;
				var link = `https://en.wikipedia.org/wiki/${encodeURI(title)}`;
		
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
	};
});


