import { useEffect } from "react"

export function Payment3DS({threeDSMethodData, threeDSMethodURL}) {
  useEffect(() => { }, [threeDSMethodData]);
  useEffect(() => {
    const form = document.getElementById("frm1")
    form.submit();
  }, [])
  return (
    <form name="frm1" id="frm1" action={threeDSMethodURL} method="post">
      <input type="hidden" name="threeDSMethodData" value={threeDSMethodData} />
    </form>
  )
}
