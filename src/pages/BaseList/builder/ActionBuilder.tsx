import type { BaseListApi } from '@/pages/BaseList/data';
import { Button } from 'antd';

const ActionBuilder = (actions: BaseListApi.Action[] | undefined) => {
  return (actions || []).map((action: BaseListApi.Action) => {
    if (action.component === 'button') {
      return <Button type={action.type}>{action.text}</Button>;
    }
    return null;
  });
};

export default ActionBuilder;
