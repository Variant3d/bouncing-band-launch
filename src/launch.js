window.addEventListener("vlaunch-initialized", function (event) {
  console.log("vlaunch-initialized", event);
  if (!event.launchRequired) {
    // we are either in Launch Viewer, or not on iOS
    return;
  }
  //specify where launch users should be redirected to, and what launch page they should see while opening the launch viewer.

  let targetUrl = new URL("/", document.baseURI).href;
  let launchPage = new URL("/launch.html", document.baseURI).href;
  VLaunch.launch(targetUrl, launchPage);
});
