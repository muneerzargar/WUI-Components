# wui-carousel

wui-carousel component is JSON/data driven generic component which takes array of objects as input and renders a carousel component in UI. The differentiaition is done on the basis of **"Type"** within each object of the array.

`<wui-carousel></wui-carousel>`

# Example

`<wui-carousel></wui-carousel>`

```css
  <style>
    wui-carousel {
      --wui-carousel-counter-bg: rgb(90, 80, 80);
      --wui-carousel-counter-color: black;
       --wui-carousel-button-bg: blue;
      --wui-carousel-button-border: 1px solid black;
       --wui-carousel-button-color: orange;
       --wui-carousel-button-stroke: #1e1d31;
       --wui-carousel-nav-active-item-thumb: 3px solid #ff5900
       --wui-carousel-navigation-shadow: 0px 4px 10px 2px rgba(168,166,168,1);
       --wui-carousel-nav-active-item-thumb-border: purple;
       /* Use when indicatorType = custom*/
       --wui-carousel-custom-nav-active-bg: black;
       --wui-carousel-align-navigation: center;
    }
    /* Use when indicatorType = custom*/
    wui-carousel::part(wui-carousel-custom-nav) {
      background: green;
    }
  </style>
```

```javascript
<script>
((browser)=> {

  const carouselData = {
    items: [
      {
        type:'image',
        src: 'https://cdn.pixabay.com/photo/2016/11/19/15/32/business-1839876_1280.jpg',
        altText: 'code image',
        thumbnail: {
          src: 'https://cdn.pixabay.com/photo/2016/11/19/15/32/business-1839876_1280.jpg',
          altText: 'code thumb',
        }
      },
      {
        type:'image',
        src: 'https://cdn.pixabay.com/photo/2016/03/09/09/17/computer-1245714_1280.jpg',
        altText: 'image windows',
        thumbnail: {
          src: 'https://cdn.pixabay.com/photo/2016/03/09/09/17/computer-1245714_1280.jpg',
          altText: 'thumb2',
        }
      },
      {
        type:'image',
        src: 'https://cdn.pixabay.com/photo/2016/11/19/15/32/business-1839876_1280.jpg',
        altText: 'code image',
        thumbnail: {
          src: 'https://cdn.pixabay.com/photo/2016/11/19/15/32/business-1839876_1280.jpg',
          altText: 'code thumb',
        }
      },
      {
        type:'image',
        src: 'https://cdn.pixabay.com/photo/2016/03/09/09/17/computer-1245714_1280.jpg',
        altText: 'image windows',
        thumbnail: {
          src: 'https://cdn.pixabay.com/photo/2016/03/09/09/17/computer-1245714_1280.jpg',
          altText: 'thumb2',
        }
      },
      {
        type:'image',
        src: 'https://cdn.pixabay.com/photo/2016/11/19/15/32/business-1839876_1280.jpg',
        altText: 'code image',
        thumbnail: {
          src: 'https://cdn.pixabay.com/photo/2016/11/19/15/32/business-1839876_1280.jpg',
          altText: 'code thumb',
        }
      }
    ],
    enableFullScreen: true,
    enableCounter: true,
    enableArrows: true,
    indicatorType: 'thumbnail'

  }

  const element = browser.document.querySelector('wui-carousel');
  element.carouselItems = carouselData.items;
  element.enableCounter = carouselData.enableCounter;
  element.enableArrows = carouselData.enableArrows;
  element.indicatorType = carouselData.indicatorType;

})(window);
</script>
```
