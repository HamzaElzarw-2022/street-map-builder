import PropertyInputField from "./PropertyInputField.jsx";
import {Trash2} from "lucide-react";

function NodeDetails({ children, node, setNodes, setEdges }) {

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
  const removeNode = () => {
    setEdges(prev => prev.filter(edge => edge.start.id !== node.id && edge.end.id !== node.id));
    setNodes(prev => prev.filter(n => n.id !== node.id));
  }

  return (
    <div className={"m-2.5 p-2.5 border-1 rounded-md border-neutral-700"}>
      <div className={"flex items-center"}>
        <div className={"flex-auto"}>Intersection details:</div>
        <button className={"cursor-pointer"} onClick={removeNode}>
          <Trash2 size={18} color={"red"}/>
        </button>
      </div>
      <PropertyInputField label={"id"} type={"text"} value={node.id} disable/>
      <PropertyInputField label={"name"} type={"text"} value={node.name} onChange={e => {inputChange(e, "name")}} />
      <PropertyInputField label={"lat"} type={"number"} value={node.x} onChange={e => {inputChange(e, "x", true)}} />
      <PropertyInputField label={"long"} type={"number"} value={node.y} onChange={e => {inputChange(e, "y", true)}} />
      <div className={"border-t-1 border-neutral-700 pt-2.5 mt-1"}>Connected streets:</div>
      {children[0]}
      {children[1]}
    </div>
  );
}

export default NodeDetails;