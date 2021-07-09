**后台管理系统**

技术栈 - React 17：

- JSX、State、事件处理等
- 状态提升、组建解耦、组合
- Refs转发
- Render Props、错误边界（Error Boundaries) 等高阶组件

技术栈 - React Hook：

- useState、useRef 等自带Hook
- 自定义Hook：异步操作、状态管理、debounce、路由、增删改查等

技术栈 - TypeScript4

技术栈 - 其他：

- Hook + Context / Redux Toolkit 管理客户端全局状态
- React Query 管理服务端全局状态
- 性能优化、性能监控、性能报告
- 自动化测试：单元测试、集成测试、e2e测试
- CSS-in-JS、Grid、Flexbox
- React Router 6

2021/07/06 PM

依赖以及快速搭建react项目

```
$ npx -v
6.14.13

$ npx create-react-app myjira --template typescript

We suggest that you begin by typing:

  cd myjira
  npm start

Happy hacking!
```

通过tsconfig.json 配置路径，避免 "../../src" 相对路径

```
{
  "compilerOptions": {
    "baseUrl": "./src",		//配置路径
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}

```

安装prettier工具（代码格式化）

```
npm install --save-dev --save-exact prettier

然后，创建一个空配置文件，让编辑器和其他工具知道您正在使用Prettier：
echo {}> .prettierrc.json
```

除了从命令行（Prettier--write）运行Prettier、检查CI中的格式以及从编辑器运行Prettier之外，许多人还喜欢将Prettier作为预提交挂钩运行。这样可以确保所有提交都已格式化，而无需等待CI构建完成。
例如，可以执行以下操作，以便在每次提交之前运行Prettier：

```
npm install --save-dev husky lint-staged

package.json文件夹下添加如下：
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,css,md,ts,tsx}": "prettier --write"
  }
  为不与eslint冲突，同样在package.json中的 "eslintConfig" 添加 "prettier"
    "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier"
    ]
  },
```

