function showNodeParameters(node){
  currentNode=node;
  document.getElementById('nodeID').text="Node ID: "+ node.Id;
  document.getElementById('NameInput').value=node.Name;
  // Node conditions
  document.getElementById('nodeCondition').text="Type: "+ node.Type;
  document.getElementById('ActionInput').value=node.Action;
  document.getElementById('DataInput').value=node.Data;
  // Node Timeout
  document.getElementById('nodeTimeout').text="Timeout: "+ node.TimeoutSeconds;
  //var nodeNotes = "Asking the user if he have cases";
  document.getElementById('NotesInput').value=node.Notes;//nodeNotes;

document.getElementById('ToTrueTreeInput').value=node.IfTrueToNode.ToTree;
document.getElementById('ToTrueNodeInput').value=node.IfTrueToNode.ToNodeId;
document.getElementById('FromTrueNodeInput').value=node.IfTrueToNode.FromNode;

document.getElementById('ToFalseTreeInput').value=node.IfFalseToNode.ToTree;
document.getElementById('ToFalseNodeInput').value=node.IfFalseToNode.ToNodeId;
document.getElementById('FromFalseNodeInput').value=node.IfFalseToNode.FromNode;
}
