import {LitElement, html, css} from 'lit-element';
import './wui-carousel-wrapper/src/wui-carousel-wrapper.js';
import './wui-carousel-navigation/src/wui-carousel-navigation.js';

export class WuiCarousel extends LitElement {
    
    static get properties() {
        return {
            carouselItems : {type: Array },
            enableFullScreen: {type: Boolean},
            enableCounter: {type: Boolean},
            enableArrows: {type: Boolean},
            indicatorType: {type: String}, 
            maxItems: {type: Number},
            itemIndex: {type: Number},
        }
    }

    static get styles() {
        return css `
            .wui-carousel {
                display: block;
            }
        `
    }

    constructor() {
        super();
        this.carouselItems = [];
        this.itemIndex = 0;
        this.oldItemIndex = 0;
        this.enableArrows = true;
        this.enableCounter = true;
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
            <div class= "wui-carousel">
                <wui-carousel-wrapper 
                    .carouselItems= "${this.__getItems(this.carouselItems, 'wrapper')}"
                    .currentIndex= "${this.itemIndex}"
                    .prevIndex="${this.oldItemIndex }"
                    .enableCounter= "${this.enableCounter}"
                    .enableArrows= "${this.enableArrows}"
                    @selected-item= "${this.__setSelectedIndex}"
                >
                </wui-carousel-wrapper>
                <wui-carousel-navigation 
                    .navigationItems= "${this.__getItems(this.carouselItems, 'navigationBottom')}"
                    .currentItemIndex= "${this.itemIndex}"
                    .indicatorType= "${this.indicatorType}"
                    @selected-item= "${this.__setSelectedIndex}"
                    exportparts="wui-carousel-custom-nav: wui-carousel-custom-nav"
                    >
                </wui-carousel-navigation>
            </div>
        `
    }

    __setSelectedIndex(event) {
         this.itemIndex = event.detail.selectedIndex;
    }

    __getItems(items = [], listType) {
        // maximum items to be displayed in the UI.
        const maxAllowed = (this.maxItems !== undefined ) ? this.maxItems : 4;
        const renderedList = items.slice(0, maxAllowed);
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