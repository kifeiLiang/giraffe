<template>
  <nav class="pagination-box">
    <ul class="pagination">
      <li class="pageNum page-item">
        共&nbsp;{{total}}&nbsp;条记录&nbsp;每页显示
        <div class="page-display" >
          <span :class="{'icon-tri-up' : show, 'icon-tri-down': !show}" class="select-icon"></span>
          <input @click="show = !show" v-model="page_size" class="select-num" readonly="readonly">
          <transition name="fade">
            <ul class="display-select" v-if="show">
              <li ref="pagenumSelect" v-for="(option, index) in options" @click="showPages(index)">{{ option.value }}
              </li>
            </ul>
          </transition>
        </div>
        条记录
      </li>
      <li class="page-item" :class="{'disabled': current == 1}"><a class="prve" href="javascript:;"
                                                                   @click="setCurrent(current - 1,1)">上一页 </a></li>
      <li class="page-item" :class="{'disabled': current == 1}"><a class="start" href="javascript:;"
                                                                   @click="setCurrent(1,1)"> 首页 </a></li>
      <li class="page-item" v-for="p in grouplist" :class="{'active': current == p.val}">
        <a class="page" href="javascript:;" @click="setCurrent(p.val,1)"> {{ p.text }} </a>
      </li>
      <li class="page-item" :class="{'disabled': current == page}"><a class="end" href="javascript:;"
                                                                      @click="setCurrent(page,1)"> 尾页 </a></li>
      <li class="page-item" :class="{'disabled': current == page}"><a class="next" href="javascript:;"
                                                                      @click="setCurrent(current + 1,1)"> 下一页</a></li>
      <li class="jump-cont page-item">
        跳至<input type="text" class="jump-page" v-model="jumpTos">页
        <a class="jump-to" @click="setCurrent(jumpTos,2)">确定</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'YPagination',
    data() {
      return {
        current: this.currentPage,
        options: [
          {value: 10},
          {value: 50},
          {value: 100}
        ],
        jumpTos: this.jumpTo,
        page_size: this.pageSize,
        show: false
      }
    },
    props: {
      total: { // 数据总条数
        type: Number,
        default: 0
      },
      pageSize: { // 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: { // 当前页码
        type: [Number, String],
        default: 1
      },
      jumpTo: { // 跳转到
        type: Number,
        default: 1
      },
      pagegroup: { // 分页条数
        type: Number,
        default: 5,
        coerce: function (v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.page_size);
      },
      grouplist: function () { // 获取分页页码
        var len = this.page,
          temp = [],
          list = [],
          count = Math.floor(this.pagegroup / 2),
          center = this.current;
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push({
              text: this.page - len,
              val: this.page - len
            });
          }
          ;
          return temp;
        }
        while (len--) {
          temp.push(this.page - len);
        }
        ;
        var idx = temp.indexOf(center);
        (idx < count) && (center = center + count - idx);
        (this.current > this.page - count) && (center = this.page - count);
        temp = temp.splice(center - count - 1, this.pagegroup);
        do {
          var t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        } while (temp.length);
        if (this.page > this.pagegroup) {
          (this.current > count + 1) && list.unshift({
            text: '...',
            val: list[0].val - 1
          });
          (this.current < this.page - count) && list.push({
            text: '...',
            val: list[list.length - 1].val + 1
          });
        }
        return list;
      }
    },
    methods: {
      setCurrent: function (idx, index) {//设置当前的页码
        if (this.current != idx && idx > 0 && idx < this.page + 1) {
          this.current = idx - 0;
          this.$emit('pagechangeparent', [this.current, this.page_size]);
        } else if (idx < 0 || idx > this.page) {
          this.current = 1;
          this.jumpTos = this.current
          this.$emit('pagechangeparent', [this.current, this.page_size]);
        } else if (String(idx).indexOf(".") > -1) {
          this.current = Math.ceil(idx);
          this.jumpTos = this.current
          this.$emit('pagechangeparent', [this.current, this.page_size]);
        } else {
          this.current = 1;
          this.jumpTos = this.current
          this.$emit('pagechangeparent', [this.current, this.page_size]);
        }
        this.show = false;
      },
      showPages: function (index) {
        let pageNum = this.$refs.pagenumSelect[index].innerText;
        this.page_size = pageNum;
        this.current = 1;
        this.show = false;
        this.$emit('pagechangeparent', [this.current, this.page_size]);
      },
      pageIndex(value) {
        this.current = value;
      }
    }
  }
</script>


