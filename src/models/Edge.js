// TODO: add detailed data for edge (street)
class Edge {

  /**
   * @param {number} id - Unique identifier for the edge.
   * @param {string} name - Name of the edge.
   * @param {Node} start - Starting node of the edge.
   * @param {Node} end - Ending node of the edge.
   * @param {number} speed - average or maximum speed for edge (street)
   */
  constructor(id, name, start, end, speed) {
    this.id = id;
    this.name = name;
    this.start = start;
    this.end = end;
    this.speed = speed;
  }
  setName(name) {
    return new Edge(this.id, name, this.start, this.end, this.speed);
  }
  setStart(start) {
    return new Edge(this.id, this.name, start, this.end, this.speed);
  }
  setEnd(end) {
    return new Edge(this.id, this.name, this.start, end, this.speed);
  }
  setSpeed(speed) {
    return new Edge(this.id, this.name, this.start, this.end, speed)
  }
  flipSides() {
    return new Edge(this.id, this.name, this.end, this.start, this.speed);
  }
}

export default Edge;