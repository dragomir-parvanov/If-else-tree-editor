//navbar functions
function zoomIn(){
  Client.Fov.X*=0.9;
  Client.Fov.Y*=0.9;
}
function zoomOut(){
  Client.Fov.X*=1.1;
  Client.Fov.Y*=1.1;
}
function pointer(){
  PointerIsActive=true;
  deactivateOtherButtons(0);
}
function addQuestionNodeButton(){
 document.getElementById('addQuestionNode').classList.add='active';
 document.getElementById('addQuestionNode').classList.toggle('active');
  AddQuestionNodeIsActive=!AddQuestionNodeIsActive;
  deactivateOtherButtons(1);
}
function addActionNodeButton(){
  document.getElementById('addActionNode').classList.add='active';
  document.getElementById('addActionNode').classList.toggle('active');
  AddActionNodeIsActive=!AddActionNodeIsActive;
  deactivateOtherButtons(2);
}
function removeNodeButton(){
  document.getElementById('removeNode').classList.add='active';
  document.getElementById('removeNode').classList.toggle('active');
  RemoveNodeIsActive=!RemoveNodeIsActive;
  deactivateOtherButtons(3);
}
function addConnectionTrue(){
  document.getElementById('connectTrue').classList.add='active';
  document.getElementById('connectTrue').classList.toggle('active');
  AddConnectionTrueIsActive=!AddConnectionTrueIsActive;
  deactivateOtherButtons(4);
}
function addConnectionFalse(){
  document.getElementById('connectFalse').classList.add='active';
  document.getElementById('connectFalse').classList.toggle('active');
  AddConnectionFalseIsActive=!AddConnectionFalseIsActive;
  deactivateOtherButtons(5);
}
function deactivateOtherButtons(id){
// Deactivate other buttons when a button is clicked
  let count=0
  if(id!=count){
    PointerIsActive=false;
  }
  count++;
  if(id!=count){
    AddQuestionNodeIsActive=false;
    document.getElementById("addQuestionNode").classList.remove('active');

  }
  count++;
  if(id!=count){
    AddActionNodeIsActive=false;
    document.getElementById("addActionNode").classList.remove('active');
  }
  count++;
  if(id!=count){
    RemoveNodeIsActive=false;
    document.getElementById("removeNode").classList.remove('active');
  }
  count++;
  if(id!=count){
      AddConnectionTrueIsActive=false;
      firstLineToTrue=false;
      document.getElementById("connectTrue").classList.remove('active');
  }
  count++;
  if(id!=count){
    AddConnectionFalseIsActive=false;
    firstLineToFalse=false;
    document.getElementById("connectFalse").classList.remove('active');
  }
  count++;
}
