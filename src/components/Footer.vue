<template>
      <div class="footer footer-menu-item">
        <router-link
          :to="{ path:'/home' }"
        >
          <span style="line-height:50px;width: 25; height: 25; min-height: 25; min-width: 25px;">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="svg-icon"
              style="fill: rgba(0, 0, 0, 1);"
              viewBox="64 64 896 896"
              width="25"
              height="25"
            >
              <path
                d="M 946.5 505 L 534.6 93.4 a 31.93 31.93 0 0 0 -45.2 0 L 77.5 505 c -12 12 -18.8 28.3 -18.8 45.3 c 0 35.3 28.7 64 64 64 h 43.4 V 908 c 0 17.7 14.3 32 32 32 H 448 V 716 h 112 v 224 h 265.9 c 17.7 0 32 -14.3 32 -32 V 614.3 h 43.4 c 17 0 33.3 -6.7 45.3 -18.8 c 24.9 -25 24.9 -65.5 -0.1 -90.5 Z"
              />
            </svg>
          </span>
        </router-link>
      </div>
    <!-- <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
      <div class="grid-content footer-menu-item">
        <span style="line-height:50px;width: 25; height: 25; min-height: 25; min-width: 25px;">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon"
            style="fill: #101010;"
            viewBox="0 0 24 24"
            width="25"
            height="25"
          >
            <path
              d="M 18 3 v 2 h -2 V 3 H 8 v 2 H 6 V 3 H 4 v 18 h 2 v -2 h 2 v 2 h 8 v -2 h 2 v 2 h 2 V 3 h -2 Z M 8 17 H 6 v -2 h 2 v 2 Z m 0 -4 H 6 v -2 h 2 v 2 Z m 0 -4 H 6 V 7 h 2 v 2 Z m 10 8 h -2 v -2 h 2 v 2 Z m 0 -4 h -2 v -2 h 2 v 2 Z m 0 -4 h -2 V 7 h 2 v 2 Z"
            />
          </svg>
        </span>
      </div>
    </el-col>
    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
      <div class="grid-content footer-menu-item">
        <span style="line-height:50px;width: 25; height: 25; min-height: 25; min-width: 25px;">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon"
            style="fill: #101010;"
            viewBox="0 0 24 24"
            width="25"
            height="25"
          >
            <path
              d="M 21 5 v 14 h 2 V 5 h -2 Z m -4 14 h 2 V 5 h -2 v 14 Z M 14 5 H 2 c -0.55 0 -1 0.45 -1 1 v 12 c 0 0.55 0.45 1 1 1 h 12 c 0.55 0 1 -0.45 1 -1 V 6 c 0 -0.55 -0.45 -1 -1 -1 Z M 8 7.75 c 1.24 0 2.25 1.01 2.25 2.25 S 9.24 12.25 8 12.25 S 5.75 11.24 5.75 10 S 6.76 7.75 8 7.75 Z M 12.5 17 h -9 v -0.75 c 0 -1.5 3 -2.25 4.5 -2.25 s 4.5 0.75 4.5 2.25 V 17 Z"
            />
          </svg>
        </span>
      </div>
    </el-col>
    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
      <div class="grid-content footer-menu-item">
        <span style="line-height:50px;width: 25; height: 25; min-height: 25; min-width: 25px;">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon"
            style="fill: #101010;"
            viewBox="0 0 448 512"
            width="24"
            height="24"
          >
            <path
              d="M 224 256 c 70.7 0 128 -57.3 128 -128 S 294.7 0 224 0 S 96 57.3 96 128 s 57.3 128 128 128 Z M 104 424 c 0 13.3 10.7 24 24 24 s 24 -10.7 24 -24 s -10.7 -24 -24 -24 s -24 10.7 -24 24 Z m 216 -135.4 v 49 c 36.5 7.4 64 39.8 64 78.4 v 41.7 c 0 7.6 -5.4 14.2 -12.9 15.7 l -32.2 6.4 c -4.3 0.9 -8.5 -1.9 -9.4 -6.3 l -3.1 -15.7 c -0.9 -4.3 1.9 -8.6 6.3 -9.4 l 19.3 -3.9 V 416 c 0 -62.8 -96 -65.1 -96 1.9 v 26.7 l 19.3 3.9 c 4.3 0.9 7.1 5.1 6.3 9.4 l -3.1 15.7 c -0.9 4.3 -5.1 7.1 -9.4 6.3 l -31.2 -4.2 c -7.9 -1.1 -13.8 -7.8 -13.8 -15.9 V 416 c 0 -38.6 27.5 -70.9 64 -78.4 v -45.2 c -2.2 0.7 -4.4 1.1 -6.6 1.9 c -18 6.3 -37.3 9.8 -57.4 9.8 s -39.4 -3.5 -57.4 -9.8 c -7.4 -2.6 -14.9 -4.2 -22.6 -5.2 v 81.6 c 23.1 6.9 40 28.1 40 53.4 c 0 30.9 -25.1 56 -56 56 s -56 -25.1 -56 -56 c 0 -25.3 16.9 -46.5 40 -53.4 v -80.4 C 48.5 301 0 355.8 0 422.4 v 44.8 C 0 491.9 20.1 512 44.8 512 h 358.4 c 24.7 0 44.8 -20.1 44.8 -44.8 v -44.8 c 0 -72 -56.8 -130.3 -128 -133.8 Z"
            />
          </svg>
        </span>
      </div>
    </el-col>-->

</template>

<script>
export default {};
</script>

<style scoped lang="less">
.footer {
  background: white;
  height: 35px;
  position: fixed;
  bottom: 0;
  width: 90%;
  .text {
    color: #797d82;
  }
  .active .text {
    color: @red;
  }
}
.footer-menu-item {
  height: 35px;
  line-height: 35px;
  text-align: center;
}
</style>
