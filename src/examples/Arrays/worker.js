const workercode = () => {

    onmessage = function(e) { 
      let arrays = e.data.arrays, id = e.data.id;
      for (var i=0; i < arrays.length; i++) {
        arrays[i] = arrays[i].sort();
        postMessage({id: id, array: arrays[i]}, [arrays[i].buffer]);
      }
    }
  };
  
  let code = workercode.toString();
  code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));
  
  const blob = new Blob([code], {type: "application/javascript"});
  const worker_script = URL.createObjectURL(blob);
  
  module.exports = worker_script;

