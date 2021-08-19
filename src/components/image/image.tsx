/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-shadow */
import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import PreviewGroup, { context } from './previewGroup';
import PreView from './preview';
import { Omit } from '../utils/type';

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

    const handleError = (e: Event) => {
      const index = previewUrls?.findIndex((i: string | undefined) => i === src);
      previewUrls?.splice(index, 1);
      this.setState({ error: true, previewUrls });

      if (onError) {
        onError(e);
      }
    };

    const onLoad = () => {
      this.setState({ status: 'normal' });
    };

    return (
      <div className={mainClass} style={{ ...mainStyle, width, height }}>
        {
          (error && !fallback)
            ? (
              <svg viewBox="0 0 222 222" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width} height={height}>
                <title>编组@1x</title>
                <defs>
                  <filter id="filter-1">
                    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0.674510 0 0 0 0 0.686275 0 0 0 0 0.725490 0 0 0 1.000000 0" />
                  </filter>
                </defs>
                <g id="----↪图片" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="图片展示" transform="translate(-675.000000, -109.000000)">
                    <g id="编组" transform="translate(675.000000, 109.000000)">
                      <rect id="矩形" fill="#E9EBF0" x="0" y="0" width="222" height="222" />
                      <g filter="url(#filter-1)" id="图片，照片">
                        <g transform="translate(75.000000, 74.000000)">
                          <rect id="矩形" fill="#000000" fillRule="nonzero" opacity="0" x="0" y="0" width="72" height="72" />
                          <path d="M61.3125,7.875 C62.8657734,7.875 64.125,9.13422656 64.125,10.6875 L64.125,61.3125 C64.125,62.8657734 62.8657734,64.125 61.3125,64.125 L10.6875,64.125 C9.13422656,64.125 7.875,62.8657734 7.875,61.3125 L7.875,10.6875 C7.875,9.13422656 9.13422656,7.875 10.6875,7.875 L61.3125,7.875 Z M25.6184297,36.1634766 C25.3197748,36.3293931 25.0628253,36.561143 24.8670703,36.8411484 L13.7197266,52.7873203 C13.0078125,53.8057969 13.2562969,55.2085313 14.2747031,55.9205156 C14.6517908,56.1841234 15.1006277,56.3257929 15.5607188,56.3264297 L56.1854531,56.3840884 C57.4280859,56.3859141 58.4368594,55.3800234 58.4386195,54.1373203 C58.4393279,53.6417711 58.2764214,53.1598486 57.9751875,52.7663672 L49.0509844,41.1102422 C48.2955469,40.1235469 46.88325,39.9360938 45.896625,40.6915312 C45.6525939,40.8783837 45.4494324,41.1132518 45.2996719,41.3816484 L40.1488594,50.6119219 C39.5433281,51.6969844 38.1727969,52.0858125 37.0876641,51.4802813 C36.7220127,51.2762463 36.4205512,50.9742248 36.2171953,50.6081953 L28.6780078,37.0376016 C28.0745156,35.9513437 26.7047578,35.5599844 25.6184297,36.1634766 L25.6184297,36.1634766 Z M47.1796875,18.28125 C44.0730703,18.28125 41.5546875,20.7996328 41.5546875,23.90625 C41.5546875,27.0128672 44.0730703,29.53125 47.1796875,29.53125 C50.2863047,29.53125 52.8046875,27.0128672 52.8046875,23.90625 C52.8046875,20.7996328 50.2863047,18.28125 47.1796875,18.28125 Z" id="形状" fill="#000000" fillRule="nonzero" />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            )
            : (
              <img
                className={`${prefix}-img`}
                src={error ? fallback : src}
                alt={alt}
                onClick={handlePreview}
                onError={handleError}
                onLoad={onLoad}
              />
            )
        }

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
