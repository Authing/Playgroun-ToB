<template>
  <div class="weekly-list">
    <el-row>
      <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
        <div class="title">角色管理</div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="button-style">
            <el-button type="primary" @click="addRoleClick('add')">添加角色</el-button>
          </div>
        </el-col>
    </el-row>
    <el-table
      :data="roleTableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="角色 id"
        width="200">

      </el-table-column>
      <el-table-column
        prop="code"
        label="角色 Code"
        width="200">

      </el-table-column>
      <el-table-column
        prop="description"
        label="角色描述"
        >
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="200">
        <template slot-scope="scope">
          {{  dateFormatSpe(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button  @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button  @click="deleteClick(scope.row)" type="text" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box" v-if="roleTableData.length>0">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="total, prev, pager, next"
        :total="roleListTotal">
      </el-pagination>
    </div>
    <!--dialog-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="confirmSubmitVisible"
      :before-close="handleClose"
      width="600px"
      center>
      <div>
        <el-form :model="formRole">
          <el-form-item label="角色 Code">
          <el-input v-model="formRole.code" ></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input type="textarea" v-model="formRole.description" ></el-input>
        </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogTitle == '添加角色'" type="primary" :loading="loadingFlag" @click="successConfirm('add')">确 定</el-button>
        <el-button v-if="dialogTitle == '修改角色'" type="primary" :loading="loadingFlag" @click="successConfirm('edit')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
          :title="dialogTitle"
          :visible.sync="confirmDeleteVisible"
          :before-close="handleClose"
          width="400px"
          center>
          <p>{{dialogBody}}</p>
          <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" :loading="loadingFlag" @click="confirmDelete()">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { authingClient, tenantId, appId } from '../../authing/index'
export default {
  data() {
    return {
      roleTableData: [],
      dialogTitle: '',
      confirmSubmitVisible: false,
      confirmDeleteVisible:false,
      dialogBody:'',
      confirmTipMessage: '',
      editRoleContentRow: '',
      editRoleContent: '',
      editRoleDate: '',
      currentDate: new Date().toLocaleDateString(),
      loadingFlag: false,
      roleListTotal: 0,
      currentPage: 1,
      formRole: {
        code: '',
        description: ''
      },
      type:'',
      selectedItem:'',
    }
  },
  created() {
    this.roleList()
  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions(['getWeeklyList', 'addWeekly', 'getRoleList','addRole','deleteRole']),
    dateFormatSpe(item) {
      if (!item) return '--'
      var date = new Date(parseInt(item))
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      return y + '.' + m + '.' + d
    },
    handleCurrentChange(currentPage) {
      this.queryRoleList(currentPage, 10)
    },
    roleList() {
      this.queryRoleList(1, 10)
    },
    queryRoleList(currentPage, pageSize) {
      this.getRoleList({
        pageNum: currentPage,
        pageSize: pageSize,
        app_id: appId
      }).then(res => {
        if (res.errno == 0) {
          this.roleTableData = res.data.data
          this.roleListTotal = res.data.count
        } else {
          this.$message.warning('服务器出了小差')
        }
      })
    },
    addRoleClick(type){
      this.type=type;
      this.confirmSubmitVisible=true;
      this.dialogTitle="添加角色";
      this.formRole={};
    },
    editClick(row) {
      this.confirmSubmitVisible = true
      this.dialogTitle = '修改角色'
      this.formRole = row;
      this.type='edit';
      this.formRole.oldCode=this.formRole.code;
    },
    deleteClick(row){
      this.selectedItem=row;
      this.confirmDeleteVisible = true;
      this.dialogTitle = '确认移除';
      this.dialogBody = '确认移除角色， ' + this.selectedItem.code + ' 吗？';
    },
    successConfirm(type) {
      if (this.formRole.code == '' || this.formRole.code == undefined) {
        this.$message.warning('请输入角色 Code')
      } else {
        this.loadingFlag = true;
        this.formRole.app_id = appId;
        this.formRole.type=type;
        this.addRole(this.formRole).then(res => {
          if (res.errno == 0) {
            this.$message.success(res.errmsg || '提交成功')
            this.confirmSubmitVisible = false
            this.editRoleContentRow = ''
            this.roleList()
          } else {
            this.$message.error(res.errmsg || '服务器开小差')
          }
          this.loadingFlag = false
        });
      }
    },
    handleClose() {
      this.confirmSubmitVisible = false
      this.editRoleContentRow = '';
      this.confirmDeleteVisible=false;
    },
    confirmDelete(){
        this.loadingFlag = true;
        this.deleteRole(this.selectedItem).then(res=>{
          if(res.errno==0){
            this.$message.success(res.errmsg||'删除成功');
            this.confirmDeleteVisible=false;
            this.roleList();
          }else{
            this.$message.error(res.errmsg ||'服务器开小差');
          }
          this.loadingFlag=false;
        });
   }
  }
}
</script>

<style lang="postcss" scoped>
.weekly-list {
  & .pagination-box {
    text-align: right;
    margin: 10px 0px;
  }
}

.button-style{
  text-align: right;
  margin-bottom: 10px;
  }
</style>
