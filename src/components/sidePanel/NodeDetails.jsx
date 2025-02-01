import PropertyInputField from "./PropertyInputField.jsx";

function NodeDetails({ children, node, setNodes }) {

  /**
   * @param {MouseEvent} e
   * @param {String} attribute
   * @param {boolean} isNumber
   */
  const inputChange = (e, attribute, isNumber = false) => {
    const value = isNumber? parseInt(e.target.value) || 0 : e.target.value;

    setNodes((prev) => prev.map(n => {
      if(n.id === node.id)
        n[attribute] = value;
      return n;
    }));
  };

  return (
    <div className={"m-2.5 p-2.5 border-1 rounded-md border-neutral-700"}>
      <div>Intersection selected</div>
      <PropertyInputField label={"id"} type={"text"} value={node.id} disable/>
      <PropertyInputField label={"name"} type={"text"} value={node.name} onChange={e => {inputChange(e, "name")}} />
      <PropertyInputField label={"lat"} type={"number"} value={node.x} onChange={e => {inputChange(e, "x", true)}} />
      <PropertyInputField label={"long"} type={"number"} value={node.y} onChange={e => {inputChange(e, "y", true)}} />
      <div className={"border-t-1 border-neutral-700 pt-2.5 mt-1"}>Streets connected:</div>
      {children[0]}
      {children[1]}
    </div>
  );
}

export default NodeDetails;