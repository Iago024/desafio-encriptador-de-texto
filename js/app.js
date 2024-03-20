const btnCriptografar = document.querySelector('.criptografar');
const btnDescriptografar = document.querySelector('.descriptografar');
const btnLimpar = document.querySelector('.limpar');
let entrada = document.getElementById('entrada');
let saida = document.getElementById('saida');

function criptografarTexto(texto, chave){
  let textoEncriptado = '';
  for(let i = 0; i < texto.length; i++){
    let caractere = texto[i];

    if(caractere.match(/[a-z]/i)){
      let codigoAsc = texto.charCodeAt(i);

      if(codigoAsc >= 65 && codigoAsc <= 90){
        caractere = String.fromCharCode(((codigoAsc - 65 + chave) % 26) + 65);
      } else if(codigoAsc >= 97 && codigoAsc <= 122){
        caractere = String.fromCharCode(((codigoAsc - 97 + chave) % 26) + 97);
      } else {
        saida.innerHTML = 'Só é aceito letras maiúsculas e minúsculas e sem acento';
      }
    }
    textoEncriptado += caractere; 
  }

  return textoEncriptado;
}

function descriptografarTexto(texto, chave){
  return criptografarTexto(texto, (26 - chave) % 26);
}

function criptografar(){
  let msgInput = entrada.value;
  const deslocamento = 7;
  let criptografado = criptografarTexto(msgInput, deslocamento);

  saida.value = criptografado;

  btnDescriptografar.removeAttribute('disabled');
}

function descriptografar(){
  let msgOutput = saida.value;
  const deslocamento = 7;
  let criptografado = descriptografarTexto(msgOutput, deslocamento);

  saida.value = criptografado;
  btnDescriptografar.setAttribute('disabled', true);
}

function limparTexto(){
  entrada.value = '';
}

function inputTexto(){
  if(entrada.value != ''){
    btnCriptografar.removeAttribute('disabled');
    btnLimpar.removeAttribute('disabled');
  } else {
    btnCriptografar.setAttribute('disabled', true);
    btnLimpar.setAttribute('disabled', true);
  }
}

function ajustarCorDeFundo(){
  const horas = document.getElementById('horas');
  const minutos = document.getElementById('minutos');
  const segundos = document.getElementById('segundos');

  const horario = setInterval(() => {
    let dateToday = new Date();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let s = dateToday.getSeconds();

    if (hr < 10) hr = '0' + hr;

    if (min < 10) min = '0' + min;

    if (s < 10) s = '0' + s;


    horas.textContent = hr;
    minutos.textContent = min;
    segundos.textContent = s;

    const body = document.body.style;
    const textareaInput = document.body.textarea;

    const corDia = 'linear-gradient(#00008b, #87CEEB, #87CEFA)';
    const corTransicaoDiaNoite = 'linear-gradient(#000, #00008b, #87CEEB)';
    const corNoite = '#010101';

    if(hr >= 10 && hr < 17){ // Dia
      body.transitionDuration = '7s';
      body.background = corDia;

      body.color = '#111';
    } else if(hr >= 5 && hr < 6 || hr >= 17 && hr < 20){ // Noite
      body.transitionDuration = '7s';
      body.background = corTransicaoDiaNoite;
      body.color = '#fff';
    } else { // Noite e madrugada
      body.transitionDuration = '7s';
      body.background = corNoite;
      body.color = '#fff';
    }
  });
}

entrada.addEventListener('keyup', inputTexto);

