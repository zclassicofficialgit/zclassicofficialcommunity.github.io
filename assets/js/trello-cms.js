$(document).ready( function () {
	$.getJSON("https://trello.com/b/0Dqw4ZFf.json", function( data ) {
		console.log(data);
		var contentTree = {};
		var contentTreeMap = {};
		if (data.cards) {
			for (var i = 0; i < data.lists.length; i++) {
				contentTree[data.lists[i].name] = {name: data.lists[i].name, id: data.lists[i].id, elements: new Array()};
				contentTreeMap[data.lists[i].id] = data.lists[i].name;
			}		
			for (var i = 0; i < data.cards.length; i++) {
				if (data.cards[i].closed) continue;
				var imgUrl = data.cards[i].attachments.find(el => el.url !== undefined && el.url.search(/\.(png|jpg|gif|svg)/) > 0);
				var content = data.cards[i].desc.length > 0 ? data.cards[i].desc : undefined;
				var comments = data.actions.filter(el => el.type === "commentCard" && el.data.card.id === data.cards[i].id);		
				var link = comments.length > 0 ? comments.find(el => el.data.text.startsWith('http') === true) : undefined;
				var text = comments.length > 0 ? comments.find(el => el.data.text.startsWith('http') === false) : undefined;
				var linkUrl = link ? link.data.text : undefined;
				var comment = text ? text.data.text : undefined;
				contentTree[contentTreeMap[data.cards[i].idList]].elements.push({name: data.cards[i].name, imageUrl: imgUrl ? imgUrl.url.replace("?dl=0","?raw=1") : undefined, linkUrl: linkUrl, attachments: data.cards[i].attachments, content: content, comment: comment, comments: comments, details: data.cards[i]});			
			}
			console.log(contentTree);		
		}

		// exchanges
		var exchanges = contentTree['exchanges'].elements;
		for (var i = 0; i < exchanges.length; i++) {
			$('#exchanges').append('<a href="'+(exchanges[i].linkUrl?exchanges[i].linkUrl:'#')+'" target="_blank"><img src="'+exchanges[i].imageUrl+'" alt="'+exchanges[i].name+'"/></a>');
			exchangesImageUrlMap[''+exchanges[i].name.toLowerCase().replace(' ','')] = exchanges[i].imageUrl;
		}

		// wallets
		var wallets = contentTree['wallets'].elements;
		for (var i = 0; i < wallets.length; i++) {
			$('#wallets').append('<a href="'+(wallets[i].linkUrl?wallets[i].linkUrl:'#')+'" target="_blank"><img src="'+wallets[i].imageUrl+'" alt="'+wallets[i].name+'"/></a>');
		}

		// signals
		var signals = contentTree['signals'].elements;
		for (var i = 0; i < signals.length; i++) {
			$('#signals').append('<a href="'+(signals[i].linkUrl?signals[i].linkUrl:'#')+'" target="_blank"><img src="'+signals[i].imageUrl+'" alt="'+signals[i].name+'"/></a>');
		}

		// supporters
		var supporters = contentTree['supporters'].elements;
		for (var i = 0; i < supporters.length; i++) {
			$('#supporters').append('<a href="'+(supporters[i].linkUrl?supporters[i].linkUrl:'#')+'" target="_blank"><img src="'+supporters[i].imageUrl+'" alt="'+supporters[i].name+'"/></a>');
			$('.'+supporters[i].name.toLowerCase()).show();
		}

		// contents
		var contents = contentTree['contents'].elements;
		for (var i = 0; i < contents.length; i++) {
			$('.'+contents[i].name).html(contents[i].content);
		}

		// roadmap
		var events = [];
		var eventsMap = contentTree['roadmap'].elements;
		for (var i = 0; i < eventsMap.length; i++) {
			events.push({date:''+eventsMap[i].name,content:eventsMap[i].content + (eventsMap[i].comment ? '<small>'+eventsMap[i].comment+'</small>':'')});
			//$('#'+eventsMap[i].name).append('<p>'+eventsMap[i].content+'</p><p>'+eventsMap[i].comment+'</p>');
		}
		$('#timeline').roadmap(events, {
			eventsPerSlide: 6,
			slide: 1,
			prevArrow: '<i class="fa fa-arrow-circle-left"></i>',
			nextArrow: '<i class="fa fa-arrow-circle-right"></i>'
		});

		// alerts
		var alerts = [];
		var alertsMap = contentTree['alerts'].elements;
		for (var i = 0; i < alertsMap.length; i++) {
			if (alertsMap[i].content && alertsMap[i].content.length > 0) {
				$('.'+alertsMap[i].name).html(alertsMap[i].content);
				$('#'+alertsMap[i].name).show();
				if (alertsMap[i].name === 'breakingnews') {
					$('#breakingnews').reveal({
					     animation: 'fadeAndPop',                   //fade, fadeAndPop, none	
					     animationspeed: 300,                       //how fast animtions are
					     closeonbackgroundclick: true,              //if you click background will modal close?
					     dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
					});
				}
			}
		}
		
		

		// faq
		var faqTemplate = '<div class="card accordion-item"><div class="accordion-header" id="accordionHeading${num}"><h5 class="mb-0">';
        	faqTemplate += '<button class="accordion-btn" type="button" data-toggle="collapse" data-target="#accordionItem${num}" aria-expanded="true" aria-controls="accordionItem${num}">';
        	faqTemplate += '<span class="accordion-icon"><i class="${icon}"></i></span><span class="accordion-title">${title}</span><span class="accordion-arrow"><i class="arrow_carrot-down"></i></span>';
        	faqTemplate += '</button></h5></div>';
	    	faqTemplate += '<div id="accordionItem1" class="collapse show" aria-labelledby="accordionHeading${num}" data-parent="#iconicAccordion"><div class="card-body accordion-body">${content}</div></div>';
		var faq = contentTree['FAQ'].elements;
		for (var i = 0; i < faq.length; i++) {
			var head = faq[i].name.split('|');
			var title = head[0];
			var icon = head.length > 0 ? head[1] : '';
			var content = faq[i].content ? faq[i].content : '';
			$('#iconicAccordion').append(faqTemplate.replace(/\${num}/g,i).replace(/\${icon}/g,icon).replace(/\${title}/g,title).replace(/\${content}/g,content));
		}
		$('.faq').show();

	});
});
