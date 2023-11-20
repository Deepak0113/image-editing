import Pen from "../utility/board/Pen";
import { Shape } from "../utility/board/Shape";

class SelectElement {
    private svgElementObject: Pen | Shape;
    private svgElement: SVGPathElement | SVGCircleElement | SVGPolygonElement;
    private isElementSelected: boolean;

    constructor(svgElementObject: Pen | Shape) {
        this.svgElementObject = svgElementObject;
        this.svgElement = (svgElementObject instanceof Pen) ? (this.svgElementObject as Pen).getPath() : (svgElementObject as Shape).getPolygon()
        this.isElementSelected = false;
    }


    private selectElement = (event: MouseEvent) => {
        this.isElementSelected = true;
    }


    private deleteElement = (event: KeyboardEvent) => {
        if (this.isElementSelected && event.code === 'Backspace') {
            if (this.svgElementObject instanceof Pen)
                (this.svgElementObject as Pen).deletePenFromSVG()
            else
                (this.svgElementObject as Shape).deleteShapeFromSVG()
        }
    }


    // function to start the select feature
    enableSelectFeature = () => {
        if (this.svgElement instanceof SVGPathElement) {
            this.svgElement.addEventListener('click', this.selectElement);
        } else if (this.svgElement instanceof SVGCircleElement) {
            this.svgElement.addEventListener('click', this.selectElement);
        } else {
            this.svgElement.addEventListener('click', this.selectElement);
        }
        document.addEventListener('keydown', this.deleteElement);
    }


    // function to dissable select feature
    dissableSelectFeature = () => {
        if (this.svgElement instanceof SVGPathElement) {
            this.svgElement.removeEventListener('click', this.selectElement);
        } else if (this.svgElement instanceof SVGCircleElement) {
            this.svgElement.removeEventListener('click', this.selectElement);
        } else {
            this.svgElement.removeEventListener('click', this.selectElement);
        }
        document.removeEventListener('keydown', this.deleteElement);
    }

    // 
}

export default SelectElement;