<template>
    <div>
        <van-nav-bar title="购物车" left-text="返回" left-arrow />
        <Footer page="cart"></Footer>
        <!--<van-tabs v-model="active" @change="onchange">
        <van-tab title="樱桃"></van-tab>
        <van-tab title="牧马人"></van-tab>
        <van-tab title="雷蛇"></van-tab>
    </van-tabs>

    <van-list style="margin-top: 10px;">
        <van-cell v-for="(item,index) in list"
                  :key="index"
                  :title="item.name"
                  :value="item.saleDate" />
    </van-list>-->
    </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer
  }
};
</script>

<style>
</style>
