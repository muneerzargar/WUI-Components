import {LitElement, html} from 'lit-element';
import './wui-carousel-wrapper/src/wui-carousel-wrapper.js';
import './wui-carousel-navigation/src/wui-carousel-navigation.js';

export class WuiCarousel extends LitElement {
    
    static get properties() {
        return {
            carouselConfig : {type: Object },
            itemIndex: {type: Number}
        }
    }

    constructor() {
        super();
        this.carouselConfig = {};
        this.itemIndex = 0;
    }

    render() {
        return html `
            <wui-carousel-wrapper 
                .carouselItems= "${this.__getItems(this.carouselConfig.items, 'wrapper')}"
                .currentIndex= "${this.itemIndex}"
            >
            </wui-carousel-wrapper>
            <wui-carousel-navigation 
                .navigationItems= "${this.__getItems(this.carouselConfig.items, 'navigationBottom')}"
                .currentItemIndex= "${this.itemIndex}"
                @selected-item=${this.__getSelectedIndex}
                >
            </wui-carousel-navigation>
        `
    }

    __getSelectedIndex(event) {
        this.itemIndex = event.detail.selectedIndex;
    }

    __getItems(list = [] , listType) {
        return list.map((item) => {
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