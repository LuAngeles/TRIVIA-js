//Elementos
const inicio = document.getElementById("inicio");
const cuestionario = document.getElementById("cuestionario");
const pregunta = document.getElementById("pregunta");
const qImg = document.getElementById("qImg");
const opA = document.getElementById("A");
const opB = document.getElementById("B");
const opC = document.getElementById("C");
const contador = document.getElementById("contador");
const timeGauge = document.getElementById("timeGauge");
const progreso = document.getElementById("progreso");
const scoreDiv = document.getElementById("scorecajita");

// preguntas
let preguntas = [
 {
     pregunta : "¿Cuál es la cerveza más vendida del mundo?",
     imgSrc : "https://www.guatemala.com/fotos/201706/giphy-11.gif",
     opA : "Snow",
     opB : "Heineken",
     opC : "Bud Light",
     correct : "A"
 },{
     pregunta : "¿De dónde es originaria la cerveza?",
     imgSrc : "http://49.media.tumblr.com/d2878b11f7317045130dfe4e6223d93b/tumblr_no0iztwNwU1upjxndo1_r5_400.gif",
     opA : "Alemania",
     opB : "Irán",
     opC : "Suiza",
     correct : "B"
 },{
     pregunta : "¿Qué país tiene el mayor consumo per capita de cerveza en el mundo?",
     imgSrc : "https://media2.giphy.com/media/3o85xAK2RxuomLUPnO/source.gif",
     opA : "México",
     opB : "Alemania",
     opC : "República Checa",
     correct : "C"
 }
];

// Variables
const lastpregunta = preguntas.length -1 ;
let runningpregunta = 0;
let count = 0;
const preguntaTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / preguntaTime;
let TIMER;
let score = 0;

// Función preguntas
function renderpregunta(){
 let q = preguntas[runningpregunta];
  pregunta.innerHTML = "<p>"+ q.pregunta +"</p>";
 qImg.innerHTML = "<img src="+ q.imgSrc +">";
 opA.innerHTML = q.opA;
 opB.innerHTML = q.opB;
 opC.innerHTML = q.opC;
}

inicio.addEventListener("click",iniciocuestionario);

// Función inicio cuestionario
function iniciocuestionario(){
 inicio.style.display = "none";
 renderpregunta();
 cuestionario.style.display = "block";
 renderprogreso();
 rendercontador();
 TIMER = setInterval(rendercontador,1000); // 1000ms = 1s
}

// Función progreso
function renderprogreso(){
 for(let qIndex = 0; qIndex <= lastpregunta; qIndex++){
     progreso.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
 }
}

// contador

function rendercontador(){
 if(count <= preguntaTime){
     contador.innerHTML = count;
     timeGauge.style.width = count * gaugeUnit + "px";
     count++
 }else{
     count = 0;
     // Error en rojo
     respuestaIsWrong();
     if(runningpregunta < lastpregunta){
         runningpregunta++;
         renderpregunta();
     }else{
         // Mostrar resultados
         clearInterval(TIMER);
         scoreRender();
     }
 }
}

// Comprobación de respuestas
function comprobar(respuesta){
 if( respuesta == preguntas[runningpregunta].correct){
     // respuesta "correct"
     score++;
     // Aciertos en verde
     respuestaIsCorrect();
 }else{
     // respuesta "wrong"
     // Errores en rojo
     respuestaIsWrong();
 }
 count = 0;
 if(runningpregunta < lastpregunta){
     runningpregunta++;
     renderpregunta();
 }else{
     // end the cuestionario and show the score
     clearInterval(TIMER);
     scoreRender();
 }
}



// respuesta is correct
function respuestaIsCorrect(){
 document.getElementById(runningpregunta).style.backgroundColor = "#0f0";
}



// respuesta is Wrong
function respuestaIsWrong(){
 document.getElementById(runningpregunta).style.backgroundColor = "#f00";
}



// score render
function scoreRender(){
 scoreDiv.style.display = "block";
  // calculate the amount of pregunta percent respuestaed by the user
 const scorePerCent = Math.round(100 * score/preguntas.length);
  // choose the image based on the scorePerCent
 let img = (scorePerCent >= 80) ? "https://media1.tenor.com/images/6863b4d9eb73951cf1900e9a0a51e023/tenor.gif?itemid=9805208":
            (scorePerCent >= 60) ? "https://media.giphy.com/media/dGvl3DVibMfW8/giphy.gif":
           (scorePerCent >= 33) ? "https://media.giphy.com/media/dGvl3DVibMfW8/giphy.gif" :
           (scorePerCent >= 0) ? "https://pbs.twimg.com/media/D4XP5cuXkAI2z4D.jpg:large" :
           "https://pbs.twimg.com/media/D4XP5cuXkAI2z4D.jpg:large";
  scoreDiv.innerHTML = "<img src="+ img +">";
 scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}