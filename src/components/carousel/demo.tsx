import React from 'react';
import { Carousel } from '../index';

const image = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

const imgList = [
  {
    id: '1', src: image,
  },
  {
    id: '2', src: image,
  },
  {
    id: '3', src: image,
  },
  {
    id: '4', src: image,
  },
  {
    id: '5', src: image,
  },
  {
    id: '6', src: image,
  },
];
const CarouselDemo = () => {
  const beforeChange = (from: number, to: number) => {
    console.log('--from', from, to);
  };
  return (
    <div style={{ margin: 64 }}>
      <div style={{ marginBottom: 64 }}>
        <h1>基本的</h1>
        <div style={{ width: 320, height: 160 }}>
          <Carousel beforeChange={beforeChange}>
            <div style={{ height: 160, width: '100%', backgroundColor: '#364d79' }}>
              <div style={{
                textAlign: 'center', color: '#fff', height: 160, width: '100%', backgroundColor: '#364d79',
              }}
              >
                1
              </div>
            </div>
            <div style={{ height: 160, width: '100%', backgroundColor: '#364d79' }}>
              <div style={{
                height: 160, textAlign: 'center', width: '100%', backgroundColor: '#364d79', color: '#fff',
              }}
              >
                2
              </div>
            </div>
            <div style={{ height: 160, width: '100%', backgroundColor: '#364d79' }}>
              <div style={{
                height: 160, textAlign: 'center', width: '100%', backgroundColor: '#364d79', color: '#fff',
              }}
              >
                3
              </div>
            </div>
            <div style={{ height: 160, width: '100%', backgroundColor: '#364d79' }}>
              <div style={{
                height: 160, textAlign: 'center', width: '100%', backgroundColor: '#364d79', color: '#fff',
              }}
              >
                4
              </div>
            </div>
            <div style={{ height: 160, width: '100%', backgroundColor: '#364d79' }}>
              <div style={{
                height: 160, textAlign: 'center', width: '100%', backgroundColor: '#364d79', color: '#fff',
              }}
              >
                5
              </div>
            </div>
            <div style={{ height: 160, width: '100%', backgroundColor: '#364d79' }}>
              <div style={{
                height: 160, textAlign: 'center', width: '100%', backgroundColor: '#364d79', color: '#fff',
              }}
              >
                6
              </div>
            </div>
          </Carousel>
        </div>
      </div>
      <div style={{ marginBottom: 64 }}>
        <h1>切换效果为渐显</h1>
        <div style={{ width: 320, height: 300 }}>
          <Carousel dotPosition="bottom" effect="fade">
            {imgList.map((item) => (
              <img src={item.src} alt="" key={item.id} />
            ))}
          </Carousel>
        </div>
      </div>
      <div style={{ marginBottom: 64 }}>
        <h1>自动播放</h1>
        <div style={{ width: 320, height: 300 }}>
          <Carousel dotPosition="bottom" dotsShape="circle" autoplay>
            {imgList.map((item, index) => (
              <div key={item.id}>
                <p>
                  第
                  {index + 1}
                  张
                </p>
                <img src={item.src} alt="" style={{ width: 320, objectFit: 'contain' }} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <h1 style={{ marginTop: 64 }}>竖向滚动</h1>
      <div style={{ width: '100%', height: 160 }}>
        <Carousel dotPosition="left" dotsShape="circle">
          <div style={{ height: 160, width: '100%', backgroundColor: '#364d79' }}>
            <div style={{
              textAlign: 'center', color: '#fff', height: 160, width: '100%', backgroundColor: '#364d79',
            }}
            >
              1
            </div>
          </div>
          <div style={{ height: 160, width: '100%', backgroundColor: '#364d79' }}>
            <div style={{
              height: 160, textAlign: 'center', width: '100%', backgroundColor: '#364d79', color: '#fff',
            }}
            >
              2
            </div>
          </div>
          <div style={{ height: 160, width: '100%', backgroundColor: '#364d79' }}>
            <div style={{
              height: 160, textAlign: 'center', width: '100%', backgroundColor: '#364d79', color: '#fff',
            }}
            >
              3
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselDemo;
