class Node {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
  addToState(setter) {
    setter(prevNodes => [...prevNodes, this]);
  }
}

export default Node;