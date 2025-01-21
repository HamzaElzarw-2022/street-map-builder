
const SectionRow = ({ label, type, value, onChange }) => (
  <div className="section-row">
    <label className="section-row-item">{label}:</label>
    <input
      className="section-row-item section-row-input standard-font"
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

const EdgeConnected = ({ edge }) => (
  <div className="ribbon-subsection">
    <div className="section-row">
      <div className="section-row-item">street name:</div>
      <div className="section-row-item">{edge.name}</div>
    </div>
    <div className="section-row">
      <div className="section-row-item">start inter:</div>
      <div className="section-row-item">{edge.start.name}</div>
    </div>
    <div className="section-row">
      <div className="section-row-item">end inter:</div>
      <div className="section-row-item">{edge.end.name}</div>
    </div>
  </div>
);

function Ribbon({ribbonWidth, nodes, setNodes, selected, setSelected, edges}) {

  const inputChange = (e, attribute) => {
    selected.element[attribute] = e.target.value;
    setSelected(prev => ({...prev}));
  }
  const numberInputChange = (e, attribute) => {
    selected.element[attribute] = parseInt(e.target.value) || 0;
    setSelected(prev => ({...prev}));
  }

  return (
      <div className={"ribbon standard-font"} style={{width: ribbonWidth}}>
        {selected.type === "NODE" && (
          <div className={"ribbon-section"}>
            <div className={"section-row"}>Intersection selected</div>
            <SectionRow label={"name"} type={"text"} value={selected.element.name} onChange={e => {inputChange(e, "name")}} />
            <SectionRow label={"id"} type={"text"} value={selected.element.id} onChange={e => {inputChange(e, "id")}} />
            <SectionRow label={"lat"} type={"number"} value={selected.element.x} onChange={e => {numberInputChange(e, "x")}} />
            <SectionRow label={"long"} type={"number"} value={selected.element.y} onChange={e => {numberInputChange(e, "y")}} />

            <div className={"section-row margin-top-10"}>Streets connected</div>
            {edges.filter(edge => (edge.start.id === selected.element.id) || (edge.end.id === selected.element.id))
              .map(edge => <EdgeConnected edge={edge}/>)}
            <div className={"ribbon-subsection blue-background center font-size-2"}>Add new street</div>
          </div>
        )}

        {selected.type === "EDGE" && (
          <div className={"ribbon-section"}>
            <div className={"section-row"}>Street selected</div>
            <SectionRow label={"name"} type={"text"} value={selected.element.name} onChange={e => {inputChange(e, "name")}} />
            <SectionRow label={"id"} type={"text"} value={selected.element.id} onChange={e => {inputChange(e, "id")}} />
          </div>
        )}

        {(!selected.type || selected.type === "NONE") && (
          <div className={"ribbon-section center"}>Select a node or edge to see details</div>
        )}

        <div className={"ribbon-section blue-background center font-size-2"}>Add new intersection</div>
      </div>
  )
}

export default Ribbon;