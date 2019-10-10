
import { storiesOf } from '@storybook/html';
import { withKnobs, object, boolean, number } from '@storybook/addon-knobs';
import markdownNotes from '../../README.md';

  import '../wui-carousel';

    const carouselData = {
        items: [
            {
            type:'image',
            src: 'https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_1280.jpg',
            altText: 'nature 1',
                thumbnail: {
                    src: 'https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_1280.jpg',
                    altText: 'thumb 1',
                }
            },
            {
            type:'image',
            src: 'https://cdn.pixabay.com/photo/2014/09/07/22/17/forest-438432_1280.jpg',
            altText: 'nature 2',
                thumbnail: {
                    src: 'https://cdn.pixabay.com/photo/2014/09/07/22/17/forest-438432_1280.jpg',
                    altText: 'thumb 2',
                }
            },
            {
                type:'image',
                src: 'https://cdn.pixabay.com/photo/2016/07/22/16/29/fog-1535201_1280.jpg',
                altText: 'nature 3',
                thumbnail: {
                  src: 'https://cdn.pixabay.com/photo/2016/07/22/16/29/fog-1535201_1280.jpg',
                  altText: 'thumb 3',
                }
              },
              {
                type:'image',
                src: 'https://image.shutterstock.com/image-photo/forest-road-green-foggy-sun-260nw-569035624.jpg',
                altText: 'nature 4',
                thumbnail: {
                  src: 'https://image.shutterstock.com/image-photo/forest-road-green-foggy-sun-260nw-569035624.jpg',
                  altText: 'thumb 4',
                }
              },
              {
                type:'image',
                src: 'https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_1280.jpg',
                altText: 'nature 5',
                thumbnail: {
                  src: 'https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_1280.jpg',
                  altText: 'thumb 5',
                }
              }
        ],
        enableFullScreen: true,
        enableCounter: true,
        enableArrows: true,
        indicatorType: 'thumbnail', //thumbnail/ custom where custom is adding custom css to indicators which are radios at core with default css.
        maxItems: 5
    }
  
  storiesOf('wui-carousel | component', module)
    .addDecorator(withKnobs)
    .add('Default', ()=> {
        const wuiCarousel = document.createElement('wui-carousel');
        wuiCarousel.style.width = '700px';
        wuiCarousel.style.display = 'block';
        wuiCarousel.carouselItems = carouselData.items;
        wuiCarousel.maxItems = 5;
        return wuiCarousel;
        
    })
    .add('with options', ()=> {
        const carousel = object('carouselItems', carouselData.items);
        const enableCounter = boolean('enableCounter', carouselData.enableCounter);
        const enableArrows = boolean('enableArrows', carouselData.enableArrows);
        const maxItems = number('maxItems', 2);
        const wuiCarousel = document.createElement('wui-carousel');
        wuiCarousel.style.width = '700px';
        wuiCarousel.style.display = 'block';
        wuiCarousel.carouselItems = carousel;
        wuiCarousel.maxItems = maxItems;
        wuiCarousel.enableCounter = enableCounter;
        wuiCarousel.enableArrows = enableArrows;
        return wuiCarousel;
        
    })
    .add('with thumbnails', ()=> {
        const carousel = object('carouselItems', carouselData.items);
        const enableCounter = boolean('enableCounter', carouselData.enableCounter);
        const enableArrows = boolean('enableArrows', carouselData.enableArrows);
        const wuiCarousel = document.createElement('wui-carousel');
        wuiCarousel.style.width = '700px';
        wuiCarousel.style.display = 'block';
        wuiCarousel.carouselItems = carousel;
        wuiCarousel.enableCounter = enableCounter;
        wuiCarousel.enableArrows = enableArrows;
        wuiCarousel.indicatorType = 'thumbnail';
        return wuiCarousel;
        
    })
    .add('with custom/radio', ()=> {
        const carousel = object('carouselItems', carouselData.items);
        const enableCounter = boolean('enableCounter', carouselData.enableCounter);
        const enableArrows = boolean('enableArrows', carouselData.enableArrows);
        const wuiCarousel = document.createElement('wui-carousel');
        wuiCarousel.style.width = '700px';
        wuiCarousel.style.display = 'block';
        wuiCarousel.carouselItems = carousel;
        wuiCarousel.enableCounter = enableCounter;
        wuiCarousel.enableArrows = enableArrows;
        wuiCarousel.indicatorType = 'custom';
        return wuiCarousel;
        
    })
    .add('With Markdown', () => {
        const carousel = object('carouselItems', carouselData.items);
        const enableCounter = boolean('enableCounter', carouselData.enableCounter);
        const enableArrows = boolean('enableArrows', carouselData.enableArrows);
        const wuiCarousel = document.createElement('wui-carousel');
        wuiCarousel.style.width = '700px';
        wuiCarousel.style.display = 'block';
        wuiCarousel.carouselItems = carousel;
        wuiCarousel.enableCounter = enableCounter;
        wuiCarousel.enableArrows = enableArrows;
        wuiCarousel.indicatorType = 'thumbnail';
        return wuiCarousel;
    } , {
        notes: { markdown: markdownNotes },
    });