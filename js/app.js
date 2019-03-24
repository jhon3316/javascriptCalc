var Calculadora = (function(document, undefined){
  var nuevoV = false,
      maxLen = 8,
      nOp1 = 0,
      nOp2 = 0,
      result = 0,
      hasPoint = false;
      screenVal = "0",
      idBOp = "";

  var btnsId  = {
    btn_onc  : "on",
    btn_sign : "sign",
    btn_raiz : "raiz",
    btn_div  : "dividido",
    btn_por  : "por",
    btn_menos: "menos",
    btn_punto: "punto",
    btn_igual: "igual",
    btn_mas  : "mas"
  };

  var domBtns;

  function initVars(){
    nuevoV = false;
    maxLen = 8;
    nOp1 = 0;
    nOp2 = 0;
    result = 0;
    hasPoint = false;
    screenVal = "0",
    idBOp = "";
  }

  var getBtns = function(){
    domBtns = document.getElementsByClassName("tecla");
  }

  var subscribeEvents = function(){
    for(var i = 0, len = domBtns.length; i < len; i++) {
        domBtns[i].onclick = events.eBtnClick;
    }
  }

  var events = {
    eBtnClick: function(e){
      switch (this.id) {
        case btnsId.btn_onc  :
          initVars();
          writeDisplay(screenVal);
          break;
        case btnsId.btn_sign :
          setSign();
          writeDisplay(screenVal);
          break;
        case btnsId.btn_raiz :
          break;
        case btnsId.btn_punto:
          addPoint();
          break;
        case btnsId.btn_igual:
          solveOp();
          break;
        case btnsId.btn_mas  :
        case btnsId.btn_menos:
        case btnsId.btn_por  :
        case btnsId.btn_div  :
          addBasicOps(this.id);
          break;
        default:
          addNumber(this.id);
      }
    }
  }

  function writeDisplay(value){
    if (value.length > maxLen) value = parseFloat(value).toFixed(4);
    document.getElementById("display").innerHTML = value;
    value = idBOp;
    idBOp != value;
  }

  function solveOp(){
    if (screenVal.endsWith(".")) screenVal = screenVal.substr(0,screenVal.length-1);
    if (screenVal.length > maxLen) return;
    if (idBOp == ""){
      return;
    } else {
      nOp2 = Number(screenVal);
      switch (idBOp) {
        case btnsId.btn_mas:
          result = add(nOp1, nOp2);
          break;
        case btnsId.btn_menos:
          result = substract(nOp1, nOp2);
          break;
        case btnsId.btn_por:
          result = multiply(nOp1, nOp2);
          break;
        case btnsId.btn_div:
          result = divide(nOp1, nOp2);
          break;
        default:
      }
      nOp2 = 0;
      screenVal = String(result);
      nOp1 = result;
    }
    if (screenVal.search(".") == - 1) maxLen = 8;
    else maxLen = 8;
    nuevoV = true;
    writeDisplay(screenVal);
    hasPoint = false;
    idBOp = "";
    maxLen = 8;
  }

  function setSign(){
    result = Number(screenVal);
    result = -1 * result;
    screenVal = String(result);
  }

  function addPoint(){
    if (hasPoint == true) return;
    if (screenVal.length > maxLen) return;
    if (nuevoV == false && screenVal.length == maxLen) return;
    if (nuevoV == true || screenVal == "0") screenVal = "0";
    screenVal = screenVal + ".";
    writeDisplay(screenVal);
    maxLen = 8;
    hasPoint = true;
    nuevoV = false;
  }

  function addNumber(id){
    if (screenVal.length > maxLen) return;
    if (nuevoV == false && screenVal.length == maxLen) return;
    if (nuevoV == true || screenVal == "0") screenVal = "";
    screenVal = screenVal + id;
    writeDisplay(screenVal);
    nuevoV = false;
  }

  function addBasicOps(id){
    if (screenVal.endsWith(".")) screenVal = screenVal.substr(0,screenVal.length-1);
    if (screenVal.length > maxLen) return;
    if (idBOp == ""){
      nOp1 = Number(screenVal);
    } else {
      nOp2 = Number(screenVal);
      switch (idBOp) {
        case btnsId.btn_mas:
          result = add(nOp1, nOp2);
          break;
        case btnsId.btn_menos:
          result = substract(nOp1, nOp2);
          break;
        case btnsId.btn_por:
          result = multiply(nOp1, nOp2);
          break;
        case btnsId.btn_div:
          result = divide(nOp1, nOp2);
          break;
        default:
      }
      if (id != idBOp) {
            idBOp = id;
      }
      nOp2 = 0;
      screenVal = String(result);
      nOp1 = result;
    }
    if (screenVal.search(".") == - 1) maxLen = 8;
    else maxLen = 8;
    nuevoV = true;
    writeDisplay(screenVal);
    hasPoint = false;
    idBOp = id;
  }

  function add (v1, v2){
    return v1 + v2;
  }

  function substract (v1, v2){
    return v1 - v2;
  }

  function multiply (v1, v2){
    return v1 * v2;
  }

  function divide (v1, v2){
    return v1 / v2;
  }

  var initialize = function(){
    initVars()
    getBtns();
    subscribeEvents();
  }

  return{
      init: initialize
  }

})(document);

Calculadora.init();
