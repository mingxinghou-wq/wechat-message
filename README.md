# ChatKB

基于 Ollama + FastAPI 的本地 RAG 对话前端，豆包风格三栏 UI，GitHub Pages 托管静态页面。

访问地址：https://mingxinghou-wq.github.io/wechat-message/

## 技术栈
- Vue3 + Vite
- Pinia
- Element Plus
- marked（Markdown 渲染）
- 后端：FastAPI + Ollama

## 功能
- 会话列表，每个会话绑定独立模型
- Ollama 多模型切换
- RAG 参考片段展示
- SSE 流式输出

## 本地开发
```bash
npm install
npm run dev
```

## 部署
推送 main 分支后，GitHub Actions 自动构建并发布到 GitHub Pages。
后端接口地址在 workflow 环境变量 VITE_API_URL 中配置。
