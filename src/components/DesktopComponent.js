import libui from 'libui-node'

export default class DesktopComponent {
    constructor() {
        this.children = [];
      }
    
      appendChild(child) {
        this.children.push(child);
      }
    
      removeChild(child) {
        if (typeof this.element.setChild !== 'undefined') { // if it can only have one child, we don't need to "de-render" it
        } else if (typeof this.element.deleteAt !== 'undefined') { // if it can have multiple ex. VerticalBox
            this.element.deleteAt(this.children.indexOf(child))
            child.element.destroy()
        }
        const index = this.children.indexOf(child);
        this.children.splice(index, 1);
        console.log("Completed delete")
      }
    
      renderChildNode(parent) {
        for (let i = 0; i < this.children.length; i += 1) {
          if (typeof this.children[i] === 'object') {
            this.children[i].render(parent);
          }
        }
      }
}