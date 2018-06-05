(() => {

	console.log("Rock on Wayne!")

	window.onload = () => {

		const overlay = document.getElementsByClassName('overlay');
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, showErr);
		} else {
			overlay[0].innerHTML = "Geolocation disabled in your browser. Enable for closest show."
		};

		function distance(show, userLat, userLong) {
			return Math.pow((show.lat - userLat), 2) + Math.pow((show.long - userLong), 2);
		}

		function success(pos) {
			
			const userLat = pos.coords.latitude;
			const userLong = pos.coords.longitude;

			let shows = [];

			const urlShows = '/shows/all';
			fetch(urlShows).then((res) => {
				return res.json()
			}).then((res) => {
				res.map((result) => {
					shows.push(result)
				})

				let next3 = [];

				shows.sort((a,b) => {
					return new Date(a.date) - new Date(b.date);
				})
				
				let length = shows.length;
				for (let i = 0; i < length; i++) {
					if(!shows[i].date < new Date()) {
						if(parseInt(new Date(shows[i].date).getMonth()) <= (parseInt(new Date().getMonth()) + 2)){
							next3.push(shows[i]);
						}
					}
				}
				

				next3.forEach((show) => {
					let dist = distance(show, userLat, userLong);
					show['dist'] = dist;
				})
				next3.sort((a,b) => {
					a.dist - b.dist
				})
				overlay[0].innerHTML = "Nearest show near you: " + new Date(next3[0].date).toDateString() + " @ " + next3[0].venue + " in " + next3[0].city;

			})
		}
		function showErr(error) {
		 switch(error.code) {
		    case error.PERMISSION_DENIED:
		      overlay[0].innerHTML = "User denied the request for Geolocation. Enable for closest show."
		      break;
		    case error.POSITION_UNAVAILABLE:
		      overlay[0].innerHTML = "User Location information is unavailable."
		      break;
		    case error.TIMEOUT:
		      overlay[0].innerHTML = "The request to get user location timed out."
		      break;
		    case error.UNKNOWN_ERROR:
		      overlay[0].innerHTML = "An unknown error occurred."
		      break;
		  }
		}
	}
	
})();