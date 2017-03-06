const spaceApp = {};
spaceApp.url = "https://ssd-api.jpl.nasa.gov/cad.api?date-max=5000-01-09&nea-comet=true&dist-max=9999LD";

// asteroid data
spaceApp.getAsteroids = function(query) {
	$.ajax({
		url: spaceApp.url,
		method: "GET",
		dataType: "json",
		data: {
			neo: false,
			body: query,
			limit: 50,
			kind: "a"
		}
	}).then(function(data){
		let asteroids = data.data;
		spaceApp.updateTitle();
 		spaceApp.displayInfo(asteroids, "asteroid");
 		
 	});
}
// comet data
spaceApp.getComets = function(query) {
	$.ajax({
		url: spaceApp.url,
		method: "GET",
		dataType: "json",
		data: {
			neo: false,
			body: query,
			limit: 50,
			kind: "c"
		}
	}).then(function(data){
 		console.log(data);
		let comets = data.data;
 		spaceApp.displayInfo(comets,"comet");
 		// spaceApp.noContent(data);
 		// $('#comets').flickity({
   //     	 	setGallerySize: false
   //     	});
	
 	});
}


// get user input
spaceApp.events = function(){
	// change submit button based on user input
	$('input[type=radio').on('click', function(){
		let value = $(this).attr('id');
		// console.log(value);
		if (value != "moon"){
			$('.submit').attr("value", `Take me to ${value}!`)
		}else {
			$('.submit').attr("value", `Take me to the ${value}!`)
		}

	})
	// get data based on user input
	$('form').on('submit', function(e){
		e.preventDefault();
		let userSelection = $('input:checked').val();
		spaceApp.getAsteroids(userSelection);
		spaceApp.getComets(userSelection);
		
		// Show main content
		$('main').removeClass("hidden");
		// smooth scroll
	    $('html, body').animate({
	        scrollTop: $("h2").offset().top
	    }, 1000);

	});	
};

// display data
spaceApp.displayInfo = function(types,type){
	 var $carousel = $('.content').flickity();
	$carousel.flickity('destroy');

	if(type === "comet"){
		$('#comets').empty();
	 }else {
 		$('#asteroids').empty();
	 }
       	 
	if(types !==undefined){
		 // add html elements
		types.forEach(function(rock){
						
				// console.log(rock)
				let date = rock[3];
				let distance = Math.round(rock[2]);

				// console.log(date,distance);
				let dateEl = $('<li>').text(`Date: ${date}`);
				let distanceEl = $('<li>').text(`Distance: ${distance} au`);
				let containerEl = $('<ul class="gallery-cell">').addClass('container').append(dateEl, distanceEl);

				// append data to container
				if(type === "comet"){
					$('#comets').append(containerEl);
				}else {
					$('#asteroids').append(containerEl);
				}
	
       	 	});
			
			$('#asteroids').append(`<ul class="gallery-cell container"><li>That's all for now!</li></ul>`);
			$('#comets').append(`<ul class="gallery-cell container"><li>That's all for now!</li></ul>`);

				// Only show the first three results
				// $('#asteroids  ul').slice(0,3).slideDown("slow").removeClass('hidden');
				// $('#comets  ul').slice(0,3).slideDown("slow").removeClass('hidden');
			 // });
		} else {
			$("#comets").html("<p>Sorry, no comets in sight!</p>");

	};

	$carousel.flickity();
       	 	
// ---note: changed Load More to Flickity carousel--

	// load more on click
	// let counterAsteroids = 0;
	// let counterComets = 0;
	// $('.load_asteroids').on('click', function(){
	// 	counterAsteroids = counterAsteroids + 3;
	// 	console.log(counterAsteroids);
	// 	$('#asteroids ul').slice(counterAsteroids, counterAsteroids + 3).slideDown("slow").removeClass('hidden');
	// })
	// $('.load_comets').on('click', function(){
	// 	counterComets = counterComets + 3;
	// 	console.log(counterComets);
	// 	$('#comets ul').slice(counterComets, counterComets + 3).slideDown('slow').removeClass('hidden');
	// })

	// spaceApp.loadMoreAsteroids();
	// spaceApp.loadMoreComets();	
};


// spaceApp.loadMoreAsteroids = function(){
// 	$('.load_asteroids').on('click', function(){
// 		if ($('#asteroids ul:last-child').attr("class")=== "container" ){
// 				$(this).text("That's all!")
// 		}
// 	})

// }

// spaceApp.loadMoreComets = function(){
// 	$('.load_comets').on('click', function(){
// 		if ($('#comets ul:last-child').attr("class")=== "container" ){
// 				$(this).text("That's all!")
// 		}
// 	})
// }

// update title with user selection
spaceApp.updateTitle = function(){
	let title = $('input:checked').attr('id');
	console.log(title)

	$('h2').text(title);
}


spaceApp.init = function(){
	spaceApp.events();
			
};

$(function(){
	spaceApp.init();
	$('.content').flickity({
       	 	setGallerySize: false 	});

});

