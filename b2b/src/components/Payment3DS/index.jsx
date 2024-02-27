import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom";

export function Payment3DS() {
  const location = useLocation();
  const threeDSMethodURL = new URLSearchParams(location.search).get('threeDSMethodURL');
  const threeDSMethodData = new URLSearchParams(location.search).get('threeDSMethodData');

  const formRef = useRef(null);

  useEffect(() => {
    if (threeDSMethodURL && threeDSMethodData) {
      formRef.current.submit();
      window.parent.postMessage('form send', '*');
    }
  }, [threeDSMethodURL, threeDSMethodData])

  return (
    (threeDSMethodURL && threeDSMethodData) &&
    <form ref={formRef} name="frm1" id="frm1" action={threeDSMethodURL} method="post">
      <input type="hidden" name="threeDSMethodData" value={threeDSMethodData} />
    </form>
  );
}