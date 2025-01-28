/**
 * @param {[Edge]} edges
 * @param {Node} node
 * @param setSelected
 *
 */
function NodeEdges({ edges, node, setSelected }) {

  return(
    edges.filter(edge => (edge.start.id === node.id) || (edge.end.id === node.id)).map(edge => (
        <div className="border-1 rounded-xl border-neutral-700 mt-2 p-2">
          <div className="flex items-center">
            <div className="flex-auto basis-1/3">name:</div>
            <div  className="flex-auto basis-2/3 pl-1.5 max-w-2/3 cursor-pointer text-blue-400 underline margin-right-10"
                  onClick={() => setSelected({type: "EDGE", id: edge.id})}>
              {edge.name}
            </div>
          </div>
          <div className="flex border-t-1 border-neutral-700 pt-1 mt-1 items-center h-7">
            <div className="flex-auto basis-1/3">start:</div>
            <div className="flex-auto basis-2/3 pl-1.5 max-w-2/3">{edge.start.name}</div>
          </div>
          <div className="flex border-t-1 border-neutral-700 pt-1 mt-1 items-center h-7">
            <div className="flex-auto basis-1/3">end:</div>
            <div className="flex-auto basis-2/3 pl-1.5 max-w-2/3">{edge.end.name}</div>
          </div>
          {/*<div className="flex border-t-1 border-neutral-700 pt-1 mt-2 items-center h-7">*/}
          {/*  <div className="">{edge.start.name}</div>*/}
          {/*  <div className="flex-auto basis-1/3 text-center text-3xl flex justify-center pb-2">&rarr;</div>*/}
          {/*  <div className="text-right">{edge.end.name}</div>*/}
          {/*</div>*/}
        </div>
    )));
}

export default NodeEdges;