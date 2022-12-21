"use strict";
const Base = require("./base");
const managementClient = require("../../common/authing/index");
module.exports = class extends Base {
  /*获取所有的公司列表*/
  async getAllCompanyListAction() {
    // try {
    //   let userinfo=this.post('userInfo');
    //   if (this.user.role == 1 || this.user.role == 2) {
    //     let company = await this.model("company").select();

    //     return this.success(company);
    //   } else {
    //     return this.fail("你没有权限");
    //   }
    // } catch (e) {
    //   return this.fail(e);
    // }

    try {
      let userInfo = this.post("userInfo");
      let tenantId = this.post("tenantId");
      if (userInfo.role == 1 || userInfo.role == 2) {
        var listResult = await managementClient.org.getOrgByTenantId(tenantId);

        var arr = new Array();
        if (listResult[0].children.length > 0) {
          for (let index = 0; index < listResult[0].children.length; index++) {
            const element = listResult[0].children[index];
            //如果有负责人，需要查找
            if (element.leaderUserIds && element.leaderUserIds.length > 0) {
              let userList = await managementClient.users.batch(
                element.leaderUserIds
              );
              if (userList && userList.length > 0) {
                arr[index] = this.orgMapperTOCompany(element, userList[0]);
              }
            } else {
              arr[index] = this.orgMapperTOCompany(element);
            }
          }
          return this.success(arr);
        }
        else{
          return this.success();
        }
      }
    } catch (e) {
      return this.fail(e);
    }
  }

  /*新增公司*/
  async addUpdateCompanyAction() {
    // try {
    //   let {
    //     id,
    //     create_time,
    //     type,
    //     company_id,
    //     company_name,
    //     usernum,
    //     username,
    //     telephone,
    //     email,
    //   } = this.post();
    //   if (this.user.role == 1) {
    //     if (type == "add") {
    //       let companyExistId = await this.model("company")
    //         .where({
    //           company_id,
    //         })
    //         .select();
    //       if (!think.isEmpty(companyExistId)) {
    //         return this.fail("公司ID已经存在");
    //       }
    //       let companyExistName = await this.model("company")
    //         .where({
    //           company_name,
    //         })
    //         .select();
    //       if (!think.isEmpty(companyExistName)) {
    //         return this.fail("公司名称已经存在");
    //       }
    //       let companyExistLeaderId = await this.model("user")
    //         .where({
    //           usernum,
    //         })
    //         .select();
    //       if (!think.isEmpty(companyExistLeaderId)) {
    //         return this.fail("负责人ID已经存在");
    //       }
    //       let dateTime = new Date();
    //       let create_time =
    //         dateTime.getFullYear() +
    //         "-" +
    //         Number(dateTime.getMonth() + 1) +
    //         "-" +
    //         dateTime.getDate() +
    //         " " +
    //         dateTime.getHours() +
    //         ":" +
    //         dateTime.getMinutes() +
    //         ":" +
    //         dateTime.getSeconds();
    //       await this.model("company").add({
    //         company_id,
    //         company_name,
    //         usernum,
    //         username,
    //         telephone,
    //         email,
    //         create_time,
    //       });
    //       const salt = "weekly";
    //       let password = think.md5("88886666");
    //       await this.model("user").add({
    //         usernum,
    //         username,
    //         telephone,
    //         role: 2,
    //         role_name: "总监",
    //         password,
    //         email,
    //         company_id,
    //         company_name,
    //       });
    //       await this.model("role").addMany([
    //         {
    //           company_id,
    //           role: 2,
    //           role_name: "总监",
    //         },
    //         {
    //           company_id,
    //           role: 3,
    //           role_name: "部门经理",
    //         },
    //         {
    //           company_id,
    //           role: 4,
    //           role_name: "成员",
    //         },
    //       ]);
    //       return this.success("添加成功");
    //     } else if (type == "edit") {
    //       let dateTime = new Date();
    //       let update_time =
    //         dateTime.getFullYear() +
    //         "-" +
    //         Number(dateTime.getMonth() + 1) +
    //         "-" +
    //         dateTime.getDate() +
    //         " " +
    //         dateTime.getHours() +
    //         ":" +
    //         dateTime.getMinutes() +
    //         ":" +
    //         dateTime.getSeconds();
    //       await this.model("company")
    //         .where({
    //           id,
    //           company_id,
    //           create_time,
    //         })
    //         .update({
    //           company_name,
    //           update_time,
    //         });
    //       return this.success("修改成功");
    //     }
    //   } else {
    //     return this.fail("你没有权限");
    //   }
    // } catch (e) {
    //   return this.fail(e);
    // }

    try {
      let {
        // id,
        // create_time,
        // type,
        // company_id,
        // company_name,
        // usernum,
        // username,
        // telephone,
        // email,
        formUser,
        userInfo,
        tenantId,
      } = this.post();

      if (userInfo.role == 1) {
        if (formUser.type == "add") {
          var org = await managementClient.org.getOrgByTenantId(tenantId);

          var result = await managementClient.org.addNode(
            org[0].orgId,
            org[0].id,
            { name: formUser.company_name }
          );

          return this.success("添加成功");
        } else if (formUser.type == "edit") {
          var result = await managementClient.org.updateNode(
            formUser.company_id,
            { name: formUser.company_name }
          );

          return this.success("编辑成功");
        }
      } else {
        return this.fail("你没有权限");
      }
    } catch (e) {
      this.fail(e);
    }
  }

  /*删除公司*/
  async deleteCompanyAction() {
    // let { id, company_id, company_name } = this.post();
    // try {
    //   if (this.user.role == 1) {
    //     await this.model("company")
    //       .where({ id, company_id, company_name })
    //       .delete();
    //     await this.model("department").where({ company_id }).delete();
    //     await this.model("role").where({ company_id }).delete();
    //     await this.model("user").where({ company_id }).delete();
    //     await this.model("week").where({ company_id }).delete();
    //     return this.success("删除成功");
    //   } else {
    //     return this.fail("你没有权限");
    //   }
    // } catch (e) {
    //   return this.fail(`删除失败${e}`);
    // }
    try {
      let { orgId, id, userInfo } = this.post();
      if (userInfo.role == 1) {
        var result = await managementClient.org.deleteNode(orgId, id);
        return this.success("删除成功");
      } else {
        return this.fail("你没有权限");
      }
    } catch (e) {
      return this.fail(`删除失败 ${e.message}`);
    }
  }

  /*公司新增部门*/
  async addDepartmentAction() {
    // let { department_id, department_name, type, id, company_id, company_name,orgId } =
    //   this.post();
    // try {
    //   if (type == "add") {
    //     if (this.user.role == 1 && company_id && company_name) {
    //       let userExistId = await this.model("department")
    //         .where({
    //           company_id,
    //           department_id,
    //         })
    //         .select();
    //       if (!think.isEmpty(userExistId)) {
    //         return this.fail("部门ID已经存在");
    //       }
    //       let userExistName = await this.model("department")
    //         .where({
    //           company_id,
    //           department_name,
    //         })
    //         .select();
    //       if (!think.isEmpty(userExistName)) {
    //         return this.fail("部门名称已经存在");
    //       }
    //       await this.model("department").add({
    //         company_id: company_id,
    //         company_name: company_name,
    //         department_id,
    //         department_name,
    //       });
    //     } else if (this.user.role == 2) {
    //       let userExistId = await this.model("department")
    //         .where({
    //           company_id: this.user.company_id,
    //           department_id,
    //         })
    //         .select();
    //       if (!think.isEmpty(userExistId)) {
    //         return this.fail("部门ID已经存在");
    //       }
    //       let userExistName = await this.model("department")
    //         .where({
    //           company_id: this.user.company_id,
    //           department_name,
    //         })
    //         .select();
    //       if (!think.isEmpty(userExistName)) {
    //         return this.fail("部门名称已经存在");
    //       }
    //       await this.model("department").add({
    //         company_id: this.user.company_id,
    //         company_name: this.user.company_name,
    //         department_id,
    //         department_name,
    //       });
    //     }
    //     return this.success("添加成功");
    //   } else if (type == "edit") {
    //     if (this.user.role == 1 && company_id && company_name) {
    //       await this.model("department")
    //         .where({
    //           id,
    //           company_id: company_id,
    //           company_name: company_name,
    //         })
    //         .update({
    //           department_name,
    //         });
    //     } else if (this.user.role == 2) {
    //       await this.model("department")
    //         .where({
    //           id,
    //           company_id: this.user.company_id,
    //           company_name: this.user.company_name,
    //         })
    //         .update({
    //           department_name,
    //         });
    //     }
    //     return this.success("修改成功");
    //   }
    // } catch (e) {
    //   return this.fail("添加失败", e);
    // }
    try {
      let {
        department_id,
        department_name,
        type,
        id,
        company_id,
        company_name,
        org_id,
      } = this.post();

      if (type == "add") {
        var result = await managementClient.org.addNode(org_id, company_id, {
          name: department_name,
        });
        return this.success("添加成功");
      } else if (type == "edit") {
        var result = await managementClient.org.updateNode(department_id, {
          name: department_name,
        });
        return this.success("修改成功");
      }
    } catch (e) {
      return this.fail(e);
    }
  }

  /*公司删除部门*/
  async deleteDepartmentAction() {
    // let company_id = this.user.company_id || this.post("company_id");
    // let { department_id } = this.post();
    // try {
    //   await this.model("department")
    //     .where({ company_id, department_id })
    //     .delete();
    //   await this.model("user").where({ company_id, department_id }).delete();
    //   await this.model("week").where({ company_id, department_id }).delete();
    //   return this.success("删除成功");
    // } catch (e) {
    //   return this.fail(`删除失败${e}`);
    // }

    try {
      let { department_id, company_id, org_id } = this.post();

      //删除用户
      var users = await managementClient.org.listMembers(department_id);
      if (users.totalCount > 0) {
        var userIds = users.list.map((item) => item.id);
        var removeUse = await managementClient.org.removeMembers(
          department_id,
          userIds
        );
      }
      //删除部门
      var deleteNode = await managementClient.org.deleteNode(
        org_id,
        department_id
      );
      //删除周报
      await this.model("week").where({ company_id, department_id }).delete();

      return this.success("删除成功");
    } catch (e) {
      return this.fail(`删除失败 ${e}`);
    }
  }

  /*获取所有的人列表*/
  async getAllMemberListAction() {
    // let page = this.post("pageNum");
    // let pagesize = this.post("pageSize");
    // let company_id = this.post("company_id");
    // if (!page) {
    //   page = "1";
    // }
    // if (!pagesize) {
    //   pagesize = "10";
    // }
    // let allMemberList;
    // try {
    //   allMemberList = await this.model("user")
    //     .field(
    //       "id, company_id, company_name, department_id, department_name, email, role, role_name, username, usernum,telephone"
    //     )
    //     .where({
    //       company_id: company_id,
    //     })
    //     .order("company_id asc, department_id asc, role asc")
    //     .page(page, pagesize)
    //     .countSelect();
    //   return this.success(allMemberList);
    // } catch (e) {
    //   return this.fail(e);
    // }
    try {
      let { page, pagesize, company_id, app_id } = this.post();
      if (!page) {
        page = 1;
      }
      if (!pagesize) {
        pagesize = 10;
      }
      var allUserList = new Array();
      var totalUser = await managementClient.org.listMembers(company_id, {
        includeChildrenNodes: true,
      });
      var company = await managementClient.org.getNodeById(company_id);
      if (company.children) {
        for (let index = 0; index < company.children.length; index++) {
          const element = company.children[index];
          var nodeInfo = await managementClient.org.getNodeById(element);
          var userList = await managementClient.org.listMembers(element);
          for (let index = 0; index < userList.totalCount; index++) {
            const user = userList.list[index];
            let roleInfo = await managementClient.users.listRoles(
              user.id,
              app_id
            );

            //获取用户的自定义数据
            var udf = await managementClient.users.getUdfValue(user.id);
            user.usernum=udf.usernum;
            let member = this.userMapperToMember(
              user,
              nodeInfo,
              company,
              roleInfo.totalCount > 0 ? roleInfo.list[0] : null
            );

            allUserList.push(member);
          }
        }
      }

      return this.success({
        data: allUserList,
        count: totalUser.totalCount,
      });
    } catch (e) {
      return this.fail(JSON.stringify(e));
    }
  }

  userMapperToMember(user, node, parentNode, roleInfo) {
    return {
      id: user.id,
      telephone: user.phone,
      email: user.email,
      usernum: user.usernum,
      username: user.name,
      company_id: parentNode.id,
      company_name: parentNode.name,
      department_id: node.id,
      department_name: node.name,
      role: roleInfo == null ? "" : roleInfo.code,
      role_name: roleInfo == null ? "" : roleInfo.description,
    };
  }

  /**
   * 获取当前租户下的组织机构
   */
  async getAllOrgListAction() {
    try {
      let tenantId = this.post("tenantId");

      var listResult = await managementClient.org.getOrgByTenantId(tenantId);

      var company = orgMapperTOCompany(listResult);

      return this.success(listResult);
    } catch (e) {
      return this.fail(e);
    }
  }

  /**
   * 新增组织机构
   */
  async addOrgAction() {
    try {
      let orgInfo = this.post("org");

      var addResult = await managementClient.org.create(orgInfo);

      return this.success(addResult);
    } catch (e) {
      return this.fail(e);
    }
  }

  /**
   * 删除组织机构
   */
  async deleteOrgAction() {
    try {
      let orgId = this.get("orgId");

      var deleteResult = await managementClient.org.deleteById(orgId);

      return this.success(deleteResult);
    } catch (e) {
      return this.fail(e);
    }
  }

  /**
   * 在部门下添加节点
   */
  async addNodeAction() {
    try {
      let node = this.post("node");

      let type = this.post("type");

      if (type == "add") {
        let orgId = this.post("orgId");
        let parentId = this.post("parentId");
        var res = await managementClient.org.addNode(orgId, parentId, node);
        return this.success(res);
      } else if (type == "edit") {
        let id = this.post("id");
        var res = await managementClient.org.updateNode(id, node);
        return this.success(res);
      }
    } catch (e) {
      return this.fail(e);
    }
  }

  /**
   * 删除组织机构下的节点
   */
  async deleteNodeAction() {
    try {
      let nodeId = this.post("nodeId");
      let orgId = this.post("orgId");

      var res = await managementClient.org.deleteNode(orgId, nodeId);
      return this.success(res);
    } catch (e) {
      return this.fail(e);
    }
  }

  orgMapperTOCompany(org, user) {
    return {
      id: org.id,
      orgId: org.orgId,
      company_id: org.id,
      company_name: org.name,
      usernum: user == null ? "" : user.externalId,
      username: user == null ? "" : user.name,
      telephone: user == null ? "" : user.phone,
      email: user == null ? "" : user.email,
      create_time: org.createdAt,
      update_time: org.updatedAt,
    };
  }
};
