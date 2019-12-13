function submit(){
  currentNode.Name=document.getElementById('NameInput').value;
  currentNode.Action=document.getElementById('ActionInput').value;
  currentNode.Notes=document.getElementById('NotesInput').value;
  //currentNode.Data=document.getElementById('DataInput').value.split(",");
if(currentNode.type=="Question"){
  let datas = document.getElementById('DataInput').value.split(",");
  for (let i = 0; i < datas.length; i++) {
    currentNode.Data[i]=datas[i];
  }
}
else{
  currentNode.Data=document.getElementById('DataInput').value;
}
  currentNode.IfTrueToNode.ToTree=document.getElementById('ToTrueTreeInput').value;
  currentNode.IfTrueToNode.ToNodeId=document.getElementById('ToTrueNodeInput').value;
  currentNode.IfTrueToNode.FromNode=document.getElementById('FromTrueNodeInput').value;

  currentNode.IfFalseToNode.ToTree=document.getElementById('ToFalseTreeInput').value;
  currentNode.IfFalseToNode.ToNodeId=document.getElementById('ToFalseNodeInput').value;
  currentNode.IfFalseToNode.FromNode=document.getElementById('FromFalseNodeInput').value;

  Nodes[Id(currentNode.Id)]=currentNode;
}
function makeStartingNode(){
  for (var i = 0; i < Nodes.length; i++) {
    Nodes[i].IsStartingNode=false;
  }
  Nodes[Id(currentNode.Id)].IsStartingNode=true;
}
