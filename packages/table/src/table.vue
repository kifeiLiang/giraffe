<template>
  <div class="el-table"
      :class="[{
      'el-table--fit': fit,
      'el-table--striped': stripe,
      'el-table--border': border,
      'el-table--scrollable-x': layout.scrollX,
      'el-table--scrollable-y': layout.scrollY,
      'el-table--enable-row-hover': !store.states.isComplex}]">
      <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>

      <!--列表头-->
      <div
        v-if="showHeader"
        class="el-table__header-wrapper"
        ref="headerWrapper">
        <table-header
          ref="tableHeader"
          :store="store"
          :border="border"
          :style="{
            width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
          }">
        </table-header>
      </div>
      <!--列表主体内容-->
      <div class="el-table__body-wrapper"
        ref="bodyWrapper"
        :class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
        :style="[bodyHeight]">
        <table-body
          :store="store"
          :stripe="stripe"
          :style="{
             width: bodyWidth
          }">
        </table-body>
      </div>
      <!--暂无数据-->
        <div
          v-if="!data || data.length === 0"
          :class="['el-table__empty-block', 'is-' + emptyType]"
          ref="emptyBlock"
          :style="{
            width: bodyWidth
          }">
          <span class="el-table__empty-text" v-if=" emptyType!=='pic' ">
            <slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot>
          </span>
          <span v-else>
            <img src="../../styles/src/img/nodata.png" />
            <slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot>
          </span>
        </div>
      <!--固定左列-->
      <div
        v-if="fixedColumns.length > 0"
        v-mousewheel="handleFixedMousewheel"
        class="el-table__fixed"
        ref="fixedWrapper"
        :style="[{
          width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''
        },
        fixedHeight]">
        <div
          v-if="showHeader"
          class="el-table__fixed-header-wrapper"
          ref="fixedHeaderWrapper" >
          <table-header
            ref="fixedTableHeader"
            fixed="left"
            :border="border"
            :store="store"
            :style="{
              width: bodyWidth
            }"></table-header>
        </div>
        <div
          class="el-table__fixed-body-wrapper"
          ref="fixedBodyWrapper"
          :style="[{
            top: layout.headerHeight + 'px'
          },
          fixedBodyHeight]">
          <table-body
            fixed="left"
            :store="store"
            :stripe="stripe"
            :highlight="highlightCurrentRow"
            :row-class-name="rowClassName"
            :row-style="rowStyle"
            :style="{
              width: bodyWidth
            }">
          </table-body>
          <div
            v-if="$slots.append"
            class="el-table__append-gutter"
            :style="{
              height: layout.appendHeight + 'px'
            }"></div>
        </div>
      </div>

    <div class="el-table__column-resize-proxy" ref="resizeProxy" v-show="resizeProxyVisible"></div>
  </div>
</template>
<script type="text/babel">
import TableBody from './table-body.js';
import TableHeader from './table-header.js';
import TableStore from './table-store';
import TableLayout from './table-layout';
import debounce from 'throttle-debounce/debounce';
import { addResizeListener, removeResizeListener } from '../src/utils/resize-event';
import Mousewheel from '../src/directives/mousewheel';
// import TableColumn from './table-column';
let tableIdSeed = 1;
export default {
  name:'YTable',
  directives: {Mousewheel},
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    border: Boolean,
    height: [String, Number],
    rowStyle: [Object, Function],
    rowClassName: [String, Function],
    highlightCurrentRow: {type: Boolean, default: true},
    prop: String,
    fit: {
        type: Boolean,
        default: true
    },
    stripe: Boolean,
    spanMethod: Function,
    showHeader: {
      type: Boolean,
      default: true
    },
    emptyText: {type: String, default: '暂无数据'},
    emptyType: String,
    tooltipEffect: {type: String, default: 'dark'}
  },
  methods: {
      getMigratingConfig() {
        return {
          events: {
            expand: 'expand is renamed to expand-change'
          }
        };
      },

      setCurrentRow(row) {
        this.store.commit('setCurrentRow', row);
      },

      toggleRowSelection(row, selected) {
        this.store.toggleRowSelection(row, selected);
        this.store.updateAllSelected();
      },

      /* toggleRowExpansion(row, expanded) {
        this.store.toggleRowExpansion(row, expanded);
      },*/

      clearSelection() {
        this.store.clearSelection();
      },

      /* clearFilter() {
        this.store.clearFilter();
      },

      clearSort() {
        this.store.clearSort();
      }, */

      handleMouseLeave() {
        this.store.commit('setHoverRow', null);
        if (this.hoverState) this.hoverState = null;
      },

      updateScrollY() {
        this.layout.updateScrollY();
        this.layout.updateColumnsWidth();
      },
      // 固定列表鼠标滚动事件
      handleFixedMousewheel(event, data) {
        const bodyWrapper = this.bodyWrapper;
        if (Math.abs(data.spinY) > 0) {
          const currentScrollTop = bodyWrapper.scrollTop;
          if (data.pixelY < 0 && currentScrollTop !== 0) {
            event.preventDefault();
          }
          if (data.pixelY > 0 && bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop) {
            event.preventDefault();
          }
          bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
        } else {
          bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
        }
      },

      handleHeaderFooterMousewheel(event, data) {
        const { pixelX, pixelY } = data;
        if (Math.abs(pixelX) >= Math.abs(pixelY)) {
          event.preventDefault();
          this.bodyWrapper.scrollLeft += data.pixelX / 5;
        }
      },

      bindEvents() {
        const { headerWrapper, footerWrapper } = this.$refs;
        const refs = this.$refs;
        let self = this;

        this.bodyWrapper.addEventListener('scroll', function() {
          if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
          if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
          if (refs.fixedBodyWrapper) refs.fixedBodyWrapper.scrollTop = this.scrollTop;
          if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
          const maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1;
          const scrollLeft = this.scrollLeft;
          if (scrollLeft >= maxScrollLeftPosition) {
            self.scrollPosition = 'right';
          } else if (scrollLeft === 0) {
            self.scrollPosition = 'left';
          } else {
            self.scrollPosition = 'middle';
          }
        });

        if (this.fit) {
          addResizeListener(this.$el, this.resizeListener);
        }
      },

      resizeListener() {
        if (!this.$ready) return;
        let shouldUpdateLayout = false;
        const el = this.$el;
        const { width: oldWidth, height: oldHeight } = this.resizeState;

        const width = el.offsetWidth;
        if (oldWidth !== width) {
          shouldUpdateLayout = true;
        }

        const height = el.offsetHeight;
        if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
          shouldUpdateLayout = true;
        }

        if (shouldUpdateLayout) {
          this.resizeState.width = width;
          this.resizeState.height = height;
          this.doLayout();
        }
      },

      doLayout() {
        this.layout.updateColumnsWidth();
        if (this.shouldUpdateHeight) {
          this.layout.updateElsHeight();
        }
      },

      /* sort(prop, order) {
        this.store.commit('sort', { prop, order });
      },*/

      toggleAllSelection() {
        this.store.commit('toggleAllSelection');
      }
  },

  created() {
    this.tableId = 'el-table_' + tableIdSeed++;
    this.debouncedUpdateLayout = debounce(50, () => this.doLayout());
  },

  computed: {
    tableSize() {
      return this.size || (this.$ELEMENT || {}).size;
    },

    bodyWrapper() {
      return this.$refs.bodyWrapper;
    },

    shouldUpdateHeight() {
      return this.height ||
        this.maxHeight ||
        this.fixedColumns.length > 0 ||
        this.rightFixedColumns.length > 0;
    },

    selection() {
      return this.store.states.selection;
    },

    columns() {
      return this.store.states.columns;
    },

    tableData() {
      return this.store.states.data;
    },

    fixedColumns() {
      return this.store.states.fixedColumns;
    },

    rightFixedColumns() {
      return this.store.states.rightFixedColumns;
    },

    bodyWidth() {
      const { bodyWidth, scrollY, gutterWidth } = this.layout;
      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
    },

    bodyHeight() {
      if (this.height) {
        console.log(this.height, this.layout.bodyHeight, 'height')
        return {
          height: this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        return {
          'max-height': (this.showHeader
            ? this.maxHeight - this.layout.headerHeight - this.layout.footerHeight
            : this.maxHeight - this.layout.footerHeight) + 'px'
        };
      }
      return {};
    },

    fixedBodyHeight() {
      if (this.height) {
        return {
          height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        let maxHeight = this.layout.scrollX ? this.maxHeight - this.layout.gutterWidth : this.maxHeight;

        if (this.showHeader) {
          maxHeight -= this.layout.headerHeight;
        }

        maxHeight -= this.layout.footerHeight;

        return {
          'max-height': maxHeight + 'px'
        };
      }

      return {};
    },

    fixedHeight() {
      if (this.maxHeight) {
        if (this.showSummary) {
          return {
            bottom: 0
          };
        }
        return {
          bottom: (this.layout.scrollX && this.data.length) ? this.layout.gutterWidth + 'px' : ''
        };
      } else {
        if (this.showSummary) {
          return {
            height: this.layout.tableHeight ? this.layout.tableHeight + 'px' : ''
          };
        }
        return {
          height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
        };
      }
    }
  },

  watch: {

    data: {
      immediate: true,
      handler(value) {
        this.store.commit('setData', value);
        if (this.$ready) {
          this.$nextTick(() => {
            this.doLayout();
          });
        }
      }
    },
    height: {
      immediate: true,
      handler(value) {
        this.layout.setHeight(value);
      }
    },

    maxHeight: {
      immediate: true,
      handler(value) {
        this.layout.setMaxHeight(value);
      }
    }
  },

  destroyed() {
    if (this.resizeListener) removeResizeListener(this.$el, this.resizeListener);
  },

  mounted() {
    this.bindEvents();
    this.store.updateColumns();
    this.doLayout();

    this.resizeState = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    };

    // init filters
    /* this.store.states.columns.forEach(column => {
      if (column.filteredValue && column.filteredValue.length) {
        this.store.commit('filterChange', {
          column,
          values: column.filteredValue,
          silent: true
        });
      }
    }); */

    this.$ready = true;
  },

  data() {
    const store = new TableStore(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll,
      selectOnIndeterminate: this.selectOnIndeterminate
    });
    const layout = new TableLayout({
      store: store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    });
    return {
      layout,
      store,
      isHidden: false,
      renderExpanded: null,
      resizeProxyVisible: false,
      resizeState: {
        width: null,
        height: null
      },
      // 是否拥有多级表头
      isGroup: false,
      scrollPosition: 'left'
    };
  },
  components: {TableBody, TableHeader}

}
</script>
<style>
</style>