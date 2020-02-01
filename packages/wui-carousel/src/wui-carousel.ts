import { LitElement, customElement, html, css, property, TemplateResult } from 'lit-element';
import { ListItem, ImageInterface } from './Interfaces/wui-carousel.interfaces';
import './wui-carousel-wrapper/src/wui-carousel-wrapper';
import './wui-carousel-navigation/src/wui-carousel-navigation';

@customElement('wui-carousel')
export class WuiCarousel extends LitElement {
  @property({ type: Array }) carouselItems: ListItem[] = [];
  @property({ type: Boolean }) enableFullScreen = false;
  @property({ type: Boolean }) enableCounter: any;
  @property({ type: Boolean }) enableArrows: any;
  @property({ type: Number }) oldItemIndex = 0;
  @property({ type: String }) indicatorType = '';
  @property({ type: Number }) maxItems: number | undefined;
  private _itemIndex: number = 0;
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
    return css`
      .wui-carousel {
        display: block;
      }
    `;
  }

  render(): TemplateResult {
    return html`
      <div class="wui-carousel">
        <wui-carousel-wrapper
          .carouselItems="${this.__getItems(this.carouselItems, 'wrapper')}"
          .currentIndex="${this.itemIndex}"
          .prevIndex="${this.oldItemIndex}"
          .enableCounter="${this.enableCounter}"
          .enableArrows="${this.enableArrows}"
          @selected-item="${this.__setSelectedIndex}"
        >
        </wui-carousel-wrapper>
        <wui-carousel-navigation
          .navigationItems="${this.__getItems(this.carouselItems, 'navigationBottom')}"
          .currentItemIndex="${this.itemIndex}"
          .indicatorType="${this.indicatorType}"
          @selected-item="${this.__setSelectedIndex}"
          exportparts="wui-carousel-custom-nav: wui-carousel-custom-nav"
        >
        </wui-carousel-navigation>
      </div>
    `;
  }

  private __setSelectedIndex(event: { detail: { selectedIndex: number } }): void {
    this.itemIndex = event.detail.selectedIndex;
  }

  //TODO: Fix return type here .

  private __getItems(items: ListItem[] = [], listType: string) {
    const maxAllowed: number = this.maxItems ?? 4;
    const renderedList = items.slice(0, maxAllowed);
    return renderedList.map((item: ListItem) => {
      if (listType === 'wrapper') {
        const { type, src, altText } = item;
        const listItem: ListItem = {
          type,
          src,
          altText,
        };
        return listItem;
      } else if (listType === 'navigationBottom') {
        const defaultNav: ImageInterface = { src: '', altText: 'null' };
        return item.thumbnail ?? defaultNav;
      }
    });
  }
}
