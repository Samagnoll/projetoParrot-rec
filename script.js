let todasAsImagens = [
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif"
];

let cartaSelecionadaPrimeira = undefined;
let cartaSelecionadaSegunda = undefined;

let  quantidadeJogada = 0; 
let quantidadeAcertos = 0;

let adicionandoCartasNoNovoArray = [];

let cartasSelecionadas = '';

function finalizarJogo(){
    if (quantidadeAcertos === adicionandoCartasNoNovoArray.length ){
        alert(`Você terminou com ${quantidadeJogada} jogadas`)
        const continuarJogo = confirm('Gostaria de jogar novamente?')
        if (continuarJogo === true){
            window.location.reload();
        }
    }
}

function resetarCartaVirada(){
    cartaSelecionadaPrimeira = undefined;
        cartaSelecionadaSegunda = undefined;
}

function desvirarCartaSelecionada(){
    cartaSelecionadaPrimeira.classList.remove('virada');
        cartaSelecionadaSegunda.classList.remove('virada');
        resetarCartaVirada()
}

function virada(){
    //console.log(this)
    this.classList.add('virada');

    if (!cartaSelecionadaPrimeira){
        cartaSelecionadaPrimeira = this;
    
        return false;

       }

       if (cartaSelecionadaPrimeira !== undefined && cartaSelecionadaSegunda !== undefined){
        return;
     } quantidadeJogada++;
    
        console.log(cartaSelecionadaPrimeira)
    
        cartaSelecionadaSegunda = this;
    
        console.log(cartaSelecionadaSegunda);

        if ( cartaSelecionadaPrimeira.innerHTML === cartaSelecionadaSegunda.innerHTML){
            cartaSelecionadaPrimeira = undefined;
            cartaSelecionadaSegunda = undefined;
            quantidadeAcertos += 2;
            finalizarJogo()
            console.log(quantidadeAcertos)
        }
        else{
            setTimeout(desvirarCartaSelecionada, 1000)
        }
}

function virarCartaQuandoForClicada(selector){

   let cartasRenderizadas = document.querySelectorAll('.carta');

   cartasRenderizadas.forEach(carta => carta.addEventListener('click', virada));

}

function embaralhar(){
    return Math.random() - 0.5;
}

function embaralharBaralho(){
    adicionandoCartasNoNovoArray.sort(embaralhar)

}


function colocandoCartasDentro(){
    
    for(let i = 0; i < (pedirCartas / 2); i++){
        let cartas = todasAsImagens[i];
        adicionandoCartasNoNovoArray.push(cartas);
        adicionandoCartasNoNovoArray.push(cartas);

    }
    //console.log(adicionandoCartasNoNovoArray);
    embaralharBaralho()

}

function destribuirBaralho(){
    let pegar = document.querySelector('.card');

   for(let i = 0; i < pedirCartas; i++){
    let cartasSelecionadas = `
            <li class="carta" onclick="virarCartaQuandoForClicada('.carta') data-test="card"">
                <div class="back-face face">
                <img src="back.png" data-test="face-down-image">
              </div>
              <div class="front-face face"data-test="face-up-image">
              <img src="${adicionandoCartasNoNovoArray[i]}">
              </div>
            </li>       
            `;

      
      pegar.innerHTML += cartasSelecionadas;
      //console.log(cartasSelecionadas);
   }
}

let pedirCartas;
while ( pedirCartas < 4 || pedirCartas > 14 || pedirCartas % 2 !== 0 ){
  pedirCartas = Number(prompt("Qual a quantidade de cartas que você quer jogar ?"));
  //console.log(pedirCartas)
}

colocandoCartasDentro();
destribuirBaralho();
