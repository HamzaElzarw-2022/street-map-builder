
function Ribbon({ribbonWidth}) {
  return (
      <div className={"ribbon"} style={{width: ribbonWidth, height: window.innerHeight, backgroundColor: '#2B2D30', position: 'fixed', top: 0, left: 0}}>

        <br/>
        &nbsp;&nbsp;side ribbon<br/><br/>
        &nbsp;&nbsp;-line endpoints draggable<br/>
        &nbsp;&nbsp;-grid draggable

      </div>
    )
}

export default Ribbon;