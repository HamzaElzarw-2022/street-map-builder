
class Edge {
  constructor(id, start, end) {
    this.id = id;
    this.start = start;
    this.end = end;
  }
  addToState(setter) {
    setter(prevEdges => [...prevEdges, this]);
  }
}

export default Edge;