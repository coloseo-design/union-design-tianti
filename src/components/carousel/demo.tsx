import React from 'react';
// import { Carousel } from '../index';
import { Carousel } from '../index';
import './styles/index';

const CarouselDemo = () => {
  const beforeChange1 = (from: number, to: number) => {
    console.log('--from', from, to);
  };
  const afterChange = (current: number) => {
    // console.log('=current', current);
  };

  const style = {
    height: 160, width: '100%', backgroundColor: '#364d79', textAlign: 'center', color: '#fff',
  } as any;

  const [childList, setList] = React.useState<any>([]);
  React.useEffect(() => {
    const t = setTimeout(() => {
      clearTimeout(t);
      setList([
        {
          id: '1',
          div: <div style={style}>11</div>,
        },
        {
          id: '2',
          div: <div style={style}>22</div>,
        },
        {
          id: '3',
          div: <div style={style}>33</div>,
        },
      ]);
    }, 1000);
  }, []);

  return (
    <div style={{ margin: 64 }}>
      <div style={{ marginBottom: 64 }}>
        <h1>基本的</h1>
        <div style={{ width: 320, height: 160 }}>
          <Carousel beforeChange={beforeChange1} afterChange={afterChange}>
            {(childList || []).map((item: any) => (
              <div key={item.id}>{item.div}</div>
            ))}
          </Carousel>
        </div>
        <h1>切换效果为渐显</h1>
        <div style={{ width: 320, height: 160 }}>
          <Carousel effect="fade">
            <div style={style}>1</div>
            <div style={style}>2</div>
            <div style={style}>3</div>
            <div style={style}>4</div>
          </Carousel>
        </div>
        <h1>自动播放的</h1>
        <div>
          <Carousel autoplay dotsShape="circle">
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
