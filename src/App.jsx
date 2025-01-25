import { useState, useEffect } from 'react'
import './App.css'
import Grid from './Grid.jsx'
import Ribbon from './Ribbon.jsx'
import { Stage, Layer, Circle, Line } from 'react-konva';
import Node from './models/Node.js'
import Edge from './models/Edge.js'

const thick = 5;
const ribbonWidth = 300;
const selectedEdgeColor = "#5a728d";
const edgeColor = "#AAB9C9";
const nodeColor = "#7d7f82";
export const startColor = "#32552a"; // Cyan
export const endColor = "#222f39";  // Yellow

let nodeIdSequence = 10;
let edgeIdSequence = 10;
export const getNextNodeId = () => nodeIdSequence++;
export const getNextEdgeId = () => edgeIdSequence++;

let nodesData= [
  new Node(1, "intersection1", 50, -50),
  new Node(2, "intersection2", 50, 100),
  new Node(3, "intersection3", -50, 100),
  new Node(4, "intersection4", 100, 50)
]
let edgesData= [
  new Edge(1, "millet", nodesData[0], nodesData[1]),
  new Edge(2, "street", nodesData[1], nodesData[2]),
  new Edge(3, "Cadde 4", nodesData[1], nodesData[3])
]

function App() {

  const [stagePos, setStagePos] = useState({ x: (window.innerWidth/2)+ribbonWidth/2, y: window.innerHeight/2 });
  const [nodes, setNodes] = useState(nodesData);
  const [edges, setEdges] = useState(edgesData);
  const [selected, setSelected] = useState({type: null, id: null});
  const [sideToChange, setSideToChange] = useState(null);

  useEffect(() => {
    setSideToChange(null);
  }, [selected, nodes, edges]);

  const handleDragMove = (e, node) => {
    node.x = Math.floor(e.target.x());
    node.y = Math.floor(e.target.y());
    setNodes((prev) => [...prev]);
  };

  const selectElement = (type, element) => {

    //use selected as reference
    if (sideToChange !== null && type === "NODE" && selected.type === "EDGE") {
      setEdges((prev) => prev.map(edge => {
        if(edge.id === selected.id)
          edge[sideToChange] = element;
        return edge;
      }));
    }
    else {
      setSelected({type, id: element.id});
    }
    setSideToChange(null);
  };

  const deselectCurrent = () => {
    setSideToChange(null);
    setSelected({type: null, id: null});
  }
  
  return (
    <>
      <div className={"bg-zinc-950"}>
        <Stage
          x={stagePos.x}
          y={stagePos.y}
          width={window.innerWidth}
          height={window.innerHeight}
          draggable
          // TODO: add zoom in and out functionality
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
                onClick={() => selectElement("EDGE", edge)}
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
                onClick={() => selectElement("NODE", node)}
                onDragStart={() => selectElement("NODE", node)}
              />))
            }
          </Layer>

          {/* highlight selected element layer */}
          <Layer listening={false} >
            {(selected.type === "NODE") && nodes.filter(node => node.id===selected.id).map(node =>
              <Circle x={node.x} y={node.y} radius={thick} fill={startColor}/>
            )}
            {(selected.type === "EDGE") && edges.filter(edge => edge.id===selected.id).map(edge =>
                <>
                  <Line points={[edge.start.x, edge.start.y, edge.end.x, edge.end.y]} stroke={selectedEdgeColor} strokeWidth={thick * 2}/>
                  <Circle x={edge.start.x} y={edge.start.y} radius={thick} fill={startColor}/>
                  <Circle x={edge.end.x} y={edge.end.y} radius={thick} fill={endColor}/>
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
        setEdges={setEdges}
        setSideToChange={setSideToChange}
        sideToChange={sideToChange}
      />
    </>
  );
}

export default App
