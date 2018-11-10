
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
	var HumanArr = ["Calishyta", "Chondatanin", "Damaranin", "Illuskańczyk", "Mulanin", "Rashemita", "Tethyrczyk", "Bedyni", "Chultanie", "Durparczycy", "Llud", "Gurowie", "Halruaańczycy", "Imaskari", "Lantańczycy", "Maztikanie", "Narowie", "Netheryjczycy", "Raumiviranie", "Shaaryjczycy", "Shou", "Sossrimowie", "Talfirczycy", "Tashalczycy", "Tuiganie", "Turamici", "Uluici", "Vaasanie", "Zakharczycy"];							// Daklarowanie tablic podras
	var DwarfArr = ["Arktyczny", "Dziki", "Szary", "Tarczowy", "Złoty", "Urdunnir"];
	var GnomeArr = ["Leśny", "Podziemny", "Skalny"];
	var OrcArr = ["Górski", "Szary", "Orog"];
	var HalflingArr = ["Lekkostopy", "Waleczniak", "Zjawomyślny"];
	var PlanistArr = ["Aasimar", "Diablę", "Fey'ri", "Genasi ogniowy", "Genasi powietrzny", "Genasi wodny", "Genasi ziemny", "Tanarukk"];
	var HalfElfArr = ["Zwykły", "Wodny", "Drow"];
	var HalfOrcArr = ["Półczłowiek", "Półkrasnolud", "Półgoblin", "Półhobgoblin", "Półniziołek", "Półgnom", "Półelf"];
	var OtherRaceArr = ["Aarakokra", "Cantaur", "Goblinoidy", "Jaszczuroludź", "Kir-lanan", "Pomrok", "Wemik", "Yuan-ti"];
	var LicantropArr = ["Nietoperzołak", "Niedźwiedziołak", "Dzikołak", "Kotołak", "Krokodylołak", "Szczurołak", "Rekinołak", "Tygrysołak", "Wilkołak", "Lythari"];
	
	var DescArr = [];

	if(RacePickFunct == 'Człowiek'){									// W zależności od wartości z przyciska dobiera pakiet danych do załadowania
		DescArr = ["Ludzkość należy do pięciu Ras Stwórców, aczkolwiek jest ostatnią i najbardziej prymitywną sposród nich. Sporśród wszystkich cywilizowanych ras, ludzie są najbardziej przystosowawczy i niejednorodni. Ludzkie osiedla można napotkać niemal wszędzie, a ich obyczaje, tradycje i zainteresowania są bardzo zróżnicowane. Ludzie nie dzielą się na odrębne podrasy, ale tworzą wiele różnicych się nacji",
		"-", 
		"-", 
		"images/Human/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(HumanArr, RaceExt, RacePickFunct, DescArr);							// Funkcja dodawania listy w postaci div na podstawie tablicy	
	}
	else if(RacePickFunct == 'Krasnolud'){
		DescArr = ["Krzepki Lud, niewzruszony jak ziemia, z której go ukształtowano, w przeszłości władał ogromnymi imperiami, rozciągającymi się na i pod powierzchnią Faerunu. Minęły stulecia powolnego regresu i wiekszość krasnoludzkich królestw upadła, ale przetrwały owoce ich pracy, wciąż niedoścignione mimo upływu lat. Ostatnimi czasy Błogosławieństwo Grzmotu zainicłowało odrodzenie rasy, które być może przywróci Krzepkiemu Ludowi niegdysiejszą chwałę.",
		"-",
		"-",
		"images/Dwarf/Dwarf.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(DwarfArr, RaceExt, RacePickFunct, DescArr);
	}
	else if(RacePickFunct == 'Gnom'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(GnomeArr, RaceExt, RacePickFunct);
	}
	else if(RacePickFunct == 'Ork'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(OrcArr, RaceExt, RacePickFunct);
	}
	else if(RacePickFunct == 'Niziołek'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(HalflingArr, RaceExt, RacePickFunct);
	}
	else if(RacePickFunct == 'Planokrwisty'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(PlanistArr, RaceExt, RacePickFunct);
	}
	else if(RacePickFunct == 'Półelf'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(HalfElfArr, RaceExt, RacePickFunct);
	}
	else if(RacePickFunct == 'Półork'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(HalfOrcArr, RaceExt, RacePickFunct);
	}
	else if(RacePickFunct == 'Pomniejsze rasy'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(OtherRaceArr, RaceExt, RacePickFunct);
	}
	else if(RacePickFunct == 'Likantrop'){
		DescArr = ["Opis człowiek","Staty człowiekxx", "Inne człowiek", "images/Human.jpg"];
		SetAllFromRaceInPlace(DescArr);
		RaceExtSet(LicantropArr, RaceExt, RacePickFunct);
	}
	else {
		DescArr = ["ERROR","ERROR", "ERROR", "images/Random.jpg"];
	}
}

function RaceExtSet(RaceMainBranch, RaceExtInt, RaceHold, DescArrFunc){
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
		console.log(RaceHold);
		ExtRaceDesc(RacePickExt, RaceHold, DescArrFunc);
		
		
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

function ExtRaceDesc(RacePickExtFunc, RaceMainHolderFunc, DescArrFuncExt)
{	
	var RaceComp = RaceMainHolderFunc + RacePickExtFunc;
	console.log(RacePickExtFunc);
	console.log(RaceMainHolderFunc);
	console.log(RaceComp);
/* Calishyta */	var ArrRa1 = [1,2,3,"images/Human/Calishyta.jpg","CzłowiekCalishyta"];
/* Chondatanin */    var ArrRa2 = [1,2,3,"CzłowiekChondatanin"];
/* */    var ArrRa3 = [1,2,3,"CzłowiekDamaranin"];
/* */    var ArrRa4 = [1,2,3,"CzłowiekIlluskańczyk"];
/* */    var ArrRa5 = [1,2,3,"CzłowiekMulanin"];
/* */    var ArrRa6 = [1,2,3,"CzłowiekRashemita"];
/* */    var ArrRa7 = [1,2,3,"CzłowiekTethyrczyk"];
/* */    var ArrRa8 = [1,2,3,"CzłowiekBedyni"];
/* */    var ArrRa9 = [1,2,3,"CzłowiekChultanie"];
/* */    var ArrRa10 = [1,2,3,"CzłowiekDurparczycy"];
/* */    var ArrRa11 = [1,2,3,"CzłowiekLlud"];
/* */    var ArrRa12 = [1,2,3,"CzłowiekGurowie"];
/* */    var ArrRa13 = [1,2,3,"CzłowiekHalruaańczycy"];
/* */    var ArrRa14 = [1,2,3,"CzłowiekImaskari"];
/* */    var ArrRa15 = [1,2,3,"CzłowiekLantańczycy"];
/* */    var ArrRa16 = [1,2,3,"CzłowiekMaztikanie"];
/* */    var ArrRa17 = [1,2,3,"CzłowiekNarowie"];
/* */    var ArrRa18 = [1,2,3,"CzłowiekNetheryjczycy"];
/* */    var ArrRa19 = [1,2,3,"CzłowiekRaumiviranie"];
/* */    var ArrRa20 = [1,2,3,"CzłowiekShaaryjczycy"];
/* */    var ArrRa21 = [1,2,3,"CzłowiekShou"];
/* */    var ArrRa22 = [1,2,3,"CzłowiekSossrimowie"];
/* */    var ArrRa23 = [1,2,3,"CzłowiekTalfirczycy"];
/* */    var ArrRa24 = [1,2,3,"CzłowiekTashalczycy"];
/* */    var ArrRa25 = [1,2,3,"CzłowiekTuiganie"];
/* */    var ArrRa26 = [1,2,3,"CzłowiekTuramici"];
/* */    var ArrRa27 = [1,2,3,"CzłowiekUluici"];
/* */    var ArrRa28 = [1,2,3,"CzłowiekVaasanie"];
/* */    var ArrRa29 = [1,2,3,"CzłowiekZakharczycy"];
/*Krasnolud Arktyczny */    
		var ArrRa30 = ["<b>Regiony: </b>Damara, Północ, Vaasa, Wielki Lodowiec <br> <b>Ulubione klasy: </b>Tropiciel",
			2,3,"images/Dwarf/ADwarf.jpg","KrasnoludArktyczny"];
/* */    var ArrRa31 = [1,2,3,"KrasnoludDziki"];
/* */    var ArrRa32 = [1,2,3,"KrasnoludSzary"];
/* */    var ArrRa33 = [1,2,3,"KrasnoludTarczowy"];
/* */    var ArrRa34 = [1,2,3,"KrasnoludZłoty"];
/* */    var ArrRa35 = [1,2,3,"KrasnoludUrdunnir"];
/* */    var ArrRa36 = [1,2,3,"GnomLeśny"];
/* */    var ArrRa37 = [1,2,3,"GnomPodziemny"];
/* */    var ArrRa38 = [1,2,3,"GnomSkalny"];
/* */    var ArrRa39 = [1,2,3,"OrkGórski"];
/* */    var ArrRa40 = [1,2,3,"OrkSzary"];
/* */    var ArrRa41 = [1,2,3,"OrkOrog"];
/* */    var ArrRa42 = [1,2,3,"NiziołekLekkostopy"];
/* */    var ArrRa43 = [1,2,3,"NiziołekWaleczniak"];
/* */    var ArrRa44 = [1,2,3,"NiziołekZjawomyślny"];
/* */    var ArrRa45 = [1,2,3,"PlanokrwistyAasimar"];
/* */    var ArrRa46 = [1,2,3,"PlanokrwistyDiablę"];
/* */    var ArrRa47 = [1,2,3,"PlanokrwistyFey'ri"];
/* */    var ArrRa48 = [1,2,3,"PlanokrwistyGenasi ogniowy"];
/* */    var ArrRa49 = [1,2,3,"PlanokrwistyGenasi powietrzny"];
/* */    var ArrRa50 = [1,2,3,"PlanokrwistyGenasi wodny"];
/* */    var ArrRa51 = [1,2,3,"PlanokrwistyGenasi ziemny"];
/* */    var ArrRa52 = [1,2,3,"PlanokrwistyTanarukk"];
/* */    var ArrRa53 = [1,2,3,"PółelfZwykły"];
/* */    var ArrRa54 = [1,2,3,"PółelfWodny"];
/* */    var ArrRa55 = [1,2,3,"PółelfDrow"];
/* */    var ArrRa56 = [1,2,3,"PółorkPółczłowiek"];
/* */    var ArrRa57 = [1,2,3,"PółorkPółkrasnolud"];
/* */    var ArrRa58 = [1,2,3,"PółorkPółgoblin"];
/* */    var ArrRa59 = [1,2,3,"PółorkPółhobgoblin"];
/* */    var ArrRa60 = [1,2,3,"PółorkPółniziołek"];
/* */    var ArrRa61 = [1,2,3,"PółorkPółgnom"];
/* */    var ArrRa62 = [1,2,3,"PółorkPółelf"];
/* */    var ArrRa63 = [1,2,3,"Pomniejsze rasyAarakokra"];
/* */    var ArrRa64 = [1,2,3,"Pomniejsze rasyCantaur"];
/* */    var ArrRa65 = [1,2,3,"Pomniejsze rasyGoblinoidy"];
/* */    var ArrRa66 = [1,2,3,"Pomniejsze rasyJaszczuroludź"];
/* */    var ArrRa67 = [1,2,3,"Pomniejsze rasyKir-lanan"];
/* */    var ArrRa68 = [1,2,3,"Pomniejsze rasyPomrok"];
/* */    var ArrRa69 = [1,2,3,"Pomniejsze rasyWemik"];
/* */    var ArrRa70 = [1,2,3,"Pomniejsze rasyYuan-ti"];
/* */    var ArrRa71 = [1,2,3,"LikantropNietoperzołak"];
/* */    var ArrRa72 = [1,2,3,"LikantropNiedźwiedziołak"];
/* */    var ArrRa73 = [1,2,3,"LikantropDzikołak"];
/* */    var ArrRa74 = [1,2,3,"LikantropKotołak"];
/* */    var ArrRa75 = [1,2,3,"LikantropKrokodylołak"];
/* */    var ArrRa76 = [1,2,3,"LikantropSzczurołak"];
/* */    var ArrRa77 = [1,2,3,"LikantropRekinołak"];
/* */    var ArrRa78 = [1,2,3,"LikantropTygrysołak"];
/* */    var ArrRa79 = [1,2,3,"LikantropWilkołak"];
/* */    var ArrRa80 = [1,2,3,"LikantropLythari"];
	var AllRaceArr = [ArrRa1,ArrRa2,ArrRa3 ,ArrRa4,ArrRa5,ArrRa6,ArrRa7,ArrRa8,ArrRa9,ArrRa10,ArrRa11,ArrRa12,ArrRa13,ArrRa14,ArrRa15,ArrRa16,ArrRa17,ArrRa18,ArrRa19,ArrRa20,ArrRa21,ArrRa22,ArrRa23,ArrRa24,ArrRa25,ArrRa26,ArrRa27,ArrRa28,ArrRa29,ArrRa30,ArrRa31,ArrRa32,ArrRa33,ArrRa34,ArrRa35,ArrRa36,ArrRa37,ArrRa38,ArrRa39,ArrRa40,ArrRa41,ArrRa42,ArrRa43,ArrRa44,ArrRa45,ArrRa46,ArrRa47,ArrRa48,ArrRa49,ArrRa50,ArrRa51,ArrRa52,ArrRa53,ArrRa54,ArrRa55,ArrRa56,ArrRa57,ArrRa58,ArrRa59,ArrRa60,ArrRa61,ArrRa62,ArrRa63,ArrRa64,ArrRa65,ArrRa66,ArrRa67,ArrRa68,ArrRa69,ArrRa70,ArrRa71,ArrRa72,ArrRa73,ArrRa74,ArrRa75,ArrRa76,ArrRa77,ArrRa78,ArrRa79,ArrRa80];
	for(var i=0;RaceComp!=AllRaceArr[i][4];i++){
		console.log("OK");
	}
	AllRaceArr[i][0] = DescArrFuncExt[0] + '<br><br>' + AllRaceArr[i][0];
	console.log(AllRaceArr[i]);
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
