import React from 'react';
import { Carousel } from '../index';

const CarouselDemo = () => {
  const beforeChange = (from: number, to: number) => {
    console.log('--from', from, to);
  };
  const style = {
    height: 160, width: '100%', backgroundColor: '#364d79', textAlign: 'center', color: '#fff',
  };
  return (
    <div style={{ margin: 64 }}>
      <div style={{ marginBottom: 64 }}>
        <h1>基本的</h1>
        <div style={{ width: 320, height: 160 }}>
          <Carousel beforeChange={beforeChange}>
            <div style={style}>1</div>
            <div style={style}>2</div>
            <div style={style}>3</div>
            <div style={style}>4</div>
          </Carousel>
        </div>
      </div>
      <div style={{ marginBottom: 64 }}>
        <h1>切换效果为渐显</h1>
        <div style={{ width: 320, height: 160 }}>
          <Carousel beforeChange={beforeChange} effect="fade">
            <div style={style}>1</div>
            <div style={style}>2</div>
            <div style={style}>3</div>
            <div style={style}>4</div>
          </Carousel>
        </div>
      </div>
      <div style={{ marginBottom: 64 }}>
        <h1>自动播放的</h1>
        <div style={{ width: 320, height: 160 }}>
          <Carousel beforeChange={beforeChange} autoplay dotsShape="circle">
            <div style={style}>1</div>
            <div style={style}>2</div>
            <div style={style}>3</div>
            <div style={style}>4</div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CarouselDemo;
