import NodeDetails from "./NodeDetails.jsx";
import EdgeDetails from "./EdgeDetails.jsx";
import NodeForm from "./NodeForm.jsx";
import EdgeForm from "./EdgeForm.jsx";
import NodeEdges from "./NodeEdges.jsx";

function SidePanel({nodes, setNodes, selected, setSelected, edges, setEdges, panelWidth, setPanelWidth,
                   pendingRef, setPendingRef, equalsPendingRef, reference, setMessages }) {

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

  return (
    <div style={{width: panelWidth}} className={"standard-font rounded-br-2xl rounded-tr-2xl border-r-1 border-r-neutral-700 h-full fixed top-0 left-0 bg-neutral-950 overflow-x-hidden overflow-y-auto"}>

      {(selected.type === "ADD NODE")?
        <NodeForm setSelected={setSelected} setNodes={setNodes} setMessages={setMessages} /> :
        <div className={"cursor-pointer m-2.5 p-1 border-1 rounded-xl border-neutral-700 bg-gray-900 text-center"}
             onClick={() => setSelected({type: "ADD NODE", id: null})}>
          add intersection
        </div>}

      {selected.type === "NODE" && nodes.filter(node => node.id === selected.id).map(node =>
        <NodeDetails node={node} setNodes={setNodes}>
          <NodeEdges node={node}
                     edges={edges}
                     setSelected={setSelected}
          />
          <EdgeForm node={node}
                    nodes={nodes}
                    setEdges={setEdges}
                    pendingRef={pendingRef}
                    setPendingRef={setPendingRef}
                    equalsPendingRef={equalsPendingRef}
                    reference={reference}
                    setMessages={setMessages}
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
        <div className={"m-2.5 p-2.5 border-1 rounded-xl border-neutral-700 text-center"}>Select a node or edge to see details</div>}

      {/* Resize Handle */}
      <div className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize z-10 hover:bg-blue-500 transition-colors" onMouseDown={handleMouseDown}/>
    </div>
  )
}

export default SidePanel;