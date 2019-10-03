/* TODO - Convert this to TS 
* Add generic interface file.
* Add return type for the functions and use decorators.
* Add tests.
* Add story.
*/
import {LitElement, html, css} from 'lit-element';
import './wui-carousel-image/wui-carousel-image.js';


export class WuiCarouselWrapper extends LitElement {

    static get properties() {
        return {
            carouselItems: { type: Array },
            currentIndex: {type: Number},
            prevIndex: {type: Number},
        };
    }

    static get styles() {
        return css `
            :host {
                display: block;
                position: relative;
            }
            ul {
                display: inline-block;
                list-style: none;
                margin: 0;
                padding: 0;
                position: relative;
                width: 100%;
            }
            #oldCarouselWrapper {
                position: absolute;
                z-index: -1;
            }
            .wui-carousel-counter {
                background : #999999;
                border-radius: 4px;
                bottom: 15px;
                color: #fafafa;
                display: block;
                padding: 5px;
                position: absolute;
                opacity: 0.8;
                right: 15px;
                text-align: center;
                width: 50px; 
            }
            .wui-carousel-button {
                background: #fafafa;
                border: 3px solid #1e1d31;
                border-radius: 50%;
                bottom: 0;
                color: #1e1d31;
                cursor: pointer;
                height: 45px;
                margin: auto;
                position: absolute;
                top: 0;
                width: 45px;
                z-index: 1;
                padding: 0;
            }
            #left {
                left: 15px;
            }
            #right {
                right: 15px;
            }
        `
    }

    render() {
        return html `
        <style>
            
        </style>
        ${this.carouselItems.length > 0 ? html `${this.__getItemsTemplate(this.carouselItems)}`: null}
        ${this.enableCounter && this.carouselItems.length > 0 ? html `
            <div class= 'wui-carousel-counter'>
                ${this.currentIndex + 1} / ${this.carouselItems.length}
            </div>
        `: null}
        ${this.enableArrows && this.carouselItems.length > 0 ? this.__getArrowsTemplate(): null}
        `
    }

    __getArrowsTemplate() {
        return html `
            <button id= 'left' name= 'left' class= 'wui-carousel-button' @click= "${this.__onBtnClick}">left</button>
            <button id= 'right' name= 'right' class= 'wui-carousel-button' @click= "${this.__onBtnClick}">right</button>
        `
    }

    // __getDirection(oldIndex, currentIndex) {
    //     this.direction = (oldIndex || currentIndex < oldIndex )  ? 'left' : 'right';
    //     console.log(this.direction);
    // }

    __getItemsTemplate(items) {
        const templateItems = items.slice();
        return html `
        <ul>
            <li id='oldCarouselWrapper' role='button' aria-hidden = 'true' >${this.__getItemType(templateItems[this.prevIndex])}</li>
            <li id='newCarouselWrapper' role='button' >${this.__getItemType(templateItems[this.currentIndex])}</li>
        </ul>
        `
    }

    __getItemType(item) {
        switch (item.type) {
            case 'image': {
                return html`<wui-carousel-image .imageItem="${item}"></wui-carousel-image>`;
            }
            default : {
                break;
            }
        }
    }

    __onBtnClick(event) {
        const {name} = event.target;
        let currentIndex = 0;
        switch(name) {
            case 'left': {
                if (this.currentIndex > 0 && this.currentIndex < this.carouselItems.length) {
                    currentIndex =this.currentIndex - 1;
                    this.dispatchEvent(new CustomEvent('selected-item', { detail: {selectedIndex: currentIndex}}));
                }
                break;
            }
            case 'right': {
                if (this.currentIndex >= 0 && this.currentIndex < this.carouselItems.length - 1) {
                    currentIndex =this.currentIndex + 1; 
                    this.dispatchEvent(new CustomEvent('selected-item', { detail: {selectedIndex: currentIndex}}));
                }
                break;
            }
            default: 
                break;
        }

    }


}

customElements.define('wui-carousel-wrapper', WuiCarouselWrapper);