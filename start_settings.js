//Navbar handler
var PointerIsActive = true;
var AddQuestionNodeIsActive = false;
var AddActionNodeIsActive = false;
var RemoveNodeIsActive = false;
var AddConnectionTrueIsActive = false;
var AddConnectionFalseIsActive = false;
//Tree loading
var trees = [];
trees.push(tree_nodes);
trees.push(test_tree);
var Nodes = trees[0];
var treeIndex = 0;
// Tree viewer settings
var Client = {
    X: 500,
    Y: 500,
    Speed: 1,
    Fov: {
        X: 1920,
        Y: 1080
    }
}
