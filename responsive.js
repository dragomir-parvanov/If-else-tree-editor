var clientWidth=window.innerWidth;
var clientHeight=window.innerHeight;
//unitializing standart component sizes
// Top Bar 4%
// SVGTree 4% top, width 70%, height 92%
// Node settings 4% top, width 30%, height 92%, right from TreeView SVG(70% default)
// Tree explorer, 96% top, width from TreeView SVG(70% default), 4% height,
var NavbarHeight=clientHeight*0.04;

var SVGTreeTop=clientHeight*0.04;
var SVGTreeHeight=clientHeight*0.92;
var SVGTreeWidth=clientWidth*0.70;
var NodeSettingsTop = clientHeight*0.04;
var NodeSettingsWidth = clientWidth*0.30;
var NodeSettingsHeight = clientHeight*0.96;
var NodeSettingsLeft = clientWidth*0.70;

var TreeExplorerTop = clientHeight*0.96;
var TreeExplorerHeight =clientHeight*0.04;
var TreeExplorerWidth =clientWidth*0.70;
// Navbar responsive
document.getElementById('navbar').style.height=`${NavbarHeight + "px"}`;
// SVGTree responsive
document.getElementById('SVGTree').style.top=`${SVGTreeTop + "px"}`;
document.getElementById('SVGTree').style.height=`${SVGTreeHeight + "px"}`;
document.getElementById('SVGTree').style.width=`${SVGTreeWidth + "px"}`;
document.getElementById('SVGTree').width=`${SVGTreeWidth}`;
document.getElementById('SVGTree').height=`${SVGTreeHeight}`
// Node settings responsive
document.getElementById('nodeSettings').style.top=`${NodeSettingsTop + "px"}`;
document.getElementById('nodeSettings').style.height=`${NodeSettingsHeight + "px"}`;
document.getElementById('nodeSettings').style.width=`${NodeSettingsWidth + "px"}`;
document.getElementById('nodeSettings').style.left=`${NodeSettingsLeft + "px"}`;
// Node settings attributes responsive
document.getElementById('nodeName').text="Node name: ";
// Node conditions
document.getElementById('nodeCondition').text="Type: ";
document.getElementById('ActionInput').value="";
// Node Timeout
document.getElementById('nodeTimeout').text="Timeout: ";
document.getElementById('nodeNotes').text="";
// TreeExplorer responsive
document.getElementById('treeExplorer').style.top=`${TreeExplorerTop + "px"}`;
document.getElementById('treeExplorer').style.height=`${TreeExplorerHeight + "px"}`;
document.getElementById('treeExplorer').style.width=`${TreeExplorerWidth + "px"}`;
