/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  createRef, CSSProperties, ReactElement, ReactNode,
} from 'react';

import { BaseComponent, BaseProps } from '../common/base-component';
import { Step, STEP_NAME } from './step';

export type StepsSize = 'default' | 'big';

export type StepsDirection = 'horizontal' | 'vertical';

export type StepsStatus = 'wait' | 'process' | 'finish' | 'error';

export type StepsProps = {
    /** 类名 */
    className?: string;
    /** style */
    style?: CSSProperties;
    /** 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态 */
    current?: number;
    /** 指定步骤条方向。目前支持水平（horizontal）和竖直（vertical）两种方向 */
    direction?: StepsDirection;
    /** 起始序号 */
    initial?: number;
    /** 大小 */
    size?: StepsSize;
    /** 点击切换步骤时触发 */
    onClick?: (current: number) => void;
} & BaseProps;

export type StepProps = {
    /** 步骤的详情描述，可选 */
    description?: ReactNode;
    /** 最多显示几行 只用 description 为 string 有效 */
    maxDescriptionLine?: number;
    /** 步骤图标的类型，可选 */
    icon?: ReactNode;
    /** 指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态。可选：wait process finish error */
    status?: StepsStatus;
    /** 标题 */
    title?: ReactNode;

    _onClick?: (current: number) => void;
    _defaultStatus?: StepsStatus;
    _direction?: StepsDirection;
    _serialNumber?: number;
    _size?: StepsSize;
} & BaseProps;

export default class Steps extends BaseComponent<StepsProps> {
    public static defaultProps: StepsProps = {
      className: '',
      style: {},
      size: 'default',
      initial: 1,
      current: 0,
    };

    public static Step = Step;

    protected classPrefix = 'steps';

    public containerRef = createRef<HTMLDivElement>();

    private stepRefs: Step[] = [];

    public componentDidMount() {
      this.handleHorizontal();
    }

    protected view = () => {
      const { className, style, direction } = this.props;
      this.handleHorizontal();
      return (
        <div
          ref={this.containerRef}
          style={style}
          className={this.classNames(
            className,
            this.getPrefixClass('wrap'),
            this.getPrefixClass(`${direction}`),
          )}
        >
          {this.handleChildren()}
        </div>
      );
    };

    private handleChildren = () => {
      const {
        children, initial, size, direction, current, onClick,
      } = this.props;
      let serialNumber = initial!;
      this.stepRefs = [];

      const all = React.Children.map(children, (child) => {
        const tag = ((child as ReactElement)?.type as unknown as Record<string, unknown>)?.tag;
        if (React.isValidElement(child) && tag === STEP_NAME) {
          return child;
        }
        return null;
      }) ?? [];

      const content = React.Children.map(all, (child: ReactElement, index: number) => {
        let status: StepsStatus = 'wait';
        if (current! > index) status = 'finish';
        if (current === index) status = 'process';

        const result = React.cloneElement(child, {
          _size: size,
          _defaultStatus: status,
          _direction: direction,
          _serialNumber: serialNumber,
          _onClick: onClick,
          ref: (ref: Step) => ref && this.stepRefs.push(ref),
        });

        serialNumber += 1;

        return result;
      });

      return content;
    };

    private handleHorizontal = () => {
      if (this.props.direction !== 'horizontal') return;
      if (!this.containerRef.current) return;
      if (this.stepRefs.length === 0) return;

      const step = this.stepRefs.slice(-1)[0];
      const otherSteps = this.stepRefs.slice(0, -1);
      const containerWidth = this.containerRef.current.offsetWidth;
      const minWidth = containerWidth / this.stepRefs.length;

      if (otherSteps.length > 0) {
        const lastStep = step.containerRef.current;
        const width = (containerWidth - (lastStep?.offsetWidth ?? 0)) / otherSteps.length;

        if (lastStep) {
          lastStep.style.maxWidth = `${minWidth}px`;
        }

        otherSteps.forEach((item) => {
          const temp = item.containerRef.current;
          if (temp) {
            temp.style.minWidth = `${minWidth}px`;
            temp.style.width = `${width}px`;
          }
        });
      }
    };
}
