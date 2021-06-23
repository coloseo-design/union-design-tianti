/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
import React, { createRef, FC } from 'react';
import Button from '../button';
import Icon from '../icon';
import { BaseComponent, BaseProps } from '../common/base-component';
import { uuid } from '../utils/uuid';

export type UploadMethod = 'POST' | 'PUT' | 'PATCH';

export type UploadListType = 'text' | 'picture-card';

export type UploadFileStatus = 'pre-treated' | 'uploading' | 'error' | 'success';

export type UploadFile = {
  file: File;
  uid: string;
  status: UploadFileStatus;
  percent: number;
  action: string;
  data: Record<string, unknown>;
  name: string;
  thumbUrl?: string;
  response?: unknown;
  abort?: () => void;
};

export type UploadPorps = {
  /** 上传的地址 */
  action?: string | ((file: UploadFile) => string | Promise<string>);
  /** 上传所需额外参数或返回上传额外参数的方法 */
  data?: Record<string, unknown> | ((file: UploadFile) => Record<string, unknown>
    | Promise<Record<string, unknown>>);
  /** 接受上传的文件类型 */
  accept?: string;
  /** 上传请求的 http method */
  method?: UploadMethod;
  /** 上传请求时是否携带 cookie */
  withCredentials?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 设置上传的请求头部 */
  headers?: Record<string, string>;
  /** 上传文件之前的钩子，参数为上传的文件，
   * 若返回 false 则停止上传。支持返回一个 Promise 对象，
   * Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象） */
  beforeUpload?: (file: UploadFile) => boolean | Promise<UploadFile>;
  /** 支持上传文件夹 */
  directory?: boolean;
  /** 是否支持多选文件 */
  multiple?: boolean;
  /** 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card */
  listType?: UploadListType;
  /** 发到后台的文件参数名 */
  name?: string;
  /** 点击文件链接或预览图标时的回调 */
  onPreview?: (file: UploadFile) => void;
  /** 上传文件改变时回调 */
  onChange?: (fileList: UploadFile[]) => void;
  /** 能否拖拽文件 */
  canDrag?: boolean;
} & BaseProps;

export default class Upload extends BaseComponent<UploadPorps> {
  public static Button: FC<UploadPorps & {
    btnText?: string;
    btnIcon?: string;
    btnDesc?: string;
  }> = (props) => {
    const {
      btnDesc, btnText = '上传文件', btnIcon = 'folder-upload', ...otherProps
    } = props;

    return (
      <Upload {...otherProps}>
        <div>
          <Button icon={btnIcon}>{btnText}</Button>
        </div>
        {btnDesc && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              marginTop: 5,
              fontSize: 14,
              lineHeight: '22px',
              color: 'rgba(0, 0, 0, 0.65)',
            }}
          >
            <span>{btnDesc}</span>
          </div>
        )}
      </Upload>
    );
  };

  public static Card: FC<UploadPorps & {
    btnText?: string;
    btnIcon?: string;
    btnDesc?: string;
  }> = (props) => {
    const {
      btnDesc, btnText = '上传照片', btnIcon = 'add', ...otherProps
    } = props;

    return (
      <Upload {...otherProps}>
        <div style={{
          width: 104,
          height: 104,
          borderRadius: 2,
          fontSize: 18,
          color: '#ACAFB9',
          textAlign: 'center',
          border: '1px dashed #C8CAD1',
          cursor: 'pointer',
          backgroundColor: '#E9EBF0',
        }}
        >
          <Icon type={btnIcon} style={{ marginTop: 30 }} />
          <div style={{
            fontSize: 14,
            lineHeight: '22px',
            color: 'rgba(0, 0, 0, 0.65)',
          }}
          >
            {btnText}
          </div>
        </div>
        {btnDesc && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              marginTop: 5,
              fontSize: 14,
              width: 104,
              lineHeight: '22px',
              color: 'rgba(0, 0, 0, 0.65)',
            }}
          >
            <span>{btnDesc}</span>
          </div>
        )}
      </Upload>
    );
  };

  public static Drag: FC<UploadPorps & {
    btnIcon?: string;
    btnDesc?: string;
  }> = (props) => {
    const { btnDesc, btnIcon = 'folder-upload', ...otherProps } = props;
    return (
      <Upload {...otherProps} canDrag>
        <div style={{
          width: 384,
          height: 192,
          border: '1px dashed #979BA7',
          borderRadius: 4,
          position: 'relative',
          backgroundColor: '#fff',
        }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '90%',
            transform: 'translate(-50%, -50%)',
          }}
          >
            <div style={{
              fontSize: 42,
              lineHeight: 0,
              textAlign: 'center',
              color: '#ACAFB9',
              cursor: 'pointer',
            }}
            >
              <Icon type={btnIcon} />
            </div>
            <div
              style={{
                textAlign: 'center',
                fontSize: 16,
                lineHeight: '24px',
                color: 'rgba(0, 0, 0, 0.85)',
                marginTop: 25,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              点击或将文件拖拽到这里上传
            </div>
            {btnDesc && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  marginTop: 5,
                  fontSize: 14,
                  lineHeight: '22px',
                  textAlign: 'center',
                  color: 'rgba(0, 0, 0, 0.65)',
                }}
              >
                <span>{btnDesc}</span>
              </div>
            )}
          </div>
        </div>
      </Upload>
    );
  };

  public static defaultProps: UploadPorps = {
    name: 'file',
    withCredentials: false,
    canDrag: false,
    data: {},
    method: 'POST',
    action: '',
    disabled: false,
    headers: {},
    directory: false,
    multiple: false,
    listType: 'text',
  };

  protected classPrefix = 'upload';

  private inputRef = createRef<HTMLInputElement>();

  private files: { [key: string]: UploadFile } = {};

  private inputKey = uuid();

  protected view = () => {
    const {
      children, accept, directory, multiple, listType, canDrag,
    } = this.props;

    const directoryProps = directory
      ? { directory: 'directory', webkitdirectory: 'webkitdirectory' }
      : {};

    const dragProps = canDrag
      ? {
        onDrop: this.inputOnDrop,
        onDragOver: this.inputOnDrop,
      } : {};

    return (
      <div className={this.getPrefixClass('wrap')}>
        {listType === 'picture-card' && this.viewListPictureCard()}
        <div
          onClick={this.wrapOnClick}
          {...dragProps}
          style={{
            verticalAlign: listType === 'picture-card' ? 'top' : 'initial',
            display: (listType === 'picture-card' && Object.keys(this.files).length === 1) ? 'none' : 'initial',
          }}
        >
          <input
            {...directoryProps}
            key={this.inputKey}
            type="file"
            accept={accept}
            multiple={multiple}
            ref={this.inputRef}
            style={{ display: 'none' }}
            onChange={this.inputOnChange}
            onClick={(e) => e.stopPropagation()}
          />
          {children}
        </div>
        {listType === 'text' && this.viewListText()}
      </div>
    );
  };

  private viewListPictureCard = () => {
    const { onPreview } = this.props;

    return Object.values(this.files).map((file) => (
      <div
        key={file.uid}
        className={this.gpc('list-picture-card')}
        onClick={() => onPreview?.(file)}
      >

        {file.status === 'success' && (
          <img src={file.thumbUrl} alt="" />
        )}

        {(file.status === 'success' || file.status === 'error') && (
          <div className={this.gpc('mask')} onClick={(event) => event.stopPropagation()}>
            <div className={this.gpc('icons')}>
              <Icon
                type="delete-can"
                onClick={() => this.onDelete(file)}
              />
            </div>
          </div>
        )}

        {file.status === 'uploading'
          && file.percent !== 0
          && file.percent !== 100 && (
            <div className={this.gpc('progress')}>
              <div className={this.gpc('text')}>文件上传中</div>
              <div className={this.gpc('percent')} style={{ width: `${file.percent}%` }} />
            </div>
        )}
      </div>
    ));
  };

  private viewListText = () => {
    const { onPreview } = this.props;

    return (
      <div className={this.gpc('list-text')}>
        {Object.values(this.files).map((file) => (
          <div className={this.gpc('item')} key={file.uid}>
            <div className={this.gpc('text')}>
              {file.status !== 'pre-treated' && (
                <div className={this.classNames(this.gpc('left'), this.gpc('icon'))}><Icon type="attachment" /></div>
              )}
              {file.status === 'pre-treated' && (
                <div className={this.classNames(this.gpc('left'), this.gpc('icon'))}><Icon type="loading" /></div>
              )}
              <div
                className={this.classNames(
                  this.gpc('icon'),
                  this.gpc('right'),
                  this.gpc('delete'),
                )}
                onClick={() => this.onDelete(file)}
              >
                <Icon type="close" />
              </div>
              {file.status === 'error' && (
                <div
                  className={this.classNames(
                    this.gpc('icon'),
                    this.gpc('right'),
                    this.gpc('re-upload'),
                  )}
                  onClick={() => this.reUpload(file)}
                >
                  <Icon type="refresh-line" />
                </div>
              )}
              <div
                onClick={() => onPreview?.(file)}
                className={this.classNames(this.gpc('title'), {
                  [this.gpc('error')]: file.status === 'error',
                })}
              >
                {file.name}
              </div>
            </div>
            {file.status === 'uploading'
              && file.percent !== 0
              && file.percent !== 100 && (
                <div className={this.gpc('progress')}>
                  <div style={{ width: `${file.percent}%` }} />
                </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  private reUpload = (file: UploadFile) => {
    this.upload(file);
  };

  private onDelete = (file: UploadFile) => {
    if (file.uid in this.files) {
      delete this.files[file.uid];
      file.abort?.();
      this.updateView();
    }
  };

  private inputOnDrop: React.InputHTMLAttributes<HTMLInputElement>['onDrop'] = (event) => {
    event.preventDefault();
    if (event.type === 'dragover') return;

    const files: File[] = [];

    if (event.dataTransfer.items) {
      Array.prototype.slice.call(event.dataTransfer.items)
        .filter((file: DataTransferItem) => file.kind === 'file')
        .forEach((file: DataTransferItem) => {
          const temp = file.getAsFile();
          temp && files.push(temp);
        });
    } else {
      Array.prototype.slice.call(event.dataTransfer.files).forEach((file: File) => {
        files.push(file);
      });
    }

    this.handleFile(files);
  }

  private inputOnChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = (event) => {
    const { files } = event.target;
    if (!files) return;

    this.handleFile(Array.prototype.slice.call(files));
  };

  private handleFile = (files: File[]) => {
    files.forEach((file) => {
      const newFile: UploadFile = {
        file,
        uid: uuid(),
        status: 'pre-treated',
        percent: 0,
        action: '',
        data: {},
        name: file.name,
      };
      this.files[newFile.uid] = newFile;
      this.FilePreTreated(newFile);
    });

    this.inputKey = uuid();
    this.updateView(() => this.props.onChange?.(Object.values(this.files)));
  };

  private wrapOnClick = () => {
    const { disabled } = this.props;

    if (disabled) return;

    this.inputRef.current?.click();
  };

  private FilePreTreated = async (file: UploadFile) => {
    const { action, data, beforeUpload } = this.props;

    if (typeof action === 'function') {
      file.action = await action(file);
    } else {
      file.action = action!;
    }

    if (typeof data === 'function') {
      file.data = await data(file);
    } else {
      file.data = data!;
    }

    const result = (await beforeUpload?.(file)) ?? true;

    if (result) {
      this.upload(file);
    }
  };

  private upload = async (file: UploadFile) => {
    const {
      headers, withCredentials, method, name,
    } = this.props;

    const formData = new FormData();

    Object.keys(file.data).forEach((key) => {
      const value = file.data[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
        return;
      }

      formData.append(key, file.data[key] as string);
    });

    if (file instanceof Blob) {
      formData.append(name!, file.file, file.name);
    } else {
      formData.append(name!, file.file);
    }

    const xhr = new XMLHttpRequest();

    if (xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.total > 0) {
          file.percent = (event.loaded / event.total) * 100;
        }
        this.updateView();
      };
    }

    xhr.onerror = (event) => {
      file.status = 'error';
      file.response = event;
      this.updateView(() => this.props.onChange?.(Object.values(this.files)));
    };

    xhr.onload = async () => {
      const { status, responseText, response } = xhr;
      const res = responseText ?? response;

      if (res) {
        try {
          file.response = JSON.parse(res);
        } catch (error) {
          file.response = res;
        }
      }

      if (status < 200 || status >= 300) {
        file.status = 'error';
        file.response = `error:${method},${file.action},${xhr.status}`;
      } else {
        file.status = 'success';
        file.thumbUrl ??= await getBase64(file) as string;
      }

      this.updateView(() => this.props.onChange?.(Object.values(this.files)));
    };

    xhr.open(method!, file.action, true);

    xhr.withCredentials = withCredentials!;

    if (headers!['X-Requested-With'] !== null) {
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }

    Object.keys(headers!).forEach((key) => xhr.setRequestHeader(key, headers![key]));

    xhr.send(formData);

    file.abort = xhr.abort.bind(xhr);

    file.status = 'uploading';
    this.updateView(() => this.props.onChange?.(Object.values(this.files)));
  };
}

function getBase64(file: UploadFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
