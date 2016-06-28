# antiaris-weak-connected-graph
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

任意依赖拓扑图谱下的静态资源文件名加戳。

>静态资源文件一般通过在文件名中注入内容戳（如md5）来解决新版本上线后浏览器、服务器不能即时刷新缓存的问题。但文件存在相互依赖关系，一个文件内部可能存在另一个文件的路径，因此在对文件名加戳后，需要对所有引用位置进行路径替换。这需要严格按照依赖的先后关系进行，特别地，如果存在依赖环路，将找不到加戳的最初始文件，也就不能确定顺序。

>退步思考，只要确定文件内容一定会变，则在文件名中加什么戳并不重要。本 repo 提供一种递归算法，能够对文件名使用加内容戳和时间戳两种方式，从而避免了确定加戳顺序的问题，也就能解决环路问题。

[npm-url]: https://npmjs.org/package/antiaris-weak-connected-graph
[downloads-image]: http://img.shields.io/npm/dm/antiaris-weak-connected-graph.svg
[npm-image]: http://img.shields.io/npm/v/antiaris-weak-connected-graph.svg
[travis-url]: https://travis-ci.org/antiaris/antiaris-weak-connected-graph
[travis-image]: http://img.shields.io/travis/antiaris/antiaris-weak-connected-graph.svg
[david-dm-url]:https://david-dm.org/antiaris/antiaris-weak-connected-graph
[david-dm-image]:https://david-dm.org/antiaris/antiaris-weak-connected-graph.svg
[david-dm-dev-url]:https://david-dm.org/antiaris/antiaris-weak-connected-graph#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/antiaris/antiaris-weak-connected-graph/dev-status.svg