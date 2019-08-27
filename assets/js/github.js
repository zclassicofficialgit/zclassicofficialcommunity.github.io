$(document).ready( function () {
	$.getJSON("https://api.github.com/search/issues?q=user:ZClassicCommunity&sort=updated&order=desc", function( data ) {
		console.log(data);
		if (data) {
			var html = '<thead><tr><th>Repo</th><th>Title</th><th>State</th><th>Created by</th><th>Created at</th><th>Latest update</th></tr></thead><tbody style="vertical-align: baseline">';
			for (var i = 0; i < data.items.length; i++) {
				html += '<tr><td><a href="'+data.items[i].repository_url.replace('https://api.github.com/repos/','https://github.com/')+'" target="_blank">'+data.items[i].repository_url.replace('https://api.github.com/repos/ZclassicCommunity/','')+'</a></td><td><a href="'+data.items[i].html_url+'" target="_blank"><b>'+data.items[i].title+'</b></a><br/><p class="small">'+data.items[i].body.replace(/(\r\n|\n|\r)/gm,'<br/>')+'</p></td><td>'+data.items[i].state+'</td><td><a href="'+data.items[i].user.html_url+'" target="_blank">'+data.items[i].user.login+'</a></td><td>'+data.items[i].created_at.replace('T','<br/>').replace('Z','')+'<br/><br/><i><time datetime="'+data.items[i].created_at+'"/></i></td><td>'+data.items[i].updated_at.replace('T','<br/>').replace('Z','')+'<br/><br/><i><time datetime="'+data.items[i].updated_at+'"/></i></td></tr>';
			}
			html += '</tbody>';
			$("#github").show();
			$('#lastissues').html(html);
		}		
		$("time").timeago();
		$('#lastissues').DataTable({responsive: true, dom: 'friptl', paging: true, searching: true, info: true, ordering: true, order: [[ 5, 'desc' ]], columnDefs: [{ width: 150, targets: 4 },{ width: 150, targets: 5 }], fixedColumns: true});
	})


	$.getJSON("https://api.github.com/users/ZClassicCommunity/repos?sort=pushed", function( data ) {
		console.log(data);
		if (data) {
			var html = '<thead><tr><th>Name</th><th>Language</th><th>Created at</th><th>Pushed at</th><th>Issues</th><th>Forks</th><th>Stars</th><th>Size</th></tr></thead><tbody style="vertical-align: baseline">';
			for (var i = 0; i < data.length; i++) {
				html += '<tr><td><a href="'+data[i].html_url+'" target="_blank">'+data[i].name+'</a></td><td>'+data[i].language+'</td><td>'+data[i].created_at.replace('T','<br/>').replace('Z','')+'<br/><br/><i><time datetime="'+data[i].created_at+'"/></i></td><td>'+data[i].pushed_at.replace('T','<br/>').replace('Z','')+'<br/><br/><i><time datetime="'+data[i].pushed_at+'"/></i></td><td>'+data[i].open_issues+'</td><td>'+data[i].forks_count+'</td><td>'+data[i].stargazers_count+'</td><td>'+data[i].size+'</td></tr>';
			}
			html += '</tbody>';
			$("#github").show();
			$('#repositories').html(html);
		}		
		$("time").timeago();
		$('#repositories').DataTable({responsive: true, dom: 'friptl', paging: true, searching: true, info: true, ordering: true, order: [[ 3, 'desc' ]]});
	})

});