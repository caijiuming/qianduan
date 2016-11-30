document.getElementById("testBtn").addEventListener("click", function() {
            // Because the camera plugin method launches an external Activity,
            // there is a chance that our application will be killed before the
            // success or failure callbacks are called. See onPause() and
            // onResume() where we save and restore our state to handle this case
            console.log("click");
            // alert("click");
            HelloWorld.say();
        });
document.getElementById("testNative").addEventListener("click",function(){
	console.log("native");
	Carrier.getCarrierCode(onSuccess, onFailure);
});
  function onSuccess(result) {
    alert("Result: " + result);
  }
  function onFailure(err) {
    alert("Failure: " + err);
  }