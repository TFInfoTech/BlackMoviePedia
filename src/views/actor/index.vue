<template>
    <div style="height:100%">
        <div class="main-title">Super Star</div>
        <div v-if="showCard">
            <el-card shadow="always" :body-style="{ padding: '10px' }" style="margin: 10px;" v-for="(item,index) in actorinfolistFinal" :key="index">
                <el-row>
                    <el-col :span="8">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100%;   object-fit: contain;">
                    </el-col>
                    <el-col :span="16">
                        <span v-for="(nameitem,index) in item.nameinfo">
                            {{nameitem.nametype}}:{{nameitem.namelabel}}
                            </br>
                        </span>
                        <span>出生日期：{{item.birthday}}</span> </br>
                        <span>性别：{{item.gender}}</span> </br>
                        <span>
                            简介：{{item.briefBiographyitem}}
                        </span></br>
                    </el-col>
                </el-row>
            </el-card>
        </div>
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
                actorinfolist: [],
                actorinfolistFinal: [],
                showCard: false
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
                let actorinfolist = newVal;
                let arrlength = actorinfolist.length;
                let index = 0;
                let that = this;
                for (let t = 0; t < actorinfolist.length; t++) {
                    let nameinfo = [];
                    if (Array.isArray(actorinfolist[t].name)) {
                        let indexisArray = 0;
                        for (let q = 0; q < actorinfolist[t].name.length; q++) {
                            if (JSON.stringify(actorinfolist[t].name[q]).indexOf("http") != -1) {
                                let actornameuri = {};
                                actornameuri.uri = actorinfolist[t].name[q];
                                this.$common.GetURIDetail(actornameuri).then(function (result) {
                                    let nameinfoitem = {};
                                    nameinfoitem.nametype = result.nameType;
                                    nameinfoitem.namelabel = result.label;
                                    nameinfo.push(nameinfoitem);

                                    indexisArray++;
                                    if (indexisArray == actorinfolist[t].name.length) {
                                        index++;
                                    }
                                    if (index == arrlength) {
                                        that.actorinfolistFinal = actorinfolist;
                                    }
                                });
                            }
                            else if (JSON.stringify(actorinfolist[t].name[q]).indexOf("value") != -1) {
                                let nameinfoitem = {};
                                nameinfoitem.nametype = actorinfolist[t].name[q]['@language'];
                                nameinfoitem.namelabel = actorinfolist[t].name[q]['@value'];
                                nameinfo.push(nameinfoitem);
                                indexisArray++;
                                if (indexisArray == actorinfolist[t].name.length) {
                                    index++;
                                }
                                if (index == arrlength) {
                                    that.actorinfolistFinal = actorinfolist;
                                }
                            }
                        }
                    }
                    else {
                        //console.log('不是数组',t, actorinfolist[t].name);
                        //不是数组
                        let actornameuri = {};
                        actornameuri.uri = actorinfolist[t].name;
                        this.$common.GetURIDetail(actornameuri).then(function (result) {
                            let nameinfoitem = {};
                            nameinfoitem.nametype = result.nameType;
                            nameinfoitem.namelabel = result.label;
                            nameinfo.push(nameinfoitem);
                            index++;
                            if (index == arrlength) {
                                that.actorinfolistFinal = actorinfolist;
                                
                            }
                        });
                    }
                    actorinfolist[t].nameinfo = nameinfo;
                }

            },
            'actorinfolistFinal': function (newVal) {
                //actorinfolist = newVal;
                console.log('actorinfolistFinal', newVal)
                this.showCard = true;
            }

        },
        methods: {
            getActorList() {
                let query = {};
                query.type = '黑白';
                let index = 0;
                let that = this;
                let list = [];
                let actorinfolist = [];
                let actorlistlength = 0;
                this.$common.GetFilmList(query).then(function (result) {
                    let filmlist = result;
                    for (let i = 0; i < filmlist.length; i++) {
                        list = list.concat(filmlist[i].actorList);
                    }
                    that.actorlist = that.$common.unique(list, 'puri');
                    actorlistlength = that.actorlist.length;
                    for (let k = 0; k < that.actorlist.length; k++) {
                        let queryactoruri = {};
                        queryactoruri.uri = that.actorlist[k].puri

                        that.$common.GetURIDetail(queryactoruri).then(function (result) {
                            actorinfolist.push(result);
                            for (let i = 0; i < actorinfolist.length; i++) {
                                if (Array.isArray(actorinfolist[i].briefBiography)) {
                                    actorinfolist[i].briefBiographyitem = actorinfolist[i].briefBiography[0];
                                }
                                else {
                                    actorinfolist[i].briefBiographyitem = actorinfolist[i].briefBiography;
                                }
                            }
                            index++;
                            console.log('index', index, actorlistlength)
                            if (index == actorlistlength) {
                                that.actorinfolist = actorinfolist
                            }
                        });

                    }

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
        background-color:white;
        height: 200px;
        border-color: darkgray;
    }
</style>
