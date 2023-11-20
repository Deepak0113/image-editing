export default class SelectFreature {
    private isSelected: boolean;
    private path: SVGPathElement;
    private group: SVGElement;
    
    constructor(path: SVGPathElement, group: SVGElement){
        this.isSelected = false;
        this.path = path;
        this.group = group;
    }

    // handle select feature
    select = () => {
        this.isSelected = true;
        (this.group.childNodes[0] as SVGRectElement).classList.add('element-border-layer');
    }

    // handle unselect feature
    unselect = (event: MouseEvent) => {
        if(this.path === event.target) {
            (this.group.childNodes[0] as SVGRectElement).classList.remove('element-border-layer');
        }
        this.isSelected = false;
    }

    // enable select freature for the element
    enableSelect() {
        this.path.addEventListener('click', this.select);
        document.addEventListener('click', this.unselect);
    }

    // disable select freature for the element
    disableSelect() {
        this.path.removeEventListener('click', this.select);
        document.removeEventListener('click', this.unselect);
    }

    isElementSelected() {
        return this.isSelected
    }
}