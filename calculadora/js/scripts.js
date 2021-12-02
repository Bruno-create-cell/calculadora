class Calculadora {
  constructor() {
    this.upperValue = document.querySelector("#upper-number");
    this.resultValue = document.querySelector("#result-number");
    this.reset = 0;
  }

  clearValue() {
    this.upperValue.textContent = "0";
    this.resultValue.textContent = "0";
  }

  checkLasDigit(input, upperValue, reg) {
    if (
      !reg.test(input) &&
      !reg.test(upperValue.substr(upperValue.length - 1))
    ) {
      return true;
    } else {
      return false;
    }
  }

  //metodo soma
  sum(n1, n2) {
    return parseFloat(n1) + parseFloat(n2);
  }
  //metodo subtração
  subtraction(n1, n2) {
    return parseFloat(n1) - parseFloat(n2);
  }
  //metodo divisão
  division(n1, n2) {
    return parseFloat(n1) / parseFloat(n2);
  }
  //metodo multiplicação
  multiplication(n1, n2) {
    return parseFloat(n1) * parseFloat(n2);
  }

  // atualiza valores
  refreshValue(total) {
    this.upperValue.textContent = total;
    this.resultValue.textContent = total;
  }
  // reolver operação
  resolution() {
    // explode uma string em um array
    let upperValuearray = this.upperValue.textContent.split(" ");

    // resultado da operação
    let result = 0;
    for (let i = 0; i <= upperValuearray.length; i++) {
      let operation = 0;
      let actualitem = upperValuearray[i];
      //faz a divisão faz a multiplicação
      if (actualitem == "X") {
        result = calc.multiplication(
          parseFloat(upperValuearray[i - 1]),
          parseFloat(upperValuearray[i + 1])
        );
        operation = 1;
      } else if (actualitem == "/") {
        result = calc.division(
          parseFloat(upperValuearray[i - 1]),
          parseFloat(upperValuearray[i + 1])
        );
        operation = 1;
        //checa se o array ainda tem uma multiplicação ou uma divisão a ser feita
      } else if (
        !upperValuearray.includes("x") &&
        !upperValuearray.includes("/")
      ) {
        //soma e subtração
        if (actualitem == "+") {
          result = calc.sum(
            parseFloat(upperValuearray[i - 1]),
            parseFloat(upperValuearray[i + 1])
          );
          operation = 1;
        } else if (actualitem == "-") {
          result = calc.subtraction(
            parseFloat(upperValuearray[i - 1]),
            parseFloat(upperValuearray[i + 1])
          );
          operation = 1;
        }

        //atualiza valores do array para a proxima interação
        if (operation) {
          //indice anterior no resultado da operação
          upperValuearray[i - 1] = result;
          // remove os itens ja utilizados para operação
          upperValuearray.splice(i, 2);
          //atualizar o valor do indice
          i = 0;
        }
      }
      if (result) {
        calc.reset = 1;
      }
      //atualiza os totais
      calc.refreshValue(result);
    }
  }
  btnPress() {
    let input = this.textContent;
    let upperValue = calc.upperValue.textContent;
    // verifica se tem só numeros
    var reg = new RegExp("^\\d+$");

    //limpa o dispaly
    if (calc.reset && reg.test(input)) {
      upperValue = "0";
    }
    //limpa a prop de reset
    calc.reset = 0;

    // ativa metodo de limpar o display
    if (input == "AC") {
      calc.clearValue();
    } else if (input == "=") {
      calc.resolution();
    } else {
      //checa se precisa add ou não
      if (calc.checkLasDigit(input, upperValue, reg)) {
        return false;
      }
      //add espaço entre os operadores
      if (!reg.test(input)) {
        input = ` ${input} `;
      }

      if (upperValue == "0") {
        if (!reg.test(input)) {
          calc.upperValue.textContent = input;
        }
        calc.upperValue.textContent = input;
      } else {
        calc.upperValue.textContent += input;
      }
    }
  }
}

// start object

let calc = new Calculadora();
//start btns
let buttons = document.querySelectorAll(".btn");

//map all buttons
for (let i = 0; buttons.length > i; i++) {
  buttons[i].addEventListener("click", calc.btnPress);
}
