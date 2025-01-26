import {startColor, endColor, getNextNodeId, getNextEdgeId} from "./App.jsx";
import {useEffect, useState} from "react";
import Edge from "./models/Edge.js";
import Node from "./models/Node.js";

// TODO: refactor ribbon components
const SectionRow = ({ label, type, value, onChange = () => {}, disable }) => (
  <div className="flex border-t-1 border-neutral-700 pt-1 mt-1 items-center h-7">
    <label className="flex-auto basis-1/3">{label}:</label>
    <input
      className={"flex-auto basis-2/3  rounded-sm pl-1.5 h-full max-w-2/3 " + (disable ? "bg-gray-950" : "bg-gray-800")}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disable}
    />
  </div>
);

// TODO: no need for separate component
const EdgeConnected = ({ edge, setSelected }) => (
  <div className="border-1 rounded-xl border-neutral-700 mt-2 p-2">
    <div className="flex items-center">
      <div className="flex-auto basis-1/3">name:</div>
      <div  className="flex-auto basis-2/3 pl-1.5 max-w-2/3 cursor-pointer text-blue-400 underline margin-right-10" onClick={() => setSelected({type: "EDGE", id: edge.id})}>{edge.name}</div>
    </div>
    <div className="flex border-t-1 border-neutral-700 pt-1 mt-1 items-center h-7">
      <div className="flex-auto basis-1/3">start:</div>
      <div className="flex-auto basis-2/3 pl-1.5 max-w-2/3">{edge.start.name}</div>
    </div>
    <div className="flex border-t-1 border-neutral-700 pt-1 mt-1 items-center h-7">
      <div className="flex-auto basis-1/3">end:</div>
      <div className="flex-auto basis-2/3 pl-1.5 max-w-2/3">{edge.end.name}</div>
    </div>
    {/*<div className="flex border-t-1 border-neutral-700 pt-1 mt-2 items-center h-7">*/}
    {/*  <div className="">{edge.start.name}</div>*/}
    {/*  <div className="flex-auto basis-1/3 text-center text-3xl flex justify-center pb-2">&rarr;</div>*/}
    {/*  <div className="text-right">{edge.end.name}</div>*/}
    {/*</div>*/}
  </div>
);

function Ribbon({ribbonWidth, nodes, setNodes, selected, setSelected, edges, setEdges,
                   pendingRef, setPendingRef, equalsPendingRef, reference}) {

  // TODO: change to Node type
  const [newNode, setNewNode] = useState({name: "", x: 0, y: 0});
  const [newEdge, setNewEdge] = useState(null);

  useEffect(() => {
    if(reference.type === "EDGE") return;
    let node = nodes.filter(node => node.id === reference.id)[0];

    if(equalsPendingRef("newEdgeEnd"))
      setNewEdge(newEdge.setEnd(node));
    else if(equalsPendingRef("end"))
      setEdges((prev) => prev.map(edge => (edge.id === selected.id) ? edge.setEnd(node) : edge ));
    else if(equalsPendingRef("start"))
      setEdges((prev) => prev.map(edge => (edge.id === selected.id) ? edge.setStart(node) : edge ));

  }, [reference]);

  /**
   * @param {MouseEvent} e
   * @param {String} attribute
   * @param {boolean} isNumber
   */
  const inputChange = (e, attribute, isNumber=false) => {

    const value = isNumber? parseInt(e.target.value) || 0 : e.target.value;

    if(selected.type === "NODE") {
      setNodes((prev) => prev.map(node => {
        if(node.id === selected.id)
          node[attribute] = value;
        return node;
      }));
    }
    else if(selected.type === "EDGE") {
      setEdges((prev) => prev.map(edge => {
        if(edge.id === selected.id)
          edge[attribute] = value;
        return edge;
      }))
    }
  }

  const createNode = () => {
    if (newNode.name) {
      const id = getNextNodeId();
      setNodes(prev => [...prev, {id: id, ...newNode}]);
      setSelected({type: "NODE", id: id});
      setNewNode({name: "", x: 0, y: 0});
    }
  }

  const createEdge = () => {
    const id = getNextEdgeId();
    setEdges(prev => [...prev, new Edge(id, newEdge.name, newEdge.start, newEdge.end)]);
    setSelected({...selected, type: "NODE"});
    setNewEdge({name: "", start: -1, end: -1});

    //TODO: validate start and end can be the same
  }

  return (
    <div className={"standard-font rounded-br-2xl rounded-tr-2xl border-r-1 border-r-neutral-700 h-full fixed top-0 left-0 bg-neutral-950 overflow-x-hidden overflow-y-auto"} style={{width: ribbonWidth}}>

      {(selected.type === "ADD NODE")?
        <div className={"bg-gray-900 m-2.5 p-2.5 border-1 rounded-xl border-neutral-700"}>
          <div>new intersection</div>
          <SectionRow label={"name"} type={"text"} value={newNode.name || ""}
                      onChange={e => setNewNode({...newNode, name: e.target.value})}/>
          <SectionRow label={"lat"} type={"number"} value={newNode.x || ""}
                      onChange={e => setNewNode({...newNode, x: parseInt(e.target.value) || 0})}/>
          <SectionRow label={"long"} type={"number"} value={newNode.y || ""}
                      onChange={e => setNewNode({...newNode, y: parseInt(e.target.value) || 0})}/>
          <button className={"mt-2 cursor-pointer text-center w-full bg-gray-500 rounded-sm h-7"} onClick={createNode}>Create Intersection</button>
        </div>
      :
        <div className={"cursor-pointer m-2.5 p-1 border-1 rounded-xl border-neutral-700 bg-gray-900 text-center"}
          onClick={() => {
            setSelected({type: "ADD NODE", id: null});
            setNewNode({name: "", x: 0, y: 0});
          }}>
          add intersection
        </div>
      }

      {(selected.type === "NODE" || selected.type === "ADD EDGE") && nodes.filter(node => node.id === selected.id).map(node =>
        <div className={"m-2.5 p-2.5 border-1 rounded-xl border-neutral-700"}>
          <div>Intersection selected</div>
          <SectionRow label={"id"} type={"text"} value={node.id} disable/>
          <SectionRow label={"name"} type={"text"} value={node.name} onChange={e => {inputChange(e, "name")}} />
          <SectionRow label={"lat"} type={"number"} value={node.x} onChange={e => {inputChange(e, "x", true)}} />
          <SectionRow label={"long"} type={"number"} value={node.y} onChange={e => {inputChange(e, "y", true)}} />

          <div className={"border-t-1 border-neutral-700 pt-2.5 mt-1"}>Streets connected</div>
          {edges.filter(edge => (edge.start.id === node.id) || (edge.end.id === node.id)).map(edge =>
            <EdgeConnected edge={edge} setSelected={setSelected}/>
          )}
          {/*TODO: add add new street functionality*/}
          {(selected.type === "ADD EDGE")?
            <div className={"bg-gray-900 border-1 rounded-xl border-neutral-700  mt-2 p-2"}>
              <div>new street</div>
              <SectionRow label={"name"} type={"text"} value={newEdge.name || ""} onChange={e => {setNewEdge(newEdge.setName(e.target.value))}}/>
              <SectionRow label={"start"} type={"text"} value={newEdge.start.name} disable/>
              <div className="flex border-t-1 border-neutral-700 pt-1 mt-1 items-center h-7">
                <div className="flex-auto basis-1/3 flex items-center">end:</div>
                <div className="flex-auto basis-2/3 flex items-center max-w-2/3 pl-1.5">
                  <div className="flex-auto mr-2.5">{(newEdge.end instanceof Node) ? newEdge.end.name : ""}</div>
                  <button className="pr-1 pl-1 cursor-pointer text-center bg-gray-500 rounded-sm" onClick={() => setPendingRef("newEdgeEnd")}>
                    {(pendingRef==="newEdgeEnd") ? "waiting selection" : "select" }
                  </button>
                </div>
              </div>

              <button className={"mt-2 cursor-pointer text-center w-full bg-gray-500 rounded-sm h-7"} onClick={createEdge}>Create Street</button>
            </div>
          :
            <div className={"cursor-pointer border-1 rounded-xl border-neutral-700 mt-2.5 bg-gray-900 text-center p-1"}
              onClick={() => {
                setSelected({...selected, type: "ADD EDGE"});
                setNewEdge(new Edge(getNextEdgeId(), "", node, null));
              }}>
              Add street
            </div>
          }
        </div>
      )}

      {(selected.type === "EDGE") && edges.filter(edge => edge.id === selected.id).map(edge =>
        <div className={"m-2.5 p-2.5 border-1 rounded-xl border-neutral-700"}>
          <div>Street selected</div>
          <SectionRow label={"id"} type={"text"} value={edge.id} disable />
          <SectionRow label={"name"} type={"text"} value={edge.name} onChange={e => {inputChange(e, "name")}} />

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
      )}

      {(!selected.type) && (
        <div className={"m-2.5 p-2.5 border-1 rounded-xl border-neutral-700 text-center"}>Select a node or edge to see details</div>
      )}
    </div>
  )
}

export default Ribbon;