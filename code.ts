let allNodes: any[] = [];
let isStarted = false;
var debouncer: any = null;

figma.showUI(__html__, { width: 350, height: 600 });

const onCountNodes = () => {
  const nodes: any[] = [];
  function visit(node: any) {
    var singleNode = nodes.find((n) => n.type === node.type);
    if (singleNode) {
      singleNode.amount += 1;
    } else {
      nodes.push({
        type: node.type,
        amount: 1 + (singleNode?.amount || 0),
      });
    }
    if (node.children) node.children.forEach(visit);
  }

  visit(figma.root);
  return nodes;
};

const onChange = () => {
  const nodes = onCountNodes();
  nodes.map((node) => {
    const nodePrev = allNodes.find((n) => n.type === node.type);
    if (nodePrev) {
      node.amount = node.amount - nodePrev.amount;
    }
    return node;
  });
  figma.ui.postMessage({ nodes, allNodes });

  clearTimeout(debouncer);
  debouncer = setTimeout(async () => {
    const response = await fetch("http://localhost:5555/v1/stats/create", {
      method: "POST",
      body: JSON.stringify({ data: nodes }),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvbW15QHRvbW15amVwc2VuLmNvbSIsInBhc3N3b3JkIjoiIiwiY3JlYXRlZEF0IjoiMjAyMy0wNC0xMlQxODo0MTo0NC45NTBaIiwiYXV0aFR5cGUiOiJlbWFpbHB3IiwidXNlckltYWdlIjpudWxsLCJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJvYXV0aElkIjpudWxsLCJzZWxlY3RlZENvbXBhbnlJZCI6ImE4MjgwMjcwLTEzOGYtNGIxZi1hNjNlLTUwMDAzZmYyZTdlZCIsImlkIjoiNTE1NzJlZTMtMWExZS00OTJmLWJjMGItYTJmMjU0MDA2MzU2IiwiaXNBY3RpdmUiOjEsImxhc3RMb2dpbiI6IjIwMjMtMDQtMTJUMTY6NDE6NDAuMzAzWiIsImlhdCI6MTY4MTMyNDkwNCwiZXhwIjoxNjgzOTE2OTA0fQ.4VuX2CCVoVv6QtsJS5-sAjRLUhuF0Qy8SUtrnoQeWRA",
        companyid: "a8280270-138f-4b1f-a63e-50003ff2e7ed",
      },
    });
    const json = await response.json();
  }, 1000);
};

figma.on("documentchange", async () => {
  if (isStarted) {
    onChange();
  }
});

figma.ui.onmessage = async (params) => {
  allNodes = onCountNodes();
  figma.ui.postMessage({ nodes: [], allNodes });

  isStarted = !isStarted;
  if(isStarted) {
    figma.notify('Started');
  }
  // await figma.clientStorage.setAsync("key", "valuezz");
  // const ok = await figma.clientStorage.getAsync("key");
  // console.log("ok", ok);
};
