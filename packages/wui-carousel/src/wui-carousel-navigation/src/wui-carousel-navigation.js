import {LitElement, html, css} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map.js';
import '../../wui-carousel-wrapper/src/wui-carousel-image/wui-carousel-image.js';


export class WuiCarouselNavigation extends LitElement {
    static get properties() {
        return {
            navigationItems: { type: Array },
            currentItemIndex: {type: Number},
            activeClass: {type: Boolean},
            indicatorType: {type: String},
        };
    }

    static get styles() {
        return css `
            :host {
                display: block;
            }
            ul {
                display: flex;
                justify-content: left;
                padding: 0 2px;
                list-style: none;
                margin: 15px 0;
                max-height: 100px;
            }
            li {
                cursor: pointer;
                margin-left: 16px;
                max-width: 122px;
                opacity: 0.7;
            }
            li:first-child {
                margin-left: 0;
            }
            wui-carousel-image, .wui-carousel-custom-nav {
                display: block;
                box-shadow: 0px 4px 10px 2px rgba(168,166,168,1);
            }
            .wui-carousel-custom-nav {
                background: #adadad;
                border-radius: 50%;
                cursor: pointer;
                height: 18px;
                width: 18px; 
            }
            .wui-carousel-custom-nav input[type = "radio"] {
                visibility : hidden;
            }
            
            .wui-carousel-active-item {
                opacity: 1;
                position: relative;
            }
            
            .wui-carousel-active-item .wui-carousel-custom-nav {
                background: #333333;
            }
            .wui-carousel-active-item__selected {
                bottom: 0;
                border-bottom: 4px solid #ff5900;
                position: absolute;
                width: 100%;
            }
        `
    }
    

    constructor() {
        super();
        this.activeClass = false;
    }

    render() {
        return html `
        ${(this.indicatorType) && this.navigationItems && this.navigationItems.length > 0 ? this.__getItemsTemplate(this.navigationItems) : null }
        `
    }

    __getItemsTemplate(items) {
        const templateItems = items.slice();
        return html `
        <ul>
            ${templateItems.map((item, index) => html `
                <li class= "${classMap({'wui-carousel-active-item': this.currentItemIndex === index})}" role= 'button' 
                    @click= "${() => this.__onNavigationClick(index)}">
                        ${this.__getIndicatorList(item, index)}
                </li>`
            )}
        </ul>
        `
    }

    __getIndicatorList(item, key) {
        switch(this.indicatorType) {
            case 'thumbnail': {
                return html `
                    <wui-carousel-image .imageItem="${item}"></wui-carousel-image>
                    <!-- check better way. -->
                    ${this.currentItemIndex === key ?
                        html`<div class="wui-carousel-active-item__selected"></div>`:
                        null
                    }
                `
            }
            case 'custom': {
                return html `
                    <label class="wui-carousel-custom-nav">
                        <input type="radio" name="indicator" value= "${key}">
                    </label>
                `
            }
            default: 
                break;
        }
    }

    __onNavigationClick(currentIndex) {
        this.dispatchEvent(new CustomEvent('selected-item', { detail: {selectedIndex: currentIndex}}));
    }



}

customElements.define('wui-carousel-navigation', WuiCarouselNavigation);