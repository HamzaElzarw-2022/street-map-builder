function exportData(nodes, edges) {
  const data = {
    nodes: nodes.map(node => ({
      id: node.id,
      name: node.name,
      x: node.x,
      y: node.y
    })),
    edges: edges.map(edge => ({
      id: edge.id,
      name: edge.name,
      startId: edge.start.id,
      endId: edge.end.id
    }))
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'graph-data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default exportData;