<template>
  <div>
    <SearchList :waterfallData="actorlist" itemType="actor"></SearchList>
  </div>
</template>

<script>
import FilmData from "@/data/film";
import SearchList from "@/components/SearchList";
export default {
  name: "FilmBriefList",
  components: { SearchList },
  props: [],
  data() {
    return {
      actorlist: [],
    };
  },
  created() {
    this.getActorListNew();
  },
  mounted() {},
  methods: {
    getActorListNew() {
      let query = {};
      query.type = "黑白";
      let that = this;
      let list = [];
      FilmData.GetFilmList(query).then(function (result) {
        let filmlist = result;
        for (let i = 0; i < filmlist.length; i++) {
          list = list.concat(filmlist[i].actorList);
        }
        // console.log ('list',list)
        that.actorlist = that.unique(list, "puri");

        for (let j = 0; j < that.actorlist.length; j++) {
          FilmData.getActorDetailByUri(that.actorlist[j].puri).then(
            (data) => {
              that.actorlist[j].actorDetail = data;
            },
            (err) => {
              console.log("获取演员列表失败", err);
            }
          );
        }

        console.log("actorlist", that.actorlist);
      });
    },

    unique(arr, index) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr[index]) && res.set(arr[index], 1)
      );
    },
  },
};
</script>

<style>
</style>
