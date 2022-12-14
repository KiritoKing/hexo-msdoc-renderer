# Hexo-MSDOC-Renderer

A hexo-based platform that renders ms-doc file with pandoc.

基于Pandoc实现的Hexo博客平台的MS-DOC文件渲染（目前仅支持DOCX）。



## 实现原理

利用本地的Pandoc将MSDOC文件转化成MD并释放媒体文件到指定文件夹来实现完美转化。

- 利用Filter `./filter.js` 处理AST中的冗余信息避免乱码
- 通过自己编写的 **[hexo-auto-front](https://github.com/KiritoKing/hexo-auto-front)** 插件实现通过格式化文件名自动生成 `front-matter`



## 使用方法

注意：本项目仅在Windows平台上通过测试，Mac平台不能保证运行

### 安装项目

本地需要安装**NodeJS**和**Pandoc**，并添加到环境变量中

克隆本仓库到本地，然后安装依赖项。

```shell
git clone https://github.com/KiritoKing/hexo-msdoc-renderer.git
npm install
```

### 运行项目

#### 运行和部署

这部分和普通Hexo项目保持一致，请参考[Hexo文档](https://hexo.io/zh-cn/docs/)

```shell
hexo server # 运行本地服务器
hexo generate # 生成静态文件
hexo deploy # 部署
```

注意：本项目由于项目安全原因没有提供 `_config.yml` ，请参照官网自行设置一份，需要单独配置的项目如下：

```yaml
permalink: posts/:abbrlink/

auto_category:
 enable: true
 depth: 

 # abbrlink config
abbrlink:
  alg: crc32      #support crc16(default) and crc32
  rep:        #support dec(default) and hex
  drafts: false   #(true)Process draft,(false)Do not process draft. false(default) 
  # Generate categories from directory-tree
  # depth: the max_depth of directory-tree you want to generate, should > 0
  auto_category:
     enable: false  #true(default)
     depth:        #3(default)
     over_write: false 
  auto_title: false #enable auto title, it can auto fill the title by path
  auto_date: false #enable auto date, it can auto fill the date by time today
  force: false #enable force mode,in this mode, the plugin will ignore the cache, and calc the abbrlink for every post even it already had abbrlink. This only updates abbrlink rather than other front variables.

marked:
  prependRoot: true
  postAsset: true
```



#### 转码Docx文件

1. 将文件放入 `./doc` 目录中（注意目前仅支持单级目录结构，这是主题选择决定的，详见`./convert.js`）

2. 启动hexo服务器，运行转码命令

   ```shell
   hexo server
   npm run convert
   ```

3. 命令结束后将 `./doc` 目录下所有一级目录下的所有文件，自动按 `YYYY-MM-DD@Filename.md` 的格式保存到对应的目录名称下。

4. 由于**Hexo-Server运行**中，将自动为新建的文件生成标题、日期、链接、分类等Front-Matter

