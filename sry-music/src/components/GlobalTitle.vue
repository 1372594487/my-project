<template>
  <div class="globaltitle">
    <div class="left">
      <router-link to="/">
      <slot name="left"
        ><span
          ><svg
            t="1609145675059"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1712"
            width="24"
            height="24"
          >
            <path
              d="M721.768049 957.138196c-7.789407 0-15.579837-2.935865-21.571295-8.867972l-419.492096-414.459476c-5.812379-5.752004-9.106402-13.601786-9.106402-21.810748 0-8.207939 3.295046-16.057721 9.106402-21.809725l419.492096-414.459476c11.983939-11.983939 31.457456-11.744485 43.382043 0.239454 11.864212 12.103666 11.744485 31.517831-0.239454 43.382043L345.955778 512l397.382543 392.648728c11.983939 11.864212 12.103666 31.277354 0.239454 43.382043C737.586316 954.082604 729.678206 957.138196 721.768049 957.138196z"
              p-id="1713"
              fill="#dbdbdb"
            ></path></svg></span
      ></slot>
      </router-link>
    </div>
    <div class="middle">
      <slot>default</slot>
    </div>
    <div class="right">
      <slot name="right"><span><svg t="1609146304860" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12088" width="34" height="34"><path d="M281.6 486.4a25.6 25.6 0 0 1 25.6 25.6v256a25.6 25.6 0 0 1-51.2 0V512a25.6 25.6 0 0 1 25.6-25.6z m153.6-204.8a25.6 25.6 0 0 1 25.6 25.6v460.8a25.6 25.6 0 0 1-51.2 0V307.2a25.6 25.6 0 0 1 25.6-25.6z m153.6 102.4a25.6 25.6 0 0 1 25.6 25.6v358.4a25.6 25.6 0 0 1-51.2 0V409.6a25.6 25.6 0 0 1 25.6-25.6z m153.6-153.6a25.6 25.6 0 0 1 25.6 25.6v512a25.6 25.6 0 0 1-51.2 0V256a25.6 25.6 0 0 1 25.6-25.6z" fill="#dbdbdb" p-id="12089"></path></svg></span></slot>
    </div>
  </div>
</template>

<script>
export default {};

// //父级
// <template>
//     <div>
//         <layout>
//             <template #header>头部标题</template>  // 具名插槽的缩写
//             <div>显示的内容</div>
//             <template v-solt:footer>尾部</template>
//         </layout>
//     </div>
// </template>

// //layout子组件
// <template>
//     <div>
//         <layout>
//             <h1>layout子组件</h1>
//             <slot name="header"></slot>  //这种就叫具名插槽
//             <slot></slot>   //如果不指定名字，就会将模板中未匹配到的内容渲染到默认插槽中，这里为显示的内容
//             <slot name="footer"></slot>
//         </layout>
//     </div>
// </template>
</script>

<style scoped lang="less">
.globaltitle {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 41px;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  .left {
    flex: 1;
    span {
      svg{
          margin-left: -3em;
      }
    }
  }
  .middle {
    flex: 2;
    line-height: 2px;
  }
  .right {
    flex: 1;
    svg{
          margin-left: 3em;
      }
  }
}
</style>
