import { FC, useEffect } from 'react';
import { useLocation } from 'react-use';
import * as zrender from 'zrender';
import { div } from 'zrender/lib/core/vector';
import './index.less';
import type { TimeLineProps } from './interface';
import { useSearchParams, useSearchParamsActions } from './store/useGanttChartStore';
import { getRandomColor } from './utils';
import { hachureLines } from './utils/hachure';
import { isHoliday } from './utils/holidays';
import { getRealDuration } from './utils/task';

const TimeLine: FC<TimeLineProps> = (props) => {
  const { tasks = [] } = props;
  const { refreshSearchParamsStore } = useSearchParamsActions();
  const {
    initChartStartX,
    initChartStartY,
    timeScaleHeight,
    milestoneTopHeight,
    unitWidth,
    barHeight,
    barMargin,
    halfUnitWidth,
    taskNamePaddingLeft,
  } = useSearchParams();

  useEffect(() => {
    refreshSearchParamsStore();
  }, [location]);

  const handleInitTimeLine = () => {
    let container = document.getElementById('TimeLine');
    let zr = zrender.init(container);
    // margin left to the container
    const chartStartX = initChartStartX;
    // margin top to the container
    const chartStartY = Math.max(initChartStartY, timeScaleHeight + milestoneTopHeight);

    // 1. 拿到画布的宽
    const canvasWidth = zr.getWidth()!;
    const canvasHeight = zr.getHeight();
    // 2. 计算需要画多少格
    const timeScaleWidth = Math.ceil(canvasWidth / unitWidth);

    // 3. 画时间轴的矩形，设置位置x,y,长宽，给一个背景色填充
    const timeScale = new zrender.Rect({
      shape: {
        x: chartStartX,
        y: chartStartY - timeScaleHeight,
        width: timeScaleWidth * unitWidth,
        height: timeScaleHeight,
      },
      style: {
        fill: 'rgba(255, 0,0, .2)',
      },
    });
    zr.add(timeScale);

    const lastScrollX = 0;
    const gridStartX = chartStartX;
    const gridEndX = timeScaleWidth * unitWidth;
    const gridLineCount = timeScaleWidth + 1;
    const deltaScrollX = Math.floor(lastScrollX / unitWidth);

    // 3. 遍历要画的线的个数
    for (let i = 0 + deltaScrollX, count = 0; count < gridLineCount; i++, count++) {
      const gridX = gridStartX + i * unitWidth;
      // 4. 画一根线，从（x1, y1） -> (x2, y2)
      const gridLine = new zrender.Line({
        shape: {
          x1: gridX,
          y1: chartStartY - timeScaleHeight,
          x2: gridX,
          y2: chartStartY + (barHeight + barMargin) * tasks.length,
        },
        style: {
          stroke: 'lightgray',
        },
      });
      // 1. 线比格子多1，所以要提前1步退出
      if (count < gridLineCount - 1) {
        // MARK: 同一个遍历画「休息日斜线」
        const now = +new Date('2024-01-01');
        const currentDate = now + i * 60 * 1000 * 60 * 24;
        const dateInfo = isHoliday(currentDate);
        // 是休息日的话画斜线
        if (dateInfo.isHoliday) {
          try {
            // 返回要画的线的开始、结束坐标
            const lines = hachureLines(
              [
                [chartStartX + i * unitWidth, chartStartY],
                [chartStartX + i * unitWidth + unitWidth, chartStartY],
                [
                  chartStartX + i * unitWidth + unitWidth,
                  chartStartY + (barHeight + barMargin) * tasks.length,
                ],
                [chartStartX + i * unitWidth, chartStartY + (barHeight + barMargin) * tasks.length],
              ],
              10,
              45,
            );
            // 用zrender画线段，描边上色
            lines.forEach((line) => {
              const [x1, y1] = line[0];
              const [x2, y2] = line[1];
              const l = new zrender.Line({
                shape: {
                  x1,
                  y1,
                  x2,
                  y2,
                },
                style: {
                  stroke: 'rgba(221, 221, 221, 0.7)',
                },
              });
              zr.add(l);
            });
          } catch (error) {
            console.log(error);
          }
        }

        // 2. 画基本文本，可以直接改成日期名字，这里直接写遍历的index
        const dateText = new zrender.Text({
          style: {
            // text: i,
            text: dateInfo.dateString,
            x: gridX,
            y: chartStartY - timeScaleHeight,
          },
          z: 1,
        });
        // 3. 为了居中，要算出文本的宽高
        const { width, height } = dateText.getBoundingRect();
        // 4. 重新设置日期文本位置，居中
        dateText.attr({
          style: {
            x: gridX - width / 2 + halfUnitWidth,
            y: chartStartY - timeScaleHeight - height / 2 + timeScaleHeight / 2,
          },
        });
        // 5. 加到zrender实例中
        zr.add(dateText);
      }

      zr.add(gridLine);
    }

    // 1. 遍历tasks数组
    tasks.forEach(function (task, index) {
      // 2. 因为有最后一行是空行，没有任务，用来创建新任务，轮空不画
      if (!task?.name) return;
      // 3. 计算任务的绘制位置和矩形宽高
      const x = chartStartX + task.start * unitWidth;
      const y = chartStartY + (barHeight + barMargin) * index;
      const width = task.duration * unitWidth;
      const taskBarRect = {
        width,
        height: barHeight,
      };
      // 4. 建一个组，设置可以拖拽 （感谢这个属性，后续交互省了很多力气，还可以设置只能垂直或者水平拖动）
      const group = new zrender.Group({
        x,
        y,
        draggable: true, // Enable draggable for the group
        // draggable: "horizontal", // Enable draggable for the group
      });
      // 5. 创建任务跨度矩形
      const rect = new zrender.Rect({
        shape: {
          x: 0,
          y: 0,
          width: width,
          height: barHeight,
          r: 6,
        },
        style: {
          fill: task.fillColor,
        },
        cursor: 'move',
      });
      // 6. 加到组里
      group.add(rect);

      // Create a text shape for task name
      const taskName = new zrender.Text({
        style: {
          text: task.name,
          x: taskNamePaddingLeft,
          y: barHeight / 2 - 12 / 2,
          textFill: 'white',
          textAlign: 'left',
          textVerticalAlign: 'middle',
          fill: 'white',
        } as any,
        cursor: 'move',
      });
      group.add(taskName);
      // Create a text shape for resource assignment
      const resourceText = new zrender.Text({
        style: {
          text: 'Assigned to: ' + task.resource,
          x: 0 + width + 5,
          y: barHeight / 2 + 0 - 12 / 2,
          textFill: 'black',
        } as any,
        cursor: 'normal',
      });
      group.add(resourceText);
      const taskDurationText = new zrender.Text({
        style: {
          text: `${getRealDuration(task, false)}天`,
          x: width - taskNamePaddingLeft,
          y: barHeight / 2 - 12 / 2,
          textFill: 'white',
          textAlign: 'left',
          textVerticalAlign: 'middle',
          fill: 'white',
        } as any,
        cursor: 'move',
      });
      const { width: taskDurationTextWidth } = taskDurationText.getBoundingRect();
      taskDurationText.attr({
        style: {
          x: width - taskDurationTextWidth - taskNamePaddingLeft,
        },
      });
      group.add(taskDurationText);

      zr.add(group);
    });
  };

  useEffect(handleInitTimeLine, []);

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
      <div id="TimeLine" style={{ width: 5000, height: 250, overflow: 'scroll' }}></div>
    </div>
  );
};

export default TimeLine;
