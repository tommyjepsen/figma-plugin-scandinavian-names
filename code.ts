let allNodes: any[] = [];
let isStarted = false;
var debouncer: any = null;
let token: string = "invalid";

figma.showUI(__html__, { width: 350, height: 600 });

function onFindAllNodesCountPromise() {
  return new Promise<any[]>((resolve) => {
    let totalAmount = 0;
    const nodes: any[] = [];
    function visit(node: any) {
      var singleNode = nodes.find((n) => n.type === node.type);
      totalAmount += 1;
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
    nodes.push({
      type: "TOTAL",
      amount: totalAmount,
    });
    resolve(nodes);
  });
}
function onFindAllNewNodes(nodes: any[]) {
  return new Promise<any[]>((resolve) => {
    nodes.map((node) => {
      const nodePrev = allNodes.find((n) => n.type === node.type);
      if (nodePrev) {
        node.amount = node.amount - nodePrev.amount;
        if (node.amount < 0) {
          node.amount = 0;
        }
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
  }, 10000);
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

//Create
const onUserCreateAcc = async (
  email: string,
  password: string,
  companyName: string
) => {
  const fe = await fetch("http://localhost:5555/v1/users/create", {
    method: "POST",
    body: JSON.stringify({ email, password, companyName }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await fe.json();
  console.log("data", data);

  await figma.clientStorage.setAsync("data", data);
  await figma.clientStorage.setAsync("token", data.token);
  await figma.clientStorage.setAsync("companyId", data.company.id);
  return data;
};

//Create
const onSignIn = async (email: string, password: string) => {
  const fe = await fetch("http://localhost:5555/v1/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await fe.json();
  console.log("data", data);

  await figma.clientStorage.setAsync("data", data);
  await figma.clientStorage.setAsync("token", data.token);
  await figma.clientStorage.setAsync("companyId", data.company.id);
  return data;
};

//Sign out
const onSignOut = async () => {
  await figma.clientStorage.deleteAsync("data");
  await figma.clientStorage.deleteAsync("token");
  await figma.clientStorage.deleteAsync("companyId");
  figma.notify("Signed out!");
  figma.ui.postMessage({ token: "invalid" });
};

figma.on("documentchange", async () => {
  if (isStarted) {
    onChange();
  }
});

figma.ui.onmessage = async (params) => {
  console.log(params);
  if (params.msg === "start") {
    allNodes = await onFindAllNodesCountPromise();
    figma.ui.postMessage({ newNodes: [], allNodes, hasUnsyncedData: false });

    isStarted = !isStarted;
    if (isStarted) {
      figma.notify("Started");
    }
  }
  if (params.msg === "onsync") {
    let newNodes = await onFindAllNewNodesAndSendToUi();
    await onSyncDataToCloud(newNodes);
    clearTimeout(debouncer);
  }
  if (params.msg === "sign_out") {
    await onSignOut();
  }

  if (params.msg === "create_account") {
    console.log("create_account");
    const userData = await onUserCreateAcc(
      params.email,
      params.password,
      params.companyName
    );
    token = await figma.clientStorage.getAsync("token");
    if (token) {
      figma.ui.postMessage({ token });
    }
    figma.notify("Your account has been created");
  }
  if (params.msg === "sign_in") {
    console.log("signin");
    await onSignIn(params.email, params.password);
    token = await figma.clientStorage.getAsync("token");
    if (token) {
      figma.ui.postMessage({ token });
    }
    figma.notify("Your are now signed in");
  }
  if (params.msg === "get_user_data") {
    token = await figma.clientStorage.getAsync("token");
    console.log(token);
    figma.ui.postMessage({ token });
  }
};
