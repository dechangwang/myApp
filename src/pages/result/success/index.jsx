import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
var isShow = false;
const BasicForm = props => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };
  function sleep(n) {
        var start = new Date().getTime();
        //  console.log('休眠前：' + start);
        while (true) {
            if (new Date().getTime() - start > n) {
                break;
            }
        }
        // console.log('休眠后：' + new Date().getTime());
    }

  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = values => {
    const { dispatch } = props;
	
	for (var i = 0; i < 2; i++){
		console.log(i);
	}
	sleep(2000);
	
	console.log("===onFinish=====");
    dispatch({
      type: 'formAndbasicForm/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = changedValues => {
    const { publicType } = changedValues;
	console.log("====changedValues====");
    if (publicType) setShowPublicUsers(publicType === '2');
  };


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const beforeUpload = (file)=> {
	this.setState({
          imageUrl: file,
	});
    return false;
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  console.log("》》》》before upload");
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('Image must smaller than 10MB!');
  }
  return isJpgOrPng && isLt2M;
}

class UploadComponent extends React.Component {
  state = {
    loading: false,
	modalVisible: false,
	isSleeping: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  
submit = () => {
	this.setState({
		isSleeping:true,
	},()=>{
		setTimeout(()=>{
			this.setState({
				modalVisible:true,
				isSleeping: false,
			});
		},2000);
	});
}
  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">选择图片</div>
      </div>
    );
    const { imageUrl , modalVisible, isSleeping} = this.state;
    return (
	<div>
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={file => {
			getBase64(file, imageUrl => {
				this.setState({
					imageUrl,
				});
			})
			return false;
		}}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
            <Button type="primary" onClick={this.submit} loading={isSleeping}>
              开始预测
            </Button>
			{
				modalVisible && (
				<Model_Dialog 
				 onCancel = {()=>this.setState({modalVisible:false})}
				/>
				)
			}
	</div>
    );
  }
}


class Model_Dialog extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
	  const {onCancel = ()=>{}} = this.props;
    return (
      <div>
        <Modal
          title="预测结果"
          visible={true}
          onOk={this.handleOk}
          onCancel={onCancel}
		  okButtonProps={{ visible: false }}
        >
          <img src = "https://images2018.cnblogs.com/blog/75922/201805/75922-20180531215929038-468528048.png"/>
        </Modal>
      </div>
    );
  }
}

  return (
    <PageHeaderWrapper content={<FormattedMessage id="predict.basic.description" />}>
      <Card bordered={false}>
		<FormItem
            {...formItemLayout}
            label={<FormattedMessage id="predict.model.label" />}
            name="title"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'predict.model.required',
                }),
              },
            ]}
          >
		<Select
                
              >
                <Option value="SegNet" selected="selected">SegNet</Option>
				<Option value="UNet">UNet</Option>
				<Option value="PSPNet">PSPNet</Option>
              </Select>
          </FormItem>
		  <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="predict.image.label" />}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'predict.image.required',
                }),
              },
            ]}
          >
            <UploadComponent />
          </FormItem>
            
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(BasicForm);
