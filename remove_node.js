function removeNode(node){
let id;
let arrayId;
// This doesnt work properly when clearing connections that are cross-tree connected.
// Todo: needs fixing
for (var j = 0; j < trees.length; j++) {
  for (let i = 0; i < trees[j].length; i++) {
    if(trees[j][i].Id==node.Id&&trees[j][i].IfTrueToNode.FromTree==getTreeName(treeIndex)){
      id=i;
      arrayId=j;
    }
    //clearing connections to that node
    if(trees[j][i].IfTrueToNode.ToNodeId==node.Id&&trees[j][i].IfTrueToNode.ToTree==getTreeName(treeIndex)){
      trees[j][i].IfTrueToNode.ToNodeId=-1;
    }
    if(Nodes[i].IfFalseToNode.ToNodeId==node.Id&&trees[j][i].IfFalseToNode.ToTree==getTreeName(treeIndex)){
      trees[j][i].IfFalseToNode.ToNodeId=-1;
    }
  }
}
trees[arrayId].splice(id, 1);
//Deactivating the button
deactivateOtherButtons(0);
PointerIsActive=true;
}
