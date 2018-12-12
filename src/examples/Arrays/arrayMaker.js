const workercode = () => {

    onmessage = function(e) { 
      let params = e.data;

      const parentArray = [];
      for (var i=0; i < params.numArrays; i++) {
        let arr = Array.from({length: params.numElements}, () => Math.random());
        let typedArray = new Float32Array(arr);
        postMessage(typedArray, [typedArray.buffer]);
      }
    }
  };
  
  let code = workercode.toString();
  code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));
  
  const blob = new Blob([code], {type: "application/javascript"});
  const arrayMaker = URL.createObjectURL(blob);
  
  module.exports = arrayMaker;