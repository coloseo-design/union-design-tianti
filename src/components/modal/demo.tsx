import React, { useState } from 'react';
import Modal from './index';
import Button from '../button';

const ModalDemo: React.FC<unknown> = () => {
  const [visible, setVisible] = useState(false);
  // const [visible1, setVisible1] = useState(false);
  const [confirmLoading, setconfirmLoading] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    // setVisible1(false);
  };

  const handleOk = () => {
    setconfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setconfirmLoading(false);
    }, 2000);
  };

  return (
    <div style={{ padding: 32 }}>
      <div>
        <h2>基本的Modal</h2>
        <Button onClick={handleClick}>open</Button>
      </div>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        title="对话框"
        bodyStyle={{ height: 500 }}
        confirmLoading={confirmLoading}
        centered
      >
        <div>modal基本样式</div>
      </Modal>
    </div>
  );
};

export default ModalDemo;
