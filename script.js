let counter = 0;
let startInput = false;
let wordLen = 0;
let wrongWords = 0;

const words = ["no","thing","well","because","also","two","use","tell","good","first","man","day","find","give","more","new","one","us","any","those","very","her","need","back","there","should","even","only","many","really","work","life","why","right","down","on","try","let","something","too","call","woman","may","still","through","mean","after","never","no","world","in","feel","yeah","great","last","child","oh","over","ask","when","as","school","state","much","talk","out","keep","leave","put","like","help","big","where","same","all","own"];

const tdCount = $("td").length;
for (let i = 0; i < tdCount; i++) {
	$(`td:eq(${i})`).text(
		words[Math.floor(Math.random()*words.length)]
	);
}

function result() {
	let wps = (wordLen / 60).toFixed(2);
	
	$(".result").html(`
	<p>${counter} Words per Minute</p>
	<p>${wps} Words per Second</p>
	<p>Typo count: ${wrongWords} word</p>`);
	
	$(".word-input").attr("disabled","disabled");
}

function clock(sec,min) {
	let s = (min * 59) + sec;
	const timer = setInterval(()=>{
		let minPart = Math.floor(s/60);
		let secPart = s%60;
		s--;
		if (s == -2) {
			clearInterval(timer);
			result();
		}
		if (minPart == -1) minPart = 0;
		if (secPart == -1) secPart = 0;
		if (secPart != -1 && minPart != -1) {
			if (minPart.toString().length == 1) {
				minZero = "0";
			} else {
				minZero = "";
			}
			if (secPart.toString().length == 1) {
				secZero = "0";
			} else {
				secZero = "";
			}
		}
		$(".clock").text(minZero+minPart.toString()+":"+secZero+secPart.toString());
	}, 1000);
}

function confirm(x) {
	x = x.replace(" ", "");
	if (x == $("td:eq(0)").text()) {
		counter++;
		wordLen += $("td:eq(0)").text().length;
	} else {
		wrongWords++;
	}

	for (let j = 0; j < $("td").length-1; j++) {
		$(`td:eq(${j})`).text($(`td:eq(${j+1})`).text());
		$(`td:eq(${tdCount-1})`).text(words[Math.floor(Math.random()*words.length)]);
	}
	$("td:eq(0)").css("background-color","#292929");
	$("input").val("");
}

function input() {
	if (!startInput) {
		clock(0,1); // MAX SEC:59 MAX MIN:59
		startInput = true;
	}
	let data = $("input").val();

	if (data.search(" ") !== -1) confirm(data)
	else if (data != "") {
		if ($("td:eq(0)").text().startsWith(data) === false) {
			$("td:eq(0)").css({"background-color":"red","border-bottom":"red"});
		} else {
			$("td:eq(0)").css({"background-color":"#02c81e","border-bottom":"#02c81e"});
		}
	}
	else $("td:eq(0)").css({"background-color":"#292929","border-bottom":"#02c81e"});
}