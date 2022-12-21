"use strict";
const Base = require("./base");
const managementClient = require("../../common/authing/index");
module.exports = class extends Base {
  /*获取部门role*/
  async getRoleAction() {
    // let {company_id, department_id, noLeader} = this.post();
    // try {
    //   if(this.user.role == 2){
    //     if(department_id){
    //       let departmentLeaderExist = await this.model('user').where({
    //         company_id: this.user.company_id, department_id, role: 3
    //       }).select();
    //       if(!think.isEmpty(departmentLeaderExist)) {
    //         let role = await this.model('role').where({
    //           company_id: this.user.company_id,
    //           role: {'>': this.user.role + 1}
    //         }).select();
    //         return this.success(role);
    //       }else{
    //         let role = await this.model('role').where({
    //           company_id: this.user.company_id,
    //           role: {'>': this.user.role}
    //         }).select();
    //         return this.success(role);
    //       }
    //     }else{
    //       let role = await this.model('role').where({
    //         company_id: this.user.company_id,
    //         role: {'>': this.user.role}
    //       }).select();
    //       return this.success(role);
    //     }
    //   }else if(this.user.role == 1){
    //     // if(department_id){
    //       let companyLeaderExist = await this.model('user').where({
    //         company_id, role: 2
    //       }).select();
    //       /*role 2-总监，3-部门经理，4-组员*/
    //       if(!think.isEmpty(companyLeaderExist)) {
    //         //总监不为空
    //         let departmentLeaderExist = await this.model('user').where({
    //           company_id, department_id, role: 3
    //         }).select();
    //         if(!think.isEmpty(departmentLeaderExist)){
    //         //  部门不为空
    //           let role = await this.model('role').where({
    //             company_id: company_id,
    //             role: 4
    //           }).select();
    //           return this.success(role);
    //         }else{
    //           let role = await this.model('role').where({
    //             company_id: company_id,
    //             role:  {'>=': 3}
    //           }).select();
    //           return this.success(role);
    //         }
    //       }else{
    //         //为空
    //         let role = await this.model('role').where({
    //           company_id: company_id,
    //           role: {'>=': 2}
    //         }).select();
    //         return this.success(role);
    //       }
    //     // }
    //   }
    // } catch(e) {
    //   return this.fail(e);
    // }
    try {
      let { company_id, department_id, app_id } = this.post();

      var roles=new Array();
      var roleList = await managementClient.roles.list({page:1,limit:10,namespace:app_id});
      if(roleList.totalCount>0){
        for (let index = 0; index < roleList.list.length; index++) {
          const element = roleList.list[index];
          
          let role=this.roleMapperToLocal(element);
          roles.push(role);
        }
        return this.success(roles);
      }else{
        return this.success();
      }
    } catch (e) {
      return this.fail(e);
    }
  }

  /**
   * 获取角色列表
   * @returns 角色列表
   */
  async getRoleListAction(){
    try{
      let {pageSize,pageNum,app_id}=this.post();
      var roleList= await managementClient.roles.list({page:pageNum,limit:pageSize,namespace:app_id});
      return this.success({
        data:roleList.list,
        count:roleList.totalCount
      });
    }catch(e){
      return this.fail(`获取角色列表失败 ${e.message}`);
    }
  }

/**
 * 
 * @returns 添加角色结果
 */
  async addRoleAction(){
    try{
      let {oldCode,code,description,app_id,type,namespace}=this.post();

      if(type=="add"){
        var addRole=await managementClient.roles.create(code,description,app_id);
        return this.success(addRole);
      }else if(type="edit"){
        var editRole=await managementClient.roles.update(oldCode,{namespace,description,newCode:code});
        return this.success(editRole);
      }
     
    }catch(e){
      return this.fail(`添加角色失败 ${e.message}`);
    }
  }

  /**
   * 删除角色
   * @returns 删除角色结果
   */
  async deleteRoleAction(){
    try{
      let {code,namespace}=this.post();

      var deleteRole=await managementClient.roles.delete(code,namespace);
      return this.success(deleteRole);
    }catch(e){
      return this.fail(`删除角色失败 ${e.message}`);
    }
  }


  roleMapperToLocal(role){
   return {
    role:role.code,
    role_name:role.description
   }
  }
};
