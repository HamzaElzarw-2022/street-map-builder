import Node from "../models/Node.js";
import Edge from "../models/Edge.js";

let nodeIdSequence = 10;
let edgeIdSequence = 10;
export const getNextNodeId = () => nodeIdSequence++;
export const getNextEdgeId = () => edgeIdSequence++;

export const nodesData= [
  new Node(1, "intersection1", 50, -50),
  new Node(2, "intersection2", 50, 100),
  new Node(3, "intersection3", -50, 100),
  new Node(4, "intersection4", 100, 50)
]
export const edgesData= [
  new Edge(1, "millet", nodesData[0], nodesData[1]),
  new Edge(2, "street", nodesData[1], nodesData[2]),
  new Edge(3, "Cadde 4", nodesData[1], nodesData[3])
]