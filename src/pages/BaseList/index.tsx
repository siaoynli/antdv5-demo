import ActionBuilder from '@/pages/BaseList/builder/ActionBuilder';
import columnBuilder from '@/pages/BaseList/builder/ColumnBuilder';
import type { BaseListApi } from '@/pages/BaseList/data';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Pagination, Row, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';

const Index: React.FC = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);

  const init = useRequest<{ data: BaseListApi.Data }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`,
  );

  useEffect(() => {
    init.run().then(() => {});
  }, [page, per_page]);

  const paginationChangeHandler: (page: number, pageSize: number) => void = (_page, _per_page) => {
    setPage(_page);
    setPerPage(_per_page);
  };

  const searchLayout = () => {};
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Space>{ActionBuilder(init.data?.layout?.tableToolBar)}</Space>
        </Col>
      </Row>
    );
  };
  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Pagination
            total={init?.data?.meta?.total || 0}
            pageSize={init?.data?.meta?.per_page || 10}
            current={init?.data?.meta?.page || 1}
            showQuickJumper={true}
            hideOnSinglePage={true}
            onChange={paginationChangeHandler}
            onShowSizeChange={paginationChangeHandler}
          />
        </Col>
      </Row>
    );
  };

  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          dataSource={init?.data?.dataSource}
          columns={columnBuilder(init.data?.layout.tableColumn)}
          pagination={false}
          loading={init.loading}
          rowKey="id"
        />
        {afterTableLayout()}
      </Card>
    </PageContainer>
  );
};

export default Index;
