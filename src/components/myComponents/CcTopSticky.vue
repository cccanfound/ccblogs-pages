<template>
  <div class='ccTopSticky'
       :class="[animationUp?'ccTopStickyUp':'',animationDown?'ccTopStickyDown':'']">
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: 'CcTopSticky',
    props: {},
    data() {
      return {
        animationUp: false,
        animationDown: false,
        lastScrollTop: 0,
        //多次同向不再重复动画
        visible: true
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        // 获取滚动条滚动的距离
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        // 判断是否需要隐藏 sticky
        if (scrollTop > this.lastScrollTop) {
          if (this.visible == true) {
            this.animationDown = false;
            this.animationUp = true;
            this.visible = false
          }
        } else {
          if (this.visible == false) {
            this.animationUp = false;
            this.visible = true
            this.animationDown = true;
          }
        }
        this.lastScrollTop = scrollTop;
      }
    }

  };
</script>
<style scoped lang="scss">


  @keyframes up {
    0% {
      top: 0px;
    }
    100% {
      top: -75px;
    }
  }

  @keyframes down {
    0% {
      top: -75px;
    }
    100% {
      top: 0px;
    }
  }

  .ccTopSticky {
    width: 100%;;
    height: 75px;
    /*background-color: #07090d;*/
    position: fixed;
    overflow: hidden;
    /*border*/
    border-bottom: 2px solid;
    /*border-image: -webkit-linear-gradient(90deg,#6772FF, #51E2F7) 5 10;*/
    /*border-image: -moz-linear-gradient(90deg,#6772FF, #51E2F7) 5 10;*/
    /*border-image: linear-gradient(90deg,#6772FF, #51E2F7) 5 10;*/
    border-image: -webkit-linear-gradient(90deg,#6772FF, #55f79c) 5 10;
    border-image: -moz-linear-gradient(90deg,#6772FF, #55f79c) 5 10;
    border-image: linear-gradient(90deg,#6772FF, #55f79c) 5 10;
  }

  .ccTopStickyUp {
    animation-name: up;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }

  .ccTopStickyDown {
    animation-name: down;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }
</style>
