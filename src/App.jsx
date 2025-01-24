import { useState } from 'react'
import './App.css'
import Grid from './Grid.jsx'
import Ribbon from './Ribbon.jsx'
import { Stage, Layer, Circle, Line } from 'react-konva';
import Node from './models/Node.js'
import Edge from './models/Edge.js'

const thick = 5;
const ribbonWidth = 300;
const selectColor = "#5a728d";
const edgeColor = "#AAB9C9";
const nodeColor = "#7d7f82";
const startColor = "#acff95"; // Cyan
const endColor = "#5a728d";  // Yellow


let nodesData= [
  new Node("A", "intersection1", 50, -50),
  new Node("B", "intersection2", 50, 100),
  new Node("C", "intersection3", -50, 100)
]
let edgesData= [
  new Edge("AB", "millet", nodesData[0], nodesData[1], 1),
  new Edge("BC", "salah", nodesData[1], nodesData[2], 2)
]

function App() {

  const [stagePos, setStagePos] = useState({ x: (window.innerWidth/2)+ribbonWidth/2, y: window.innerHeight/2 });
  const [nodes, setNodes] = useState(nodesData);
  const [edges, setEdges] = useState(edgesData);
  //TODO: update selected as there is no need for selection object anymore
  const [selected, setSelected] = useState(new Selection("NONE", null, null));
  const [sideToChange, setSideToChange] = useState(null);

  const handleDragMove = (e, node) => {
    node.x = Math.floor(e.target.x());
    node.y = Math.floor(e.target.y());
    setNodes((prev) => [...prev]);
  };

  const selectElement = (type, e, element) => {
    if (sideToChange !== null && type === "NODE" && selected.type === "EDGE") {
      selected.element[sideToChange] = element;
      setSideToChange(null);
      return;
    }
    //TODO: if side change is not null but type is not node (show message for incompatible selection)
    setSideToChange(null);
    setSelected(new Selection(type, e.target, element));
  };

  const deselectCurrent = () => {
    setSideToChange(null);
    setSelected(new Selection("NONE", null, null));
  }
  
  return (
    <>
      <div className={"container"}>
        <Stage
          x={stagePos.x}
          y={stagePos.y}
          width={window.innerWidth}
          height={window.innerHeight}
          draggable
          scaleX={1}
          scaleY={1}
          onDragEnd={e => {
            setStagePos(e.currentTarget.position());
          }}>

          {/* background grid layer */}
          <Grid stagePos={stagePos} deselectCurrent={deselectCurrent}/>

          {/* map elements layer */}
          <Layer>
            {edges.map(edge => (
              <Line
                points={[edge.start.x, edge.start.y, edge.end.x, edge.end.y]}
                stroke={edgeColor}
                strokeWidth={thick * 2}
                key={edge.id}
                onClick={e => selectElement("EDGE", e, edge)}
              />))
            }

            {nodes.map(node => (
              <Circle
                x={node.x} y={node.y}
                radius={thick}
                fill={nodeColor}
                key={node.id}
                draggable
                onDragMove={e => handleDragMove(e, node)}
                onClick={e => selectElement("NODE", e, node)}
                onDragStart={e => selectElement("NODE", e, node)}
              />))
            }
          </Layer>

          {/* highlight selected element layer */}
          <Layer listening={false} >
            {selected.type === "NODE" && (
              <Circle x={selected.element.x} y={selected.element.y} radius={thick} fill={selectColor}/>
            )}
            {selected.type === "EDGE" && (
              <>
                <Line points={[selected.element.start.x, selected.element.start.y, selected.element.end.x, selected.element.end.y]} stroke={selectColor} strokeWidth={thick * 2}/>
                <Circle x={selected.element.start.x} y={selected.element.start.y} radius={thick} fill={startColor}/>
                <Circle x={selected.element.end.x} y={selected.element.end.y} radius={thick} fill={endColor}/>
              </>
            )}
          </Layer>

        </Stage>
      </div>
      <Ribbon
        ribbonWidth={ribbonWidth}
        nodes={nodes}
        setNodes={setNodes}
        selected={selected}
        setSelected={setSelected}
        edges={edges}
        setSideToChange={setSideToChange}
        sideToChange={sideToChange}
      />
    </>
  );
}

class Selection {
  constructor(type, target, element) {
    this.type = type;
    this.target = target;
    this.element = element;
  }
}

export default App
