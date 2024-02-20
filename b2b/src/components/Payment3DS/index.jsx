import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom";
// import { localUrl } from "../../utils/vars";

export function Payment3DS() {
  const location = useLocation();
  const threeDSMethodURL = new URLSearchParams(location.search).get('threeDSMethodURL');
  const threeDSMethodData = new URLSearchParams(location.search).get('threeDSMethodData');

  const formRef = useRef(null);

  // useEffect(() => { }, [threeDSMethodData]);
  useEffect(() => {
    if (threeDSMethodURL && threeDSMethodData) {
      const form = document.getElementById("frm1");
      form.submit();
      window.parent.postMessage('form send', '*');
      // window.parent.postMessage('form send', localUrl);
    }
    // const form = document.getElementById("frm1");
    // const timeout = setInterval(() => {
    //   // if (formRef) window.parent.postMessage('threeDSCompInd = N', '*');
    //   window.parent.postMessage('threeDSCompInd = x1x', '*');
    //   // clearTimeout(timeout)
    //   // clearInterval(interval)
    // }, 1000);
    // form.submit();
    // const now = Date.now()
    // window.parent.postMessage('form send', localUrl);
    // window.parent.postMessage(now, '*');
    // window.parent.postMessage(document.innerHTML, '*');

    // window.parent.postMessage('threeDSCompInd = yY', '*');
    // window.parent.postMessage(formRef?.name);

    // const interval = setInterval(() => {
    // setInterval(() => {
    //   if (document.getElementsByTagName("pre")) console.log('oooooooo');
    //   window.parent.postMessage('threeDSCompInd = xxx', '*');
    //   if (!formRef) window.parent.postMessage('threeDSCompInd = Y', '*');
    // }, 1000)

    // const timeout = setTimeout(() => {
    //   if (formRef) window.parent.postMessage('threeDSCompInd = N', '*');
    //   window.parent.postMessage('threeDSCompInd = xxx', '*');
    //   clearTimeout(timeout)
    //   // clearInterval(interval)
    // }, 3000);
  }, [threeDSMethodURL, threeDSMethodData])

  // const handleMessage1 = (event) => {
  //   if (event.data === 'getURL') {
  //     const currentURL = window.location.href;
  //     event.source.postMessage(currentURL, event.origin);
  //   }
  //   // alert(JSON.stringify(document.body.innerHTML))
  //   // const msg = document.body.innerText
  //   // event.source.postMessage(msg, event.origin);
  // };

  // window.addEventListener('message', handleMessage1);

  // if (threeDSMethodData && !formRef) window.parent.postMessage('threeDSCompInd = xYx', '*');

  return (
    (threeDSMethodURL && threeDSMethodData) &&
    <form ref={formRef} name="frm1" id="frm1" action={threeDSMethodURL} method="post">
      <input type="hidden" name="threeDSMethodData" value={threeDSMethodData} />
    </form>
  );
}


// export function Payment3DS({threeDSMethodData, threeDSMethodURL}) {
//   useEffect(() => { }, [threeDSMethodData]);
//   useEffect(() => {
//     const form = document.getElementById("frm1")
//     form.submit();
//   }, [])
//   return (
//     // <form name="frm1" id="frm1" action="https://sis-d.redsys.es/sis/services/rest/rest3DS/procesar3DSMethod" method="post">
//     //   <input type="hidden" name="threeDSMethodData" value={threeDSMethodData.threeDSMethodData} /><br />
//     // </form>
//     <form name="frm1" id="frm1" action={threeDSMethodURL} method="post">
//       <input type="hidden" name="threeDSMethodData" value={threeDSMethodData} />
//     </form>
//   )
// }