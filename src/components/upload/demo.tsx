import React from 'react';
import { Upload } from '../index';
// import './styles/index';

const UploadDemo = () => {
  const common = {
    action: 'http://192.168.0.102:3000/upload',
  };
  return (
    <div style={{
      padding: '30px 40px',
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'flex-start',
    }}
    >
      <h1 style={{ margin: 20 }}>listType=&quot;text&quot;</h1>
      <div style={{ width: 300 }}>
        <Upload.Button
          {...common}
          listType="text"
          btnDesc="支持扩展名：.rar .zip .doc .docx .pdf .jpg..."
        />
      </div>
      <h1 style={{ margin: 20 }}>listType=&quot;picture-card&quot;</h1>
      <div style={{ width: 400 }}>
        <Upload.Card
          {...common}
          listType="picture-card"
          btnDesc="支持扩展名.jpg"
        />
      </div>
      <h1 style={{ margin: 20 }}>listType=&quot;picture&quot;</h1>
      <div style={{ width: 384 }}>
        <Upload.Drag
          {...common}
          listType="text"
          btnDesc="支持扩展名：.rar .zip .doc .docx .pdf .jpg..."
        />
      </div>
    </div>
  );
};

export default UploadDemo;
