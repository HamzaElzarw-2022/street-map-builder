class Node {

  /**
   * @param {number} id - The unique identifier for the node.
   * @param {string} name - The name of the node.
   * @param {number} x - The x-coordinate of the node (integer).
   * @param {number} y - The y-coordinate of the node (integer).
   */
  constructor(id, name, x, y) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
  }
  setName(name) {
    this.name = name;
    return new Node(this.id, name, this.x, this.y);
  }
  setX(x) {
    this.x = x;
    return new Node(this.id, this.name, x, this.y);
  }
  setY(y) {
    this.y = y;
    return new Node(this.id, this.name, this.x, y);
  }
}

export default Node;