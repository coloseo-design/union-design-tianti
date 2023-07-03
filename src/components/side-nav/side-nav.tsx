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
import React, { CSSProperties, ReactNode } from "react";
import {
  BaseComponent,
  BasePropsV2,
  BaseStateV2,
} from "@union-design/base-component";
import Icon from "@union-design/icon";

export type SideNavProps<Data> = {
  /** 数据 */
  data: Data[];
  /** 模式 inline 内嵌  expand 展开 */
  mode: "inline" | "expand";
  /** 每条数据的唯一key */
  iconExtractor: (data: Data) => ReactNode | null | undefined;
  /** 每条数据的唯一key */
  keyExtractor: (data: Data) => string;
  /** 每条数据用来做导航每项的Name */
  nameExtractor: (data: Data) => string | ReactNode;
  /** 每条数据用来做导航每项子菜单的 */
  childrenExtractor: (data: Data) => Data[] | null | undefined;
} & BasePropsV2<{
  style: CSSProperties;
  className: string;
  /** 打开子菜单的keys */
  openKeys: string[];
  /** 初始打开子菜单的keys */
  defaultOpenKeys: string[];
  /** 当前选择的key */
  selectedKey: string;
  /** 初始选择的key */
  defaultSelectedKey: string;
  /** 导航是否可见回调 */
  onChangeVisible?: (visible: boolean) => void;
  /** 导航当前选择发生变化回调 */
  onChangeSelectedKey?: (key: string, data: Data) => void;
  /** 导航当前打开子菜单变化回调 */
  onChangeOpenKeys?: (key: string[]) => void;
}>;

function isContainEqualItems(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const sortedArr1 = arr1.sort();
  const sortedArr2 = arr2.sort();
  for (let i = 0; i < sortedArr1.length; i += 1) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }
  return true;
}

export type SideNavState = BaseStateV2<{
  isClose: boolean;
  openKeys: string[];
  selectedKey: string;
  selectedData: any;
  openPopup: boolean;
}>;

export default class SideNav<Data> extends BaseComponent<
  SideNavProps<Data>,
  SideNavState
> {
  protected classPrefix = "sidenav";

  private popupshow = false;

  constructor(props: SideNavProps<Data>) {
    super(props);
    const { defaultOpenKeys, defaultSelectedKey, openKeys, selectedKey } =
      props;
    this.state = {
      isClose: false,
      openKeys: openKeys ?? defaultOpenKeys ?? [],
      selectedKey: selectedKey ?? defaultSelectedKey ?? "",
      openPopup: false,
    };
  }

  componentDidMount(): void {
    if (this.props.mode === "expand") {
      document.addEventListener("click", this.closePopup);
    }
  }

  componentWillUnmount(): void {
    if (this.props.mode === "expand") {
      document.removeEventListener("click", this.closePopup);
    }
  }

  componentDidUpdate(
    _prevProps: Readonly<SideNavProps<Data>>,
    prevState: Readonly<SideNavState>,
    _snapshot?: any
  ): void {
    if (this.state.selectedKey !== prevState.selectedKey) {
      this.props.onChangeSelectedKey?.(
        this.state.selectedKey ?? "",
        this.state.selectedData
      );
    }

    if (
      !isContainEqualItems(this.state.openKeys ?? [], prevState.openKeys ?? [])
    ) {
      this.props.onChangeOpenKeys?.(this.state.openKeys ?? []);
    }

    if (this.state.isClose !== prevState.isClose) {
      this.props.onChangeVisible?.(!(this.state.isClose ?? false));
    }
  }

  private closePopup = () => {
    this.popupshow = false;
    setTimeout(() => {
      if (!this.popupshow) {
        this.setState({
          openPopup: false,
          openKeys: [],
        });
      }
    });
  };

  protected view = () => {
    const { mode = "inline", data = [] } = this.props;

    if (mode === "inline") {
      return this.viewContainer({
        className: this.gpc("inline"),
        children: (
          <>
            {this.viewCloseAndOpen()}
            {this.viewBorder()}
            {this.viewBody(this.viewInline(data, 1))}
          </>
        ),
      });
    }

    if (mode === "expand") {
      return this.viewContainer({
        className: this.gpc("expand"),
        children: (
          <>
            {this.ViewPopup()}
            {this.viewCloseAndOpen()}
            {this.viewBorder()}
            {this.viewBody(data.map((item) => this.viewItemExpand(item, 1)))}
          </>
        ),
      });
    }

    return <div />;
  };

  private viewCloseAndOpen = () => {
    const { isClose = false } = this.state;

    return (
      <div
        className={this.gpc("cao")}
        dangerouslySetInnerHTML={{ __html: isClose ? openIcon : closeIcon }}
        onClick={() => this.setState({ isClose: !isClose })}
      />
    );
  };

  private viewBorder = () => <div className={this.gpc("border")} />;

  private viewBody = (children: ReactNode) => (
    <div className={this.gpc("body")}>{children}</div>
  );

  private viewContainer = (obj: { className: string; children: ReactNode }) => {
    const { style, className } = this.props;
    const { isClose = false } = this.state;
    return (
      <div
        style={style}
        className={this.classNames(className, this.gpc(), obj.className, {
          [this.gpc("close")]: isClose,
        })}
      >
        {obj.children}
      </div>
    );
  };

  private ViewPopupChildren = (data: any[], level: number) => {
    const { childrenExtractor } = this.props;
    let res: { level: number; data: any }[] = [];

    for (const item of data) {
      res.push({ level, data: item });
      const children = childrenExtractor(item) ?? [];
      if (children.length > 0) {
        res = [...res, ...this.ViewPopupChildren(children, level + 1)];
      }
    }

    return res;
  };

  private ViewPopup = () => {
    const { data, keyExtractor, childrenExtractor } = this.props;
    const openKeys = this.getBindValue("openKeys") ?? [];
    const { openPopup } = this.state;
    const item = data.find((i) => keyExtractor(i) === openKeys[0]);
    const children = this.ViewPopupChildren(
      item ? childrenExtractor(item) ?? [] : [],
      2
    );

    return (
      <div
        className={this.classNames(this.gpc("popup"), {
          [this.gpc("close")]: !openPopup,
        })}
      >
        {children.map((i) =>
          this.viewItemExpand(
            i.data,
            i.level,
            this.classNames({
              [this.gpc("hover")]:
                (childrenExtractor(i.data) ?? []).length === 0,
            })
          )
        )}
      </div>
    );
  };

  private viewInline = (data: any[], level: number) => {
    const { childrenExtractor, keyExtractor } = this.props;
    const openKeys = this.getBindValue("openKeys") ?? [];
    const res: ReactNode[] = [];
    for (const item of data) {
      const key = keyExtractor(item);

      res.push(this.viewItemInline(item, level));
      const children = childrenExtractor(item) ?? [];
      if (children.length > 0) {
        res.push(
          <div
            key={`${key}-children`}
            className={this.classNames(this.gpc("children"), {
              [this.gpc("close")]: !openKeys.includes(key),
            })}
          >
            {this.viewInline(children, level + 1)}
          </div>
        );
      }
    }

    return res;
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

  private onClickViewItemInline = (data: any) => {
    const { childrenExtractor, keyExtractor } = this.props;
    const openKeys = this.getBindValue("openKeys") ?? [];
    const children = childrenExtractor(data) ?? [];
    const hasChildren = children.length > 0;
    const key = keyExtractor(data);

    if (hasChildren) {
      if (openKeys.includes(keyExtractor(data))) {
        this.setState({
          openKeys: openKeys.filter((i) => i !== key),
        });
      } else {
        this.setState({
          openKeys: [...openKeys, key],
        });
      }
    } else {
      this.setState({ selectedKey: key, selectedData: data });
    }
  };

  private viewItemInline = (data: any, level: number) => {
    const { keyExtractor, iconExtractor, nameExtractor, childrenExtractor } =
      this.props;
    const openKeys = this.getBindValue("openKeys") ?? [];
    const selectedKey = this.getBindValue("selectedKey");
    const key = keyExtractor(data);
    const children = childrenExtractor(data) ?? [];
    const hasChildren = children.length > 0;
    let arrowIconType;
    if (openKeys.includes(key)) {
      arrowIconType = "up2-line";
    } else {
      arrowIconType = "down2-line";
    }
    const icon = level === 1 && iconExtractor(data);

    return (
      <div
        className={this.classNames(
          this.gpc("item"),
          this.gpc(`level${level}`),
          {
            [this.gpc("active")]:
              (level === 1 &&
                this.childrenHasKey(children, selectedKey ?? "")) ||
              selectedKey === key,
          }
        )}
        key={key}
        onClick={() => this.onClickViewItemInline(data)}
      >
        {icon && <div className={this.gpc("icon")}>{icon}</div>}
        <div className={this.gpc("text")}>{nameExtractor(data)}</div>
        {hasChildren && (
          <div className={this.gpc("arrow")}>
            <Icon type={arrowIconType} style={{ fontSize: 14 }} />
          </div>
        )}
      </div>
    );
  };

  private onClickViewItemExpand = (data: any) => {
    const { childrenExtractor, keyExtractor } = this.props;
    const children = childrenExtractor(data) ?? [];
    const hasChildren = children.length > 0;
    const key = keyExtractor(data);
    const openKeys = this.getBindValue("openKeys") ?? [];

    if (hasChildren) {
      if (openKeys.includes(key)) {
        this.popupshow = false;
        const openKeys = [] as string[];
        this.setState({
          openPopup: false,
          openKeys,
        });
      } else {
        setTimeout(() => {
          this.popupshow = true;
          const openKeys = [key];
          this.setState({
            openPopup: true,
            openKeys,
          });
        });
      }
    } else {
      this.popupshow = false;
      this.setState({
        selectedKey: key,
        selectedData: data,
        openPopup: false,
        openKeys: [],
      });
    }
  };

  private viewItemExpand = (data: any, level: number, className = "") => {
    const { keyExtractor, iconExtractor, nameExtractor, childrenExtractor } =
      this.props;
    const openKeys = this.getBindValue("openKeys") ?? [];
    const selectedKey = this.getBindValue("selectedKey");
    const key = keyExtractor(data);
    const children = childrenExtractor(data) ?? [];
    const hasChildren = children.length > 0;
    const icon = level === 1 && iconExtractor(data);

    return (
      <div
        className={this.classNames(
          className,
          this.gpc("item"),
          this.gpc(`level${level}`),
          {
            [this.gpc("active")]:
              this.childrenHasKey(children, selectedKey ?? "") ||
              openKeys.includes(key) ||
              selectedKey === key,
          }
        )}
        key={key}
        onClick={() =>
          (level === 1 || (level !== 1 && !hasChildren)) &&
          this.onClickViewItemExpand(data)
        }
      >
        {icon && <div className={this.gpc("icon")}>{icon}</div>}
        <div className={this.gpc("text")}>{nameExtractor(data)}</div>
        {level === 1 && hasChildren && (
          <div className={this.gpc("arrow")}>
            <Icon type="right2-line" style={{ fontSize: 14 }} />
          </div>
        )}
      </div>
    );
  };
}

const openIcon =
  "<img width='39' height='50' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAADICAYAAAAdp4isAAAABHNCSVQICAgIfAhkiAAAD8lJREFUeJztnV+IHMedx7+/rtnV7M5UzybCmzuM8emSw8nDmfgUCIfjQ364O0jiw+HIwUEO2Q8hMYRgxw934IPEEEEccCyCwTbkIeEMAZuzBJYNPj9IsdCLQWcTQcxiy/KhKE7kHXk1vbsz09Pdv3vw9nq03t2Z3anqqp7+fWDQzkxP1e/ho191/ekqiqKIMd0kALobrx6ALhG9y8zXACwz81UAf2Tm95VSVxqNxmUi+tBlwNMMVUC4/dIG8BoRvZNl2dtEtATgLa31B64DKzMi3B4hoveY+VwQBKeVUmfq9fpF1zGVCRFucq4CeJ6ZX223268cOnSo5zognxHhDENEp5j5ZaXUqfn5+cuu4/ENEc4uZ4noZJIkJxYWFi65DsYHRLjiuADgaWZ+LgzDZdfBuEKEc8MLzPxsGIYnXAdSNCKcWy4y8zO9Xu+pxcXFVdfBFIEI5wHMvAbgSaXUzxuNxh9cx2MTEc4/jiulHp+fn/+960BsELgOQPgED6Zpenl1dfUxZv6U62BMIxnOY5g5CoLgWLPZfMx1LKYQ4crBUpZlj7ZarV+7DmRSRLgSQUQvAnik2WxecB3LfpF7uBLBzPcw82+jKPqh61j2i2S48nIewMNa69+4DmQvSIYrL4cBnImi6MeuA9kLkuGmg3NE9L1ms/mm60BGIRluOriTmd+Ioui7rgMZBS0vL1c2wxHRDX/n7/O/hz8rC8z8izAMv+06jp2otHDjMixfEATei8jMrxPR/Vrr37mOZSsi3D7J5fNYwA4zHw3D8KTrQIaRe7h9wsxI0xSDwQBxHGMwGCBNUzB78/83JKITq6urD7kOZBgRzhBZliFJEsRxjDiOvZGPmX/W6XQedx1HjghnAWbelC/PfC4hoh+srq7+l9MgNhDhLDOc+ZIkcZb1mPlbnU7npUuXLtWdBLCBdBocEAQBlFIIguL/vzPzWWa+t9VqXSu8ckiGc0KWZRgMBhgMBsiyrNC6ieiuIAj+Z3V19TOFVryBCOeQYfEKbmoPM/NLLqQT4TwgyzIX93iHmfml69evf7qoCgERzivycb0Ce7WHiehkkR0JEc4z8iGVoppZIrrr4MGD/229og1EOE/Jm9kish0RfbWocToRznOKynYb43TWZyREuBJQVLbbmJGwOvdK7MOEXwEw8w2vLMs2X2mabr58RymFWq1mtQ5m/oatVSaVEW4c8hUgSZJsvnyUMAgC1Go1m0uiOgD+1sZ6OhFuBPlQRb4MyReICLVazdr0GDO/Hobhl02XK8LtAWbeXH7ki3y1Wg1KKStl21iuLsLtkyzL0O/30e/3nTe7NqUD8IDW+mlThYlwBojjGP1+32nWs9mZIKI7TD2CKMIZJEkSdLtdZ+JZlO6c1vorJgqScTiD1Go1aK3RarUwOztbeP15D9sCd5p6wl8ynEXiOEa327UlwY5YzHRHJt3LRIQrgG63i/X19ULrtCTdea31lyYpQJrUApibm8PCwkKhzaylmZPDk24VJhmuYHq9HtbW1gqrz8aQCRHdvt9NESXDFUy9Xker1bI+H5qTJImN5yaO7feHIpwDarUaWq0W6vViFtqaXrrOzPdcv379X/fzW2lSHVNUhyIIAszMzJgscklr/fk9x2EyAmHvzM3NQWttvZ78gWyD3La6uvrve/2RZDhPSJIEURRZf07VZCeCmSOt9a1E9OG4v5EM5wm1Wg1hGNqchAdg9n6OiPTa2tp/7Ok3kuH8Ik1TRFFkdQWK6fs5pdQt454NJhnOM5RS0FpbzXSm7+fSNH143Gslw3lKmqbodDpW7+lmZmaMrRgOguDmcY7elAznKXmms4nJZjtN0++Pc51kOM+J4xhRFFkr31SvlZnXer3en4062VoynOfMzs5ifn7eWvmmeq1E1KjX6w+Muk6EKwFzc3NWp8FMNa1E9J1R14hwJaHRaFib8De4AfZnO53ON3a7QIQrEY1Gw1rZpoZJiOhbu34vnYZyYXM9nalhEma+KQzD5e2+kwxXMur1urWVwwbv5f5lp+9EuBJiq9eab+5jgB1PNRThSohSyqp0BvjrlZWVQ9t9IcKVlLm5OSu9VlM91lqttm1vVYQrMXNzc1bKNXEvx8z3bve5CFdiZmdnrXQgDHUe7lpfX79l64ciXMnxOculafr1rZ+JcCWnVqtZyXImOg9E9NWtn5VeuN/efTeunznjOgyn2MhyWZZN3Hlg5q9vPXSk1MLlslVdOp+z3MGDB/9x+H1phdsqWdWlO3DggPEyTdzHEdHfD78vpXA7yVVl6WZnZ40/B5EfMTAh3xx+UzrhRklVZelsZDkDzepir9f7bP6mdMLd+sPRu0VVVTpPhUOapkfyv0snXOvIEdx++vTI66ooXRAExjsPJnqrWZbdnf9dOuEAkW43fOytEtGd+d+lFA4Q6XbChnAGxuP+Ioqim4ASCweIdNtBRFaaVQN8ASi5cMBH0v3lE0+MvK5K0hneB87I8Agz3wZMgXAAcPODD4p0Q5gWDpi8WQ2C4K+AKREOEOmGUUpZGQSe8PefA6ZIOECkG8b0amAD93F/B0yZcMBH0i0ePTryummXzrRwBqa4DgJTKBwA3PbLX1ZeOg+Fw8rKyqemUjhApLPxgI2BGYdbplY4QKTzreOglLp5qoUDqi2db8IR0Z9PvXBAdaXzTbggCD5TCeGAakpnav/eHAMdh8XKCAdUTzrTwk0KM9/kV0QFUCXpfMtwRPTpyu4P97933IG1N98ced3tp0+jdeSI/YAskKYpVlZWjJVnYCXKUuUyXM7fvPEGGl/84sjrypzpiMh1CFuZq6xwwPRL51uTCqBeaeGA6ZfOM+Yqew+3lbNjNj9lu6drt9tGy5vwybCk8hkuZ5wsJ0yOCIdq9Fg9oVt54US2Qqm2cNMum+mjLw0Ms/QqK9y0ywaYWTRpmGpmuKX77pt62QD/hCOidysn3NJ99+Hqr3418rqyywb416Qy87VKCVcl2QDzwhlguTLCVU02wMsMd7USwlVRNsDsmfaAkV7qH6deuKrKBvgnHDO/P9XCVVk2wD/hlFJXpla4qstm6oTnYSYVrtFoXJ5K4aouG2BeOBOLOYnow6kT7srx45WXDfBSuDYwZatFrhw/jncfemjkddMuG2BeOAOrh18Dpkg4ke1j0jT1rsNARO8AUyKcyHYjg8HAeJmTCpdl2dvAFAh3/cwZkW0LpoUjIhMZbgkouXD5SYKjqJJszIw4jo2Waejpr7cAwPwmYgUhsm2PadkAI/dv7zWbzQ+AkmY4kW1nbAg3aYZj5nObZU0cTcGIbDuTZZmV5nTSDBcEwebpLaUT7v8efXTkNVWUDQD6/b7xMk3cvymlzmyWN3FpBTNKpqrKBngr3NV6vX5xs7xJS3PBTlJVWbY4jq0M9hqY0np++E0phQM+KVeVZQPsZDcTW7Yy86vD70srHPCxZFWXLUkSL3unANBut18Zfi+b2UwBURRZ6Z1OekgcEZ1qNpv33FDuRCUKzvE5uzHzy58od+JSBad0u10r5Zq4f1NKndr6mQhXYuI4tpLdDJ3vcHZ+fv7y1g9FuBLjc3YjopPbfS7ClZRut2vlQRmllJHnF5IkObHd5yJcCUnTFOvr61bKNrQU6cLCwsKlbcs3UbpQLDZlMyTc0zvWYaJ0oTh6vZ6VjgJg7jA4Zn5up+9EuBKRJAnW1taslG0wu70QhuHyjvWYqEEoBluyAeZOkGbmZ3f7Xqa2SsLa2hp6vZ6VspVSpoS7qLX+3G4XSIYrAd1u15psgNF7t2dGXSPCeU4cx9Z6pcBHTamJcTdmXuv1ek+Nuk6E85gkSRBFkbXygyAweUz5k4uLi6ujLpJ7OE9J0xSdTsfqPr0zMzPGThwMguDmRqPxh5HXGalNMEqapoiiyKpsSimTx1seH0c2QDKcd+SymX4+YRgTiyuHUUrdMj8///ux6jZWqzAxRcgGmBtzAwAi+um4sgGS4bwh7yDYPluhVquZHAaJtNa3EtGHY9dvpGZhIuI4ttobzVFKmeyVIgiCY3uRDZAM55xer2d1yirH9H0bgCWt9ef3+iPJcA6xOV01DBEZvW8DgCzLRu+5sV0skuGKJ1/1YWPF7naYHG8DACJ6sdls/tN+fisZrmCKakJzarWaUdk2eGS/PxThCiJfFm5r8eR2mOyRDvGjZrN5Yb8/lia1ALrdrtUJ+O0wuORomPNa6y9NUoBkOIvEcWzt6ardsCQbADw8aQEinAWSJEG32y20+cyxKNsxrfVvJi1EmlSDJEmCXq9nZeuscbAo2zmt9VdMFCQZzgBxHKPf7zvJaDkWZQMRfc9UWSLcPsmyDP1+H/1+3/pk+ygs9UZzHmg2m2+aKkyE2wP5oRu2NpHZDzZlY+ZfhGG440PN+0Hu4UaQpikGgwEGg4E3kgEfT1dZGNQFADDz62EYftl0uZLhhmBmpGmKJEk2X66by+0IgsDYwy870CGi+20UXBnhmPmGV5Zlm6/8uEcf5dqKzc5BDjMfDcPwdzbKrrXbbRvlChaw3DkAABDRD7TW2+7tZoLKZLgyU0ATCgBg5p9prZ+wWYcI5zlFZDUAIKJntdYTT12NQoTzlKKyGvDRbuNa63+zXhFEOO8gIuPPHuwGM59tt9v/XEhlEOG8IhetiKy2wXlmvvfQoUP217lvIMJ5gAPRAOA8EX2t1WpdK7JSEc4h+WYytmYLduE8EX2t2Wz+qeiKRTgHFNkh2Aozn2Xme4vObDmy1UNB5J2B2dlZzMzMuJLt5Xa7/Q+uZAMkw1kn36y5qF7nTmyMsxUy9LEbIpwF8mwWBIGTTLaVjRkE64O64yDCGSLPZL5IlrMxN2p1umoviHD7hIhuEMwnyTboMPNRmxPx+0GEG4NcqFwyTwXbhJlfJ6L7bS0xmoRKC5dLs92/w68ysbEs/Nuu49iJ2oEDB1zHIJjjAdPPIJhGxuGmg3NEdIfW2mvZgIo3qVPCMa31f7oOYlxEuPJyHsDDJrZfKBIRrpz8SGu9rx0oXSPClQgiehHAI5Psz+YaEa4cLGVZ9mir1fq160AmRYTzGGaOgiA41mw2H3MdiylEOE8hop82m82f7PUcBN8R4fzjuFLq8b0cJ1QmRDgPYOY1AE8qpX4+7ql8ZUWEc8tFZn6m1+s9Nc7httOACOeGF5j52TAMT7gOpGhEuOK4AOBpZn4uDMNl18G4QoSzy1kiOpkkyYmFhYVLroPxARHOMER0iplfVkqdmp+fv+w6Ht8Q4SbnKoDnmfnVdrv9SpHbJpQREW6PENF7zHwuCILTSqkz9Xr9ouuYyoQItzNtAK8R0TtZlr1NREsA3mo2mx+4DqzMVEG4BEB349UD0CWid5n5GhF9AOBqlmV/Yub30zS9EgTB5YWFhamaTvKJ/wfUoQS7eKdHkwAAAABJRU5ErkJggg=='/>";

const closeIcon =
  "<img height='50' width='33' src='data:image/png;base64,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'/>";
