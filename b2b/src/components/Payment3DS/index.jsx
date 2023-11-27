import { useEffect } from "react"

export function Payment3DS({threeDSMethodData, threeDSMethodURL}) {
  useEffect(() => { }, [threeDSMethodData]);
  useEffect(() => {
    const form = document.getElementById("frm1")
    form.submit();
  }, [])
  return (
    // <form name="frm1" id="frm1" action="https://sis-d.redsys.es/sis/services/rest/rest3DS/procesar3DSMethod" method="post">
    //   <input type="hidden" name="threeDSMethodData" value={threeDSMethodData.threeDSMethodData} /><br />
    // </form>
    <form name="frm1" id="frm1" action={threeDSMethodURL} method="post">
      <input type="hidden" name="threeDSMethodData" value={threeDSMethodData} />
    </form>
  )
}