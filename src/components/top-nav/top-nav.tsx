/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-useless-return */
/* eslint-disable react/no-string-refs */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-restricted-syntax */
/* eslint-disable object-curly-newline */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-danger */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
import React, { CSSProperties, ReactNode, createRef } from "react";
import {
  BaseComponent,
  BasePropsV2,
  BaseStateV2,
} from "@union-design/base-component";
import Icon from "@union-design/icon";
import { animation } from "@union-design/utils";

export type SideNavProps<Data> = {
  /** 数据 */
  data: Data[];
  /** 每条数据的唯一key */
  keyExtractor: (data: Data) => string;
  /** 每条数据用来做导航每项的Name */
  nameExtractor: (data: Data) => string;
  /** 每条数据用来做导航每项子菜单的 */
  childrenExtractor: (data: Data) => Data[] | null | undefined;
} & BasePropsV2<{
  style: CSSProperties;
  className: string;
  /** 大小 */
  size: "md" | "xl";
  /** 点击每项模式 */
  mode: "dropdown" | "expand" | "expand-img";
  /** 当前选择的key */
  selectedKey: string;
  /** 弹窗层级 */
  popupZIndex: number;
  /** 导航当前选择发生变化回调 */
  onChangeSelectedKey?: (key: string, data: Data) => void;
  /** mode 为 expand-img 背景设置 */
  bgExtractor: (data: Data) => ReactNode | null | undefined;
  /** mode 为 expand-img 描述设置 */
  descExtractor: (data: Data) => string | null | undefined;
}>;

export type SideNavState = BaseStateV2<{
  selectedKey: string;
  selectedData: any;
  hasArrow: boolean;
  portalView: ReactNode;
  openKey: string;
}>;

export default class TopNav<Data> extends BaseComponent<
  SideNavProps<Data>,
  SideNavState
> {
  protected classPrefix = "topnav";

  private popupshow = false;

  private bodyWidth = 0;

  private bodyItemsWidth: number[] = [];

  private bodyRef = createRef<HTMLDivElement>();

  private observer = new ResizeObserver(() => {
    this.caclbase();
  });

  constructor(props: SideNavProps<Data>) {
    super(props);
    this.state = {
      hasArrow: false,
    };
  }

  componentDidUpdate(
    _prevProps: Readonly<SideNavProps<Data>>,
    prevState: Readonly<SideNavState>,
    _snapshot?: any
  ): void {
    this.caclbase();
    if (this.state.selectedKey !== prevState.selectedKey) {
      this.props.onChangeSelectedKey?.(
        this.state.selectedKey ?? "",
        this.state.selectedData
      );
    }
  }

  componentWillUnmount(): void {
    if (this.bodyRef.current) {
      this.observer.unobserve(this.bodyRef.current);
    }
    document.removeEventListener("click", this.closePopup);
  }

  componentDidMount(): void {
    this.caclbase();
    document.addEventListener("click", this.closePopup);
  }

  private closePopup = () => {
    this.popupshow = false;
    setTimeout(() => {
      if (!this.popupshow) {
        this.setState({
          portalView: null,
          openKey: "",
        });
      }
    });
  };

  private caclbase = () => {
    this.bodyWidth = this.bodyRef.current?.offsetWidth ?? 0;
    this.bodyItemsWidth = Array.from(this.bodyRef.current?.children ?? []).map(
      (i) => (i as HTMLDivElement).offsetWidth ?? 0
    );
    if (this.bodyItemsWidth.reduce((a, b) => a + b, 0) > this.bodyWidth) {
      this.state.hasArrow || this.setState({ hasArrow: true });
    } else {
      this.state.hasArrow && this.setState({ hasArrow: false });
    }
    if (this.bodyRef.current) {
      this.observer.observe(this.bodyRef.current);
    }
  };

  protected view = () => {
    const { data = [], style, className, size = "md" } = this.props;
    const { portalView } = this.state;

    return (
      <>
        <div
          style={style}
          className={this.classNames(className, this.gpc(), this.gpc(size))}
        >
          <div
            onClick={this.onClickLeft}
            className={this.classNames(this.gpc("left"), {
              [this.gpc("scroll")]: this.state.hasArrow,
            })}
          >
            <Icon type="left2-line" style={{ fontSize: 14, marginRight: 4 }} />
          </div>
          <div ref={this.bodyRef} className={this.gpc("body")}>
            {data.map(this.viewItem)}
          </div>
          <div
            onClick={this.onClickRight}
            className={this.classNames(this.gpc("right"), {
              [this.gpc("scroll")]: this.state.hasArrow,
            })}
          >
            <Icon type="right2-line" style={{ fontSize: 14, marginLeft: 4 }} />
          </div>
          {portalView}
        </div>
      </>
    );
  };

  private onClickRight = () => {
    const { hasArrow } = this.state;
    if (!hasArrow || !this.bodyRef.current) return;
    const body = this.bodyRef.current;
    const scrollLeft = Math.floor(body.scrollLeft);
    const offsetWidth = Math.floor(body.offsetWidth);
    const scrollWidth = Math.floor(body.scrollWidth);
    const sow = scrollLeft + offsetWidth;
    let diff = 0;
    let allWidth = 0;
    for (const width of this.bodyItemsWidth) {
      allWidth += width;
      if (allWidth >= scrollWidth) {
        diff = scrollWidth - offsetWidth - scrollLeft;
        break;
      }

      if (allWidth > sow) {
        diff = allWidth - sow;
        break;
      }
    }

    if (diff > 0) {
      animation((p) => {
        body.scrollLeft = scrollLeft + diff * p;
      }, 100);
    }
  };

  private onClickLeft = () => {
    const { hasArrow } = this.state;
    if (!hasArrow || !this.bodyRef.current) return;
    const body = this.bodyRef.current;

    const scrollLeft = Math.floor(body.scrollLeft);

    let diff = 0;
    let allWidth = 0;
    for (const width of this.bodyItemsWidth) {
      allWidth += width;
      if (allWidth > scrollLeft) {
        diff = scrollLeft - allWidth + width;
        break;
      }

      if (allWidth === scrollLeft) {
        diff = width;
        break;
      }
    }

    if (diff > 0) {
      animation((p) => {
        body.scrollLeft = scrollLeft - diff * p;
      }, 100);
    }
  };

  private openDropdown = (data: any[], div: HTMLDivElement) => {
    const { keyExtractor, nameExtractor, popupZIndex } = this.props;
    const { offsetWidth: width, offsetLeft: left } = div;
    const { scrollLeft = 0 } = div?.parentElement ?? {};
    const selectedKey = this.getBindValue("selectedKey") ?? "";

    const view = (
      <div
        className={this.gpc("dropdown")}
        style={{
          left: left + width / 2 - scrollLeft,
          top: "100%",
          marginTop: 4,
          zIndex: popupZIndex,
        }}
      >
        {data.map((i) => {
          const key = keyExtractor(i);
          return (
            <div
              className={this.classNames(this.gpc("item"), {
                [this.gpc("active")]: selectedKey === key,
              })}
              key={key}
              onClick={() => this.onSelectedKey(key, i)}
            >
              {nameExtractor(i)}
            </div>
          );
        })}
      </div>
    );

    this.setPopupShow(view);
  };

  private flatChildren = (data: any[], level: number) => {
    const { childrenExtractor } = this.props;
    let res: { level: number; data: any }[] = [];

    for (const item of data) {
      res.push({ level, data: item });
      const children = childrenExtractor(item) ?? [];
      if (children.length > 0) {
        res = [...res, ...this.flatChildren(children, level + 1)];
      }
    }

    return res;
  };

  private onClickExpand = (data: any) => {
    const { childrenExtractor, keyExtractor } = this.props;

    const children = childrenExtractor(data) ?? [];

    if (children.length === 0) {
      this.onSelectedKey(keyExtractor(data), data);
    }
  };

  private getContentData = (data: any[]) => {
    const {
      keyExtractor,
      nameExtractor,
      childrenExtractor,
      size = "md",
      mode = "expand",
    } = this.props;
    const selectedKey = this.getBindValue("selectedKey") ?? "";

    const temp = data.map((i) => {
      const children = childrenExtractor(i) ?? [];

      return (
        <div key={keyExtractor(i)} className={this.gpc("col")}>
          <div
            className={this.classNames(this.gpc("item"), this.gpc("level2"), {
              [this.gpc("hover")]: (childrenExtractor(i) ?? []).length === 0,
              [this.gpc("active")]: selectedKey === keyExtractor(i),
            })}
            onClick={() => this.onClickExpand(i)}
          >
            <div className={this.gpc("text")}>{nameExtractor(i)}</div>
          </div>
          {this.flatChildren(children, 3).map((ii) => (
            <div
              key={keyExtractor(ii.data)}
              className={this.classNames(
                this.gpc("item"),
                this.gpc(`level${ii.level}`),
                {
                  [this.gpc("hover")]:
                    (childrenExtractor(ii.data) ?? []).length === 0,
                  [this.gpc("active")]: selectedKey === keyExtractor(ii.data),
                }
              )}
              onClick={() => this.onClickExpand(ii.data)}
            >
              <div className={this.gpc("text")}>{nameExtractor(ii.data)}</div>
            </div>
          ))}
        </div>
      );
    });

    let col = 0;
    if (size === "md" && mode === "expand") col = 6;
    if (size === "md" && mode === "expand-img") col = 4;
    if (size === "xl" && mode === "expand") col = 4;
    if (size === "xl" && mode === "expand-img") col = 3;

    const res = [] as any[];
    const num = new Array(col).fill(0);

    for (let i = 0; i < temp.length; i++) {
      const count = React.Children.count(temp[i].props.children);

      let minNum = num[0] ?? 0;
      let minNumIndex = 0;
      for (let ii = 0; ii < num.length; ii++) {
        const tNum = num[ii] ?? 0;
        if (tNum < minNum) {
          minNum = tNum;
          minNumIndex = ii;
        }
      }

      num[minNumIndex] ??= 0;
      num[minNumIndex] += count;
      res[minNumIndex] ??= [];
      res[minNumIndex].push(temp[i]);
    }
    console.log(res);

    return res;
  };

  private openExpand = (data: any[], _div: HTMLDivElement) => {
    const { size = "md", popupZIndex } = this.props;

    const view = (
      <div
        className={this.classNames(this.gpc("expand"), this.gpc(size))}
        style={{ left: 0, top: "100%", width: "100%", zIndex: popupZIndex }}
        onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
      >
        {this.getContentData(data).map((i, index) => (
          <div key={index} className={this.gpc("block")}>
            {i.map((i: any) => i)}
          </div>
        ))}
      </div>
    );

    this.setPopupShow(view);
  };

  private openExpandImg = (title: any, data: any[], _div: HTMLDivElement) => {
    const {
      nameExtractor,
      bgExtractor,
      descExtractor,
      size = "md",
      popupZIndex,
    } = this.props;

    const view = (
      <div
        className={this.classNames(this.gpc("expand-img"), this.gpc(size))}
        style={{ left: 0, top: "100%", width: "100%", zIndex: popupZIndex }}
        onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
      >
        <div className={this.gpc("left")}>
          <div className={this.gpc("bg")}>
            {bgExtractor?.(title) ?? <div />}
          </div>
          <div className={this.gpc("title")}>{nameExtractor(title)}</div>
          <div className={this.gpc("desc")}>{descExtractor?.(title) ?? ""}</div>
          <div className={this.gpc("btn")}>
            <div className={this.gpc("text")}>
              {`进入${nameExtractor(title)}`}
            </div>
            <Icon
              type="right2-line"
              style={{ fontSize: 14, marginLeft: 4, marginRight: 8 }}
            />
          </div>
        </div>
        <div className={this.gpc("right")}>
          {this.getContentData(data).map((i, index) => (
            <div key={index} className={this.gpc("block")}>
              {i.map((i: any) => i)}
            </div>
          ))}
        </div>
      </div>
    );

    this.setPopupShow(view);
  };

  private setPopupShow = (view: ReactNode) => {
    setTimeout(() => {
      this.popupshow = true;
      this.setState({ portalView: view });
    });
  };

  private onSelectedKey = (key: string, data: any) => {
    this.popupshow = false;
    this.setState({
      selectedKey: key,
      selectedData: data,
      openKey: "",
      portalView: null,
    });
  };

  private onClickViewItem = (data: any, div: HTMLDivElement) => {
    const { keyExtractor, childrenExtractor, mode = "dropdown" } = this.props;
    const { openKey } = this.state;
    const key = keyExtractor(data);
    const children = childrenExtractor(data) ?? [];

    if (children.length > 0) {
      if (openKey === key) {
        this.setState({ openKey: "" });
      } else {
        if (mode === "dropdown") {
          this.openDropdown(children, div);
        }
        if (mode === "expand") {
          this.openExpand(children, div);
        }
        if (mode === "expand-img") {
          this.openExpandImg(data, children, div);
        }
        this.setState({ openKey: key });
      }
    } else {
      this.onSelectedKey(key, data);
    }
  };

  private childrenHasKey = (data: any[], key: string): boolean => {
    const { childrenExtractor, keyExtractor } = this.props;
    let res = false;
    for (const item of data) {
      const curKey = keyExtractor(item);
      const children = childrenExtractor(item) ?? [];

      if (curKey === key) {
        res = true;
        break;
      }

      if (children.length > 0) {
        const temp = this.childrenHasKey(children, key);
        if (temp) {
          res = temp;
          break;
        }
      }
    }

    return res;
  };

  private viewItem = (data: any) => {
    const { keyExtractor, nameExtractor, childrenExtractor } = this.props;
    const { openKey } = this.state;
    const key = keyExtractor(data);
    const name = nameExtractor(data);
    const children = childrenExtractor(data) ?? [];
    const selectedKey = this.getBindValue("selectedKey") ?? "";

    return (
      <div
        key={key}
        className={this.classNames(this.gpc("item"), {
          [this.gpc("active")]:
            selectedKey === key ||
            openKey === key ||
            this.childrenHasKey(children, selectedKey),
        })}
        onClick={(e) => this.onClickViewItem(data, e.target as HTMLDivElement)}
      >
        <div className={this.gpc("text")}>{name}</div>
        {children.length > 0 && (
          <div className={this.gpc("arrow")}>
            <Icon
              type={openKey === key ? "up2-line" : "down2-line"}
              style={{ fontSize: 14, marginLeft: 8 }}
            />
          </div>
        )}
      </div>
    );
  };
}
