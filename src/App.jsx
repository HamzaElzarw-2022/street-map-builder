import { useState, useEffect } from 'react'
import './App.css'
import Grid from './Grid.jsx'
import SidePanel from './components/sidePanel/SidePanel.jsx'
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

/**
 * @typedef {Object} Selection
 * @property {string|null} type - The type of the selected item.
 * @property {number|null} id - The ID of the selected item.
 */

function App() {

  const [stagePos, setStagePos] = useState({ x: (window.innerWidth/2)+ribbonWidth/2, y: window.innerHeight/2 });
  const [scale, setScale] = useState(1);

  const [nodes, setNodes] = useState(nodesData);
  const [edges, setEdges] = useState(edgesData); //TODO: check for invalid edges

  //TODO: differentiate selected and status
  const [selected, setSelected] = useState(/** @type {Selection} */{type: null, id: null});
  const [reference, setReference] = useState(/** @type {Selection} */{type: null, id: null});
  const [pendingRef, setPendingRef] = useState("NONE");

  useEffect(() => {
    setPendingRef("NONE");
    setReference({type: null, id: null});
  }, [selected, nodes, edges]);

  /**
   * Handles dragging intersections from canvas and updates nodes position
   * @param {KonvaEventObject} e
   * @param {Node} node
   */
  const handleDragMove = (e, node) => {
    node.x = Math.floor(e.target.x());
    node.y = Math.floor(e.target.y());
    setNodes((prev) => [...prev]);
  };

  /**
   * checks if parameter string is the pendingRef value, if yes it returns true and reset pendingRef to NONE.
   * @param {string} pending
   * @returns {boolean}
   */
  const equalsPendingRef = (pending) => {
    if(pendingRef === pending) {
      setPendingRef("NONE");
      return true;
    }
    return false;
  }

  /**
   * Handles element clicked event from the canvas
   * @param {String} type type of the clicked element
   * @param {Node|Edge} element
   */
  const elementClicked = (type, element) => {
    if(pendingRef !== "NONE"){
      setReference({type, id: element.id});
    }
    else
      setSelected({type, id: element.id});
  };
  
  return (
    <>
      <div className={"bg-zinc-950"}>
        <Stage //TODO: implementing hovering over element effect and cursor change
          x={stagePos.x}
          y={stagePos.y}
          width={window.innerWidth}
          height={window.innerHeight}
          draggable
          scaleX={scale}
          scaleY={scale}
          onDragEnd={e => {
            setStagePos(e.currentTarget.position());
          }}>

          {/* background grid layer */}
          <Grid stagePos={stagePos} deselectCurrent={() => setSelected({type: null, id: null})}/>

          {/* map elements layer */}
          <Layer>
            {edges.map(edge => (
              <Line
                points={[edge.start.x, edge.start.y, edge.end.x, edge.end.y]}
                stroke={edgeColor}
                strokeWidth={thick * 2}
                key={edge.id}
                onClick={() => elementClicked("EDGE", edge)}
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
                onClick={() => elementClicked("NODE", node)}
                onDragStart={() => elementClicked("NODE", node)}
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
      <SidePanel
        ribbonWidth={ribbonWidth}
        nodes={nodes}
        setNodes={setNodes}
        selected={selected}
        setSelected={setSelected}
        edges={edges}
        setEdges={setEdges}

        setPendingRef={setPendingRef}
        equalsPendingRef={equalsPendingRef}
        pendingRef={pendingRef}
        reference={reference}
      />
      <div className={"select-none fixed text-3xl right-5 bottom-5 border border-neutral-700 bg-neutral-950 flex rounded-2xl w-24 h-10"}>
        <div className={"w-12 h-full text-center hover:bg-gray-600 rounded-l-2xl cursor-pointer"}
             onClick={() => setScale(prev => prev+0.1)}>+</div>
        <div className={"h-7 pb-2 border-r text-center border-neutral-700 mt-1.5"}></div>
        <div  className={"w-12 h-full text-center hover:bg-gray-600 rounded-r-2xl cursor-pointer"}
              onClick={() => setScale(prev => prev-0.1)}>-</div>
      </div>
    </>
  );
}

export default App
