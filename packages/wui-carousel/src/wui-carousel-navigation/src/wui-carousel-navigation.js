import {LitElement, html, css} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map.js';
import '../../wui-carousel-wrapper/src/wui-carousel-image/wui-carousel-image.js';


export class WuiCarouselNavigation extends LitElement {
    static get properties() {
        return {
            navigationItems: { type: Array },
            currentItemIndex: {type: Number},
            activeClass: {type: Boolean},
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
                opacity: 0.8;
            }
            li:first-child {
                margin-left: 0;
            }
            wui-carousel-image {
                display: block;
                box-shadow: 0px 4px 10px 2px rgba(168,166,168,1);
            }
            .wui-carousel-active-item {
                opacity: 1;
                position: relative;
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
        ${this.navigationItems && this.navigationItems.length > 0 ? this.__getItemsTemplate(this.navigationItems) : null }
        `
    }

    __getItemsTemplate(items) {
        const templateItems = items.slice();
        return html `
        <ul>
            ${templateItems.map((item, index) => html `
                <li class= "${classMap({'wui-carousel-active-item': this.currentItemIndex === index})}" role= 'button' 
                    @click= "${() => this.__onNavigationClick(index)}">
                        <wui-carousel-image .imageItem="${item}"></wui-carousel-image>
                        <!-- check better way. -->
                        ${this.currentItemIndex === index ?
                            html`<div class="wui-carousel-active-item__selected"></div>`:
                            null
                        }
                </li>`
            )}
        </ul>
        `
    }


    __onNavigationClick(currentIndex) {
        this.dispatchEvent(new CustomEvent('selected-item', { detail: {selectedIndex: currentIndex}}));
    }



}

customElements.define('wui-carousel-navigation', WuiCarouselNavigation);