
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
	
	var DropdownExtRaceBtn = document.getElementById("DropRaceDownExt");
	DropdownExtRaceBtn.innerHTML = "Szczegóły";
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
	

// Ustawienie podrasy w zależności od rasy 

	var RaceExt = document.getElementById("RaceExt");					// Chwycenie id na dropdowna
	var HumanArr = ["Calishyta", "Chondatanin", "Damaranin", "Illuskańczyk", "Mulanin", "Rashemita", "Tethyrczyk", "Bedyni", "Chultanie", "Durparczycy", "LLud", "Gurowie", "Halruaańczycy", "Imaskari", "Lantańczycy", "Maztikanie", "Narowie", "Netheryjczycy", "Raumiviranie", "Shaaryjczycy", "Shou", "Sossrimowie", "Talfirczycy", "Tashalczycy", "Tuiganie", "Turamici", "Uluici", "Vaasanie", "Zakharczycy"];							// Daklarowanie tablic podras
	var DwarfArr = ["Dwar1", "Dwar2", "Dwar3", "Dwar4", "Dwar5"];
	var GnomeArr = ["Gnome1", "Gnome2"];
	var OrcArr = ["Orc1", "Orc2", "Orc3"];
	var HalflingArr = ["Halfling1", "Halfling2","Halfling3"];
	var PlanistArr = ["Planist1"];
	
	var DescArr = [];

	if(RacePickFunct == 'Człowiek'){									// W zależności od wartości z przyciska dobiera pakiet danych do załadowania
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(HumanArr, RaceExt);									// Funkcja dodawania listy w postaci div na podstawie tablicy	
	}
	else if(RacePickFunct == 'Krasnolud'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(DwarfArr, RaceExt);
	}
	else if(RacePickFunct == 'Gnom'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(GnomeArr, RaceExt);
	}
	else if(RacePickFunct == 'Ork'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(OrcArr, RaceExt);
	}
	else if(RacePickFunct == 'Niziołek'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(HalflingArr, RaceExt);
	}
	else if(RacePickFunct == 'Planokrwisty'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(PlanistArr, RaceExt);
	}
	else if(RacePickFunct == 'Półelf'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(OrcArr, RaceExt);
	}
	else if(RacePickFunct == 'Półork'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(OrcArr, RaceExt);
	}
	else if(RacePickFunct == 'Pomniejsze rasy'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(OrcArr, RaceExt);
	}
	else if(RacePickFunct == 'Likantropy'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(OrcArr, RaceExt);
	}
	else {
		DescArr = ["ERROR","ERROR", "ERROR", "images/Random.jpg"];
		SetAllFromRaceInPlace(DescArr);
	}
}

function RaceExtSet(RaceMainBranch, RaceExtInt){
	var RaceInnerTxt = '';
	for(var i=0;i<RaceMainBranch.length;i++){
		RaceInnerTxt += '<div class="RaceChooseExt">' + RaceMainBranch[i] + '</div>';
	}
	RaceExtInt.innerHTML = RaceInnerTxt;
	var RaceListExt = document.getElementsByClassName("RaceChooseExt");
	for(var i=0;i<RaceListExt.length;i++){
	RaceListExt[i].addEventListener("click", function()
	{ 	
		var DrpdwnClckExt = document.getElementById("DropRaceDownExt");				// Wzięcie id przycisku
		DrpdwnClckExt.addEventListener("click", ClassAdd);							// Dodanie listnera
									
		var DropDownExtRace1 = document.getElementById("DropRaceDownExt");
		var DropDownExtRace2 = document.getElementById("RaceName");
		var DropDownExtRace3 = document.getElementById("MainRace");
		var RacePickExt = this.innerHTML;
		
		DropDownExtRace1.innerHTML = RacePickExt;
		DropDownExtRace2.innerHTML = RacePickExt;
		DropDownExtRace3.value = RacePickExt;
		this.parentElement.classList.add("hidden");
		this.parentElement.classList.remove("dropdown-content");

		ExtRaceDesc(RacePickExt);
	});
	
	}
   
}


function SetAllFromRaceInPlace(DescR){

	var RaceDesc = document.getElementById("RaceDesc");					// Wyłapanie miejsc na wrzucenie danych
	var RaceStat = document.getElementById("RaceStats");
	var RaceOther = document.getElementById("RaceOtherStats");
	var RacePic = document.getElementById("RacePic");

	RaceDesc.innerHTML = DescR[0];
	RaceStat.innerHTML = DescR[1];
	RaceOther.innerHTML = DescR[2];
	RacePic.src = DescR[3];
}

function ExtRaceDesc(RacePickExtFunc)
{	
	var Arr1 = [5, 7, "Jeden"];
	var Arr2 = [3, 2, "Dwa"];
	var Arr3 = [7, 7, "Trzy"];
	var AllRaceArr = [Arr1, Arr2, Arr3];
	for(var i=0;RacePickExtFunc!=AllRaceArr[i][2];i++){
		
	}
	
	SetAllFromRaceInPlace(AllRaceArr[i]);
}

			
/*
Funkcja, która będzie generować rzuty kostką plus do tego jednoczesne rzucanie 
trzema kostkami dla cechy i sumowanie wyników z kostki.
*/

// rolling dices

var min_roll = 1;
var max_roll = 6;
var number_of_roll = 3
var sum_roll = 0

function getRandomInt(min_roll, max_roll)
{
    return Math.floor(Math.random() * (max_roll - min_roll + 1)) + min_roll;
}

var dowolna = document.getElementById("robocze");															  	
console.log(dowolna);										  	
dowolna.addEventListener("click",function(){
	for(var i = 100 ; i > 0 ; i -= 1)
	{
		sum_roll = 0;
		for (number_of_roll = 3 ; number_of_roll > 0 ; number_of_roll -= 1) 
		{ 
		sum_roll += getRandomInt(min_roll,max_roll);
		}
		console.log(sum_roll);
	}
});
