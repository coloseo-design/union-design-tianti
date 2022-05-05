---
category: Components
type: 通用
title: Upload
subtitle: 上传
---

## API

| 参数            | 说明                                                                                                                                                                                                     | 类型                                                                                             | 默认值 |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- | :----- |
| action          | 上传的地址                                                                                                                                                                                               | string or (file: UploadFile) => string \| Promise<string>                                        | -      |
| data            | 上传所需额外参数或返回上传额外参数的方法                                                                                                                                                                 | Record<string, any> or (file: UploadFile) => Record<string, any> \| Promise<Record<string, any>> | -      |
| accept          | 接受上传的文件类型                                                                                                                                                                                       | string                                                                                           | -      |
| method          | 上传请求的 http method                                                                                                                                                                                   | 'POST' \| 'PUT' \| 'PATCH'                                                                       | 'POST' |
| withCredentials | 上传请求时是否携带 cookie                                                                                                                                                                                | boolean                                                                                          | false  |
| disabled        | 是否禁用                                                                                                                                                                                                 | boolean                                                                                          | false  |
| headers         | 设置上传的请求头部                                                                                                                                                                                       | Record<string, string>                                                                           | -      |
| beforeUpload    | 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象） | (file: UploadFile) => boolean \| Promise<UploadFile>                                             | -      |
| directory       | 支持上传文件夹                                                                                                                                                                                           | boolean                                                                                          | false  |
| multiple        | 是否支持多选文件                                                                                                                                                                                         | boolean                                                                                          | false  |
| listType        | 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card                                                                                                                                       | 'text' \| 'picture' \| 'picture-card'                                                            | 'text' |
| name            | 发到后台的文件参数名                                                                                                                                                                                     | string                                                                                           | 'file' |
| onPreview       | 点击文件链接或预览图标时的回调                                                                                                                                                                           | (file: UploadFile) => void                                                                       | -      |
| onChange        | 上传文件改变时回调                                                                                                                                                                                       | (fileList: UploadFile[]) => void                                                                 | -      |
| canDrag         | 能否拖拽文件                                                                                                                                                                                             | boolean                                                                                          | false  |
| renderList      | 自定义文件上传列表                                                                                                                                                                                       | (files:UploadFile[])=> ReactElement                                                              | -      |
| onRemove        | 点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除                                                                                 | (file:UploadFile)=> boolean \| Promise\<boolean\>                                                | -      |

### UploadFile

| 参数     | 说明                            | 类型                                                 | 默认值        |
| :------- | :------------------------------ | :--------------------------------------------------- | :------------ |
| file     | 选择的文件                      | File                                                 | -             |
| uid      | 文件唯一标识                    | string                                               | -             |
| status   | 文件状态                        | 'pre-treated' \| 'uploading' \| 'error' \| 'success' | 'pre-treated' |
| percent  | 文件上传进度                    | number                                               | 0             |
| action   | 文件上传地址                    | string                                               | -             |
| data     | 文件上传 携带额外 formdata 参数 | Record<string, any>                                  | -             |
| name     | 文件名                          | string                                               | -             |
| thumbUrl | 文件缩略图                      | string                                               | -             |
