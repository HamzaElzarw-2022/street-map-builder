import {Circle, Layer, Line, Stage} from "react-konva";
import Grid from "./Grid.jsx";
import {edgeColor, endColor, nodeColor, selectedEdgeColor, startColor, thick} from "../../data/constants.js";
import {useState} from "react";

function Canvas({ scale, nodes, setNodes, edges, selected, setSelected, pendingRef, setReference, stagePos, setStagePos }) {

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
  /**
   * @param {KonvaEventObject<MouseEvent>} e
   */
  const gridClicked = (e) => {
    if(pendingRef === "COORDINATE")
      setReference({type: "COORDINATE", id: {x: e.target.x(), y: e.target.y()}});
    else
      setSelected({type: null, id: null})
  }

  return(
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
        <Grid stagePos={stagePos} onClick={e => gridClicked(e)}/>

        {/* map elements layer */}
        <Layer >
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
  );
}

export default Canvas;