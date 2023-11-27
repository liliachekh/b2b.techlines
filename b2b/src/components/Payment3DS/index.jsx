import { useEffect } from "react"

// export function Payment3DS (threeDSMethodData){
//   useEffect(() => {}, [threeDSMethodData]);
//   useEffect(() => {
//     const form = document.getElementById("frm1")
//     form.submit();
//   },[]) 
//   return (
//     <form name="frm1" id= "frm1" action="https://sis-d.redsys.es/sis/services/rest/rest3DS/procesar3DSMethod" method="post">
// 		<input type="hidden" name="threeDSMethodData" value ={threeDSMethodData.threeDSMethodData} /><br/>
// </form>
//   )
// }
// export function Payment3DS (threeDSMethodData){
// const submitHandler = async(e) =>  {
//   e.preventDefault();
//   try {
//     const response = await fetch("https://sis-d.redsys.es/sis-simulador-web/threeDsMethod.jsp", {
//       method: "POST",
//       // mode: 'no-cors',
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ threeDSMethodData }),
//     });
// if(response.ok)
//     console.log("success");
//   } catch (error) {
//     console.error(error);
//   }
// }
// useEffect(() => {}, [threeDSMethodData]);
// useEffect(() => {
//   const form = document.getElementById("frm1");
//   if (form) {
//     form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
//   }
// }, []);
// return (
//       <form name="frm1" id= "frm1" onSubmit={submitHandler}>
//   		<input type="hidden" name="threeDSMethodData" value ={threeDSMethodData.threeDSMethodData} /><br/>
//   </form>
//     )
// }
export function Payment3DS({threeDSMethodData,threeDSMethodURL}) {
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/proxy-to-bank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: threeDSMethodURL, data: { threeDSMethodData } }),
      });

      if (response.ok) {
        console.log("success");
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {console.log(threeDSMethodData);}, [threeDSMethodData,threeDSMethodURL]);

  useEffect(() => {
    const form = document.getElementById("frm1");
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  }, []);

  return (
    <form name="frm1" id="frm1" onSubmit={submitHandler}>
      <input type="hidden" name="threeDSMethodData" value={threeDSMethodData} /><br />
    </form>
  );
}
