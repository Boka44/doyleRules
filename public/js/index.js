(() => {
	
	    const navbar = document.getElementsByClassName("navbar");
	    const icon = document.getElementsByClassName('icon');
	    icon[0].addEventListener('click', () => {
	    	if (navbar[0].className === "navbar") {
		        navbar[0].className += " responsive";
		    } else {
		        navbar[0].className = "navbar";
		    }
	    })


})();