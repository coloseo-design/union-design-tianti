/* eslint-disable react/no-array-index-key */
import React from 'react';
import Carousel from './index';

const image = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

const imgList = [image, image, image, image, image, image, image];
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
            {imgList.map((item, index) => (
              <img src={item} alt="" key={index} />
            ))}
          </Carousel>
        </div>
      </div>
      <div style={{ marginBottom: 64 }}>
        <h1>自动播放</h1>
        <div style={{ width: 320, height: 300 }}>
          <Carousel dotPosition="bottom" dotsShape="circle" autoplay>
            {imgList.map((item, index) => (
              <div key={index}>
                <p>
                  第
                  {index + 1}
                  张
                </p>
                <img src={item} alt="" style={{ width: 320, objectFit: 'contain' }} />
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
