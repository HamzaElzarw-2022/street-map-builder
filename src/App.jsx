import { useState } from 'react'
import './App.css'
import Grid from './Grid.jsx'
import Ribbon from './Ribbon.jsx'
import { Stage, Layer, Circle, Line} from 'react-konva';

const thick = 5;
const ribbonWidth = 250;


function App() {
  const [stagePos, setStagePos] = useState({ x: (window.innerWidth/2)+ribbonWidth/2, y: window.innerHeight/2 });

  const handleDragMove = (e, isStartCircle) => {
    const updatedX = e.target.x();
    const updatedY = e.target.y();

    if (isStartCircle) {
      setLinePoints([updatedX, updatedY, linePoints[2], linePoints[3]]);
    } else {
      setLinePoints([linePoints[0], linePoints[1], updatedX, updatedY]);
    }
  };

  const [linePoints, setLinePoints] = useState([50, 50, 100, 100]);
  
  return (
    <>
      <div className={"container"}>
        <Stage
          x={stagePos.x}
          y={stagePos.y}
          width={window.innerWidth}
          height={window.innerHeight}
          draggable
          scaleX={1}
          scaleY={1}
          onDragEnd={e => {
            setStagePos(e.currentTarget.position());
          }}>
          <Grid stagePos={stagePos} />
          <Layer>
            <Line points={linePoints} stroke="#AAB9C9" strokeWidth={thick * 2} />
            <Circle
              x={linePoints[0]}
              y={linePoints[1]}
              radius={thick}
              fill="#7d7f82"
              draggable
              onDragMove={e => handleDragMove(e, true)}
            />
            <Circle
              x={linePoints[2]}
              y={linePoints[3]}
              radius={thick}
              fill="#7d7f82"
              draggable
              onDragMove={e => handleDragMove(e, false)}
            />
          </Layer>

        </Stage>
      </div>
      <Ribbon ribbonWidth={ribbonWidth}/>
    </>
  );
}

export default App
