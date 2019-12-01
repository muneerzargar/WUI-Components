import {LitElement, customElement, property, html, css, TemplateResult} from 'lit-element'; 
import {ImageInterface} from '../../../Interfaces/wui-carousel.interfaces';

@customElement('wui-carousel-image')
export class WuiCarouselImage extends LitElement {
    @property() imageItem: ImageInterface = {
        src: '',
        altText: ''
    };

    static get styles () {
        return css `
            :host {
                display: block;
            }
            img {
                width: 100%;
            }
        `
    }

    render(): TemplateResult {
        return html`
            <img src= "${this.imageItem.src}" alt="${this.imageItem.altText}"/>       
        `
    }
}