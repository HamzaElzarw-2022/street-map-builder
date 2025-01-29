// TODO: add detailed data for edge (street)
class Edge {

  /**
   * @param {number} id - Unique identifier for the edge.
   * @param {string} name - Name of the edge.
   * @param {Node} start - Starting node of the edge.
   * @param {Node} end - Ending node of the edge.
   */
  constructor(id, name, start, end) {
    this.id = id;
    this.name = name;
    this.start = start;
    this.end = end;
  }
  setName(name) {
    return new Edge(this.id, name, this.start, this.end);
  }
  setStart(start) {
    return new Edge(this.id, this.name, start, this.end);
  }
  setEnd(end) {
    return new Edge(this.id, this.name, this.start, end);
  }
}

export default Edge;