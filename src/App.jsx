import { useState, useEffect } from 'react'
import './App.css'
import Grid from './Grid.jsx'
import Ribbon from './Ribbon.jsx'
import { Stage, Layer, Circle, Line, Text} from 'react-konva';
import Node from './models/Node.js'
import Edge from './models/Edge.js'

const thick = 5;
const ribbonWidth = 250;
const selectColor = "#5a728d";
const edgeColor = "#AAB9C9";
const nodeColor = "#7d7f82";


let nodesData= [
  new Node("A", 50, -50),
  new Node("B", 50, 100),
  new Node("C", -50, 100)
]
let edgesData= [
  new Edge("AB", nodesData[0], nodesData[1], 1),
  new Edge("BC", nodesData[1], nodesData[2], 2)
]

function App() {

  const [stagePos, setStagePos] = useState({ x: (window.innerWidth/2)+ribbonWidth/2, y: window.innerHeight/2 });
  const [nodes, setNodes] = useState(nodesData);
  const [edges, setEdges] = useState(edgesData);
  const [selected, setSelected] = useState(new Selection("NONE", null, null));

  const handleDragMove = (e, node) => {
    node.x = Math.floor(e.target.x());
    node.y = Math.floor(e.target.y());
    setNodes((prev) => [...prev]);
  };
  const selectElement = (type, e, element) => {
    deselectCurrent();

    if (type === "NODE") {
      e.target.fill(selectColor);
    } else if (type === "EDGE") {
      e.target.stroke(selectColor);
    }

    setSelected(new Selection(type, e.target, element));
  };
  const deselectCurrent = () => {
    if(selected.type === "NODE")
      selected.target.fill(nodeColor);
    else if(selected.type === "EDGE")
      selected.target.stroke(edgeColor);
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
          <Grid stagePos={stagePos} />
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
        </Stage>
      </div>
      <Ribbon
        ribbonWidth={ribbonWidth}
        nodes={nodes}
        setNodes={setNodes}
        selected={selected}
        setSelected={setSelected}
        edges={edges}
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
