// export const baseUrl = 'https://storage.techlines.es/api/';
export const baseUrl = 'http://localhost:4000/api/';
// export const localUrl = 'https://b2b.techlines.es/api/';
export const localUrl = 'http://localhost:3000/';

export const initialValuesShippingForm = {
  countryName: '',
  index: '',
  region: '',
  city: '',
  street: '',
  house: '',
  apartment: '',
  firstName: '',
  lastName: '',
  email: '',
  telephone: '',
  save: false,
  paymentInfo: 'IBAN'
  // paymentInfo: null
};

export const initialReq = (amount, token, orderNo) => ({
  "DS_MERCHANT_AMOUNT": amount,
  "DS_MERCHANT_CURRENCY": "978",
  "DS_MERCHANT_IDOPER": token,
  "DS_MERCHANT_MERCHANTCODE": "361686405",
  "DS_MERCHANT_ORDER": orderNo,
  "DS_MERCHANT_TERMINAL": "1",
  "DS_MERCHANT_TRANSACTIONTYPE": "0"
});

export const EMV3DS = (protocolVersion, threeDSServerTransID, threeDSCompInd) => ({
  "threeDSInfo": "AuthenticationData",
  "protocolVersion": protocolVersion,
  "browserAcceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/json",
  "browserUserAgent": window.navigator.userAgent,
  "browserJavaEnabled": window.navigator.javaEnabled() || false,
  "browserLanguage": window.navigator.language,
  "browserColorDepth": window.screen.pixelDepth,
  "browserScreenHeight": window.screen.availHeight,
  "browserScreenWidth": window.screen.availWidth,
  "browserTZ": new Date().getTimezoneOffset(),
  "threeDSServerTransID": threeDSServerTransID,
  "notificationURL": "https://storage.techlines.es/api/payment/3DS",
  "threeDSCompInd": threeDSCompInd || "N"
})