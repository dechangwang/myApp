import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const ModelTrain = props => {
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
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  return (
    <PageHeaderWrapper content={<FormattedMessage id="model-train.model_train.description" />}>
      <Card bordered={false}>
        <Form hideRequiredMark style={{  marginTop: 8, }}
          form={form}
          name="basic"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
        <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="model-train.model.label" />}
            name="title"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'model-train.title.required',
                }),
              },
            ]}
          >		
			<Select>
                <Option value="SegNet" selected="selected">SegNet</Option>
				<Option value="UNet">UNet</Option>
				<Option value="PSPNet">PSPNet</Option>
            </Select>
        </FormItem>
        <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="model-train.epoch.label" />}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'model-train.date.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'model-train.epoch.placeholder',
              })}
            />
          </FormItem>
		  
		  <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="model-train.batch.label" />}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'model-train.batch.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'model-train.batch.placeholder',
              })}
            />
          </FormItem>
		  
		  <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="model-train.lr.label" />}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'model-train.batch.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'model-train.lr.placeholder',
              })}
            />
          </FormItem>
		  
		  <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="model-train.class_num.label" />}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'model-train.class_num.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'model-train.class_num.placeholder',
              })}
            />
          </FormItem>
		  
          
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="model-train.model_data.label" />}
            name="label"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'model-train.model_data.required',
                }),
              },
            ]}
          >
            
			
			<Select
                
              >
                <Option value="wzh_data_1" selected="selected">wang_data_1</Option>
				<Option value="wzh_data_2">wang_data_2</Option>
				<Option value="wzh_data_3">wang_data_3</Option>
              </Select>
          </FormItem>
		  
		  <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="model-train.model_name.label" />}
            name="model_name"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'model-train.model_name.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'model-train.model_name.placeholder',
              })}
            />
          </FormItem>
          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="model-train.form.submit" />
            </Button>
            
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(ModelTrain);
