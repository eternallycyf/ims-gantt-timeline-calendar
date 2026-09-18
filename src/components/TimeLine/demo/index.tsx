import { AimOutlined, DeleteOutlined, FlagOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import { useRef } from 'react';
import { TimeLine, getRandomColor } from 'ims-gantt-timeline-calendar';
import type { TimeLineRef } from 'ims-gantt-timeline-calendar';
import './index.less';

const todayOffset = Math.floor((Date.now() - +new Date(2024, 0, 1)) / (24 * 60 * 60 * 1000));

const tasks = [
  {
    name: 'Task 1',
    start: todayOffset,
    duration: 3,
    resource: 'John',
    category: 'Design',
    fillColor: getRandomColor(),
  },
  {
    name: 'Task 2',
    start: todayOffset + 2,
    duration: 4,
    resource: 'Jane',
    category: 'Design',
    fillColor: getRandomColor(),
  },
  {
    name: 'Task 3 long long long',
    start: todayOffset + 7,
    duration: 1,
    resource: 'Bob',
    category: 'Build',
    fillColor: getRandomColor(),
  },
  {
    name: 'Task 4',
    start: todayOffset + 8,
    duration: 2,
    resource: 'Bose',
    category: 'Build',
    fillColor: getRandomColor(),
  },
  {
    name: 'Task 5',
    start: todayOffset + 10,
    duration: 3,
    resource: 'Uno',
    category: 'QA',
    fillColor: getRandomColor(),
  },
  {},
];

const mileStones = [{ start: todayOffset + 10, name: '提测' }];

export default () => {
  const ref = useRef<TimeLineRef>(null);

  return (
    <TimeLine
      ref={ref}
      tasks={tasks}
      mileStones={mileStones}
      height={480}
      locale="zh"
      config={{
        unitWidth: 120,
        scrollSpeed: 35,
        showArrow: true,
        view: '',
      }}
      toolbar={
        <Space style={{ marginBottom: 12 }} wrap>
          <Button
            icon={<AimOutlined />}
            onClick={() => {
              ref.current?.resetScroll();
              message.info('已回到今天附近');
            }}
          >
            回到今天
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              ref.current?.clearTasks();
            }}
          >
            清空任务
          </Button>
          <Button
            icon={<FlagOutlined />}
            onClick={() => {
              ref.current?.clearMilestones();
            }}
          >
            清空里程碑
          </Button>
        </Space>
      }
      onDataChange={(payload) => {
        console.log('[gantt]', payload.reason, payload.tasks.length);
      }}
    />
  );
};
