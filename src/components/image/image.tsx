/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-shadow */
import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';
import PreviewGroup, { context } from './previewGroup';
import PreView from './preview';
import { Omit } from '@union-design/utils/type';

export interface ImageProps extends Omit<React.HTMLAttributes<HTMLImageElement>, 'placeholder' | 'onError'> {
  /** 图像描述 */
  alt?: string;
  /** 加载失败容错地址 */
  fallback?: string;
  /** 图像高度 */
  height?: string | number;
  /** 加载占位, 为 true 时使用默认占位 */
  placeholder?: React.ReactNode;
  /** 图片地址 */
  src?: string;
  /** 图像宽度 */
  width?: string | number;
  /** 加载错误回调 */
  onError?: (event: Event) => void;
  /* 用户自定义类前缀，默认uni-image */
  prefixCls?: string;
  current?: number;
  style?: CSSProperties;
  preview?: boolean;
}

export interface ImageState {
  /** 列表数据源 */
  src?: string;
  /** 预览 */
  preview?: boolean;
  clientX?: number;
  clientY?: number;
  style?: CSSProperties;
  error?: boolean;
  status?: string;
}

class Images extends Component<ImageProps, ImageState> {
  static defaultProps: ImageProps | ImageState = {
    src: '',
    preview: false,
    clientX: 0,
    clientY: 0,
    // style: { display: 'none' },
    error: false,
    current: 0,
  };

  static contextType = context;

  static PreviewGroup: typeof PreviewGroup;

  static getDerivedStateFromProps(props: ImageProps, state: ImageState) {
    if (props.src !== state.src) {
      return {
        src: props.src,
      };
    }
    return null;
  }

  constructor(props: ImageProps) {
    super(props);
    this.state = {
      src: props.src,
      preview: false,
      clientX: 0,
      clientY: 0,
      style: { display: 'none' },
      error: false,
      status: props.placeholder ? 'loading' : 'normal',
    };
  }

  componentDidMount() {
    const { placeholder } = this.props;
    if (placeholder) {
      this.setState({ status: 'loading' });
    }
  }

  componentDidUpdate(
    prevProps: {
      placeholder: boolean
      | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    },
  ) {
    const { placeholder } = this.props;
    if (prevProps.placeholder !== placeholder) {
      this.setState({ status: 'loading' });
    }
  }

  renderImage = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, src, alt, width, height, fallback = '', current, placeholder, onError, className, style: mainStyle,
    } = this.props;
    const {
      preview, clientX, clientY, style, error, status,
    } = this.state;

    const { previewUrls } = this.context;
    const prefix = getPrefixCls('image', prefixCls);
    const mainClass = classNames(prefix, className, {
      [`${prefix}-error`]: error,
    });

    const previewWrapPrefix = getPrefixCls('image-preview-wrap', prefixCls);
    const previewWrapClass = classNames(previewWrapPrefix, {
      [`${previewWrapPrefix}-show`]: preview,
      [`${previewWrapPrefix}-hidden`]: !preview,
    });

    const handlePreview = (e: { clientX: number; clientY: number; }) => {
      if (!error) {
        const { clientX, clientY } = e;
        if (!preview) {
          this.setState({ preview: !preview, clientX, clientY });
        } else {
          this.setState({ preview: !preview });
        }

        if (preview) {
          setTimeout(() => {
            this.setState({ style: { display: 'none' } });
          }, 200);
        } else {
          this.setState({ style: { display: 'block' } });
        }
      }
    };

    const handleError = (e: any) => {
      const index = previewUrls?.findIndex((i: string | undefined) => i === src);
      previewUrls?.splice(index, 1);
      this.setState({
        error: true,
        // previewUrls
      });

      if (onError && !error) {
        onError(e);
      }
    };

    const onLoad = () => {
      this.setState({ status: 'normal' });
    };

    return (
      <div className={mainClass} style={{ ...mainStyle, width, height }}>
        <img
          className={`${prefix}-img`}
          src={error ? fallback : src}
          alt={alt}
          onClick={handlePreview}
          onError={handleError}
          onLoad={onLoad}
        />

        {status === 'loading' && (
          <div className={`${prefix}-placeholder`}>
            {placeholder}
          </div>
        )}

        <div className={previewWrapClass} onClick={handlePreview} style={{ ...style, transformOrigin: `${clientX}px ${clientY}px` }}>
          <PreView src={src} previewUrls={previewUrls} current={current} />
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

Images.PreviewGroup = PreviewGroup;

export default Images;
