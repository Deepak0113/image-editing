import BorderFeature from "../../classes/BorderFeature";
import SelectElement from "../../classes/SelectElement";
import AddFeature from "../../plugins/AddFeature";

export default class Pen {
    private svg: SVGSVGElement;
    private isDrawable: boolean = false;
    private prevX: number = 0;
    private prevY: number = 0;
    private path!: SVGPathElement;
    private isPathAdded: boolean = false;
    private isDrawComplete: boolean = false;
    private isDrawing: boolean = false;
    private elementAttributes: BoardElementAttribute;

    // Callbacks
    private penDrawCompletedCallback: () => void;


    // Features
    private SelectableFeature!: SelectElement;
    private addFeatures!: AddFeature;


    constructor(svg: SVGSVGElement, elementAttributes: BoardElementAttribute, drawCompletedCallback: () => void) {
        this.svg = svg;
        this.elementAttributes = elementAttributes;
        this.penDrawCompletedCallback = drawCompletedCallback;
        this.initListeners();
    }


    // start drawing
    private startDrawing = (e: MouseEvent) => {
        this.isDrawable = true;

        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.addAttributesToElement(this.elementAttributes);

        const { clientX, clientY } = e;
        const boundedClientRect = this.svg.getBoundingClientRect();

        this.prevX = clientX - boundedClientRect.left;
        this.prevY = clientY - boundedClientRect.top;

        this.path.setAttribute('d', `M${this.prevX} ${this.prevY}`);
        this.path.style.pointerEvents = 'stroke';
    }


    // end drawing
    private endDrawing = () => {
        this.isDrawable = false;
        this.isDrawComplete = this.isDrawing;
        this.isDrawable = false;
        this.penDrawCompletedCallback();
        this.destroyListeners();

        this.SelectableFeature = new SelectElement(this)
        this.SelectableFeature.enableSelectFeature()
        
        this.addFeatures = new AddFeature(this.svg, this.path);
        this.addFeatures.init();

        // const shadow = `<defs><filter id="drop-shadow" x="-20%" y="-20%" width="200%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#000" flood-opacity="0.0"></feDropShadow></filter></defs>`
        // this.path.setAttribute('filter', 'url(#drop-shadow)')
        // this.svg.innerHTML += shadow
    }


    // drawing
    private drawing = (e: MouseEvent) => {
        if (!this.isDrawable) return;

        this.isDrawing = true;

        // adds path only when started drawing
        if (!this.isPathAdded) {
            this.svg.appendChild(this.path);
            this.isPathAdded = true;
        }

        const boundedClientRect = this.svg.getBoundingClientRect();
        const { clientX, clientY } = e;
        const dPath = this.path.getAttribute('d') + ` L${clientX - boundedClientRect.left} ${clientY - boundedClientRect.top}`;

        this.path.setAttribute('d', dPath);
        this.prevX = clientX;
        this.prevY = clientY;
    }


    // init listeners
    private initListeners = () => {
        this.svg.addEventListener('mousedown', this.startDrawing)
        this.svg.addEventListener('mousemove', this.drawing);
        this.svg.addEventListener('mouseup', this.endDrawing);
    }


    // destory listeners
    private destroyListeners = () => {
        this.svg.removeEventListener('mousedown', this.startDrawing)
        this.svg.removeEventListener('mousemove', this.drawing);
        this.svg.removeEventListener('mouseup', this.endDrawing);
    }


    // change attributes
    setAttributes = (strokeColor: string, strokeWidth: number, strokeType: 'line' | 'dash' | 'dot') => {

        this.path.setAttribute('stroke-width', `${strokeWidth}px`);
        this.path.setAttribute('stroke', strokeColor);
        if (strokeType === 'dash') {
            this.path.setAttribute('stroke-dasharray', '6');
        } else if (strokeType === 'dot') {
            this.path.setAttribute('stroke-dasharray', '16, 16');
            this.path.setAttribute('stroke-linecap', "round")
            this.path.setAttribute('stroke-linejoin', 'rounded')
        } else {
            this.path.setAttribute('stroke-dasharray', '24');
        }
    }


    // add attributes to the element
    addAttributesToElement = (attributes: BoardElementAttribute) => {
        if(!this.path) return;
        this.path.setAttribute('stroke', attributes.lineColor);
        this.path.setAttribute('stroke-width', `${attributes.lineWidth}`);
        this.path.setAttribute('fill', `none`);

        if (attributes.lineType === 'dash') {
            this.path.setAttribute('stroke-dasharray', '16, 16');
            this.path.setAttribute('stroke-linecap', "round");
            this.path.setAttribute('stroke-linejoin', 'rounded');
        } else {
            this.path.removeAttribute('stroke-dasharray');
            this.path.removeAttribute('stroke-linecap');
            this.path.removeAttribute('stroke-linejoin');
        }
    }


    // isCompleted is to check if the element is completed or not
    isCompleted = (): boolean => {
        return this.isDrawComplete;
    }


    // destroy element so that it cannot be used
    destroyPen = () => {
        this.destroyListeners();
    }


    // get path for other features
    getPath = (): SVGPathElement => {return this.path;}


    // remove or delete path from svg
    deletePenFromSVG = () => {
        this.path.remove()
    }
}