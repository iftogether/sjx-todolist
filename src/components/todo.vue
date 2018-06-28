<template>
<div class="bgtable">
   <div>
   	<md-field>
      <label>搜索</label>
      <md-input v-model="searchinfo" @keyup.enter="toSearch" ></md-input>
   	</md-field>
    <md-button  @click="allfinished">已完成</md-button>
    <md-button  @click="sortbydate">排序</md-button>
   </div>

	<md-table class="bgtable" v-model="items" md-sort="name" md-sort-order="asc"  md-auto-select md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="{ 'primary': item.finished}">
        <md-table-cell class="bgtable" style="text-align: left" md-label="Text" md-numeric>
         <input type="checkbox" v-if="!isupdate" v-model="item.finished" @change="editItem(item)"/>
          <span v-if="!isupdate">{{ item.text }}</span>
          <md-field v-if="isupdate">
            <md-input @keyup.enter="editItem(item);isupdate = false" v-model="item.text"></md-input>
          </md-field>
        </md-table-cell>
        <md-table-cell class="bgtable" md-label="Date" md-sort-by="name">
            {{ item.date }}
        </md-table-cell>
        <md-table-cell class="bgtable" md-label="finished" md-sort-by="email">{{ item.finished }}</md-table-cell>
        <md-table-cell class="bgtable" md-label="操作" v-if="!item.ismust">
          <a href="#" @click="item.ismust = true">
            <i class="material-icons">
              vertical_align_top
            </i>
          </a>
        </md-table-cell>
        <md-table-cell class="bgtable" md-label="操作">
          <a @click="isupdate = true" href="#">编辑</a>
        </md-table-cell>
        <md-table-cell class="bgtable" md-label="操作">
          <a @click="deleteItem(item.text)" href="#" >删除</a>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-button class="md-dense md-raised md-primary" @click="showDialog">+添加事项</md-button>
    <md-dialog :md-active.sync="showAdd" style="padding: 50px">
      <md-dialog-title>添加事项</md-dialog-title>
      <md-field>
	      <label>Text</label>
	      <md-input v-model="newtext"></md-input>
	    </md-field>
	    <md-datepicker v-model="newdate" md-immediately/>
	    <md-button class="md-dense md-raised md-primary" @click="addItem">提交</md-button>
    </md-dialog>
</div>

</template>

<script>
import bus from '../assets/eventBus'

const toLower = text => {
  return text.toString().toLowerCase()
}/*将筛选出来的字符串变成小写 */

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.text).includes(toLower(term)))
  }
  return items
}

const sortbydate = (items) => {
  items.sort(function(a,b){
        return a.date > b.date
  });
  return items;
}

const getDatetime = (date) => date.getTime()

export default {
	data() {
		return {
			title: 'must',
			name: 'todo',
			newtext: '',
			newdate: '',
			showAdd: false,
			searchinfo: '',
			finished: false,
      isupdate: false,
			items: []
		}
	},
	created() {
		this.init();
  },
	methods: {
		init() {
      if (this.title === "must") {
        this.items = this.$store.getters.getmust;
      }
      else{
        this.items = this.$store.getters.getItemsbytitle(this.title);
      }

		},
		addItem() {
			this.$store.commit('addItem', {text: this.newtext, date: this.newdate , belong: this.title, finished: this.finished, ismust: false});
      this.init();
			this.showAdd = false;
			this.newtext = '';
			this.newdate = '';
		},
		showDialog() {
			this.showAdd = true;
		},
		deleteItem(text) {
      this.$store.commit('deleteItem', text);
      this.init();
    },
    editItem(item) {
      this.$store.commit('editItem', item);
    },
    toSearch() {
    	this.items = searchByName(this.$store.getters.items, this.searchinfo);
      this.searchinfo = ''
    },
    allfinished() {
    	this.items = this.$store.getters.getAllfinished;
    },
    sortbydate() {
      this.items = sortbydate(this.items);
    }
	},
	mounted() {
    var self = this;
    bus.$on('goListbyTitle', function(msg) {
        self.title = msg;
        self.init()
    });/*vue中的mounted：在这发起后端请求，拿回数据，配合路由钩子做一些事情 */
  }
}

</script>

<style>
.bgtable{
  background: #00FF00 url(../assets/image/8.jpg.gif) repeat fixed top;
}
.primary{
  color:blue;
}


</style>
