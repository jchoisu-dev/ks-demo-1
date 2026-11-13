//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, Select } from 'antd';
//
const { TextArea } = Input;
const { Option } = Select;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
//
export default (props) => {
  //
  const { SET, SEND, NewsList, NewsListLoading, TitleContent } =
    useModel('data');
  const [form] = Form.useForm();
  const [form_edit] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      NewsList: [],
      NewsListLoading: 1,
      TitleContent: '',
    });
    SEND('news/list', v);
  };
  useEffect(() => getD(), []);
  //
  const Addform = () => {
    return (
      <div style={{ width: 600 }}>
        <Form form={form_edit}>
          <Form.Item name="title">
            <Input addonBefore="Title" />
          </Form.Item>
          <Form.Item name="auth">
            <Input addonBefore="Source" />
          </Form.Item>
          <Form.Item name="_time">
            <Input addonBefore="DateTime" />
          </Form.Item>
          <Form.Item name="content" noStyle>
            <TextArea rows={10} />
          </Form.Item>
        </Form>
      </div>
    );
  };
  //
  useEffect(() => {
    if (!TitleContent) return;
    SET({
      M: {
        t: '编辑新闻内容',
        c: <Addform />,
        bc: () => {
          SET({ M: '', TitleContent: '' });
          form_edit.resetFields();
        },
        b: () => {
          SEND('news/edit', {
            _id: TitleContent.id,
            ...form_edit.getFieldsValue(),
          });
        },
      },
    });
    form_edit.setFieldsValue({ ...TitleContent });
  }, [TitleContent]);
  //
  // console.log(TitleContent);
  //
  const _xs = {
    1: <b>是</b>,
    2: '否',
  };
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Row>
          <Col flex="1">
            <Form
              form={form}
              onFinish={(v) => getD(v)}
              initialValues={{
                xs: '',
              }}
            >
              <Row gutter="16">
                <Col flex="300px">
                  <Form.Item name="_title" noStyle>
                    <Input addonBefore="Title" />
                  </Form.Item>
                </Col>
                <Col flex="140px">
                  <Form.Item noStyle>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={NewsListLoading}
                    >
                      Search
                    </Button>
                  </Form.Item>
                </Col>
                <Col flex="90px">
                  <Form.Item noStyle>
                    <Button block onClick={() => form.resetFields()}>
                      Clear
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col flex="1">
            <div style={{ float: 'right' }}>
              <Button
                style={{ width: 270 }}
                onClick={() => {
                  SET({
                    M: {
                      t: 'Add News Content',
                      c: <Addform />,
                      bc: () => form_edit.resetFields(),
                      b: () => SEND('news/add', form_edit.getFieldsValue()),
                    },
                  });
                }}
              >
                Add
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="boe br5 ov">
        <Table
          tableClass={'hover'}
          columns={[
            ['ID'],
            ['Title'],
            ['Source'],
            ['Date'],
            [
              'Edit',
              (v) => (
                <Button
                  size="small"
                  type="primary"
                  onClick={() => SEND('news/get', { _id: v[0] })}
                >
                  Edit
                </Button>
              ),
            ],
            [
              'Delete',
              (v) => (
                <Button
                  size="small"
                  onClick={() => SEND('news/del', { _id: v[0] })}
                >
                  Delete
                </Button>
              ),
            ],
          ]}
          data={NewsList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
