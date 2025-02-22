import {Layer, Rect, Circle, Text} from "react-konva";

const UNIT = 50;

function Grid({stagePos, onClick}){

  const startX = Math.floor((-stagePos.x - window.innerWidth) / UNIT) * UNIT;
  const endX =
    Math.floor((-stagePos.x + window.innerWidth * 2) / UNIT) * UNIT;

  const startY =
    Math.floor((-stagePos.y - window.innerHeight) / UNIT) * UNIT;
  const endY =
    Math.floor((-stagePos.y + window.innerHeight * 2) / UNIT) * UNIT;

  const gridComponents = [];
  let i = 0;
  for (let x = startX; x < endX; x += UNIT) {
    for (let y = startY; y < endY; y += UNIT) {
      if (i === 4) {
        i = 0;
      }

      gridComponents.push(
        <Rect
          x={x}
          y={y}
          width={UNIT}
          height={UNIT}
          stroke="grey"
          strokeWidth={0.05}
        />
      );
    }
  }
  return (
    <Layer onClick={e => onClick(e)} >
      <Circle x={0} y={0} radius={2} fill="grey" />
      <Text text="0,0" x={2} y={2} fill="#2B2D30" fontSize={10} />
      {gridComponents}
    </Layer>
  );
}

export default Grid;