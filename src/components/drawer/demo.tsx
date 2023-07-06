import React, { useCallback, useState } from 'react';
import { Drawer } from '../index';
import { DrawerPlacement } from './drawer';
// import './styles/index';

const DrawerDemo = () => {
  const [drawerVisible1, setDrawerVisible1] = useState(false);
  const [drawerVisible2, setDrawerVisible2] = useState(false);
  const [drawerVisible3, setDrawerVisible3] = useState(false);

  const [placement, setPlacement] = useState<DrawerPlacement>('right');

  const onChange = useCallback((e: unknown) => setPlacement(e.target.value), []);

  return (
    <div style={{
      padding: '10px 50px', display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start',
    }}
    >

      <form style={{ fontSize: 22, cursor: 'default' }}>
        <input type="radio" name="placement" value="top" onChange={onChange} checked={placement === 'top'} />
        {' '}
        top
        <input type="radio" name="placement" value="right" onChange={onChange} checked={placement === 'right'} />
        {' '}
        right
        <input type="radio" name="placement" value="bottom" onChange={onChange} checked={placement === 'bottom'} />
        {' '}
        bottom
        <input type="radio" name="placement" value="left" onChange={onChange} checked={placement === 'left'} />
        {' '}
        left
      </form>
      <h1>多级抽屉</h1>
      <button
        type="button"
        onClick={() => {
          setDrawerVisible1(!drawerVisible1);
        }}
      >
        open drawer many level
      </button>
      <Drawer
        visible={drawerVisible1}
        title="一级抽屉"
        placement={placement}
        onClose={() => setDrawerVisible1(false)}
      >
        一级抽屉
        <button
          type="button"
          onClick={() => {
            setDrawerVisible2(!drawerVisible2);
          }}
        >
          next
        </button>

        <Drawer
          visible={drawerVisible2}
          title="二级抽屉"
          placement={placement}
          onClose={() => setDrawerVisible2(false)}
        >
          二级抽屉
          <button
            type="button"
            onClick={() => {
              setDrawerVisible3(!drawerVisible3);
            }}
          >
            next
          </button>

          <Drawer
            visible={drawerVisible3}
            title="三级抽屉"
            placement={placement}
            onClose={() => setDrawerVisible3(false)}
          >
            三级抽屉
          </Drawer>
        </Drawer>
      </Drawer>
    </div>
  );
};

export default DrawerDemo;
