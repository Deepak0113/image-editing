export default class BorderFeature {
    private isBorderEnabled: boolean;
    private groupElement: SVGElement;
    private borderElement: SVGRectElement;

    constructor() {
        this.isBorderEnabled = false;
        this.groupElement = document.createElementNS('http://www.w3.org/2000/svg', 'g') as SVGElement;
        this.borderElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGRectElement;
    }

    createBorder(path: SVGPathElement): SVGElement {
        const bbox = path.getBBox();

        console.log(bbox);

        this.borderElement.setAttribute('height', `${bbox.height + 30}px`);
        this.borderElement.setAttribute('width', `${bbox.width + 30}px`);
        this.borderElement.setAttribute('x', `${bbox.x - 15}`);
        this.borderElement.setAttribute('y', `${bbox.y - 15}`);
        this.borderElement.setAttribute('fill', 'none');
        
        path.onmouseenter = () => {
            if(this.isBorderEnabled){
                this.borderElement.classList.add('element-border-layer');
            }
        }

        path.onmouseleave = () => {
            this.borderElement.classList.remove('element-border-layer');
        }

        this.groupElement.appendChild(this.borderElement);
        this.groupElement.appendChild(path);

        return this.groupElement;
    }


    // enable border for the element
    enableBorder() {
        this.isBorderEnabled = true;
    }


    // disable border for the element
    disableBorder() {
        this.isBorderEnabled = false;
    }
}

