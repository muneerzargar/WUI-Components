# wui-carousel
wui-carousel component is JSON/data driven generic component which takes array of objects as input and renders a carousel component in UI. The differentiaition is done on the basis of <strong> "Type"</strong> within each object of the array.

`<wui-carousel></wui-carousel>`

# Example
`<wui-carousel></wui-carousel>`
```
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
    enableIndicators: false,
    enableThumbnails: true

  }

  const element = browser.document.querySelector('wui-carousel');
  element.carouselConfig = carouselData;
  console.log(element.carouselconfig);

})(window);
</script>
```
# Scripts
* Add npm scripts for installation...

# TODO 
* Add maximum slides to be present.
* Add icons for left and right.
* Add indicators type for bottom navigation.
* Add default animation.
* Add css mixins.
* Add tests.
* Add story.

# After TODO.
* set up npm package and publish.

# Release 1.0.0
* Check if custom Animation is supported out of box with mixins or other solution is needed. 
* Verify and add the desired animation.
* Add Typescript.
* Add generic interface file.
* Add return type for the functions and use decorators.

# Release 1.1.0
* Add support for html tags.
* Add support for full screen such that z-index of the component takes top precedence. 
* Add support for Video.

# Near Future (After release)
* Add A11Y aka accessibility.
* Pre-fetch and pre-load images for performance optimization
* Add lazy loading of images in carousel and in navigation.
* Add indicators when type is thumbnail such that we accept a configuartion of max elements per batch.
* Dispatch event up notifying the component is loaded in DOM for computation of scroll positions if ever needed.
* Room for more :)

