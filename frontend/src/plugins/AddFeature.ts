import BorderFeature from "../classes/BorderFeature";
import SelectFreature from "../classes/SelectFeature";
import DeleteFeature from "./DeleteFeature";

export default class AddFeature {
    private selectFeature!: SelectFreature;
    private deleteFeature!: DeleteFeature;
    private borderFeature: BorderFeature;

    private svgGroupElement!: SVGElement;
    private svgElement: SVGSVGElement;
    private pathElement: SVGPathElement;

    constructor(svg: SVGSVGElement, path: SVGPathElement) {
        this.svgElement = svg;
        this.pathElement = path;
        this.borderFeature = new BorderFeature();
    }

    init() {
        this.svgGroupElement = this.createBorderFreature();
        this.svgElement.append(this.svgGroupElement);

        this.createDeleteFeature();
        this.createSelectFeature();
    }
    
    createDeleteFeature() {
        this.deleteFeature = new DeleteFeature(this.svgGroupElement, this.selectFeature);
        this.deleteFeature.enableDelete();
    }
    
    createBorderFreature() {
        this.borderFeature.enableBorder();
        return this.borderFeature.createBorder(this.pathElement);
    }
    
    createSelectFeature() {
        this.selectFeature = new SelectFreature(this.pathElement, this.svgGroupElement);
        this.selectFeature.enableSelect();
    }
}


