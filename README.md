# unicom-design

联通设计系统组件库

## 如何使用
- npm
```
npm install union-design
```
- yarn
```
yarn add union-design
```

## 目录结构
```
/workspace
    /src           * 组件源码部分
    /site          * 官网代码，可用于本地调试组件
    package.json   * 包管理文件
    tsconfig.json  * 官网代码ts配置文件
```

## 操作步骤 
```
编译打包依赖union-tool工具，具体命令参见package.json中的scripts字段

1， 安装项目依赖
    yarn | npm install
2,  开发调试     
    yarn dev
3,  打包es | lib | 全部
    yarn compile:es | yarn compile:lib ｜ yarn compile
4,  发布组件
    npm login 
    npm publish
4,  发布官网
    yarn build
```

## ts/tsx规范
- 规范继承自'plugin:react/recommended', 'airbnb'已经在项目里面通过lint进行检测

## 日常开发调试
- 在所开发的组件模块下创建demo.tsx组件
- 执行：
```
yarn dev
```
- 在浏览器输入
```
http://localhost:3000/#/components/你的组件文件夹名称
例如: http://localhost:3000/#/components/button
```


## 提交代码以及发布
- 版本发布：
```
yarn version
```

- 提交代码commit
```
yarn commit
```




