let counter = 0;
let startInput = false;
let wordLen = 0;
let wrongWords = 0;

const words = [
"armut", "elma", "şeker", "bilgisayar",
"yazılım", "star", "sevgi", "aşk", "araba",
"bellek", "bina", "tuğla", "defter", "kitap",
"tel", "direnç", "kulaklık", "monitör", "vizyon",
"galip","savaş","barış","tüp","el","uzunluk","karpuz",
"kavun","yaz","kış","anne","klavye","tabak","şarap",
"bardak","kablo","mendil","renk","gökkuşağı",
"poster","oyun", "sevgili", "güzel", "çirkin",
"kız","erkek","oyuncu","dert","tas","ekran","kılavuz",
"öğretmen","öğrenci","türkiye","parfüm","takvim","diş",
"cetvel","pergel","açı","sabit","değişken","matematik",
"fizik","coğrafya","edebiyat","içeri","dışarı","makas",
"eldiven","peçete","fare","kedi"
];

const tdCount = $("td").length;
for (let i = 0; i < tdCount; i++) {
	$(`td:eq(${i})`).text(
		words[Math.floor(Math.random()*words.length)]
	);
}

function result() {
	let wps = (wordLen)/60
	$(".result").html(`
	<p>Dakikada: ${counter} Kelime</p>
	<p>Saniyede: ${wps} Kelime</p>
	<p>Yanlış Yazılan Kelime Sayısı: ${wrongWords} Kelime</p>
	`);
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
		if (minPart == -1) {
			minPart = 0;
		}
		if (secPart == -1) {
			secPart = 0;
		}
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
		$(".clock").text(
		minZero+minPart.toString()+":"+secZero+secPart.toString()
		);
	},1000);
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
		clock(0,1); //MAX SEC:59 MAX MIN:59
		startInput = true;
	}
	let data = $("input").val();
	if (data.search(" ") !== -1) {
		confirm(data)
	}
	else if (data != "") {
		if ($("td:eq(0)").text().startsWith(data) === false) {
			$("td:eq(0)").css({"background-color":"red","border-bottom":"red"});
		} else {
			$("td:eq(0)").css({"background-color":"lime","border-bottom":"lime"});
		}
	} else {
		$("td:eq(0)").css({"background-color":"#292929","border-bottom":"lime"});
	}
}
/*let counter = 0;
let startInput = false;

function clock() {

}

function input() {
	if (!startInput) {
		clock();
		startInput = true;
	}
	let data = $("input").val();
	if (data.search(" ") !== -1) {
		confirm(data)
	}
	else if (data != "") {
		if ($("td:eq(0)").text().search(data) === -1) {
			$("td:eq(0)").css("background-color","red");
		} else {
			$("td:eq(0)").css("background-color","lime");
		}
	} else {
		$("td:eq(0)").css("background-color","#292929");
	}
}

function confirm(x) {
	if (x == $("td:eq(0)").val()) {
		counter++;
	}
	for (let j = 0; j < selected_words.length-1; j++) {
		if (j == 0) selected_words.push(words[Math.floor(Math.random() * words.length)]);
		selected_words[j] = selected_words[j+1];
		$(`td:eq(${j})`).text(selected_words[j]);
	}
	$("td:eq(0)").css("background-color","#292929");
	$("input").val("");
}

const words = [
"armut", "elma", "şeker", "bilgisayar",
"yazılım", "star", "sevgi", "aşk", "araba",
"bellek", "bina", "tuğla", "defter", "kitap",
"tel", "direnç", "kulaklık", "monitör", "televizyon",
"galip","savaş","barış","tüp","el","uzunluk","karpuz",
"kavun","yaz","kış","anne","klavye","tabak","şarap",
"bardak","kablo","mendil","renk","gökkuşağı",
"poster","oyun"
];
const selected_words = [];
const tdCount = $("td").length;
for (let i = 0; i < tdCount; i++) {
	if (selected_words.length != tdCount) {
		selected_words.push(words[Math.floor(Math.random() * words.length)]);
	}
	$(`td:eq(${i})`).text(selected_words[i]);
}*/
