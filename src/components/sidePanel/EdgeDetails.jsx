import {endColor, startColor} from "../../data/constants.js";
import {useEffect} from "react";
import PropertyInputField from "./PropertyInputField.jsx";
import {Trash2, Repeat} from "lucide-react";

function EdgeDetails({nodes, edge, setEdges, selected, setSelected, equalsPendingRef, pendingRef, setPendingRef, reference}) {

  useEffect(() => {
    if(reference.type === "EDGE") return;

    if(equalsPendingRef("end"))
      setEdges((prev) => prev.map(edge => (edge.id === selected.id) ? edge.setEnd(nodes.filter(node => node.id === reference.id)[0]) : edge ));
    else if(equalsPendingRef("start"))
      setEdges((prev) => prev.map(edge => (edge.id === selected.id) ? edge.setStart(nodes.filter(node => node.id === reference.id)[0]) : edge ));

  }, [reference]);

  /**
   * @param {MouseEvent} e
   * @param {String} attribute
   * @param {boolean} isNumber
   */
  const inputChange = (e, attribute, isNumber=false) => {

    const value = isNumber? parseInt(e.target.value) || 0 : e.target.value;
    setEdges((prev) => prev.map(edge => {
      if(edge.id === selected.id)
        edge[attribute] = value;
      return edge;
    }));
  }
  const removeEdge = () => {
    setSelected({type: null, id: null});
    setEdges(prev => prev.filter(e => e.id !== edge.id ));
  }
  const flipEdgeSides = () => {
    setEdges(prev => prev.map(e => (e.id === edge.id)? e.flipSides(): e));
  }

  return (
    <div className={"m-2.5 p-2.5 border-1 rounded-md border-neutral-700"}>
      <div className={"flex items-center gap-2"}>
        <div className={"flex-auto"}>Street selected:</div>
        <button className={"cursor-pointer"} onClick={flipEdgeSides}>
          <Repeat size={18} color={"blue"} />
        </button>
        <button className={"cursor-pointer"} onClick={removeEdge}>
          <Trash2 size={18} color={"red"}/>
        </button>
      </div>
      <PropertyInputField label={"id"} type={"text"} value={edge.id} disable />
      <PropertyInputField label={"name"} type={"text"} value={edge.name} onChange={e => {inputChange(e, "name")}} />

      {/*TODO: resolve duplicates and fix overflow of text when selecting*/}
      <div className="flex border-t-1 border-neutral-700 pt-1 mt-1 items-center h-7">
        <div className="flex-auto basis-1/3 flex items-center">
          <div className="w-3.5 h-3.5 rounded-4xl mr-1.5" style={{backgroundColor: startColor}}></div>start:
        </div>
        <div className="flex-auto basis-2/3 flex items-center max-w-2/3 pl-1.5">
          <div className="flex-auto cursor-pointer text-blue-400 underline mr-2.5" onClick={() => setSelected({type: "NODE", id: edge.start.id})}>{edge.start.name}</div>
          <button className="px-2 cursor-pointer text-center bg-blue-950 hover:bg-indigo-900 rounded-sm" onClick={() => setPendingRef("start")} >
            {(pendingRef==="start") ? "waiting selection" : "update" }
          </button>
        </div>
      </div>

      <div className="flex border-t-1 border-neutral-700 pt-1 mt-1 items-center h-7">
        <div className="flex-auto basis-1/3 flex items-center">
          <div className="w-3.5 h-3.5 rounded-4xl mr-1.5" style={{backgroundColor: endColor}}></div> end:
        </div>
        <div className="flex-auto basis-2/3 flex items-center max-w-2/3 pl-1.5">
          <div className="flex-auto cursor-pointer text-blue-400 underline mr-2.5" onClick={() => setSelected({type: "NODE", id: edge.end.id})}>{edge.end.name}</div>
          <button className="px-2 cursor-pointer text-center bg-blue-950 hover:bg-indigo-900 rounded-sm" onClick={() => setPendingRef("end")} >
            {(pendingRef==="end") ? "waiting selection" : "update" }
          </button>
        </div>
      </div>
    </div>
  );
}

export default EdgeDetails;