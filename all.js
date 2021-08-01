import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.0-beta.7/vue.esm-browser.min.js';
const app = createApp({
    data(){
        return{
            thing: '',
            temp: {},
            isDone: '',
            isActive: 'all',
            doList: []
        }
    },
    methods:{
        addItem(){
            if(this.thing === '') return;
            this.doList.push({
                id: 'i'+Math.floor(Math.random() * 9999) + 10,
                thing: this.thing,
                status: false,
                isOrder: false
            });
            this.thing = '';
            localStorage.setItem('doList', JSON.stringify(this.doList));
        },
        removeItem(item){
            const index = this.doList.findIndex((obj) => obj.id === item.id);
            this.doList.splice(index,1);
            localStorage.setItem('doList', JSON.stringify(this.doList));
        },
        switchStatus(item){
            item.status = !item.status;
            localStorage.setItem('doList', JSON.stringify(this.doList));
        },
        switchOrder(item){
            item.isOrder = !item.isOrder;
            localStorage.setItem('doList', JSON.stringify(this.doList));
        },
        editItem(item){
            this.temp = {...item};
        },
        doneItem(item){
            const index = this.doList.findIndex((obj) => obj.id === item.id);
            this.doList[index] = this.temp;
            this.temp={};
            localStorage.setItem('doList', JSON.stringify(this.doList));
        },
        clearAll(){
            this.doList = [];
            localStorage.removeItem('doList');
        },
        getData(){
            this.doList = JSON.parse(localStorage.getItem('doList')) || this.doList;
        },
    },
    computed:{
        filterData(){
            const newData = this.doList.filter( item => 
                item.status === this.isDone
            );
            if(this.isDone === ''){
                return this.doList;
            }
            return newData;
        }
    },
    mounted(){
        this.getData();
    }
}).mount('#app');