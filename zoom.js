window.addEventListener("wheel", event => onMouseWheel(event));

function onMouseWheel(event){
  if(event.deltaY<0){
    zoomIn();
  }
  else{
    zoomOut();
  }

}
function zoomIn(){
  Client.Fov.X*=0.97;
  Client.Fov.Y*=0.97;
}
function zoomOut(){
  Client.Fov.X*=1.03;
  Client.Fov.Y*=1.03;
}
