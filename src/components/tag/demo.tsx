import React from 'react';
import Tag from './index';
import Input from '../input/index';
import Icon from '../icon';

class EditableTagGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ['标签1', '标签2', '标签3'],
      inputVisible: false,
      inputValue: '',
    };
  }

  handleClose = (removedTag) => {
    const { tags } = this.state;
    tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true });
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <>
        {tags.map((tag, index) => {
          const tagElem = (
            <Tag
              className="edit-tag"
              key={tag}
              closable={index !== 0}
              onClose={() => this.handleClose(tag)}
            >
              <span>
                {tag}
              </span>
            </Tag>
          );
          return tagElem;
        })}
        {inputVisible && (
          <Input
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
            style={{
              width: '20px',
              height: '22px',
              marginRight: '8px',
              verticalAlign: 'top',
            }}
          />
        )}
        {!inputVisible && (
          <Tag style={{ background: '#fff', borderStyle: 'dashed' }} icon={<Icon type="add" />} onClick={this.showInput}>
            标签
          </Tag>
        )}
      </>
    );
  }
}
const TagDemo = () => (
  <>
    <div style={{ margin: 20 }}>
      <Tag color="gold" closable>测试测试测试测试测试测试测试</Tag>
    </div>
    <div style={{ margin: 20 }}>
      <Tag color="gold">金色</Tag>
      <Tag color="green">绿色</Tag>
      <Tag color="blue">蓝色</Tag>
      <Tag color="red">红色</Tag>
    </div>
    <div style={{ margin: 20 }}>
      <EditableTagGroup />
    </div>
  </>
);

export default TagDemo;
