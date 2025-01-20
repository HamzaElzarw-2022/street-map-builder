
function Ribbon({ribbonWidth, nodes, setNodes, selected, setSelected, edges}) {


  return (
      <div className={"ribbon"} style={{width: ribbonWidth, height: window.innerHeight, backgroundColor: '#2B2D30', position: 'fixed', top: 0, left: 0}}>
        <h2>Details</h2>
        {selected.type === "NODE" && (
          <div>
            <h3>Node</h3>
            <p><strong>ID:</strong> {selected.element.id}</p>
            <p><strong>X:</strong> {selected.element.x}</p>
            <p><strong>Y:</strong> {selected.element.y}</p>
            <p>
              <strong>Connected Edges:</strong>
            </p>
            <ul>
              {/* Assuming node's edges are available in selected.edge.edges */}
              {
                edges
                  .filter(edge => (edge.start.id === selected.element.id) || (edge.end.id === selected.element.id))
                  .map(edge => <li key={edge.id}>{edge.id}</li>)
              }
            </ul>
          </div>
        )}

        {selected.type === "EDGE" && (
          <div>
            <h3>Edge</h3>
            <p><strong>ID:</strong> {selected.element.id}</p>
            <p><strong>Starting Node:</strong> {selected.element?.start.id}</p>
            <p><strong>Ending Node:</strong> {selected.element?.end.id}</p>
          </div>
        )}

        {(!selected.type || selected.type === "NONE") && (
          <p>Please select a node or edge to see details</p>
        )}
      </div>
  )
}

export default Ribbon;