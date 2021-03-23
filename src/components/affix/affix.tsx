import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import { ConfigContext } from '../config-provider/context';
import { Omit } from '../utils/type';

export interface AffixProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  prefixCls?: string;
  target?: () => HTMLElement;
  offsetBottom?: number;
  offsetTop?: number;
  onChange?: (affixed: boolean) => void;
}

const Affix: React.FC<AffixProps> = (props: AffixProps) => {
  const {
    target = (() => window),
    offsetBottom,
    onChange,
    className,
    children,
  } = props;

  let { prefixCls, offsetTop } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  prefixCls = getPrefixCls('affix', prefixCls);

  const offset = useRef({});
  const [fixedStyle, setFixedStyle] = useState({});
  const [placeholderStyle, setPlaceholderStyle] = useState({});
  const fixedRef = useRef();
  const placeholderRef = useRef();
  const targetProp = target();
  const targetDom = targetProp === window ? document.documentElement : targetProp;
  let placeholderElmentDom = null;

  console.log('target', targetProp);

  const getOffset = () => {
    if (offsetTop === undefined && offsetBottom === undefined) {
      offsetTop = 0;
    }
    const placeholderRect = placeholderElmentDom.getBoundingClientRect();
    const targetRect = targetDom !== document.documentElement
      ? targetDom.getBoundingClientRect()
      : { top: 0, bottom: document.body.clientHeight, height: document.body.clientHeight };
    const scrolldown = placeholderRect.bottom - targetRect.bottom
    + targetDom.scrollTop + offsetBottom;
    console.log('底部', targetDom, targetRect.bottom, targetRect.height, placeholderRect.height);
    return {
      scrollTop: offsetTop !== undefined
        ? (placeholderRect.top - targetRect.top + targetDom.scrollTop - offsetTop) : null,
      scrollBottom: offsetBottom !== undefined
      && scrolldown > 0 ? scrolldown : null,
      left: placeholderRect.left,
      top: offsetTop !== undefined ? (targetRect.top + offsetTop) : null,
      bottom: offsetBottom !== undefined
        ? (targetRect.bottom - offsetBottom - placeholderRect.height) : null,
      width: placeholderRect.width,
      height: placeholderRect.height,
    };
  };

  const setAffixStyle = (affixStyle) => {
    if (!shallowequal(fixedStyle, affixStyle)) {
      setFixedStyle(affixStyle);
      if (shallowequal({}, affixStyle)) {
        onChange?.(false);
      } else if (shallowequal({}, fixedStyle)) {
        onChange?.(true);
      }
    }
  };

  const scrollFix = () => {
    let affixStyle = {};
    if (offset.current.scrollTop !== null && targetDom.scrollTop > offset.current.scrollTop) {
      affixStyle = {
        position: 'fixed',
        top: offset.current.top,
        left: offset.current.left,
      };
    } else if (offset.current.scrollBottom !== null
      && targetDom.scrollTop < offset.current.scrollBottom) {
      affixStyle = {
        position: 'fixed',
        top: offset.current.bottom,
        left: offset.current.left,
      };
    }
    setAffixStyle(affixStyle);
  };

  useEffect(() => {
    console.log('初始化', targetDom);
    placeholderElmentDom = placeholderRef.current;
    offset.current = getOffset();
    console.log(offset.current);
    setPlaceholderStyle({
      width: offset.current.width,
      height: offset.current.height,
    });
    scrollFix();
  }, [targetDom]);

  useEffect(() => {
    console.log('渲染完毕');
    targetProp.addEventListener('scroll', scrollFix);
    return () => {
      targetProp.removeEventListener('scroll', scrollFix);
    };
  });

  const affixClassName = classNames(prefixCls, className);

  const placeholderClassName = prefixCls;

  return (
    <div ref={placeholderRef} className={placeholderClassName} style={placeholderStyle}>
      <div
        ref={fixedRef}
        className={affixClassName}
        style={fixedStyle}
        onClick={() => setFixedStyle({})}
      >
        {children}
      </div>
    </div>
  );
};

export default Affix;
