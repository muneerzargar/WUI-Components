import {LitElement, customElement, html, css, property} from 'lit-element';
import {ListItem, SelectedItem, Thumbnail} from './types/wui-carousel.types';
import './wui-carousel-wrapper/src/wui-carousel-wrapper.js';
import './wui-carousel-navigation/src/wui-carousel-navigation.js';

@customElement('wui-carousel')
export class WuiCarousel extends LitElement{
    private _itemIndex:number;
    @property({type: Array}) carouselItems: [] = [];
    @property({type: Boolean}) enableFullScreen: boolean = false;
    @property({type: Boolean}) enableCounter: boolean = true;
    @property({type: Boolean}) enableArrows: boolean = true;
    @property({type: String}) indicatorType: String;
    @property({type: Number}) maxItems: number;
    @property({type: Number}) oldItemIndex: number = 0;
    @property({type: Number}) 
    public get itemIndex(): number {
        return this._itemIndex;
    }
    public set itemIndex(value: number) {
        const oldValue: number = this.itemIndex;
        this.oldItemIndex = oldValue;
        this._itemIndex = value;
        this.requestUpdate('itemIndex', oldValue);
    }
    
    static get styles() {
        return css `
            .wui-carousel {
                display: block;
            }
        `
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

    __setSelectedIndex(event: SelectedItem): void {
        this.itemIndex = event.detail.selectedIndex;
   }

   __getItems(items : ListItem[] = [], listType: string): ListItem[] | Thumbnail[] {
       // maximum items to be displayed in the UI.
       const maxAllowed: number =  this.maxItems ?? 4;
       const renderedList = items.slice(0, maxAllowed);
       return renderedList.map((item) => {
           if(listType === 'wrapper') {
               const {type, src, altText} = item;
               const listItem : ListItem = {
                   type,
                   src, 
                   altText
               };
               return listItem;
           }
           if(listType === 'navigationBottom') {
               return item.thumbnail ?? {src: '', altText: ''};
           }
       });
   }
    
}

