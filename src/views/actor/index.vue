<template>
    <div style="height:100%">
        <div class="main-title">Super Star</div>
        <el-card shadow="always" :body-style="{ padding: '10px' }" style="margin: 10px;">
            <el-row>
                <el-col :span="8">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100%;   object-fit: contain;">
                </el-col>
                <el-col :span="16">
                    <span>好吃的汉堡</span>
                    <div class="bottom clearfix">
                        <time class="time">123</time>
                        <el-button type="text" class="button">操作按钮</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <Footer></Footer>
    </div>
</template>

<script>
    import slider_item from "@/components/slider_item";
    import Footer from "@/components/Footer";
    // import { Tabbar, TabbarItem } from "vant";
    // import { Tab, Tabs } from "vant";
    let vm = null;
    export default {
        components: {
            Slideritem: slider_item,
            Footer
        },
        name: "star",
        data() {
            return {
                actorlist: [],
                actorinfolist: []
            };
        },
        created() {
        },
        computed: {
        },
        mounted() {
            this.getActorList();
            //this.getlist();
        },
        watch: {
            'actorinfolist': function (newVal) {
                let actorinfolist = newVal
                for (let t = 0; t < actorinfolist.length; t++) {
                    if (Array.isArray(actorinfolist[t].name)) {

                        let nameinfo = [];
                        for (let q = 0; q < actorinfolist[t].name.length; q++) {
                            if (JSON.stringify(actorinfolist[t].name[q]).indexOf("http") != -1) {
                                let actornameuri = {};
                                actornameuri.uri = actorinfolist[t].name[q];
                                this.$common.GetURIDetail(actornameuri).then(function (result) {
                                    let nameinfoitem = {};
                                    nameinfoitem.nametype = result.nameType;
                                    nameinfoitem.namelabel = result.label;
                                    nameinfo.push(nameinfoitem);
                                });
                            }
                            else if (JSON.stringify(actorinfolist[t].name[q]).indexOf("value") != -1) {

                                let nameinfoitem = {};
                                nameinfoitem.nametype = actorinfolist[t].name[q]['@language'];
                                nameinfoitem.namelabel = actorinfolist[t].name[q]['@value'];
                                nameinfo.push(nameinfoitem);
                            }
                        }
                        actorinfolist[t].nameinfo = nameinfo;
                    }
                    else {
                        console.log('不是数组');
                        //不是数组
                    }
                }
                console.log('actorinfolistaaa', actorinfolist)
            }
        },
        methods: {
            getActorList() {
                let query = {};
                query.type = '黑白';
                let that = this;
                let list = [];
                let actorinfolist = [];
                this.$common.GetFilmList(query).then(function (result) {
                    let filmlist = result;
                    for (let i = 0; i < filmlist.length; i++) {
                        list = list.concat(filmlist[i].actorList);
                    }
                    that.actorlist = that.$common.unique(list, 'puri');
                    for (let k = 0; k < that.actorlist.length; k++) {
                        let queryactoruri = {};
                        queryactoruri.uri = that.actorlist[k].puri

                        that.$common.GetURIDetail(queryactoruri).then(function (result) {
                            actorinfolist.push(result);
                        });
                    }
                    that.actorinfolist = actorinfolist
                    console.log('actorinfolist', that.actorinfolist.length);


                });
            },

            getlist() {
                let arr = [
                    {
                        id: 1,
                        name: '111'
                    },
                    {
                        id: 1,
                        name: '111'
                    },
                    {
                        id: 2,
                        name: '222'
                    },
                    {
                        id: 3,
                        name: '333'
                    }
                ];
                console.log('123', this.$common.unique(arr, 'id'));
                let q = {};
                q.uri = 'http://data.library.sh.cn/entity/person/xdvl8ivz94jm2664'

                this.$common.GetURIDetail(q).then(function (result) {
                    console.log('resultresultresultresult', result);
                });
            }
        }
    }
</script>

<style>
    .el-card {
        background-color: transparent;
        height: 200px;
        border-color: darkgray;
    }
</style>
