<template>
  <div style="overflow:hidden;background-color: #171718">
    <cc-top-sticky>
      <svg-icon icon-class="blogger" class-name="bloggerIcon"/>
      <div class="title">cc's Blogger</div>
    </cc-top-sticky>
    <div style="height: 1000px; overflow:hidden; margin-top: 75px">
      <!-- follow me-->
      <div style="height: 36px">
        <span class="follow">FOLLOW ME:</span>
        <div style="padding-top: 5px;display: inline-block">
          <svg-icon icon-class="weChat" @mouseover="handleOver(0)" @mouseleave="handleLeave(0)" :class="iconHover[0]?'iconHover':''"  class-name="connectIcon"/>
          <svg-icon icon-class="email" @mouseover="handleOver(1)" @mouseleave="handleLeave(1)" :class="iconHover[1]?'iconHover':''" class-name="connectIcon"/>
          <svg-icon icon-class="qq" @mouseover="handleOver(2)" @mouseleave="handleLeave(2)" :class="iconHover[2]?'iconHover':''" class-name="connectIcon"/>
          <svg-icon icon-class="phone" @mouseover="handleOver(3)" @mouseleave="handleLeave(3)" :class="iconHover[3]?'iconHover':''" class-name="connectIcon"/>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import CcTopSticky from '../../components/myComponents/CcTopSticky';

  export default {
    name: 'IndexForCustomer',
    components: {
      CcTopSticky
    },
    data() {
      return {
        iconHover: [false,false,false,false]
      };
    },
    mounted() {

    },
    watch: {},
    methods: {
      handleOver(t) {
        this.$set(this.iconHover,t,true)
      },
      handleLeave(t) {
        this.$set(this.iconHover,t,false)
      }
    }
  }
</script>

<style lang="scss">


</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #bec3c4;
  $light_gray: #eee;

  .title {
    display: inline-block;
    margin-bottom: 25px;
    font-size: 19px !important;
    color: #fff !important;
  }

  .bloggerIcon{
    margin-top: 25px;
    margin-left: 15px;
    margin-right: 15px;
    height: 28px;
    width: 28px;
    fill: white;
  }
  .connectIcon {
    margin-right: 20px;
    height: 28px;
    width: 28px;
    fill: #d5dce4;
  }

  .iconHover {
    fill: #218bff;
  }

  .follow{
    color: #fff;
    line-height: 36px;
    vertical-align: top;
    display: inline-block;
    margin: 0 20px;
    font-size: 20px !important;
    font-weight: 600 !important;
    letter-spacing: -0.04em;
    word-spacing: .1em;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  }

  /*.login-container {*/
  /*  min-height: 100%;*/
  /*  width: 100%;*/
  /*  @media only screen and (min-width: 0px) and (max-width: 600px){*/
  /*    background: url("../../icons/svg/pkqback.png") no-repeat center;*/
  /*    background-size:100% 100%;*/
  /*  }*/
  /*  @media only screen and (min-width: 601px) {*/
  /*    background: url("../../icons/svg/backp.jpg") no-repeat center;*/
  /*    background-size:100% 100%;*/
  /*  }*/
  /*  overflow: hidden;*/


  /*}*/
</style>
