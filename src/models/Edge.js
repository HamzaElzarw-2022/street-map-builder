
class Edge {

  /**
   * @param {string} id - Unique identifier for the edge.
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
}

export default Edge;