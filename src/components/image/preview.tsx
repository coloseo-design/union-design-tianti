/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon';
import { context } from './previewGroup';

export interface PreviewProps {
  onVisibleChange?: (visible: unknown, prevVisible: unknown) => void;
  getContainer?: string | HTMLElement | (() => HTMLElement); // V4.8.0
  src?: string; // V4.10.0
  mask?: React.ReactNode; // V4.9.0
  maskClassName?: string; // V4.11.0
  current?: number; // V4.12.0 仅支持 PreviewGroup。
  prefixCls?: string;
  previewUrls?: unknown[];
}

export interface PreviewState {
  /** 列表数据源 */
  src?: string;
  /** 放大缩小的倍数 */
  scaleX: number;
  /** 是否可以再缩小 */
  disabled?: boolean;
  /** 旋转的角度值 */
  angle: number;
  current?: number; // V4.12.0 仅支持 PreviewGroup。
  position: {
    x: number,
    y: number
  },
  moving?: boolean;
  originPositionRef: {
    originX: number,
    originY: number,
    deltaX: number,
    deltaY: number,
  }
}

class PreView extends Component<PreviewProps, PreviewState> {
  static defaultProps: PreviewProps | PreviewState = {
    src: '',
    scaleX: 1,
    disabled: true,
    angle: 0,
    previewUrls: [],
    current: 0,
  };

  static contextType = context;

  // static getDerivedStateFromProps(props: PreviewProps, state: PreviewState) {
  //   if (props.src !== state.src) {
  //     return {
  //       src: props.src,
  //     };
  //   }
  //   return null;
  // }

  constructor(props: PreviewProps) {
    super(props);
    this.state = {
      src: props.src,
      scaleX: 1,
      disabled: true,
      angle: 0,
      current: props.current,
      position: {
        x: 0,
        y: 0,
      },
      moving: false,
      originPositionRef: {
        originX: 0,
        originY: 0,
        deltaX: 0,
        deltaY: 0,
      },
    };
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onMouseUp, false);
    window.addEventListener('mousemove', this.onMouseMove, false);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp, false);
    window.removeEventListener('mousemove', this.onMouseMove, false);
  }

  onMouseMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { moving, originPositionRef } = this.state;
    if (moving) {
      this.setState({
        position: {
          x: e.pageX - originPositionRef.deltaX,
          y: e.pageY - originPositionRef.deltaY,
        },
      });
    }
  };

  onMouseUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { moving, originPositionRef } = this.state;
    if (moving) {
      this.setState({
        position: {
          x: originPositionRef.originX,
          y: originPositionRef.originY,
        },
        moving: false,
      });
    }
  }

  renderImage = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls, previewUrls } = this.props;

    const {
      scaleX, disabled, angle, src, current, position, originPositionRef,
    } = this.state;

    const { isPreviewGroup } = this.context;

    const prefix = getPrefixCls('image', prefixCls);
    const mainClass = classNames(prefix, {
      // [`${prefix}-error`]: error,
    });
    const previewOperationsPrefix = getPrefixCls('image-preview-operations-operation', prefixCls);
    const previewOperationsOperationClass = classNames(previewOperationsPrefix, {
      [`${previewOperationsPrefix}-disabled`]: disabled,
    });

    const handleZoomin = (e: { stopPropagation: () => void; }) => {
      e.stopPropagation();
      this.setState({ scaleX: scaleX + 1, disabled: !(scaleX + 1 > 1) });
    };

    const handleZoomout = (e: { stopPropagation: () => void; }) => {
      e.stopPropagation();
      if (!disabled) {
        this.setState({ scaleX: scaleX - 1, disabled: !(scaleX - 1 > 1) });
      }
    };

    const handleLeftRotation = (e: { stopPropagation: () => void; }) => {
      e.stopPropagation();
      this.setState({ angle: angle + 90 });
    };

    const handleRightRotation = (e: { stopPropagation: () => void; }) => {
      e.stopPropagation();
      this.setState({ angle: angle - 90 });
    };

    const handleSave = (e: { stopPropagation: () => void; }) => {
      e.stopPropagation();

      const ua = navigator.userAgent;
      if (ua.indexOf('Trident') != -1 && ua.indexOf('Windows') != -1) {
        document.execCommand('saveAs');
      } else {
        const image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute('crossOrigin', 'anonymous');
        image.onload = function () {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;

          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, image.width, image.height);
          const url = canvas.toDataURL('image/png');

          // 生成一个a元素
          const a = document.createElement('a');
          // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
          a.download = 'test';
          // 将生成的URL设置为a.href属性
          a.href = url;
          a.click();
        };

        image.src = src;
      }
    };

    const onSwitchLeft = (e: { stopPropagation: () => void; }) => {
      e.stopPropagation();
      if (current !== 0) {
        const index = previewUrls?.findIndex((i) => i === src);
        this.setState({ src: previewUrls[index - 1], current: index - 1 });
      }
    };

    const onSwitchRight = (e: { stopPropagation: () => void; }) => {
      e.stopPropagation();
      if (current !== previewUrls?.length - 1) {
        const index = previewUrls?.findIndex((i) => i === src);
        this.setState({ src: previewUrls[index + 1], current: index + 1 });
      }
    };

    const onMouseDown = (e) => {
      e.stopPropagation();
      e.preventDefault();
      originPositionRef.deltaX = e.pageX - position.x;
      originPositionRef.deltaY = e.pageY - position.y;
      originPositionRef.originX = position.x;
      originPositionRef.originY = position.y;
      this.setState({ moving: true, originPositionRef });
    };

    return (
      <div className={`${mainClass}-preview`}>
        <div className={`${mainClass}-preview-content`}>
          <div className={`${mainClass}-preview-body`}>
            <div className={`${mainClass}-preview-img-wrapper`} style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0px)` }}>
              <img
                className={`${mainClass}-preview-img`}
                src={src}
                style={{
                  transform: `scale3d(${scaleX}, ${scaleX}, 1) rotate(${angle}deg)`,
                }}
                onMouseDown={onMouseDown}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              />
            </div>
            {isPreviewGroup && previewUrls.length > 1 && (
              <div className={`${mainClass}-preview-switch-left`} style={{ cursor: current === 0 ? 'not-allowed' : 'pointer', color: current === 0 ? 'hsla(0,0%,100%,.25)' : '#fff' }} onClick={onSwitchLeft}>
                <Icon type="left-circle" />
              </div>
            )}
            {isPreviewGroup && previewUrls.length > 1 && (
              <div className={`${mainClass}-preview-switch-right`} style={{ cursor: current === previewUrls?.length - 1 ? 'not-allowed' : 'pointer', color: current === previewUrls?.length - 1 ? 'hsla(0,0%,100%,.25)' : '#fff' }} onClick={onSwitchRight}>
                <Icon type="right-circle" />
              </div>
            )}
            <ul className={`${mainClass}-preview-operations`}>
              <li className={previewOperationsPrefix} onClick={handleZoomin}><Icon type="zoomin" /></li>
              <li className={previewOperationsOperationClass} onClick={handleZoomout}><Icon type="zoomout" /></li>
              <li className={previewOperationsPrefix} onClick={handleLeftRotation}><Icon type="left-rotation" /></li>
              <li className={previewOperationsPrefix} onClick={handleRightRotation}><Icon type="right-rotation" /></li>
              <li className={previewOperationsPrefix} onClick={handleSave}><Icon type="save" /></li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderImage}
      </ConfigConsumer>
    );
  }
}

export default PreView;
