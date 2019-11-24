import {LitElement, customElement, html, css, property, TemplateResult} from 'lit-element';
import {ListItem, ImageInterface} from './Interfaces/wui-carousel.interfaces';
import './wui-carousel-wrapper/src/wui-carousel-wrapper';
import './wui-carousel-navigation/src/wui-carousel-navigation';

@customElement('wui-carousel')
export class WuiCarousel extends LitElement{
    @property() carouselItems: ListItem[] = [];
    @property() enableFullScreen: boolean = false;
    @property() enableCounter: boolean = true;
    @property() enableArrows: boolean = true;
    @property() oldItemIndex: number = 0;
    @property() indicatorType: string;
    @property() maxItems: number;
    private _itemIndex:number = 0;
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

    render(): TemplateResult {
        return html `
            <div class= "wui-carousel">
                <wui-carousel-wrapper 
                    .carouselItems= "${this.__getItems(this.carouselItems, 'wrapper')}"
                    .currentIndex= "${this.itemIndex}"
                    .prevIndex="${this.oldItemIndex}"
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

    __setSelectedIndex(event: {detail: {selectedIndex: number}}): void {
        this.itemIndex = event.detail.selectedIndex;
   }

   __getItems(items : ListItem [] = [], listType: string): ListItem[] | ImageInterface[] {
       // maximum items to be displayed in the UI.
       const maxAllowed: number =  this.maxItems ?? 4;
       const renderedList = items.slice(0, maxAllowed);
       return renderedList.map((item: ListItem) => {
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
               return item.thumbnail ?? {src: null, altText: null};
           }
       });
   }
    
}

