import Node from "../../models/Node.js";
import {useEffect, useState} from "react";
import Edge from "../../models/Edge.js";
import {getNextEdgeId, getNextMessageId, getNextNodeId} from "../../data/mockData.js";
import { X, Plus } from "lucide-react";

function AddEdge({ nodes, node, setEdges, setNodes, setPendingRef, equalsPendingRef, reference, setMessages, setSelected }) {

  const [selecting, setSelecting] = useState(false);

  useEffect(() => {

    if(selecting && equalsPendingRef("connectWith") && reference.type === "NODE") {
      if(reference.id === node.id) {
        setMessages(prev => [...prev, { id: getNextMessageId(), type: "error", text: "Selected node cannot be same!" }]);
        setSelecting(false);
        return;
      }
      const otherNode = nodes.filter(node => node.id === reference.id)[0];
      const nextEdgeId = getNextEdgeId();
      const newEdge = new Edge(nextEdgeId, "connection_"+nextEdgeId, node, otherNode, 0);

      setEdges(prev => [...prev, newEdge]);
      setSelected({type: "EDGE", id: nextEdgeId});

    } else if(selecting && equalsPendingRef("COORDINATE")) {
      if(reference.type !== "COORDINATE") {
        setMessages(prev => [...prev, { id: getNextMessageId(), type: "error", text: "point can't be on an element! please point on an empty space." }]);
        setSelecting(false);
        return;
      }

      const coordinates = reference.id; //TODO: update reference (id to be generalized)
      const nextNodeId = getNextNodeId();
      const otherNode = new Node(nextNodeId, "intersection_"+nextNodeId, coordinates.x, coordinates.y);
      setNodes(prev => [...prev, otherNode]);

      const nextEdgeId = getNextEdgeId();
      const newEdge = new Edge(nextEdgeId, "connection_"+nextEdgeId, node, otherNode, 0);
      setEdges(prev => [...prev, newEdge]);

      setSelected({type: "NODE", id: nextNodeId});
    }
    setSelecting(false);
  }, [reference]);

  return(
    <div className={"flex pt-1 mt-1 items-center min-h-7"}>
      { (!selecting) ?
        <>
          {/*<div className="flex-auto ">Connect with:</div>*/}
          <button className="flex gap-1 items-center justify-center cursor-pointer flex-auto rounded-sm pl-0.5 h-7 bg-blue-950 hover:bg-indigo-900 mr-1"
                  onClick={() => {
                    setPendingRef("connectWith");
                    setSelecting(true);
                  }}>
            <Plus size={19} strokeWidth={3} />Street
          </button>
          <button className="flex gap-1 items-center justify-center cursor-pointer flex-auto rounded-sm pl-0.5 h-7 bg-blue-950 hover:bg-indigo-900"
                  onClick={() => {
                    setPendingRef("COORDINATE");
                    setSelecting(true);
                  }}>
            <Plus size={19} strokeWidth={3} />Street & Intersection
          </button>
        </>
         :
        <>
          <div className="flex items-center justify-center flex-auto rounded-sm h-7 bg-blue-950 mr-1">
            select or point at canvas...
          </div>
          <div className="flex items-center cursor-pointer rounded-sm h-7 bg-red-500 px-1" onClick={() => {
            setSelecting(false);
            setPendingRef("NONE");
          }}>
            <X size={18} strokeWidth={3}/>
          </div>
        </>
      }

    </div>
  );
}

export default AddEdge;