var canvas;
var ctx;
var ratioW;
var ratioH;
var stopLoop = false;
var renderList = [];
var linesList = [];
var fromNodeTrue;
var fromNodeFalse;
var firstLineToTrue = false;
var firstLineToFalse = false;
var addNodeType;
var movingNode = false;
var currentNode;
var previousNode;
var mousePosX;
var mousePosY;
var offsetX = 0;
var offsetY = 0;
//update method for each frame
update();
function update() {
    if (stopLoop) {
        return;
    }
    keyUpdate();
    render();
    window.requestAnimationFrame(update);
}
//gets the renderList
function getNodesRenderList() {
    canvas = document.getElementById("SVGTree");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ratioW = canvas.width / Client.Fov.X;
    ratioH = canvas.height / Client.Fov.Y;
    //clearing the renderList
    renderList.length = 0;
    for (let i = 0; i < Nodes.length; i++) {
        //x check
        if (Nodes[i].X + Nodes[i].Width > Client.X - Client.Fov.X / 2 && Nodes[i].X < Client.X + Client.Fov.X / 2) {
            //y check
            if (Nodes[i].Y + Nodes[i].Height > Client.Y - Client.Fov.Y / 2 && Nodes[i].Y < Client.Y + Client.Fov.Y / 2) {
                //these elements are in client View
                //if node is moving, change its X and Y
                if (previousNode != null) {
                    if (Nodes[i].Id == previousNode.Id && movingNode) {
                        Nodes[i].X = (Client.X - Client.Fov.X / 2) + mousePosX / ratioW + offsetX;
                        Nodes[i].Y = (Client.Y - Client.Fov.Y / 2) + mousePosY / ratioH + offsetY;
                    }
                }
                let xRender = ((Nodes[i].X - Client.X) + Client.Fov.X / 2);
                let yRender = ((Nodes[i].Y - Client.Y) + Client.Fov.Y / 2);
                xRender *= ratioW;
                yRender *= ratioH;
                //initializing render list so we can easily manipulate what we see on screen
                renderList.push({
                    "Id": Nodes[i].Id,
                    "Tree":Nodes[i].Tree,
                    "Type": Nodes[i].Type,
                    "Name": Nodes[i].Name,
                    //original X and Y
                    "OX": Nodes[i].X,
                    "OY": Nodes[i].Y,
                    "X": xRender,
                    "Y": yRender,
                    "IfTrueToNode": Nodes[i].IfTrueToNode,
                    "IfFalseToNode": Nodes[i].IfFalseToNode,
                    "Width": Nodes[i].Width,
                    //"Height": Nodes[i].Height,
                    "Height": Nodes[i].Width,
                    "IsStartingNode":Nodes[i].IsStartingNode
                });
            }
        }
    }
}

function render(){

  getNodesRenderList()
  let lines = getLinesRenderList()

 //first drawing the linesList
if(lines!=null){
for (var i = 0; i < lines.length; i++) {

  drawLine(lines[i]);
}
}
//drawing the objects
  for (var i = 0; i < renderList.length; i++) {
    if(renderList[i].Type[0]=="Q"){

      drawQuestion(renderList[i]);
      drawText(renderList[i]);
    }
    else{

      drawAction(renderList[i]);
      drawText(renderList[i]);
    }
  }
}
// GET X and Y of all connection lines that needs to be rendered
function getLinesRenderList(){

let linesToRender=[];

for (let i = 0; i < renderList.length; i++) {
  for (let j = 0; j < Nodes.length; j++) {
    if(Nodes[j].IfTrueToNode.ToNodeId==renderList[i].Id&&Nodes[j].IfTrueToNode.ToTree==getTreeName(treeIndex)&&IdRList(Nodes[j].Id)==-1){
      linesToRender.push({
        "X1":Nodes[j].X,
        "Y1":Nodes[j].Y,
        "X2":renderList[i].X,
        "Y2":renderList[i].Y,
        "FromWidth":Nodes[j].Width,
        "FromHeight":Nodes[j].Height,
        "ToWidth":renderList[i].Width,
        "ToHeight":renderList[i].Height,
        "Style":"IfTrue",
        "FromNodeType":Nodes[j].Type,
        "ToNodeType":renderList[i].Type
      });
    }
      if(Nodes[j].IfFalseToNode.ToNodeId==renderList[i].Id&&Nodes[j].IfFalseToNode.ToTree==getTreeName(treeIndex)&&IdRList(Nodes[j].Id)==-1){
        linesToRender.push({
          "X1":Nodes[j].X,
          "Y1":Nodes[j].Y,
          "X2":renderList[i].X,
          "Y2":renderList[i].Y,
          "FromWidth":Nodes[j].Width,
          "FromHeight":Nodes[j].Height,
          "ToWidth":renderList[i].Width,
          "ToHeight":renderList[i].Height,
          "Style":"IfFalse",
          "FromNodeType":Nodes[j].Type,
          "ToNodeType":renderList[i].Type
        });
        // TODO: ADD TO TIMEOUT
        console.log("should add");
    }
  }
}
for (var i = 0; i < renderList.length; i++) {
  //true
  if(renderList[i].IfTrueToNode.ToNodeId!=-1&&renderList[i].Tree==getTreeName(treeIndex)){
    let id = Id(renderList[i].IfTrueToNode.ToNodeId);
    linesToRender.push({
      "X1":Nodes[id].X,
      "Y1":Nodes[id].Y,
      "X2":renderList[i].X,
      "Y2":renderList[i].Y,
      "FromWidth":Nodes[id].Width,
      "FromHeight":Nodes[id].Height,
      "ToWidth":renderList[i].Width,
      "ToHeight":renderList[i].Height,
      "Style":"IfTrue",
      "FromNodeType":Nodes[id].Type,
      "ToNodeType":renderList[i].Type
    });
  }
  //FALSE
  if(renderList[i].IfFalseToNode.ToNodeId!=-1&&renderList[i].Tree==getTreeName(treeIndex)){
    let id = Id(renderList[i].IfFalseToNode.ToNodeId);
    linesToRender.push({
      "X1":Nodes[id].X,
      "Y1":Nodes[id].Y,
      "X2":renderList[i].X,
      "Y2":renderList[i].Y,
      "FromWidth":Nodes[id].Width,
      "FromHeight":Nodes[id].Height,
      "ToWidth":renderList[i].Width,
      "ToHeight":renderList[i].Height,
      "Style":"IfFalse",
      "FromNodeType":Nodes[id].Type,
      "ToNodeType":renderList[i].Type
    });
    //TODO Timeout
  }
}
return linesToRender;
}
// Draw the name of a node inside its width and height
function drawText(node){

  ctx.beginPath();
  ctx.font = 20 * ratioW + "px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "black";

  if(node.Name.length<4){
      Nodes[Id(node.Id)].Width=60;
  }
else{
      Nodes[Id(node.Id)].Width=node.Name.length*10;
  }

  let objectWidth = node.Width * ratioW;
  let objectHeight = node.Height * ratioH;

  let objectX = node.X;
  let objectY = node.Y;

if(node.Type[0]=="Q"){
  ctx.fillText(node.Name, objectX + (objectWidth / 2), objectY + (objectHeight / 2), node.Width * ratioW * 0.9);
}
else{
  ctx.fillText(node.Name,objectX,objectY, node.Width * ratioW * 0.9);
}

  ctx.fill();
}

//draw question node. Its square.
function drawQuestion(node){
  ctx.beginPath();
  if (node.IsStartingNode) {
      ctx.strokeStyle = "purple";
  } else {
      ctx.strokeStyle = "black";
  }
  ctx.rect(node.X, node.Y, node.Width * ratioW, node.Height * ratioH);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
}
// Draw Action node, its circle
function drawAction(node){
    //Drawing circle
    ctx.beginPath();
    if (node.IsStartingNode) {
        ctx.strokeStyle = "purple";
    } else {
        ctx.strokeStyle = "black";
    }
    ctx.arc(node.X, node.Y, node.Width * ratioW / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
}
//Drawing lines
function drawLine(line) {
    ctx.beginPath();
    let lineOffset;
    if(line.Style=="IfTrue"){
      ctx.strokeStyle = "green";
      lineOffset=5;
    }
     else if(line.Style=="IfFalse"){
      ctx.strokeStyle = "red";
      lineOffset=0;
    }
    else{
      //timeout
      ctx.strokeStyle = "blue";
      lineOffset=-5;
    }

    let x1 = ((line.X1 - Client.X) + Client.Fov.X / 2) * ratioW;
    let y1 = (((line.Y1 - Client.Y) + Client.Fov.Y / 2)) * ratioH;
    let x2 = line.X2;
    let y2 = line.Y2;

    if (line.FromNodeType == "Question") {

        x1 += (line.FromWidth / 2) * ratioW;
        y1 += (line.FromHeight / 2) * ratioH;
    }
    if (line.ToNodeType == "Question") {

        x2 += (line.ToWidth / 2) * ratioW;
        y2 += (line.ToHeight / 2) * ratioH;
    }

    x2 += lineOffset;
    x1 += lineOffset;
    y2 -= lineOffset;
    y1 -= lineOffset;
    ctx.moveTo(x2, y2);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}
function onCanvasClick(event, upOrDown) {
    //0 down, 1 up
    var x = event.clientX;
    var y = event.clientY - NavbarHeight;
    if (upOrDown == 1 && previousNode != null && PointerIsActive) {
        let xRender = (Client.X - Client.Fov.X / 2) + x / ratioW + offsetX;
        let yRender = (Client.Y - Client.Fov.Y / 2) + y / ratioH + offsetY;
        movingNode = false;
        Nodes[Id(previousNode.Id)].X = xRender;
        Nodes[Id(previousNode.Id)].Y = yRender;
        previousNode = null;
        return;
    }
    if (AddQuestionNodeIsActive||AddActionNodeIsActive) {
        addNode(addNodeType, x, y);
    }
    //check if user points to a node
    for (let i = renderList.length - 1; i >= 0; i--) {
        if (renderList[i].Type == "Question") {
            if (x > renderList[i].X && x < renderList[i].X + renderList[i].Width*ratioW) {
                if (y > renderList[i].Y && y < renderList[i].Y + renderList[i].Height*ratioH) {
                    offsetX = renderList[i].OX - (Client.X - Client.Fov.X / 2) - mousePosX / ratioW;
                    offsetY = renderList[i].OY - (Client.Y - Client.Fov.Y / 2) - mousePosY / ratioH;
                    onNodeClick(Nodes[Id(renderList[i].Id)], upOrDown);
                    return;
                }
            }
        } else {
            let distance = Math.sqrt((Math.pow(renderList[i].X - x, 2)) + (Math.pow(renderList[i].Y - y, 2)));
            if (distance < renderList[i].Width*ratioW / 2) {
                offsetX = renderList[i].OX - (Client.X - Client.Fov.X / 2) - mousePosX / ratioW;
                offsetY = renderList[i].OY - (Client.Y - Client.Fov.Y / 2) - mousePosY / ratioH;
                onNodeClick(Nodes[Id(renderList[i].Id)], upOrDown);
                return;
            }
        }
    }
    firstLineToTrue = false;
    firstLineToFalse = false;
}

function onNodeClick(node, upOrDown) {
    if (PointerIsActive) {
        onNodeClickPointer(node, upOrDown);
        return;
    }
    if (AddConnectionTrueIsActive) {
        addLineTrue(node, upOrDown);
        return;
    }
    if (AddConnectionFalseIsActive) {
        addLineFalse(node, upOrDown);
    }
    if (RemoveNodeIsActive) {
        removeNode(node);
    }
}

function onNodeClickPointer(node, upOrDown) {
    if (upOrDown == 0) {
        previousNode = node;
        movingNode = true;
    } else {
        showNodeParameters(node);
        previousNode = null;
        movingNode = false;
    }
    if (previousNode != null && node.Id == previousNode.Id) {
        showNodeParameters(node);
    }
}

function addLineTrue(node, upOrDown) {

    if (!firstLineToTrue) {
        fromNodeTrue = node.Id;
        firstLineToTrue = true;
    } else {
        if (Nodes[Id(fromNodeTrue)].Id != node.Id) {
            Nodes[Id(fromNodeTrue)].IfTrueToNode.ToNodeId = node.Id;
        }
        firstLineToTrue = false;
        //Deactivating the button
        deactivateOtherButtons(0);
        PointerIsActive = true;
    }
}

function addLineFalse(node, upOrDown) {
    if (!firstLineToFalse) {
        fromNodeFalse = node.Id;
        firstLineToFalse = true;
    } else {
        if (Nodes[Id(fromNodeFalse)].Id != node.Id) {
            Nodes[Id(fromNodeFalse)].IfFalseToNode.ToNodeId = node.Id;
        }
        firstLineToFalse = false;
        //Deactivating the button
        deactivateOtherButtons(0);
        PointerIsActive = true;
    }
}

function Id(id) {
    for (let i = 0; i < Nodes.length; i++) {
        if (id == Nodes[i].Id) {
            return i;
        }
    }
return -1;
}
function IdRList(id){
  for (let i = 0; i < renderList.length; i++) {
      if (id == renderList[i].Id) {
          return i;
      }
  }
return -1;
}
