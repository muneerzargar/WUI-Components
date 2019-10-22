
import {LitElement, html, css} from 'lit-element'; 

class WuiCarouselImage extends LitElement {

    static get properties () {
        return {
            imageItem : {type: Object}
        }
    }

    static get styles () {
        return css `
            :host {
                display: block;
            }
            img {
                max-width: 100%;
            }
        `
    }

    constructor() {
        super();
        this.imageItem = {};
    }

    render() {
        return html`
            <img src= "${this.imageItem.src}" alt="${this.imageItem.altText}"/>       
        `
    }
}

customElements.define('wui-carousel-image', WuiCarouselImage);