import {LitElement, html, css} from 'lit-element';
import './wui-carousel-wrapper/src/wui-carousel-wrapper.js';
import './wui-carousel-navigation/src/wui-carousel-navigation.js';

export class WuiCarousel extends LitElement {
    
    static get properties() {
        return {
            carouselConfig : {type: Object },
            itemIndex: {type: Number},
            oldItemIndex: {type: Number},
        }
    }

    static get styles() {
        return css `
            :host {
                display: block;
            }
        `
    }

    constructor() {
        super();
        this.itemIndex = 0;
        this.oldItemIndex = 0;
    }

    shouldUpdate(changedProperties) {
        const {itemIndex: oldItemIndex} = this.__getItemFromMap(changedProperties);
        // TODO: change it to The nullish coalescing operator after TS integration.
        this.oldItemIndex = (oldItemIndex !== undefined ) ? oldItemIndex : this.oldItemIndex;
        return changedProperties.has('itemIndex');
    }

    __getItemFromMap (updatedProps) {
        return new Proxy(updatedProps, {
          get (value, key) {
            return value.get(key);
          }
        });
    }

    render() {
        return html `
            <wui-carousel-wrapper 
                .carouselItems= "${this.__getItems(this.carouselConfig, 'wrapper')}"
                .currentIndex= "${this.itemIndex}"
                .prevIndex="${this.oldItemIndex }"
                .enableCounter= "${this.carouselConfig.enableCounter}"
                .enableArrows= "${this.carouselConfig.enableArrows}"
                @selected-item= "${this.__setSelectedIndex}"
            >
            </wui-carousel-wrapper>
            <wui-carousel-navigation 
                .navigationItems= "${this.__getItems(this.carouselConfig, 'navigationBottom')}"
                .currentItemIndex= "${this.itemIndex}"
                .indicatorType= "${this.carouselConfig.indicatorType}"
                @selected-item= "${this.__setSelectedIndex}"
                >
            </wui-carousel-navigation>
        `
    }

    __setSelectedIndex(event) {
         this.itemIndex = event.detail.selectedIndex;
    }

    __getItems({items = [] , maxItems}, listType) {
        // maximum items to be displayed in the UI.
        const maxAllowed = 4;
        const renderedList = items.slice(0, maxItems || maxAllowed);
        return renderedList.map((item) => {
            if(listType === 'wrapper') {
                const {type, src, altText} = item;
                const listItem = {
                    type,
                    src, 
                    altText
                };
                return listItem;
            }
            if(listType === 'navigationBottom') {
                return item.thumbnail;
            }
        });
    }
}

customElements.define('wui-carousel', WuiCarousel);