import PropertyInputField from "./PropertyInputField.jsx";
import Node from "../../models/Node.js";
import {useEffect, useState} from "react";
import Edge from "../../models/Edge.js";
import {getNextEdgeId, getNextMessageId, getNextNodeId} from "../../data/mockData.js";

function AddEdge({nodes, node, setEdges, setNodes, pendingRef, setPendingRef, equalsPendingRef, reference, setMessages }) {

  const [pendingCOORDINATE, setPendingCOORDINATE] = useState(false);

  useEffect(() => {

    if(equalsPendingRef("connectWith") && reference.type === "NODE") {
      const otherNode = nodes.filter(node => node.id === reference.id)[0];
      const nextEdgeId = getNextEdgeId();
      const newEdge = new Edge(nextEdgeId, "connection_"+nextEdgeId, node, otherNode);

      setEdges(prev => [...prev, newEdge]);
    } else if(pendingCOORDINATE && equalsPendingRef("COORDINATE")) {

      const coordinates = reference.id;
      const nextNodeId = getNextNodeId();
      const otherNode = new Node(nextNodeId, "intersection_"+nextNodeId, coordinates.x, coordinates.y);
      setNodes(prev => [...prev, otherNode]);

      const nextEdgeId = getNextEdgeId();
      const newEdge = new Edge(nextEdgeId, "connection_"+nextEdgeId, node, otherNode);
      setEdges(prev => [...prev, newEdge]);

      setPendingCOORDINATE(false);
    }
  }, [reference]);

  return(
    <div className={"flex pt-1 mt-1 items-center h-7"}>
      <div className="flex-auto basis-2/3">Connect with:</div>
      <button className="cursor-pointer flex-auto basis-2/3 rounded-sm pl-0.5 h-full bg-gray-500 mr-1"
              onClick={() => setPendingRef("connectWith")}>
        {(pendingRef==="connectWith") ? "waiting selection" : "node" }
      </button>
      <button className="cursor-pointer flex-auto basis-2/3 rounded-sm pl-0.5 h-full bg-gray-500"
              onClick={() => {
                setPendingRef("COORDINATE");
                setPendingCOORDINATE(true);
              }}>
        {(pendingRef==="COORDINATE" && pendingCOORDINATE) ? "waiting selection" : "new node" }
      </button>
    </div>
  );
}

export default AddEdge;