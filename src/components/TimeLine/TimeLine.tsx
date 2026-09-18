import { Form, Input, Menu, Modal, message } from 'antd';
import type { MenuProps } from 'antd';
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { applyGanttConfig } from './core/config';
import { initGantt } from './core/gantt';
import { setLocale, t } from './core/i18n';
import './core/gantt.css';
import './index.less';
import type { GanttTask, TimeLineProps } from './interface';

export interface TimeLineRef {
  resetScroll: () => void;
  clearTasks: () => void;
  clearMilestones: () => void;
  copyTask: (index: number) => void;
  deleteTask: (index: number) => void;
  updateTask: (index: number, values: Partial<GanttTask>) => void;
  addTaskAt: (pos: { posX: number; posY: number }, values: Partial<GanttTask>) => void;
  addTasks: (tasks: GanttTask[]) => void;
  redraw: () => void;
  getCategories: () => string[];
  getCategoryColors: () => Record<string, string>;
  destroy: () => void;
}

const TimeLine = forwardRef<TimeLineRef, TimeLineProps>((props, ref) => {
  const {
    tasks,
    mileStones,
    config,
    height = 420,
    style,
    className,
    locale = 'zh',
    onEditTask,
    onContextMenu,
    onHideContextMenu,
    onCreateTask,
    onDataChange,
    onScrollXChange,
    toolbar,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);
  const [contextMenu, setContextMenu] = useState<{
    open: boolean;
    index: number;
    x: number;
    y: number;
  }>({ open: false, index: -1, x: 0, y: 0 });
  const [editState, setEditState] = useState<{ open: boolean; index: number; task?: GanttTask }>({
    open: false,
    index: -1,
  });
  const [createState, setCreateState] = useState<{
    open: boolean;
    posX: number;
    posY: number;
  }>({ open: false, posX: 0, posY: 0 });
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();

  const hideMenu = useCallback(() => {
    setContextMenu((prev) => ({ ...prev, open: false }));
    onHideContextMenu?.();
  }, [onHideContextMenu]);

  useEffect(() => {
    setLocale(locale);
  }, [locale]);

  useEffect(() => {
    if (!containerRef.current) return;

    applyGanttConfig(config || {});
    const api = initGantt({
      container: containerRef.current,
      initialTasks: tasks,
      initialMileStones: mileStones,
      onScrollXChange,
      onDataChange,
      onHideContextMenu: hideMenu,
      onEditTask: (payload: { index: number; task: GanttTask }) => {
        if (onEditTask) {
          onEditTask(payload);
          return;
        }
        setEditState({ open: true, index: payload.index, task: payload.task });
        form.setFieldsValue({
          name: payload.task?.name,
          resource: payload.task?.resource,
          category: payload.task?.category,
          fillColor: payload.task?.fillColor,
        });
      },
      onContextMenu: (payload: { index: number; x: number; y: number }) => {
        if (onContextMenu) {
          onContextMenu(payload);
          return;
        }
        setContextMenu({
          open: true,
          index: payload.index,
          x: payload.x,
          y: payload.y,
        });
      },
      onCreateTask: (payload: { posX: number; posY: number }) => {
        if (onCreateTask) {
          onCreateTask(payload);
          return;
        }
        setCreateState({ open: true, posX: payload.posX, posY: payload.posY });
        createForm.resetFields();
      },
    });

    apiRef.current = api;

    return () => {
      api.destroy();
      apiRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!apiRef.current || !config) return;
    applyGanttConfig(config);
    apiRef.current.redraw();
  }, [config]);

  useImperativeHandle(ref, () => ({
    resetScroll: () => apiRef.current?.resetScroll(),
    clearTasks: () => apiRef.current?.clearTasks(),
    clearMilestones: () => apiRef.current?.clearMilestones(),
    copyTask: (index) => apiRef.current?.copyTask(index),
    deleteTask: (index) => apiRef.current?.deleteTask(index),
    updateTask: (index, values) => apiRef.current?.updateTask(index, values),
    addTaskAt: (pos, values) => apiRef.current?.addTaskAt(pos, values),
    addTasks: (list) => apiRef.current?.addTasks(list),
    redraw: () => apiRef.current?.redraw(),
    getCategories: () => apiRef.current?.getCategories() || [],
    getCategoryColors: () => apiRef.current?.getCategoryColors() || {},
    destroy: () => apiRef.current?.destroy(),
  }));

  const menuItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: '编辑',
        onClick: () => {
          const task = (window as any).tasks?.[contextMenu.index];
          setEditState({ open: true, index: contextMenu.index, task });
          form.setFieldsValue({
            name: task?.name,
            resource: task?.resource,
            category: task?.category,
            fillColor: task?.fillColor,
          });
          hideMenu();
        },
      },
      {
        key: 'copy',
        icon: <CopyOutlined />,
        label: t('menu.copyTask'),
        onClick: () => {
          apiRef.current?.copyTask(contextMenu.index);
          hideMenu();
        },
      },
      {
        key: 'delete',
        icon: <DeleteOutlined />,
        danger: true,
        label: t('menu.deleteTask'),
        onClick: () => {
          Modal.confirm({
            title: t('contextMenu.deleteConfirm'),
            onOk: () => {
              apiRef.current?.deleteTask(contextMenu.index);
              hideMenu();
            },
          });
        },
      },
    ],
    [contextMenu.index, form, hideMenu],
  );

  return (
    <div className={['ims-gantt-timeline', className].filter(Boolean).join(' ')} style={style}>
      {toolbar}
      {contextMenu.open ? (
        <div
          style={{
            position: 'fixed',
            left: contextMenu.x,
            top: contextMenu.y,
            zIndex: 1100,
            boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
            background: '#fff',
            borderRadius: 8,
          }}
        >
          <Menu items={menuItems} style={{ border: 'none' }} />
        </div>
      ) : null}
      <div
        ref={containerRef}
        className="ims-gantt-timeline__canvas"
        style={{ width: '100%', height, outline: '1px solid #e5e7eb' }}
      />

      <Modal
        title={t('modal.editTitle')}
        open={editState.open}
        onCancel={() => setEditState({ open: false, index: -1 })}
        onOk={async () => {
          const values = await form.validateFields();
          apiRef.current?.updateTask(editState.index, values);
          setEditState({ open: false, index: -1 });
          message.success('已保存');
        }}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="任务名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="resource" label="负责人">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="分类">
            <Input />
          </Form.Item>
          <Form.Item name="fillColor" label="颜色">
            <Input type="color" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={t('modal.addTitle', { date: String(createState.posX) })}
        open={createState.open}
        onCancel={() => setCreateState({ open: false, posX: 0, posY: 0 })}
        onOk={async () => {
          const values = await createForm.validateFields();
          apiRef.current?.addTaskAt(
            { posX: createState.posX, posY: createState.posY },
            values,
          );
          setCreateState({ open: false, posX: 0, posY: 0 });
        }}
        destroyOnClose
      >
        <Form form={createForm} layout="vertical">
          <Form.Item name="name" label="任务名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="resource" label="负责人">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="分类">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

TimeLine.displayName = 'TimeLine';

export default TimeLine;
