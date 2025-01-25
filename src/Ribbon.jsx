import {startColor, endColor, getNextNodeId, getNextEdgeId} from "./App.jsx";
import {useState} from "react";

// TODO: refactor ribbon components
const SectionRow = ({ label, type, value, onChange }) => (
  <div className="section-row">
    <label className="section-row-item">{label}:</label>
    <input
      className="section-row-item section-row-input standard-font"
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

// TODO: no need for separate component
const EdgeConnected = ({ edge, setSelected }) => (
  <div className="ribbon-subsection">
    <div className="section-row">
      <div className="section-row-item">street name:</div>
      <div  className="section-row-item clickable-text margin-right-10" onClick={() => setSelected({type: "EDGE", id: edge.id})}>{edge.name}</div>
    </div>
    <div className="section-row">
      <div className="section-row-item">start inter:</div>
      <div className="section-row-item">{edge.start.name}</div>
    </div>
    <div className="section-row">
      <div className="section-row-item">end inter:</div>
      <div className="section-row-item">{edge.end.name}</div>
    </div>
  </div>
);

function Ribbon({ribbonWidth, nodes, setNodes, selected, setSelected, edges, setEdges, setSideToChange, sideToChange}) {

  const [newNode, setNewNode] = useState({name: "", x: 0, y: 0});

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

  return (
      <div className={"ribbon standard-font"} style={{width: ribbonWidth}}>

        {(selected.type === "ADD NODE")?
          <div className={"ribbon-section blue-background"}>
            <div className={"section-row"}>new intersection</div>
            <SectionRow label={"name"} type={"text"} value={newNode.name || ""}
                        onChange={e => setNewNode({...newNode, name: e.target.value})}/>
            <SectionRow label={"lat"} type={"number"} value={newNode.x || ""}
                        onChange={e => setNewNode({...newNode, x: parseInt(e.target.value) || 0})}/>
            <SectionRow label={"long"} type={"number"} value={newNode.y || ""}
                        onChange={e => setNewNode({...newNode, y: parseInt(e.target.value) || 0})}/>
            <button className={"pointer center full-width"} onClick={createNode}>Create Intersection</button>
          </div>
          : <div className={"pointer ribbon-section blue-background center font-size-2"} onClick={() => {
            setSelected({type: "ADD NODE", id: null});
            setNewNode({name: "", x: 0, y: 0});
          }}>add intersection</div>
        }


        {(selected.type === "NODE") && nodes.filter(node => node.id === selected.id).map(node =>
          <div className={"ribbon-section"}>
            <div className={"section-row"}>Intersection selected</div>
            <div className="section-row">
              <div className="section-row-item">id:</div>
              <div className="section-row-item">{node.id}</div>
            </div>
            <SectionRow label={"name"} type={"text"} value={node.name} onChange={e => {inputChange(e, "name")}} />
            <SectionRow label={"lat"} type={"number"} value={node.x} onChange={e => {inputChange(e, "x", true)}} />
            <SectionRow label={"long"} type={"number"} value={node.y} onChange={e => {inputChange(e, "y", true)}} />

            <div className={"section-row margin-top-10"}>Streets connected</div>
            {edges.filter(edge => (edge.start.id === node.id) || (edge.end.id === node.id)).map(edge => 
              <EdgeConnected edge={edge} setSelected={setSelected}/>
            )}
            {/*TODO: add add new street functionality*/}
            <div className={"ribbon-subsection blue-background center font-size-2"}>Add new street</div>
          </div>
        )}

        {(selected.type === "EDGE") && edges.filter(edge => edge.id === selected.id).map(edge =>
          <div className={"ribbon-section"}>
            <div className={"section-row"}>Street selected</div>
            <div className="section-row">
              <div className="section-row-item">id:</div>
              <div className="section-row-item">{edge.id}</div>
            </div>
            <SectionRow label={"name"} type={"text"} value={edge.name} onChange={e => {inputChange(e, "name")}} />

            {/*TODO: resolve duplicates*/}
            <div className="section-row">
              <div className="section-row-item">start:</div>
              <div className="circle" style={{backgroundColor: startColor}}></div>
              <div className="section-row-item clickable-text margin-right-10" onClick={() => setSelected({type: "NODE", id: edge.start.id})}>{edge.start.name}</div>
              <button className="section-row-button" onClick={() => setSideToChange("start")} >
                {(sideToChange === "start") ? "select node" : "change" }
              </button>
            </div>
            <div className="section-row">
              <div className="section-row-item">end:</div>
              <div className="circle" style={{backgroundColor: endColor}}></div>
              <div className="section-row-item clickable-text margin-right-10" onClick={() => setSelected({type: "NODE", id: edge.end.id})}>{edge.end.name}</div>
              <button className="section-row-button" onClick={() => setSideToChange("end")} >
                {(sideToChange === "end") ? "select node" : "change" }
              </button>
            </div>

          </div>
        )}

        {(!selected.type) && (
          <div className={"ribbon-section center"}>Select a node or edge to see details</div>
        )}
      </div>
  )
}

export default Ribbon;