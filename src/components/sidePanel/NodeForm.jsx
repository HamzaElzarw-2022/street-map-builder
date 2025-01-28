import PropertyInputField from "./PropertyInputField.jsx";
import {useState} from "react";
import Node from "../../models/Node.js";
import { getNextNodeId } from "../../data/mockData.js";

function NodeForm({ setNodes, setSelected }) {

  const [newNode, setNewNode] = useState(new Node(getNextNodeId(), "", 0, 0));

  const createNode = () => {
    if (!(newNode instanceof Node)) {
      console.log("newNode is not a Node, can not create");
      return;
    }
    setNodes(prev => [...prev, newNode]);
    setSelected({type: "NODE", id: newNode.id});
    //TODO: validate node entries
  }

  return(
    <div className={"bg-gray-900 m-2.5 p-2.5 border-1 rounded-xl border-neutral-700"}>
      <div>new intersection</div>
      <PropertyInputField label={"name"} type={"text"} value={newNode.name} onChange={e => {setNewNode(newNode.setName(e.target.value))}}/>
      <PropertyInputField label={"lat"} type={"number"} value={newNode.x} onChange={e => {setNewNode(newNode.setX(e.target.value))}}/>
      <PropertyInputField label={"long"} type={"number"} value={newNode.y} onChange={e => {setNewNode(newNode.setY(e.target.value))}}/>
      <button className={"mt-2 cursor-pointer text-center w-full bg-gray-500 rounded-sm h-7"} onClick={createNode}>Create Intersection</button>
    </div> //TODO: implement selecting x and y directly by clicking on canvas
  );
}

export default NodeForm;