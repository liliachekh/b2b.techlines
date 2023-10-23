

export const redsysScript = (orderNo) => (`
      function merchantValidationEjemplo() {
  //Insertar validaciones…
  alert("Esto son validaciones propias");
  return true;
}

window.addEventListener("message", function receiveMessage(event) {
  storeIdOper(event, "token", "errorCode", merchantValidationEjemplo);
});

function pedido() {
  return "pedido" + Math.floor((Math.random() * 1000) + 1);
}

var insiteJSON = {
  "id": "card-form",
  "fuc": "999008881",
  "terminal": "1",
  "order": "${orderNo}",
  "estiloInsite": "twoRows",
  "idioma": "2",
  "mostrarLogo": "false",
  "buttonValue": "BUY",
  "styleButton": "color:#f7fbfa; background-color: #202025;",
  "styleGroup": "background-color: red;",
  "styleBox": "border-radius: .3rem; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4)",
}

getInSiteFormJSON(insiteJSON);
`);

// "fuc": "999008881",
// "fuc": "361686405",

// "styleButton": "position: relative; display: flex; align-items: center; justify-content: center; gap: .63rem; padding: 7px 30px; width: max-content; transition: .3s; border: 2px solid #202025; border-radius: 4px; background-color: #f7fbfa; color: #202025; text-align: center; font-size: .75rem; font-weight:700; line-height: 1.5rem; text-transform: uppercase; cursor: pointer; overflow: hidden; z-index: 1",
// "styleButton": "color:#f7fbfa;background-color: #f7fbfa;",

// getInSiteFormJSON(insiteJSON);

// getCardInput('card-number', '', '0000 0000 0000 0000');
// getExpirationMonthInput('expiration-month', '', 'MM');
// getExpirationYearInput('expiration-year', '', 'YY');
// getCVVInput('cvv', '', 'CVV');
// getPayButton('boton', '', 'Buy', 361686405, 001, 111);

// getCardInput('card-number', estiloCaja, placeholder, estiloInput);
// getExpirationMonthInput('expiration-month', estilosCSS, placeholder);
// getExpirationYearInput('expiration-year', estilosCSS, placeholder);
// getCVVInput('cvv', estilosCSS, placeholder);
// getPayButton('boton', estilosCSS, 'Texto botón pago', fuc, terminal, merchantOrder);