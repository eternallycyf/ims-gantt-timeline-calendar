<a name="readme-top"></a>

> 🚧 Don't use this for production code!

<div align="center">

[//]: # '<img width="160" src="https://avatars.githubusercontent.com/u/17870709?v=4">'

<h1>ims-gantt-timeline-calendar</h1>

node 版本 24.x（Vercel 文档站构建）

[Changelog](./CHANGELOG.md) · [Report Bug][issues-url] · [Request Feature][issues-url]

<!-- SHIELD GROUP -->

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] [![install size][npm-size]][npm-size-url]

[![Test CI status][test-ci]][test-ci-url] [![Deploy CI][release-ci]][release-ci-url] [![Coverage][coverage]][codecov-url]

[![contributors][contributors-shield]][contributors-url] [![forks][forks-shield]][forks-url] [![stargazers][stargazers-shield]][stargazers-url] [![issues][issues-shield]][issues-url]

[![ docs by dumi][dumi-url]](https://d.umijs.org/) [![Build With father][father-url]](https://github.com/umijs/father/)

<!-- gitpod url -->

[gitpod-badge]: https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod
[gitpod-url]: https://gitpod.io/#https://github.com/ant-design/ims-gantt-timeline-calendar

<!-- umi url -->

[dumi-url]: https://img.shields.io/badge/docs%20by-dumi-blue
[father-url]: https://img.shields.io/badge/build%20with-father-028fe4.svg

<!-- npm url -->

[npm-image]: http://img.shields.io/npm/v/ims-gantt-timeline-calendar.svg?style=flat-square&color=deepgreen&label=latest
[npm-url]: http://npmjs.org/package/ims-gantt-timeline-calendar
[npm-size]: https://img.shields.io/bundlephobia/minzip/ims-gantt-timeline-calendar?color=deepgreen&label=gizpped%20size&style=flat-square
[npm-size-url]: https://packagephobia.com/result?p=ims-gantt-timeline-calendar

<!-- coverage -->

[coverage]: https://codecov.io/gh/eternallycyf/ims-gantt-timeline-calendar/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/eternallycyf/ims-gantt-timeline-calendar/branch/master

<!-- Github CI -->

[test-ci]: https://github.com/eternallycyf/ims-gantt-timeline-calendar/workflows/Test%20CI/badge.svg
[release-ci]: https://github.com/eternallycyf/ims-gantt-timeline-calendar/workflows/Release%20CI/badge.svg
[test-ci-url]: https://github.com/eternallycyf/ims-gantt-timeline-calendar/actions?query=workflow%3ATest%20CI
[release-ci-url]: https://github.com/eternallycyf/ims-gantt-timeline-calendar/actions?query=workflow%3ARelease%20CI
[download-image]: https://img.shields.io/npm/dm/ims-gantt-timeline-calendar.svg?style=flat-square
[download-url]: https://npmjs.org/package/ims-gantt-timeline-calendar

</div>

## 简介

基于 zrender Canvas 的 React 甘特 / Timeline 组件，交互对齐飞书甘特图与 Notion Timeline。

## 快速上手

### 安装

推荐使用 `pnpm` 安装

```bash
pnpm i ims-gantt-timeline-calendar -S
```

### 使用

```tsx
import { useRef } from 'react';
import { TimeLine, getRandomColor } from 'ims-gantt-timeline-calendar';
import type { TimeLineRef } from 'ims-gantt-timeline-calendar';

const tasks = [
  { name: 'Task 1', start: 0, duration: 3, resource: 'John', fillColor: getRandomColor() },
  {},
];

export default () => {
  const ref = useRef<TimeLineRef>(null);
  return (
    <TimeLine
      ref={ref}
      tasks={tasks}
      height={480}
      config={{ unitWidth: 120, showArrow: true }}
      onDataChange={(p) => console.log(p.reason, p.tasks)}
    />
  );
};
```

支持：任务拖拽 / 拉伸、里程碑 🚩、今日线、休息日斜线、横向滚动、week/month 视图、视口外箭头定位、双击编辑与右键菜单。

详情见文档站点与 [CHANGELOG](./CHANGELOG.md)。

## 🤝 Contributing

<!-- CONTRIBUTION GROUP -->

> 📊 Total: <kbd>**1**</kbd>

<a href="https://github.com/eternallycyf" title="eternallycyf">
  <img src="https://avatars.githubusercontent.com/u/63464198?v=4" width="50" />
</a>

<!-- CONTRIBUTION END -->

<div align="right">

[![][back-to-top]](#readme-top)

## </div>

#### 📝 License

Copyright © 2020 - present [eternallycyf][profile-url]. <br />
This project is [MIT](./LICENSE) licensed.

<!-- LINK GROUP -->

[profile-url]: https://github.com/eternallycyf

<!-- SHIELD LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square

<!-- contributors -->

[contributors-shield]: https://img.shields.io/github/contributors/eternallycyf/ims-gantt-timeline-calendar.svg?style=flat
[contributors-url]: https://github.com/eternallycyf/ims-gantt-timeline-calendar/graphs/contributors

<!-- forks -->

[forks-shield]: https://img.shields.io/github/forks/eternallycyf/ims-gantt-timeline-calendar.svg?style=flat
[forks-url]: https://github.com/eternallycyf/ims-gantt-timeline-calendar/network/members

<!-- stargazers -->

[stargazers-shield]: https://img.shields.io/github/stars/eternallycyf/ims-gantt-timeline-calendar.svg?style=flat
[stargazers-url]: https://github.com/eternallycyf/ims-gantt-timeline-calendar/stargazers

<!-- issues -->

[issues-shield]: https://img.shields.io/github/issues/eternallycyf/ims-gantt-timeline-calendar.svg?style=flat
[issues-url]: https://github.com/eternallycyf/ims-gantt-timeline-calendar/issues/new/choose
