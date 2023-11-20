import SelectElement from "../../classes/SelectElement";

export class Shape {
    // HTML elements
    private svg: SVGSVGElement;
    private polygon!: SVGPolygonElement | SVGCircleElement;

    // feature tregger flag
    private isDraggable: boolean;
    private isCommandKeyPressed: boolean;
    private isShapeCreated: boolean;
    private isDragged: boolean;

    // positions
    private cursorInsideSvgElementPosX: number;
    private cursorInsideSvgElementPosY: number;
    private svgElementPosX: number;
    private svgElementPosY: number;
    private cursorX: number;
    private cursorY: number;
    private initialScaleX: number;
    private initialScaleY: number;

    // shape properties
    private transform: { x: number, y: number };
    private scale: number;
    private rotate: number;
    private sides: number;
    private size: number;
    private center: { x: number, y: number };
    private boardElementAttributes: BoardElementAttribute;

    // callbacks
    private shapeDrawCompletedCallback: (sides: number) => void;

    private selectElement!: SelectElement;


    // constructor
    constructor(svg: SVGSVGElement, sides: number, boardElementAttributes: BoardElementAttribute, shapeDrawCompletedCallback: (sides: number) => void) {
        this.svg = svg;

        this.isDraggable = false;
        this.isDragged = false;
        this.isCommandKeyPressed = false;
        this.isShapeCreated = false;

        this.cursorInsideSvgElementPosX = 0;
        this.cursorInsideSvgElementPosY = 0;
        this.svgElementPosX = 0;
        this.svgElementPosY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.initialScaleX = 1;
        this.initialScaleY = 1;

        this.isDraggable = false;
        this.isCommandKeyPressed = false;

        this.transform = { x: 0, y: 0 }
        this.rotate = 0;
        this.scale = 1;
        this.sides = sides;
        this.size = 50;
        this.center = { x: 0, y: 0 }

        this.shapeDrawCompletedCallback = shapeDrawCompletedCallback;
        this.boardElementAttributes = boardElementAttributes;

        this.initListeners()
    }


    // init event handlers
    private initListeners = () => {
        this.svg.addEventListener('mousemove', this.dragging)
        this.svg.addEventListener('click', this.generateShape)
    }


    // start drag
    private startDrag = (e: MouseEvent) => {
        this.isDraggable = true;
        const svgPosX = this.svg.getBoundingClientRect().left;
        const svgPosY = this.svg.getBoundingClientRect().top;

        const cursorPosX = e.clientX - svgPosX;
        const cursorPosY = e.clientY - svgPosY;

        this.svgElementPosX = this.polygon.getBoundingClientRect().left - svgPosX;
        this.svgElementPosY = this.polygon.getBoundingClientRect().top - svgPosY;

        this.cursorInsideSvgElementPosX = cursorPosX - this.svgElementPosX;
        this.cursorInsideSvgElementPosY = cursorPosY - this.svgElementPosY;
    }

    // dragging
    private dragging = (e: MouseEvent) => {
        if (!this.isDraggable) return;
        this.isDragged = true;
        const svgPosX = this.svg.getBoundingClientRect().left;
        const svgPosY = this.svg.getBoundingClientRect().top;

        const cursorPosX = e.clientX - svgPosX;
        const cursorPosY = e.clientY - svgPosY;

        this.transform = {
            x: cursorPosX - this.svgElementPosX - this.cursorInsideSvgElementPosX,
            y: cursorPosY - this.svgElementPosY - this.cursorInsideSvgElementPosY
        }

        this.polygon.style.transform = this.generateTransformString();
    }


    // end drag
    private endDrag = () => {
        this.isDraggable = false;

        if (!this.polygon) return;
        if (!this.isDragged) return;
        this.isDragged = false;
        this.generateCenterAfterTransforming();
        this.changeShapeCenter()
        this.polygon.style.transform = this.generateTransformString()
    }


    // generate shape
    private generateShape = (e: MouseEvent) => {
        if (this.isShapeCreated) return;

        const centerX = e.clientX - this.svg.getBoundingClientRect().left;
        const centerY = e.clientY - this.svg.getBoundingClientRect().top;

        (this.sides === 0) ? this.createCircle(centerX, centerY) : this.createPolygon(centerX, centerY);

        this.svg.removeEventListener('click', this.generateShape)
        this.isShapeCreated = true;

        if (this.polygon instanceof SVGPolygonElement)
            this.polygon.addEventListener('mousedown', this.startDrag)
        else
            this.polygon.addEventListener('mousedown', this.startDrag)
        this.polygon.addEventListener('mouseup', this.endDrag)

        this.selectElement = new SelectElement(this)
        this.selectElement.enableSelectFeature()
    }


    // create polygon
    private createPolygon = (centerX: number, centerY: number) => {
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', this.generatePolygonPath(centerX, centerY));
        polygon.style.transform = this.generateTransformString();
        polygon.style.display = 'inline'
        this.polygon = polygon;
        this.addAttributesToElement(this.boardElementAttributes)
        this.svg.appendChild(this.polygon)
    }


    // create circle
    private createCircle = (centerX: number, centerY: number) => {
        const circleSvgElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleSvgElement.setAttribute('cx', `${centerX}`);
        circleSvgElement.setAttribute('cy', `${centerY}`);
        circleSvgElement.setAttribute('r', `${this.size}`);
        circleSvgElement.setAttribute('fill', '#000');
        circleSvgElement.style.transform = this.generateTransformString()

        this.polygon = circleSvgElement;
        this.addAttributesToElement(this.boardElementAttributes)
        this.svg.appendChild(this.polygon);
        this.center = { x: centerX, y: centerY };


    }


    // generate polygon path
    private generatePolygonPath = (centerX: number, centerY: number): string => {
        const stepAngle = 360 / this.sides;
        let angle = 0;
        const vertices: string[] = [];

        for (let i = 0; i < this.sides; i++) {
            const radians = 2 * Math.PI * angle / 360;
            const posX = centerX + this.size * Math.cos(radians);
            const posY = centerY + this.size * Math.sin(radians);

            angle += stepAngle;

            vertices.push(`${posX},${posY}`)
        }

        return vertices.join(' ')
    }


    // get mouse position
    getMousePosition = (e: MouseEvent) => {
        const CTM = this.polygon.getScreenCTM();

        if (CTM) {
            return {
                x: (e.clientX - CTM.e) / CTM.a,
                y: (e.clientY - CTM.f) / CTM.d,
            };
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }


    // generates transform string
    private generateTransformString = (): string => {
        return `translate(${this.transform.x}px, ${this.transform.y}px) scale(${this.scale}) rotate(${this.rotate}deg)`
    }


    // generate center after transforming
    private generateCenterAfterTransforming = () => {

        if (this.sides === 0) {
            console.log('center - generate', this.center)
            const centerX = parseFloat(this.polygon.getAttribute('cx') as string) + this.transform.x;
            const centerY = parseFloat(this.polygon.getAttribute('cy') as string) + this.transform.y;

            this.center = {
                x: centerX,
                y: centerY
            }

            this.transform = {
                x: 0,
                y: 0
            }

        } else {
            const pos = this.polygon.getAttribute('points')?.split(' ')[0].split(',')

            console.log(pos, this.transform)

            if (pos) {
                this.center = {
                    x: parseFloat(pos[0]) + this.transform.x,
                    y: parseFloat(pos[1]) + this.transform.y
                }
            }
            else {
                this.center = {
                    x: 0,
                    y: 0
                }
            }

            console.log(this.center)

            this.transform = {
                x: 0,
                y: 0
            }
        }
    }


    // change center of the shape
    private changeShapeCenter = () => {
        if (this.sides === 0) {
            this.polygon.setAttribute('cx', `${this.center.x}`);
            this.polygon.setAttribute('cy', `${this.center.y}`);
        } else {
            this.polygon.setAttribute('points', this.generatePolygonPath(this.center.x, this.center.y))
        }
    }


    // is shape created
    isShapeDrawn = () => {
        return this.isShapeCreated;
    }


    // destroy shape
    destroy = () => { }


    // function to indicate if the shape creation is completed or not
    isCompleted = (): boolean => {
        return this.isShapeCreated;
    }


    // add attributes to the element
    addAttributesToElement = (attributes: BoardElementAttribute) => {
        console.log(attributes)
        if (!this.polygon) return;
        this.polygon.setAttribute('stroke', attributes.lineColor);
        this.polygon.setAttribute('stroke-width', `${attributes.lineWidth}`);
        this.polygon.setAttribute('fill', `${attributes.fill}`);

        if (attributes.lineType === 'dash') {
            this.polygon.setAttribute('stroke-dasharray', '16, 16');
            this.polygon.setAttribute('stroke-linecap', "round");
            this.polygon.setAttribute('stroke-linejoin', 'rounded');
        } else {
            this.polygon.removeAttribute('stroke-dasharray');
            this.polygon.removeAttribute('stroke-linecap');
            this.polygon.removeAttribute('stroke-linejoin');
        }
    }


    deleteShapeFromSVG = () => {
        this.polygon.remove()
    }


    getPolygon = () => { return this.polygon; }
}
