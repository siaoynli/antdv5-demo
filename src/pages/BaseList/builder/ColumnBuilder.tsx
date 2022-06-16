import type { BaseListApi } from '@/pages/BaseList/data';
import { Space, Tag } from 'antd';
import moment from 'moment';
import ActionBuilder from './ActionBuilder';

const ColumnBuilder = (tableColumn: BaseListApi.TableColumn[] | undefined) => {
  const newColumns: BaseListApi.TableColumn[] = [];
  (tableColumn || []).forEach((column) => {
    if (column.hideInColumn !== true) {
      console.log(column.type);
      switch (column.type) {
        case 'datetime':
          column.render = (value) => {
            //格式化时间
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
          };
          break;
        case 'switch':
          column.render = (value) => {
            //找出数组中符合条件的某一项
            const option: BaseListApi.Datum | undefined = (column.data || []).find(
              (item) => item.value === value,
            );
            return (
              <Tag color={value === 1 ? 'blue' : 'red'} key={option?.value}>
                {option?.title}
              </Tag>
            );
          };
          break;

        case 'actions':
          column.render = () => {
            //如果有按钮属性
            return column.actions?.length ? <Space>{ActionBuilder(column.actions)}</Space> : <></>;
          };
          break;
        default:
          break;
      }
      newColumns.push(column);
    }
  });

  //合并数组,显示id列
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
  ].concat(newColumns);
};

export default ColumnBuilder;
