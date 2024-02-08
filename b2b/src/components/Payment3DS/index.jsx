import { useEffect } from "react"
import { useLocation } from "react-router-dom";


export function Payment3DS() {
  const location = useLocation();
  const threeDSMethodURL = new URLSearchParams(location.search).get('threeDSMethodURL');
  const threeDSMethodData = new URLSearchParams(location.search).get('threeDSMethodData');

  useEffect(() => { }, [threeDSMethodData]);
  useEffect(() => {
    const form = document.getElementById("frm1")
    if (threeDSMethodData && threeDSMethodURL) {
      console.log(threeDSMethodURL);
      console.log(threeDSMethodData);
    }
    form.submit();
  }, [])

  return (
    threeDSMethodURL && threeDSMethodData &&
    <form name="frm1" id="frm1" action={threeDSMethodURL} method="post">
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