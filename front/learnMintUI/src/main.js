import Vue from "vue"
import VueRouter from "vue-router"
import router from "./router.js"
import axios from "axios"
import moment from "moment" //时间插件
import VuePreview from 'vue-preview'

import MintUI from 'mint-ui';

import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"
import 'mint-ui/lib/style.css'

import app from "./App.vue"
import Vuex from "vuex"

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(MintUI)
Vue.use(VuePreview)

 Vue.filter("dateFmt",(dateStr,pattern="YYYY-MM-DD HH:mm")=>{
     return moment(dateStr).format(pattern)
 })

//axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d564a4f1344716accd8c58f';
axios.defaults.baseURL = '/static/data/';
Vue.prototype.$axios=axios

var cart = JSON.parse(localStorage.getItem("cart")|| "[]");
var store = new Vuex.Store({
    state:{
        cart:cart
    },
    mutations:{
        // 新增购物车
        addCart(state,good){
            var flag = false
            state.cart.some(item=>{
                if(good.id==item.id){
                    flag = true
                    item.count += parseInt(good.count)
                    return true
                }
            })
            if(!flag){
                state.cart.push(good)
            }
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        // 更新指定选购商品的数量
        updateCartNmu(state,good){
            state.cart.some(item=>{
                if(good.id==item.id){
                    item.count = parseInt(good.count)
                    return true
                }
            })
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        //移除购物车
        removeCart(state,id){
            state.cart.some((item,index)=>{
                if(id==item.id){
                    state.cart.splice(index,1)
                    return true
                }
            })
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        //更新购物车被选状态
        updateSelectedState(state,id){
            state.cart.some((item,index)=>{
                if(id==item.id){
                    item.selected = !item.selected
                    return true
                }
            })
            localStorage.setItem("cart",JSON.stringify(state.cart))
        }
    },
    getters:{
        // 获取购物车商品总数量
        cartcnt(state){
            let cnt = 0
            state.cart.forEach(item=>{
                cnt += parseInt(item.count)
            })
            return cnt
        },
        // 获取指定商品选购数量
        cntById(state){
           let obj = {}
            state.cart.forEach(item=>{
                obj[item.id] = item.count
            })
            return obj
        },
        // 获取选购商品是否选定的状态
        getSelectedState(state){
            let obj = {}
            state.cart.forEach(item=>{
                obj[item.id] = item.selected
            })
            return obj
        },
        // 获取已选择的选购商品的总数量
        getSelectedCount(state){
            let cnt = 0
            state.cart.forEach(item=>{
                if(item.selected)
                    cnt += parseInt(item.count)
            })
            return cnt
        },
        // 获取已选择的选购商品的总花费
        getSelectedExpenditure(state){
            let amount = 0
            state.cart.forEach(item=>{
                if(item.selected)
                    amount += parseFloat(item.price)*parseInt(item.count)
            })
            return amount
        }
    }
})
var vm = new Vue({
    el:"#app",
    render:r=>r(app),
    router,
    store
})
