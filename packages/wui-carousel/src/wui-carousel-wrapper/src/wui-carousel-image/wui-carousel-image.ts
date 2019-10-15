import {LitElement, customElement, property, html, css, TemplateResult} from 'lit-element'; 
import {ImageInterface} from '../../../interface/wui-carousel.interface';

@customElement('wui-carousel-image')
export class WuiCarouselImage extends LitElement {
    @property({type: Object}) imageItem: ImageInterface = {
        src: null,
        altText: null
    };

    static get styles () {
        return css `
            :host {
                display: block;
            }
            img {
                width: 100%;
                max-width: 100%;
            }
        `
    }

    render(): TemplateResult {
        return html`
            <img src= "${this.imageItem.src}" alt="${this.imageItem.altText}"/>       
        `
    }
}