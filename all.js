import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.0-beta.7/vue.esm-browser.min.js';

//local storage
const STORAGE_KEY = "todos-history";
const todoStorage = {
    fetch() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || []);
    },
    save(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
}

const app = createApp({
    data(){
        return{
            thing: '',
            temp: {},
            isDone: '',
            isActive: 'all',
            doList: todoStorage.fetch()
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
        },
        removeItem(item){
            const index = this.doList.findIndex((obj) => obj.id === item.id);
            this.doList.splice(index,1);
        },
        switchStatus(item){
            item.status = !item.status;
        },
        switchOrder(item){
            item.isOrder = !item.isOrder;
        },
        editItem(item){
            this.temp = {...item};
        },
        doneItem(item){
            const index = this.doList.findIndex((obj) => obj.id === item.id);
            this.doList[index] = this.temp;
            this.temp={};
        },
        clearAll(){
            this.doList = [];
            localStorage.removeItem('doList');
        },
    },
    computed: {
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
    watch: {
        doList: {
            handler(doList){
                todoStorage.save(doList);
            },
            deep: true
        }
    },
}).mount('#app');