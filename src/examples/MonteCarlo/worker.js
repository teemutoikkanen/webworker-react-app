const workercode = () => {

    onmessage = function(e) { 
      console.log('Message received from main script');

    var inside = 0;
    let count = e.data;
    for (var i = 0; i < count; i++) {
      var x = Math.random() * 2 - 1;
      var y = Math.random() * 2 - 1;
      if (x * x + y * y < 1) {
        inside++; 
        } 
    }

    let result = (4.0 * inside) / count;

      console.log('Posting message back to main script');
      postMessage(result); 
    }
  };
  
  let code = workercode.toString();
  code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));
  
  const blob = new Blob([code], {type: "application/javascript"});
  const worker_script = URL.createObjectURL(blob);
  
  module.exports = worker_script;

