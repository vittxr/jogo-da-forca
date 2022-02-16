//Variáveis:
var div_instrucoes = document.querySelector('.instrucoes');
var div_game = document.querySelector('.container-wrapper');
var vidas; 


function iniciar() {
   //Função de iniciar jogo. É iniciado quando o botão 'iniciar' é acionado
   div_instrucoes.style.display='none';
   div_game.style.display='flex';
   vidas=5;
}

var lista_palavras=[ 
   //variável que contém todas as palavras do jogo.
   ['banana', 'fruta'],['frango','carne'],['bombeiro','profissão'],['limao', 'fruta'],
   ['japao','pais'],['caneta','material escolar'],['computador','tecnologia'],['socrates', 'filósofo'],['caminhao','automóvel'],['predio','construção'],['multiplicaçao','matemática'],['biologia','materia'],['atenas','Antiguidade'],['persas','povo derrotado pelos atenienses']
] /*A primeira palavra da matriz será para a advinhação, a segunda é a dica.*/
                        


//Variáveis para trabalhar com o sorteio das palavras:                       
var btn_sortear=document.getElementById('sortear')
var palavra_escolhida=document.getElementById('palavra-escolhida')
var palavra=document.querySelector('.palavra')

var x=Math.floor(Math.random()*13); //Número aleatório arredondado para escolher a palavra dentro da matriz. É usado na função "sortear()"


function sortear() {
   // Esta função, vinculada a um botão, tem o papel de sortear a palavra para o jogo:
   btn_sortear.style.display='none';
   palavra.style.display='none';
   palavra_escolhida.style.display='flex';

   palavra=lista_palavras[x][0]; 
      //Lembrando que, dentro da matriz, a palavra terá sempre o indíce zero, já que o segundo valor é a dica. 

   toLetters();//separa, em letras, o valor da variável 'palavra'
}
  

var letra=[];//letra receberá elementos <p>, os quais cada um representará uma letra da palavra sorteada, na função toLetters().
var letras; 
      //letras tem o papel de virar um array, o qual conterá a palavra escolhida separada/splitada por caractere, por meio do método split(). 
var arr=[]; 
      //Nesse array, será armazenado todas as letras, para que seja possível alterar o estilo delas na função verificaLetras(), deixando-a vísivel se a condição for verdadeira. Foi necessário isso, pois na função toLetters() a variável "letra" é alterada constantemente devido ao loop, sendo que, a cada iteração, o valor de letra é guardado no array antes de ser alterado.
var palavra_escolhida=document.getElementById('palavra-escolhida');

function toLetters() {
   //função para criar os parágrafos de acordo com o número de letras da palavra escolhida. Ademais, cada parágrafo representa uma letra:
   letras=palavra.split('') //cada letra da palavra é separada
   for(var i=0; i<letras.length; i++) {
      //Criação das letras da palavra sorteada.
      letra = document.createElement('p'); 
          //createElement cria um elemetno no HTML
      var texto = document.createTextNode(letras[i]); 
          //esse comando cria um texto.
      letra.appendChild(texto); 
          //letra recebe, como filho, a variável texto.
      letra.setAttribute('class', 'palavra') 
          /*Adiciona a classe a cada letra, mantendo ela invisivel até acertarem ela. Quando digitarem uma letra, apenas remove a classe que mentém insível a letra correspondente. */
      palavra_escolhida.appendChild(letra); 
          //Adiciona-se, como filho da div palavra_escolhida, todos as variáveis 'letra'. Ou seja, adiciona todas os caracteres da palavra sorteada, separada em paragráfos como se fossem letras.
      arr.push(letra);
          //adiciona-se cada variável 'letra' ao array, assim tornando possível na função verificaLetra() mudar o estilo de cada variável letra. Ou seja, quando a letra corresponder ao btn clicado, adiciona uma cor a ela, aparencendo para o usuário. 
   }
}


var acertouLetra; 
    //Variável para verificar se chamamos ou não a função gameOver()
var todasLetrasApareceram=0 
    //Essa variável será para verificar se todas letras já apereceram, pois quando isso acontecer o jogador ganhará o jogo.

function verificaLetra(btn) {
   //Esta função verifica se a letra está na palavra, caso sim, faz ela aparecer.
   acertouLetra='false';
    for(i=0; i<letras.length; i++) {
       //loop para percorrer cada letra do array, comparando qual será igual a letra correspondente de letra[i]. Lembrando que o array 'letras' possui todas as letras da palavra escolhida, já que ela quem armazena a palavra splitada pelo comando 'split'. A propósito, o próprio split() deixa a variável 'letras' em formato de array, visto que seu papel é splitar uma string e colocando cada elemento splitado em um array.
       if(btn.innerHTML==letras[i]) { 
         //If compara se a letra é igual a alguma do array da palavra escolhida (letras);
         acertouLetra='true';
         arr[i].style.color='black'; 
            //muda-se a cor da letra caso a condição seja verdadeira.
         todasLetrasApareceram+=1; 
            //Implementando a variável para que ela tenha o mesmo valor do tamanho da variável 'letras'
       } 
     }
        if(todasLetrasApareceram==letras.length) {
           //quando valor de todasLetrasAparecerão foi igual ao tamanho do array 'letras', o jogador vencerá. E por que não colequei esse código na função win()? Por causa dela ser acionado ao evento do clique do botão, não tendo parte com as letras aperecerem ou não. Ela serve para verificar quando o usuário tenta adivinhar a palavra. Essa condição serve para caso o usuário acerte todas as letras.
           alert('Você acertou todas as letras! Ou seja, você venceu.')
        }
        if(acertouLetra!='true') {
        gameOver(); //Essa função faz o usuário perder vidas, não necessariamente perder o jogo, a não ser que ele perca todas as vidas. 
    }
}


function dica() {
   //função de dica: 
   alert(lista_palavras[x][1]) 
}

var input=document.querySelector('#input1');
   //input para o usuário advinhar a palavra
function win() {
   //função de adivinhar palavra/função de vitória:
   var valueOfInput=input.value;

   if(valueOfInput==palavra) {
      alert('Você ganhou!');
   } else {
      alert('palavra incorreta');
      gameOver(); //Lembrando que gameOver faz o usuário perder somente uma vida.
   }
}

var svg=document.querySelectorAll('.svg')
    //O svg contém a representação da vida, que é um coração.    

function gameOver(){
   //Função de gameOver():
   vidas=vidas-1;

   svg[vidas].setAttribute('class', 'loseLifes-animation'); //Adiciona-se, como classe, a animação de quando se perde alguma vida.
   
   if(vidas<=0) {
      alert('Game Over ')
   }
}