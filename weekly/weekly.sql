/*
 Navicat Premium Data Transfer

 Source Server         : mysql-5.7
 Source Server Type    : MySQL
 Source Server Version : 50740
 Source Host           : 192.168.111.102:3307
 Source Schema         : weekly

 Target Server Type    : MySQL
 Target Server Version : 50740
 File Encoding         : 65001

 Date: 09/12/2022 11:42:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `usernum` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `telephone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES (10, 'Authing', 'Authing', 'tommy', 'tommy', '18000000000', '1234@qq.com', '2022-12-8 20:2:32');
INSERT INTO `company` VALUES (11, 'aaaa', 'asdad', '11123', 'asdasdas', '13348926754', 'asdasdas@qq.com', '2022-12-9 10:47:18');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `department_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `department_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (12, 'Authing', 'Authing', '研发部', '研发部');
INSERT INTO `department` VALUES (13, 'Authing', 'Authing', '22', '3333');

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usernum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `logout_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `flag` int(11) NULL DEFAULT NULL,
  `login_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `login_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 106 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of log
-- ----------------------------
INSERT INTO `log` VALUES (84, 'admin', 'admin', '2022-12-09 10:19:28', 'e7f8889b292ec267ecfed61906bd8288', 0, NULL, NULL);
INSERT INTO `log` VALUES (85, 'admin', NULL, NULL, 'e7f8889b292ec267ecfed61906bd8288', 1, '2022-12-09 10:19:44', '127.0.0.1');
INSERT INTO `log` VALUES (86, 'admin', NULL, NULL, 'e7f8889b292ec267ecfed61906bd8288', 1, '2022-12-09 10:20:19', '127.0.0.1');
INSERT INTO `log` VALUES (87, 'admin', 'admin', '2022-12-09 10:22:12', 'e7f8889b292ec267ecfed61906bd8288', 0, NULL, NULL);
INSERT INTO `log` VALUES (88, 'admin', 'admin', '2022-12-09 10:22:17', 'e7f8889b292ec267ecfed61906bd8288', 0, NULL, NULL);
INSERT INTO `log` VALUES (89, 'admin', NULL, NULL, 'e7f8889b292ec267ecfed61906bd8288', 1, '2022-12-09 10:22:25', '127.0.0.1');
INSERT INTO `log` VALUES (90, 'admin', 'admin', '2022-12-09 10:22:33', 'e7f8889b292ec267ecfed61906bd8288', 0, NULL, NULL);
INSERT INTO `log` VALUES (91, 'admin', NULL, NULL, 'af352b6f22b8afa2f80bde1c936ac360', 1, '2022-12-09 10:22:36', '127.0.0.1');
INSERT INTO `log` VALUES (92, 'admin', NULL, NULL, 'e7f8889b292ec267ecfed61906bd8288', 1, '2022-12-09 10:22:39', '127.0.0.1');
INSERT INTO `log` VALUES (93, 'admin', 'admin', '2022-12-09 10:23:27', 'e7f8889b292ec267ecfed61906bd8288', 0, NULL, NULL);
INSERT INTO `log` VALUES (94, 'admin', NULL, NULL, 'e7f8889b292ec267ecfed61906bd8288', 1, '2022-12-09 10:23:33', '127.0.0.1');
INSERT INTO `log` VALUES (95, 'admin', 'admin', '2022-12-09 10:37:46', 'e7f8889b292ec267ecfed61906bd8288', 0, NULL, NULL);
INSERT INTO `log` VALUES (96, 'admin', NULL, NULL, 'e7f8889b292ec267ecfed61906bd8288', 1, '2022-12-09 10:39:57', '127.0.0.1');
INSERT INTO `log` VALUES (97, 'admin', 'admin', '2022-12-09 10:40:32', 'e7f8889b292ec267ecfed61906bd8288', 0, NULL, NULL);
INSERT INTO `log` VALUES (98, 'tommy', NULL, NULL, '0d770a41f3a43753a988f4a0121a2db0', 1, '2022-12-09 10:40:40', '127.0.0.1');
INSERT INTO `log` VALUES (99, 'tommy', NULL, NULL, 'e7f8889b292ec267ecfed61906bd8288', 1, '2022-12-09 10:40:44', '127.0.0.1');
INSERT INTO `log` VALUES (100, 'tommy', 'tommy', '2022-12-09 10:41:03', 'e7f8889b292ec267ecfed61906bd8288', 0, NULL, NULL);
INSERT INTO `log` VALUES (101, '9527', NULL, NULL, '0d770a41f3a43753a988f4a0121a2db0', 1, '2022-12-09 10:41:08', '127.0.0.1');
INSERT INTO `log` VALUES (102, '9527', NULL, NULL, 'e7f8889b292ec267ecfed61906bd8288', 1, '2022-12-09 10:41:12', '127.0.0.1');
INSERT INTO `log` VALUES (103, '9527', 'qd', '2022-12-09 10:41:17', 'e7f8889b292ec267ecfed61906bd8288', 0, NULL, NULL);
INSERT INTO `log` VALUES (104, 'admin', NULL, NULL, 'e7f8889b292ec267ecfed61906bd8288', 1, '2022-12-09 10:41:21', '127.0.0.1');
INSERT INTO `log` VALUES (105, 'admin', 'admin', '2022-12-09 11:19:09', 'e7f8889b292ec267ecfed61906bd8288', 0, NULL, NULL);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role` int(11) NULL DEFAULT NULL,
  `role_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (10, 'Authing', 2, '总监');
INSERT INTO `role` VALUES (11, 'Authing', 3, '部门经理');
INSERT INTO `role` VALUES (12, 'Authing', 4, '成员');
INSERT INTO `role` VALUES (13, 'aaaa', 2, '总监');
INSERT INTO `role` VALUES (14, 'aaaa', 3, '部门经理');
INSERT INTO `role` VALUES (15, 'aaaa', 4, '成员');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usernum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `telephone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role` int(11) NULL DEFAULT NULL,
  `role_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `company_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `department_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `department_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', 'admin', '18000000000', 1, 'CEO', 'e7f8889b292ec267ecfed61906bd8288', '123@qq.com', 'Authing', 'Authing', '总裁办公室', '总裁办公室');
INSERT INTO `user` VALUES (5, 'tommy', 'tommy', '18000000000', 2, '总监', 'e7f8889b292ec267ecfed61906bd8288', '1234@qq.com', 'Authing', 'Authing', '研发部', '研发部');
INSERT INTO `user` VALUES (7, '9527', 'qd', '1800000000', 4, '成员', 'e7f8889b292ec267ecfed61906bd8288', '12345@qq.com', 'Authing', 'Authing', '研发部', '研发部');
INSERT INTO `user` VALUES (8, '11123', 'asdasdas', '13348926754', 2, '总监', '7ef770ea663c23b71630f758551304f0', 'asdasdas@qq.com', 'aaaa', 'asdad', NULL, NULL);

-- ----------------------------
-- Table structure for week
-- ----------------------------
DROP TABLE IF EXISTS `week`;
CREATE TABLE `week`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usernum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role` int(11) NULL DEFAULT NULL,
  `date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `startDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `endDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `department_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `company_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of week
-- ----------------------------
INSERT INTO `week` VALUES (3, '9527', 'qd', '123', 4, '2022/12/8', '1670502576458', '1670169600000', '1670774399000', '研发部', 'Authing');
INSERT INTO `week` VALUES (4, 'tommy', 'tommy', '123', 2, '2022/12/8', '1670502591679', '1670169600000', '1670774399000', '研发部', 'Authing');
INSERT INTO `week` VALUES (5, 'admin', 'admin', '123', 1, '2022/12/8', '1670502631999', '1670169600000', '1670774399000', '总裁办公室', 'Authing');

SET FOREIGN_KEY_CHECKS = 1;
