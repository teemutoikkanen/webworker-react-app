const workercode = () => {

    onmessage = function(e) { 
      console.log('Message received from main script');

      let params = e.data;

      const parentArray = [];
      for (var i=0; i < params.numArrays; i++) {
        parentArray.push(Array.from({length: params.numElements}, () => Math.random()));
      }

      console.log('Posting message back to main script');
      postMessage(parentArray);
    }
  };
  
  let code = workercode.toString();
  code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));
  
  const blob = new Blob([code], {type: "application/javascript"});
  const arrayMaker = URL.createObjectURL(blob);
  
  module.exports = arrayMaker;