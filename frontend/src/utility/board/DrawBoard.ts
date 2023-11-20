import Pen  from "./Pen";
import { Shape } from "./Shape";

export default class DrawManager {
    private svg!: SVGSVGElement;
    private currentSvgElement!: Shape | Pen;

    private sides!: number;

    private boardElementAttribute: BoardElementAttribute = {
        fill: '#000000',
        lineWidth: 5,
        lineType: 'line',
        lineColor: '#000000'
    };


    constructor(svg: SVGSVGElement) {
        this.svg = svg;
    }


    // start pointer mode to select shapes
    startPointer = () => {
    }


    // starts when in pen mode
    // creates a new Pen when currentSVGElement is not defined or when it was in shape mode
    // or when a previous pen mode is completed to avoid recreating Pen object
    startPen = () => {
        if (!this.currentSvgElement ||
            this.currentSvgElement instanceof Shape ||
            (this.currentSvgElement as Pen).isCompleted()) {

            this.currentSvgElement = new Pen(
                this.svg,
                this.boardElementAttribute,
                this.penDrawCompletedCallback
            );
        }
    }


    // starts when in shape mode
    // creates a new shape when currentSVGElement is not defined or when it was in pen mode
    // or when a previous shape mode is completed to avoid recreating Shape objects
    startShape = (sides: number) => {
        this.sides = sides;

        if(!this.currentSvgElement ||
            this.currentSvgElement instanceof Pen ||
            (this.currentSvgElement as Shape).isCompleted()) {
            this.currentSvgElement = new Shape(
                this.svg, sides,
                this.boardElementAttribute,
                this.shapeDrawCompletedCallback
            );
        }
    }


    // function to change the attributes of the element
    changeAttribute = (attributes: BoardElementAttribute) => {
        this.boardElementAttribute = attributes;
        if(this.currentSvgElement instanceof Pen) this.startPen()
        else this.startShape(this.sides)
    }


    // callback function to indicate when the pen drawing is completed
    penDrawCompletedCallback = () => {
        this.startPen()
    }


    // callback function to indicate when the shape drawing is completed
    shapeDrawCompletedCallback = (sides: number) => {
        this.startShape(sides);
    }
}