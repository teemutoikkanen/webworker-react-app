const workercode = () => {

    onmessage = function(e) { 
      console.log('Message received from main script');

      let arrays = e.data;
      for (var i=0; i < arrays.length; i++) {
        arrays[i] = arrays[i].sort();
      }

      console.log('Posting message back to main script');
      postMessage(arrays);
    }
  };
  
  let code = workercode.toString();
  code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));
  
  const blob = new Blob([code], {type: "application/javascript"});
  const worker_script = URL.createObjectURL(blob);
  
  module.exports = worker_script;

