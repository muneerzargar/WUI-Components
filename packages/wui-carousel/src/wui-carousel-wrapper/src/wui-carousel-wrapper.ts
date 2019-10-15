import {LitElement, property, customElement, html, css, TemplateResult} from 'lit-element';
import {ListItem} from '../../interface/wui-carousel.interface';
import './wui-carousel-image/wui-carousel-image'

@customElement('wui-carousel-wrapper')
export class WuiCarouselWrapper extends LitElement {
    private __touchstartX: number;
    @property() carouselItems: ListItem[]
    @property() currentIndex: number
    @property() prevIndex: number
    @property() enableCounter: boolean
    @property() enableArrows: boolean
   
    static get styles() {
        return css `
            :host {
                display: block;
                position: relative;
                overflow: hidden; 
            }
            ul {
                list-style: none;
                margin: 0;
                padding: 0;
                width: 100%;
            }
            #oldCarousel {
                position: absolute;
                width: 100%;
            }
            #newCarousel {
                position: relative;
                z-index: 1;
            }
            .wui-carousel-counter {
                background : var(--wui-carousel-counter-bg, #999999);
                border-radius: 4px;
                bottom: 15px;
                color: var(--wui-carousel-counter-color, #fafafa);;
                display: block;
                padding: 5px;
                position: absolute;
                opacity: 0.8;
                right: 15px;
                z-index: 1; 
            }
            .wui-carousel-button {
                background: var(--wui-carousel-button-bg, #fafafa);
                border: var(--wui-carousel-button-border, 3px solid #1e1d31); ;
                border-radius: 50%;
                bottom: 0;
                color: var(--wui-carousel-button-color, #1e1d31);
                cursor: pointer;
                height: 45px;
                margin: auto;
                position: absolute;
                top: 0;
                width: 45px;
                z-index: 5;
                padding: 0;
            }
            .wui-carousel-button svg {
                display: block;
                height: 26px;
                width: 23px;
                pointer-events: none;
                padding: 0 8px;
                stroke: var(--wui-carousel-button-stroke, #1e1d31);
                stroke-width: 0px; 
            }   
            #left {
                left: 15px;
            }
            #right {
                right: 15px;
            }
            .wui-old-carousel-slide-out {
                animation: wui-old-carousel-slide-out 700ms forwards;
            }
            .wui-new-carousel-slide-out {
                animation: wui-new-carousel-slide-out 700ms forwards;
            }
            .wui-old-carousel-slide-in {
                animation: wui-old-carousel-slide-in 700ms forwards;
            }
            .wui-new-carousel-slide-in {
                animation: wui-new-carousel-slide-in 700ms forwards;
            }
            @keyframes wui-old-carousel-slide-in {
                0% {
                    transform: translateX(50%);
                }
                100% {
                    transform: translateX(-100%);
                }
                
            }
            @keyframes wui-old-carousel-slide-out {
                0% {
                    transform: translateX(0%);
                }
                100% {
                    transform: translateX(100%);
                }
            }
            @keyframes wui-new-carousel-slide-in {
                0% {
                    transform: translateX(100%);
                }
                100% {
                    transform: translateX(0%);
                }
                
            }
            @keyframes wui-new-carousel-slide-out {
                0% {
                    transform: translateX(-100%);
                }
                100% {
                    transform: translateX(0%);
                }
            }  
        `
    }

    firstUpdated(): void {
        this.__touchstartX = 0;
        this.shadowRoot.querySelector('ul').addEventListener('touchstart', this.__touchstart.bind(this));
        this.shadowRoot.querySelector('ul').addEventListener('touchend', this.__touchend.bind(this));
    }

    updated(): void {
        this.__getAnimationCssClass();
    }

    render(): TemplateResult {
        return html `
        ${this.carouselItems.length > 0 ? html `${this.__getItemsTemplate(this.carouselItems)}`: null}
        ${this.enableCounter && this.carouselItems.length > 0 ? html `
            <div class= 'wui-carousel-counter'>
                ${this.currentIndex + 1} / ${this.carouselItems.length}
            </div>
        `: null}
        ${this.enableArrows && this.carouselItems.length > 0 ? this.__getArrowsTemplate(): null}
        `
    }

    __getItemsTemplate(items: ListItem []): TemplateResult {
        const templateItems = items.slice();
        return html `
        <ul>
            <li id='oldCarousel' role='button' aria-hidden = 'true'>
                ${this.__getItemType(templateItems[this.prevIndex])}
            </li>
            <li id='newCarousel' role='button'>
                ${this.__getItemType(templateItems[this.currentIndex])}
            </li>
        </ul>
        `
    }

    __touchstart(event: { touches: { clientX: number}[]}) : void { 
        this.__touchstartX = event.touches[0].clientX;
    }

    __touchend(event: { changedTouches: { clientX: number}[]}): void {
        const offset = 100;
        if(this.__touchstartX) {
           const touchEnd = event.changedTouches[0].clientX;
            if(touchEnd > this.__touchstartX + offset) {
                this.__onItemChange('right');
            }
            if(touchEnd < this.__touchstartX - offset) {
                this.__onItemChange('left');
            }
        }
    }
 
    __getAnimationCssClass(): void {
        const liGroup = this.shadowRoot.querySelectorAll('li');
        if(this.currentIndex === this.prevIndex) {
            return;
        }
        liGroup.forEach((li)=> {
            const list = li
            list.className = '';
            setTimeout(()=> {
                // right for slide-in, left for slide-out ..
                if(list.id === 'oldCarousel') {
                    list.className = (this.currentIndex < this.prevIndex) ? 'wui-old-carousel-slide-out' : 'wui-old-carousel-slide-in';
                }
                else if(list.id === 'newCarousel') {
                    list.className = (this.currentIndex < this.prevIndex) ? 'wui-new-carousel-slide-out' : 'wui-new-carousel-slide-in';
                }
            }, 0);
        });  
    }

    __getItemType(item: ListItem): TemplateResult {
        switch (item.type) {
            case 'image': {
                return html`<wui-carousel-image .imageItem="${item}"></wui-carousel-image>`;
            }
            default : {
                break;
            }
        }
    }

    __getArrowsTemplate(): TemplateResult {
        return html `
            <button id= 'left' name= 'left' class= 'wui-carousel-button' @click= "${(event: { target: { name: string}}) => this.__onItemChange(event.target.name)}">
                <svg viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" 
                    focusable="false">
                    <g viewBox="0 0 16 16">
                        <path d="M11.5,3.591L9.969,2L4.711,7.469C4.572,7.615,4.5,7.808,4.5,8s0.072,0.385,0.211,0.531L9.969,14l1.53-1.591L7.262,8L11.5,3.591z"></path>
                    </g>
                </svg>  
            </button>
            <button id= 'right' name= 'right' class= 'wui-carousel-button' @click= "${(event: { target: { name: string}}) => this.__onItemChange(event.target.name)}">
                <svg viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" 
                    focusable="false">
                    <g viewBox="0 0 16 16">
                        <path d="M11.288,7.469L6.03,2L4.5,3.591L8.739,8L4.5,12.409L6.03,14l5.258-5.469C11.43,8.385,11.5,8.192,11.5,8S11.43,7.615,11.288,7.469z"></path>
                    </g>
                </svg>
            </button>
        `
    }

    __onItemChange(direction : string): void {
        let currentIndex = 0;
        switch(direction) {
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
