import {endColor, startColor} from "../../data/constants.js";
import {useEffect} from "react";
import PropertyInputField from "./PropertyInputField.jsx";

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

  return (
    <div className={"m-2.5 p-2.5 border-1 rounded-xl border-neutral-700"}>
      <div>Street selected</div>
      <PropertyInputField label={"id"} type={"text"} value={edge.id} disable />
      <PropertyInputField label={"name"} type={"text"} value={edge.name} onChange={e => {inputChange(e, "name")}} />

      {/*TODO: resolve duplicates and fix overflow of text when selecting*/}
      <div className="flex border-t-1 border-neutral-700 pt-1 mt-1 items-center h-7">
        <div className="flex-auto basis-1/3 flex items-center">
          <div className="w-3.5 h-3.5 rounded-4xl mr-1.5" style={{backgroundColor: startColor}}></div>start:
        </div>
        <div className="flex-auto basis-2/3 flex items-center max-w-2/3 pl-1.5">
          <div className="flex-auto cursor-pointer text-blue-400 underline mr-2.5" onClick={() => setSelected({type: "NODE", id: edge.start.id})}>{edge.start.name}</div>
          <button className="pr-1 pl-1 cursor-pointer text-center bg-gray-500 rounded-sm" onClick={() => setPendingRef("start")} >
            {(pendingRef==="start") ? "waiting selection" : "select" }
          </button>
        </div>
      </div>

      <div className="flex border-t-1 border-neutral-700 pt-1 mt-1 items-center h-7">
        <div className="flex-auto basis-1/3 flex items-center">
          <div className="w-3.5 h-3.5 rounded-4xl mr-1.5" style={{backgroundColor: endColor}}></div> end:
        </div>
        <div className="flex-auto basis-2/3 flex items-center max-w-2/3 pl-1.5">
          <div className="flex-auto cursor-pointer text-blue-400 underline mr-2.5" onClick={() => setSelected({type: "NODE", id: edge.end.id})}>{edge.end.name}</div>
          <button className="pr-1 pl-1 cursor-pointer text-center bg-gray-500 rounded-sm" onClick={() => setPendingRef("end")} >
            {(pendingRef==="end") ? "waiting selection" : "select" }
          </button>
        </div>
      </div>
    </div>
  );
}

export default EdgeDetails;