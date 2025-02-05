import NodeDetails from "./NodeDetails.jsx";
import EdgeDetails from "./EdgeDetails.jsx";
import NodeEdges from "./NodeEdges.jsx";
import {getNextMessageId, getNextNodeId} from "../../data/mockData.js";
import Node from "../../models/Node.js";
import AddEdge from "./AddEdge.jsx";
import {Plus} from "lucide-react";

function SidePanel({nodes, setNodes, selected, setSelected, edges, setEdges, panelWidth, setPanelWidth,
                   pendingRef, setPendingRef, equalsPendingRef, reference, setMessages, getCanvasCenter }) {

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  const handleMouseMove = (e) => {
    const minWidth = 200;  // Minimum panel width
    const maxWidth = 800;  // Maximum panel width
    const newWidth = Math.min(Math.max(e.clientX, minWidth), maxWidth);
    setPanelWidth(newWidth);
  };
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  const createNode = () => {

    const screenCenter = getCanvasCenter();
    const nextId = getNextNodeId();
    const newNode = new Node(nextId, "intersection_"+nextId, screenCenter.x, screenCenter.y);

    setNodes(prev => [...prev, newNode]);
    setSelected({type: "NODE", id: newNode.id});
    setMessages(prev => [...prev, { id: getNextMessageId(), type: "info", text: "Intersection added at the center. Edit its location in the side panel." }]);
  }

  return (
    <div style={{width: panelWidth}} className={"z-10 standard-font rounded-br-2xl rounded-tr-2xl border-r-1  border-neutral-700 fixed bottom-0 top-12 left-0 bg-neutral-950 overflow-x-hidden overflow-y-auto"}>
      <div className={"max-w-full flex m-2.5"}>
        <button className={"flex-auto cursor-pointer h-7 rounded-md bg-blue-950 hover:bg-indigo-900 gap-1 justify-center flex items-center"} onClick={createNode}>
          <Plus size={19} strokeWidth={3} />add intersection
        </button>
      </div>


      {selected.type === "NODE" && nodes.filter(node => node.id === selected.id).map(node =>
        <NodeDetails node={node} setNodes={setNodes} setEdges={setEdges}>
          <NodeEdges node={node}
                     edges={edges}
                     setSelected={setSelected}
          />
          <AddEdge  node={node}
                    nodes={nodes}
                    setEdges={setEdges}
                    setNodes={setNodes}
                    setPendingRef={setPendingRef}
                    equalsPendingRef={equalsPendingRef}
                    reference={reference}
                    setMessages={setMessages}
                    setSelected={setSelected}
          />
        </NodeDetails>
      )}

      {(selected.type === "EDGE") &&
        <EdgeDetails edge={edges.filter(edge => edge.id === selected.id)[0]}
                     nodes={nodes}
                     setEdges={setEdges}
                     selected={selected}
                     setSelected={setSelected}
                     pendingRef={pendingRef}
                     setPendingRef={setPendingRef}
                     equalsPendingRef={equalsPendingRef}
                     reference={reference}
        />
      }

      {(!selected.type) &&
        <div className={"m-2.5 p-2.5 border-1 rounded-md border-neutral-700 text-center"}>Select a node or edge to see details</div>}

      {/* Resize Handle */}
      <div className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize z-10 hover:bg-blue-500 transition-colors" onMouseDown={handleMouseDown}/>
    </div>
  )
}

export default SidePanel;