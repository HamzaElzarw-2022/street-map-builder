import { useState, useEffect } from 'react'
import './App.css'
import Grid from './Grid.jsx'
import Ribbon from './Ribbon.jsx'
import { Stage, Layer, Circle, Line, Text} from 'react-konva';
import Node from './models/Node.js'
import Edge from './models/Edge.js'

const thick = 5;
const ribbonWidth = 250;


let nodesData= [
  new Node("A", 150, 150),
  new Node("B", 350, 350),
  new Node("C", 350, 350)
]
let edgesData= [
  new Edge("AB", nodesData[0], nodesData[1], 1),
  new Edge("BC", nodesData[1], nodesData[2], 2)
]

function App() {

  const [stagePos, setStagePos] = useState({ x: (window.innerWidth/2)+ribbonWidth/2, y: window.innerHeight/2 });
  const [nodes, setNodes] = useState(nodesData);
  const [edges, setEdges] = useState(edgesData);

  const handleDragMove = (e, node) => {
    node.x = Math.floor(e.target.x());
    node.y = Math.floor(e.target.y());

    setNodes((prev) => [...prev]);
  };
  
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

            {edges.map(edge => (<Line points={[edge.start.x, edge.start.y, edge.end.x, edge.end.y]} stroke="#AAB9C9" strokeWidth={thick * 2} key={edge.id}/>))}
            {nodes.map(node => (<Circle x={node.x} y={node.y} radius={thick} fill="#7d7f82" key={node.id} draggable onDragMove={e => handleDragMove(e, node)}/>))}

          </Layer>
        </Stage>
      </div>
      <Ribbon ribbonWidth={ribbonWidth}/>
    </>
  );
}

export default App
