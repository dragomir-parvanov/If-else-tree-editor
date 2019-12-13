
function addNode(type,x,y){
  console.log("should add node");
  let xRender = (Client.X-Client.Fov.X/2)+x/ratioW;
  let yRender = (Client.Y-Client.Fov.Y/2)+y/ratioH;
  let nodeId
  if(Nodes.length == 0){
    nodeId = 0;
  }else{
    nodeId = Nodes[Nodes.length-1].Id+1;
  }
  
  Nodes.push(
    {
      "Id": nodeId,
      "Tree":  getTreeName(),
      "Name": "Unnamed",
      "Type": type,
      "Action": type=="Question"?"CheckUserLastMessage":"SendMessage",
      "Data": [

      ],
      "IsWaitingForNewMessage": false,
      "IfTrueToNode": {
        "ToNodeId": -1,
        "ToTree": getTreeName(),
        "FromNode": nodeId,
        "FromTree":getTreeName()
      },
      "IfFalseToNode": {
        "ToNodeId": -1,
        "ToTree": getTreeName(),
        "FromNode": nodeId,
        "FromTree":getTreeName()
      },
      "IfTimeoutToNode": "ToTree=noResponding,node=0",
      "TimeoutSeconds": 30,
      "X": xRender,
      "Y": yRender,
      "Height": 100,
      "Width": 100,
      "Notes": "",
      "IsStartingNode": false
    }
  );
  //deactivating the button
  PointerIsActive=true;

  deactivateOtherButtons(0);
}
