import { TimeLine, getRandomColor } from 'ims-gantt-timeline-calendar';
import './index.less';

const tasks = [
  { name: 'Task 1', start: 0, duration: 3, resource: 'John', fillColor: getRandomColor() },
  { name: 'Task 2', start: 2, duration: 4, resource: 'Jane', fillColor: getRandomColor() },
  {
    name: 'Task 3 long long long',
    start: 7,
    duration: 1,
    resource: 'Bob',
    fillColor: getRandomColor(),
  },
  { name: 'Task 4', start: 8, duration: 2, resource: 'Bose', fillColor: getRandomColor() },
  { name: 'Task 5', start: 10, duration: 8, resource: 'Uno', fillColor: getRandomColor() },
  {},
  // Add more tasks as needed
];

export default () => {
  return (
    <>
      <TimeLine tasks={tasks} />
    </>
  );
};
