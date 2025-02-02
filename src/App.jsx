import { useState, useEffect } from 'react'
import './App.css'
import SidePanel from './components/sidePanel/SidePanel.jsx'
import { edgesData, nodesData } from './data/mockData.js'
import Canvas from "./components/canvas/Canvas.jsx";
import MessageContainer from "./components/MessageContainer.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {

  const [panelWidth, setPanelWidth] = useState(350);
  const [stagePos, setStagePos] = useState({ x: ((window.innerWidth + panelWidth)/2), y: window.innerHeight/2 });
  const [scale, setScale] = useState(1);
  const [nodes, setNodes] = useState(nodesData);
  const [edges, setEdges] = useState(edgesData); //TODO: check for invalid edges
  const [messages, setMessages] = useState([]);

  /**
   * @typedef {Object} Selection
   * @property {string|null} type - The type of the selected item.
   * @property {number|null} id - The ID of the selected item.
   */
  const [selected, setSelected] = useState(/** @type {Selection} */{type: null, id: null}); //TODO: differentiate selected and status
  const [reference, setReference] = useState(/** @type {Selection} */{type: null, id: null});
  const [pendingRef, setPendingRef] = useState("NONE");

  useEffect(() => {
    setPendingRef("NONE");
    setReference({type: null, id: null});
  }, [selected, nodes, edges]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        setMessages([]);
      }, 100);
    }
  }, [messages]);

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
  const getCanvasCenter = () => {
    const centerX = (window.innerWidth + panelWidth) / 2 ;
    const centerY = window.innerHeight / 2;

    return {
      x: (centerX - stagePos.x)/scale,
      y: (centerY - stagePos.y)/scale
    };
  };
  
  return (
    <>
      <Navbar nodes={nodes} edges={edges} setEdges={setEdges} setNodes={setNodes} setMessages={setMessages}/>
      <Canvas
        pendingRef={pendingRef}
        setSelected={setSelected}
        edges={edges}
        selected={selected}
        setNodes={setNodes}
        setReference={setReference}
        nodes={nodes}
        scale={scale}
        stagePos={stagePos}
        setStagePos={setStagePos}
      />
      <SidePanel
        panelWidth={panelWidth}
        setPanelWidth={setPanelWidth}
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
        setMessages={setMessages}
        getCanvasCenter={getCanvasCenter}
      />
      <div className={"select-none fixed text-3xl right-5 bottom-5 border border-neutral-700 bg-neutral-950 flex rounded-2xl w-24 h-10"}>
        <div className={"w-12 h-full text-center hover:bg-gray-600 rounded-l-2xl cursor-pointer"}
             onClick={() => setScale(prev => prev+0.1)}>+</div>
        <div className={"h-7 pb-2 border-r text-center border-neutral-700 mt-1.5"}></div>
        <div  className={"w-12 h-full text-center hover:bg-gray-600 rounded-r-2xl cursor-pointer"}
              onClick={() => setScale(prev => prev-0.1)}>-</div>
      </div>
      <MessageContainer messages={messages} width={panelWidth} />
    </>
  );
}

export default App;