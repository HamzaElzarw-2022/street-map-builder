import Node from "../models/Node.js";
import Edge from "../models/Edge.js";
import { setIdSequences } from "../data/mockData.js";

async function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        const nodesMap = new Map();

        let maxNodeId = 0;
        let maxEdgeId = 0;

        // create nodes first
        data.nodes.forEach(nodeData => {
          nodesMap.set(nodeData.id, new Node(
            nodeData.id,
            nodeData.name,
            nodeData.x,
            nodeData.y
          ));

          maxNodeId = Math.max(nodeData.id, maxNodeId);
        });

        // create edges with node references
        const edges = data.edges.map(edgeData => {
          const start = nodesMap.get(edgeData.startId);
          const end = nodesMap.get(edgeData.endId);
          maxEdgeId = Math.max(edgeData.id, maxEdgeId);

          if (!start || !end)
            throw new Error(`Missing node for edge ${edgeData.id}`);

          return new Edge(
            edgeData.id,
            edgeData.name,
            start,
            end,
            edgeData.speed
          );
        });

        setIdSequences(maxNodeId, maxEdgeId);
        resolve({ nodes: Array.from(nodesMap.values()), edges });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}
export default importData;