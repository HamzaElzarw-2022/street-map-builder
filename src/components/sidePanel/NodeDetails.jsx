import PropertyInputField from "./PropertyInputField.jsx";
import NodeEdges from "./NodeEdges.jsx";
import EdgeForm from "./EdgeForm.jsx";

function NodeDetails({ node, nodes, setNodes, edges, setEdges, setSelected, selected, pendingRef, setPendingRef, equalsPendingRef, reference, setMessages }) {

  /**
   * @param {MouseEvent} e
   * @param {String} attribute
   * @param {boolean} isNumber
   */
  const inputChange = (e, attribute, isNumber = false) => {
    const value = isNumber? parseInt(e.target.value) || 0 : e.target.value;

    setNodes((prev) => prev.map(node => {
      if(node.id === selected.id)
        node[attribute] = value;
      return node;
    }));
  };

  return (
    <div className={"m-2.5 p-2.5 border-1 rounded-xl border-neutral-700"}>

      <div>Intersection selected</div>
      <PropertyInputField label={"id"} type={"text"} value={node.id} disable/>
      <PropertyInputField label={"name"} type={"text"} value={node.name} onChange={e => {inputChange(e, "name")}} />
      <PropertyInputField label={"lat"} type={"number"} value={node.x} onChange={e => {inputChange(e, "x", true)}} />
      <PropertyInputField label={"long"} type={"number"} value={node.y} onChange={e => {inputChange(e, "y", true)}} />
      <div className={"border-t-1 border-neutral-700 pt-2.5 mt-1"}>Streets connected:</div>
      <NodeEdges edges={edges} node={node} setSelected={setSelected} />

      {(selected.type === "ADD EDGE")?
        <EdgeForm nodes={nodes} node={node} setEdges={setEdges} setSelected={setSelected}
                  pendingRef={pendingRef} setPendingRef={setPendingRef}
                  equalsPendingRef={equalsPendingRef} reference={reference} setMessages={setMessages}/>
        :
        <div className={"cursor-pointer border-1 rounded-xl border-neutral-700 mt-2.5 bg-gray-900 text-center p-1"}
             onClick={() => setSelected({...selected, type: "ADD EDGE"})}>
          Add street
        </div>
      }
    </div>
  );
}

export default NodeDetails;