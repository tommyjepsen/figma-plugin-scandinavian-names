let allNodes: any[] = [];
let isStarted = false;
var debouncer: any = null;

figma.showUI(__html__, { width: 350, height: 600 });

function onFindAllNodesCountPromise() {
  return new Promise<any[]>((resolve) => {
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
    resolve(nodes);
  });
}
function onFindAllNewNodes(nodes: any[]) {
  return new Promise<any[]>((resolve) => {
    nodes.map((node) => {
      const nodePrev = allNodes.find((n) => n.type === node.type);
      if (nodePrev) {
        node.amount = node.amount - nodePrev.amount;
      }
      return node;
    });
    resolve(nodes);
  });
}

const onFindAllNewNodesAndSendToUi = async () => {
  let nodes: any[] = await onFindAllNodesCountPromise();
  nodes = await onFindAllNewNodes(nodes);
  return nodes;
};

const onChange = async () => {
  let newNodes = await onFindAllNewNodesAndSendToUi();
  figma.ui.postMessage({ newNodes, allNodes, hasUnsyncedData: true });
  clearTimeout(debouncer);
  debouncer = setTimeout(async () => {
    await onSyncDataToCloud(newNodes);
  }, 5000);
};

const onSyncDataToCloud = async (newNodes: any[]) => {
  figma.ui.postMessage({ newNodes, allNodes, hasUnsyncedData: false });
  return await fetch("http://localhost:5555/v1/stats/create", {
    method: "POST",
    body: JSON.stringify({ data: newNodes, figmaRootName: figma.root.name }),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvbW15QHRvbW15amVwc2VuLmNvbSIsInBhc3N3b3JkIjoiIiwiY3JlYXRlZEF0IjoiMjAyMy0wNC0xMlQxODo0MTo0NC45NTBaIiwiYXV0aFR5cGUiOiJlbWFpbHB3IiwidXNlckltYWdlIjpudWxsLCJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJvYXV0aElkIjpudWxsLCJzZWxlY3RlZENvbXBhbnlJZCI6ImE4MjgwMjcwLTEzOGYtNGIxZi1hNjNlLTUwMDAzZmYyZTdlZCIsImlkIjoiNTE1NzJlZTMtMWExZS00OTJmLWJjMGItYTJmMjU0MDA2MzU2IiwiaXNBY3RpdmUiOjEsImxhc3RMb2dpbiI6IjIwMjMtMDQtMTJUMTY6NDE6NDAuMzAzWiIsImlhdCI6MTY4MTMyNDkwNCwiZXhwIjoxNjgzOTE2OTA0fQ.4VuX2CCVoVv6QtsJS5-sAjRLUhuF0Qy8SUtrnoQeWRA",
      companyid: "a8280270-138f-4b1f-a63e-50003ff2e7ed",
    },
  });
};

figma.on("documentchange", async () => {
  if (isStarted) {
    onChange();
  }
});

figma.ui.onmessage = async (params) => {
  console.log(params);
  if (params === "start") {
    allNodes = await onFindAllNodesCountPromise();
    figma.ui.postMessage({ newNodes: [], allNodes, hasUnsyncedData: false });

    isStarted = !isStarted;
    if (isStarted) {
      figma.notify("Started");
    }
  }
  if (params === "onsync") {
    let newNodes = await onFindAllNewNodesAndSendToUi();
    await onSyncDataToCloud(newNodes);
    clearTimeout(debouncer);
  }
  // await figma.clientStorage.setAsync("key", "valuezz");
  // const ok = await figma.clientStorage.getAsync("key");
  // console.log("ok", ok);
};
