import Node from "../models/Node.js";
import Edge from "../models/Edge.js";

async function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        const nodesMap = new Map();

        // create nodes first
        const nodes = data.nodes.map(nodeData => {
          const node = new Node(
            nodeData.id,
            nodeData.name,
            nodeData.x,
            nodeData.y
          );
          nodesMap.set(node.id, node);
          return node;
        });

        // create edges with node references
        const edges = data.edges.map(edgeData => {
          const start = nodesMap.get(edgeData.startId);
          const end = nodesMap.get(edgeData.endId);

          if (!start || !end) {
            throw new Error(`Missing node for edge ${edgeData.id}`);
          }

          return new Edge(
            edgeData.id,
            edgeData.name,
            start,
            end
          );
        });

        resolve({ nodes, edges });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}
export default importData;