import SelectFreature from "../classes/SelectFeature";

export default class DeleteFeature {
    private svgElement: SVGElement;
    private selectFeature: SelectFreature;

    constructor(svgElement: SVGElement, selectFeature: SelectFreature) {
        this.svgElement = svgElement;
        this.selectFeature = selectFeature;
    }

    handleDelete() {
        if (this.selectFeature.isElementSelected()){
            console.log('need to delete. its selected')
            this.svgElement.remove();
        }
        return this.selectFeature.isElementSelected;
    }

    // enable delete
    enableDelete() {
        document.addEventListener('keypress', this.handleDelete);
    }

    // disable delete
    disableDelete() {
        document.removeEventListener('keypress', this.handleDelete);
    }
}