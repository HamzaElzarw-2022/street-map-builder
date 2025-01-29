import PropertyInputField from "./PropertyInputField.jsx";
import Node from "../../models/Node.js";
import {useEffect, useState} from "react";
import Edge from "../../models/Edge.js";
import { getNextEdgeId } from "../../data/mockData.js";

function EdgeForm({nodes, node=null, setEdges, setSelected, pendingRef, setPendingRef, equalsPendingRef, reference, setMessages }) {

  const [newEdge, setNewEdge] = useState(new Edge(getNextEdgeId(), "", node, null));

  useEffect(() => {

    if(equalsPendingRef("newEdgeEnd") && reference.type === "NODE") {
      let node = nodes.filter(node => node.id === reference.id)[0];
      setNewEdge(newEdge.setEnd(node));
    }
  }, [reference]);

  const createEdge = () => {
    if (!(newEdge instanceof Edge)) {
      console.log("newEdge is not an edge, can not create");
      return;
    } else if(!newEdge.end) {
      setMessages(prev => [...prev, { id: 5, type: "error", text: "select end intersection before creating!" }]);
      return;
    }

    setEdges(prev => [...prev, newEdge]);
    setSelected(prev => ({...prev, type: "NODE"})); //it changes ADD EDGE to NODE remove after implementing status
    //TODO: validate Edge enteries
    //TODO: implement alert, error UI
  }

  return(
    <div className={"bg-gray-900 border-1 rounded-xl border-neutral-700  mt-2 p-2"}>
      <div>new street</div>
      <PropertyInputField label={"name"} type={"text"} value={newEdge.name || ""} onChange={e => {setNewEdge(newEdge.setName(e.target.value))}}/>
      <PropertyInputField label={"start"} type={"text"} value={newEdge.start.name} disable/>
      <div className="flex border-t-1 border-neutral-700 pt-1 mt-1 items-center h-7">
        <div className="flex-auto basis-1/3 flex items-center">end:</div>
        <div className="flex-auto basis-2/3 flex items-center max-w-2/3 pl-1.5">
          <div className="flex-auto mr-2.5">{(newEdge.end instanceof Node) ? newEdge.end.name : ""}</div>
          <button className="pr-1 pl-1 cursor-pointer text-center bg-gray-500 rounded-sm" onClick={() => setPendingRef("newEdgeEnd")}>
            {(pendingRef==="newEdgeEnd") ? "waiting selection" : "select" }
          </button>
        </div>
      </div>

      <button className={"mt-2 cursor-pointer text-center w-full bg-gray-500 rounded-sm h-7"} onClick={() => createEdge(newEdge)}>Create Street</button>
    </div> //TODO: implement faster edge creation just after entering end point
  );
}

export default EdgeForm;