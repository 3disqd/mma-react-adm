import React, { useContext, useEffect } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  TreeSelect,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  Switch,
} from 'antd';
import { PointsContext } from '../../contexts/PointsContext';
import InputSchedule from '../InputSchedule/InputSchedule';
import InputMenu from '../InputMenu/InputMenu';

const PointCard = ({ pointId, orgId }) => {
  const {
    // loading,
    // loadPointById,
    loadPointByOrganizationId,
    updatePoint,
    [pointId]: point,
    [orgId + '_tags']: tags = [],
  } = useContext(PointsContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!point) {
      console.log('FETCH POINTS!');
      loadPointByOrganizationId(orgId);
    }
  }, [orgId, loadPointByOrganizationId, point]);

  // useEffect(() => {
  //   loadPointById(pointId);
  //   console.log('fetch point');
  // }, [loadPointById, pointId]);

  useEffect(() => {
    form.setFieldsValue(point);
    return () => {
      form.setFieldsValue({ schedule: undefined });
    };
  }, [point, form]);

  const save = async () => {
    try {
      const row = await form.validateFields();
      updatePoint(point.id, row);
      console.log(row);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card
      bordered={false}
      // bodyStyle={{ paddingLeft: 0 }}
      extra={
        <>
          <Button type="link" danger>
            Cancel
          </Button>
          <Button type="link" onClick={save}>
            Save
          </Button>
        </>
      }
      title={point ? point.name : ''}
    >
      <Form form={form} layout="vertical" size="middle">
        <Form.Item label="name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="address" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="menu" name="menu">
          <InputMenu tags={tags}/>
        </Form.Item>
        <Form.Item label="schedule" name="schedule">
          <InputSchedule />
        </Form.Item>
        <Form.Item label="groups" name="groups">
          <Select
            mode="tags"
            optionLabelProp="label"
            placeholder={'placeholder'}
          >
            {tags.map(tag => (
              <Select.Option key={tag} value={tag} label={tag}>
                kek lol <br />
                {tag}
                <br />
                lol kek
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [
                  {
                    title: 'Bamboo',
                    value: 'bamboo',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="InputNumberInputNumberInputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Switch">
          <Switch />
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PointCard;
