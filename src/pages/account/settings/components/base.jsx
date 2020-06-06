import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { connect } from 'dva';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
import styles from './BaseView.less';

const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能
const { TextArea } = Input;
const AvatarView = ({ avatar }) => (
  <>
    
    
  </>
);

const validatorGeographic = (_, value, callback) => {
  const { province, city } = value;

  if (!province.key) {
    callback('Please input your province!');
  }

  if (!city.key) {
    callback('Please input your city!');
  }

  callback();
};

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');

  if (!values[0]) {
    callback('Please input your area code!');
  }

  if (!values[1]) {
    callback('Please input your phone number!');
  }

  callback();
};

class BaseView extends Component {
  view = undefined;

  getAvatarURL() {
    const { currentUser } = this.props;

    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  }

  getViewDom = ref => {
    this.view = ref;
  };

  handleFinish = () => {
    message.success(
      formatMessage({
        id: 'upload-file.basic.update.success',
      }),
    );
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={currentUser}
            hideRequiredMark
          >
            <Form.Item
              label={formatMessage({
                id: 'upload-file.basic.file_desc',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'upload-file.basic.file-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input />
            </Form.Item>			
			<Form.Item
			name="file"
              label={formatMessage({
                id: 'upload-file.basic.file',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'upload-file.basic.geographic-message',
                    },
                    {},
                  ),
                },
                {
                  validator: validatorGeographic,
                },
              ]}
			>
			
			<Upload showUploadList={false}>
				  <div className={styles.button_view}>
					<Button>
					  <UploadOutlined />
					  <FormattedMessage
						id="upload-file.basic.upload_file"
						
					  />
					</Button>
				  </div>
			</Upload>
			</Form.Item>
            <Form.Item>
              <div></div>
            </Form.Item>
            
            <Form.Item>
              <Button htmlType="submit" type="primary"> 上 传 文 件
                
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
		<Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={currentUser}
            hideRequiredMark
          >
         <Form.Item
              label={formatMessage({
                id: 'upload-file.basic.upload_message',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'upload-file.basic.file-message',
                    },
                    {},
                  ),
                },
              ]}
            >
             <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder={formatMessage({
                id: 'upload-file.basic.upload_format.placeholder',
              })}
              rows={5}
			  readOnly
            />
            </Form.Item>
		</Form>
        </div>
      </div>
    );
  }
}

export default connect(({ accountAndsettings }) => ({
  currentUser: accountAndsettings.currentUser,
}))(BaseView);
