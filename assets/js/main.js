
(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Banner.
			var $banner = $('#banner');

			if ($banner.length > 0) {

				// IE fix.
					if (skel.vars.IEVersion < 12) {

						$window.on('resize', function() {

							var wh = $window.height() * 0.60,
								bh = $banner.height();

							$banner.css('height', 'auto');

							window.setTimeout(function() {

								if (bh < wh)
									$banner.css('height', wh + 'px');

							}, 0);

						});

						$window.on('load', function() {
							$window.triggerHandler('resize');
						});

					}

				// Video check.
					var video = $banner.data('video');

					if (video)
						$window.on('load.banner', function() {

							// Disable banner load event (so it doesn't fire again).
								$window.off('load.banner');

							// Append video if supported.
								if (!skel.vars.mobile
								&&	!skel.breakpoint('large').active
								&&	skel.vars.IEVersion > 9)
									$banner.append('<video autoplay loop><source src="' + video + '.mp4" type="video/mp4" /><source src="' + video + '.webm" type="video/webm" /></video>');

						});

				// More button.
					$banner.find('.more')
						.addClass('scrolly');

			}

		// Scrolly.
			$('.scrolly').scrolly();

	
			$window.on('load', function() {  	

				var $thumbs = $('.thumbnails');

				if ($thumbs.length > 0)
					$thumbs.poptrox({
						onPopupClose: function() { $body.removeClass('is-covered'); },
						onPopupOpen: function() { $body.addClass('is-covered'); },
						baseZIndex: 10001,
						useBodyOverflow: false,
						overlayColor: '#222226',
						overlayOpacity: 0.75,
						popupLoaderText: '',
						fadeSpeed: 500,
						usePopupDefaultStyling: false,
						windowMargin: (skel.breakpoint('small').active ? 5 : 50)
					});

			});

		// Initial scroll.
			$window.on('load', function() {
				$window.trigger('scroll');
			});

	});

})(jQuery);




// Pop-up

var DropBtn = document.getElementsByClassName("Popup");
for(var i=0;i<DropBtn.length;i++){
DropBtn[i].addEventListener('click', PopupHid);
}

function PopupHid()
{
	var NameOfButton = this.name;
	var PopupSpace = document.getElementById(NameOfButton);
	PopupSpace.style.display = "block";

	var PopClose1 = document.getElementById("Accept" + NameOfButton);
	PopClose1.onclick = function() {
	PopupSpace.style.display = "none";
	}
	var PopClose2 = document.getElementById("ClosePop" + NameOfButton);
	PopClose2.onclick = function() {
	PopupSpace.style.display = "none";
	}		
}



// Ikony

var IconBtn = document.getElementsByClassName("icon");
console.log("tekst", IconBtn);
for(var i=0;i<IconBtn.length;i++){
	console.log(i," : ",IconBtn[i]);
	IconBtn[i].addEventListener("click", IconBtnFunct);
}

function IconBtnFunct()
{ this.href = "https://www.wp.pl/";}

// Wybór rasy

var DrpdwnClck = document.getElementById("DropRaceDown");				// Wzięcie id przycisku
DrpdwnClck.addEventListener("click", ClassAdd);							// Dodanie listnera

function ClassAdd(){													// Funkcja dodania widoczności poprzez nadanie klasy dla diva
	this.parentElement.children[1].classList.remove("hidden");
	this.parentElement.children[1].classList.add("dropdown-content");
}

var RaceList = document.getElementsByClassName("RaceChoose");			// Wyłapanie po klasie elementów dropdowna
for(var i=0;i<RaceList.length;i++){
	 RaceList[i].addEventListener("click", DropDownUse);				// Dodanie listnera na każdym divie
}

function DropDownUse(){
	
	var DropDownRace1 = document.getElementById("DropRaceDown");		// Przycisk
	var DropDownRace2 = document.getElementById("RaceName");			// Tytuł
	var DropDownRace3 = document.getElementById("MainRace");			// Na głównej
	var RacePick = this.innerHTML;										// Chwycenie wartości z diva
	DropDownRace1.innerHTML = RacePick;									// Przypisanie
	DropDownRace2.innerHTML = RacePick;									// Przypisanie
	DropDownRace3.value = RacePick;										// Przypisanie
	this.parentElement.classList.add("hidden");							// Usunięcie widoczności poprzez zabranie klasy
	this.parentElement.classList.remove("dropdown-content");
	RaceDescSet(RacePick);												// Wywołanie funkcji do tworzenia opisów na bazie wartości z diva
}

function RaceDescSet(RacePickFunct){
	var RaceDesc = document.getElementById("RaceDesc");					// Wyłapanie miejsc na wrzucenie danych
	var RaceStat = document.getElementById("RaceStats");
	var RaceOther = document.getElementById("RaceOtherStats");
	var RacePic = document.getElementById("RacePic");

// Ustawienie podrasy w zależności od rasy 

	var RaceExt = document.getElementById("RaceExt");					// Chwycenie id na dropdowna
	var HumanArr = ["Jeden", "Dwa", "Trzy"];							// Daklarowanie tablic podras
	var DwarfArr = ["Dwar1", "Dwar2", "Dwar3", "Dwar4", "Dwar5"];
	var GnomeArr = ["Gnome1", "Gnome2"];

	

	if(RacePickFunct == 'Człowiek'){									// W zależności od wartości z przyciska dobiera pakiet danych do załadowania
		RaceDesc.innerHTML = "Opis Człowiek";
		RaceStat.innerHTML = "Staty Człowiek";
		RaceOther.innerHTML = "Inne Człowiek";
		RacePic.src = "images/Human.jpg";
		RaceExtSet(HumanArr, RaceExt);						// Funkcja dodawania listy w postaci div na podstawie tablicy
		
	}
	else if(RacePickFunct == 'Krasnolud'){
		RaceDesc.innerHTML = "Opis Krasnolud";
		RaceStat.innerHTML = "Staty Krasnolud";
		RaceOther.innerHTML = "Inne Krasnolud";
		RacePic.src = "images/Dwarf.jpg";
		RaceExt.innerHTML = RaceExtSet(DwarfArr);
		RaceExt.innerHTML = RaceExtSet(DwarfArr);
	}
	else if(RacePickFunct == 'Gnom'){
		RaceDesc.innerHTML = "Opis Gnom";
		RaceStat.innerHTML = "Staty Gnom";
		RaceOther.innerHTML = "Inne Gnom";
		RacePic.src = "images/Gnome.jpg";
		RaceExt.innerHTML = RaceExtSet(GnomeArr);
		RaceExt.innerHTML = RaceExtSet(GnomeArr);
	}
	else if(RacePickFunct == 'Ork'){
		RaceDesc.innerHTML = "Opis Ork";
		RaceStat.innerHTML = "Staty Ork";
		RaceOther.innerHTML = "Inne Ork";
		RacePic.src = "images/Orc.jpg";
	}
	else if(RacePickFunct == 'Niziołek'){
		RaceDesc.innerHTML = "Opis Niziołek";
		RaceStat.innerHTML = "Staty Niziołek";
		RaceOther.innerHTML = "Inne Niziołek";
		RacePic.src = "images/Halfling.jpg";
	}
	else if(RacePickFunct == 'Planokrwisty'){
		RaceDesc.innerHTML = "Opis Planokrwisty";
		RaceStat.innerHTML = "Staty Planokrwisty";
		RaceOther.innerHTML = "Inne Planokrwisty";
		RacePic.src = "images/Planist.jpg";
	}
	else if(RacePickFunct == 'Półelf'){
		RaceDesc.innerHTML = "Opis Półelf";
		RaceStat.innerHTML = "Staty Półelf";
		RaceOther.innerHTML = "Inne Półelf";
		RacePic.src = "images/Halfelf.jpg";
	}
	else if(RacePickFunct == 'Półork'){
		RaceDesc.innerHTML = "Opis Półork";
		RaceStat.innerHTML = "Staty Półork";
		RaceOther.innerHTML = "Inne Półork";
		RacePic.src = "images/Halforc.jpg";
	}
	else if(RacePickFunct == 'Pomniejsze rasy'){
		RaceDesc.innerHTML = "Opis Pomniejsze rasy";
		RaceStat.innerHTML = "Staty innych ras";
		RaceOther.innerHTML = "Inne innych";
		RacePic.src = "images/Other.jpg";
	}
	else if(RacePickFunct == 'Likantropy'){
		RaceDesc.innerHTML = "Opis Likantropy";
		RaceStat.innerHTML = "Staty Likantropy";
		RaceOther.innerHTML = "Inne Likantropy";
		RacePic.src = "images/Licantrop.jpg";
	}
	else {
		RareDesc.innerHTML == "Błąd opisu";
		RaceStat.innerHTML = "Error";
		RaceOther.innerHTML = "Error";
		RacePic.src = "images/Random.jpg";
	}
}

function RaceExtSet(RaceMainBranch, testowy){
	var RaceInnerTxt = '';
	for(var i=0;i<RaceMainBranch.length;i++){
		RaceInnerTxt += '<div class="RaceChooseExt">' + RaceMainBranch[i] + '</div>';
	}
	testowy.innerHTML = RaceInnerTxt;
	var RaceListExt = document.getElementsByClassName("RaceChooseExt");
	console.log(RaceListExt[0], RaceListExt[1], RaceListExt[2],RaceListExt.length);
	for(var i=0;i<RaceListExt.length;i++){
	RaceListExt[0].addEventListener("click", function()
	{
		var DropDownExtRace1 = document.getElementById("DropRaceDownExt");
		var DropDownExtRace2 = document.getElementById("RaceName");
		var DropDownExtRace3 = document.getElementById("MainRace");
		var RacePickExt = this.innerHTML;
		console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
		DropDownExtRace1.innerHTML = RacePickExt;
		DropDownExtRace2.innerHTML = RacePickExt;
		DropDownExtRace3.value = RacePickExt;
		this.parentElement.classList.add("hidden");
		this.parentElement.classList.remove("dropdown-content");
	});
	
	}
   
}







			
															  	
										  	

