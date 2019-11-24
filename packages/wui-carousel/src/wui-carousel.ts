import {LitElement, customElement, html, css, property, TemplateResult} from 'lit-element';
import {ListItem, ImageInterface} from './interfaces/wui-carousel.interface';
import './wui-carousel-wrapper/src/wui-carousel-wrapper';
import './wui-carousel-navigation/src/wui-carousel-navigation';

@customElement('wui-carousel')
export class WuiCarousel extends LitElement{
    private _itemIndex:any;
    @property() carouselItems: ListItem[] = [];
    @property() enableFullScreen = false;
    @property() enableCounter = true;
    @property() enableArrows = true;
    @property() oldItemIndex = 0;
    @property() indicatorType = '';
    @property() maxItems = 0;
    @property() 
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

    __setSelectedIndex(event: {detail: {selectedIndex: number}}): void {
        this.itemIndex = event.detail.selectedIndex;
   }

   __getItems(items : ListItem[] | undefined = [], listType: string) : (ImageInterface | {src: null;altText: null;} | undefined)[]{
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