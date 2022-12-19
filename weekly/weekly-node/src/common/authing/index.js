import { AuthenticationClient ,ManagementClient } from 'authing-js-sdk';

// const authenticationClient = new AuthenticationClient({
//     appId: '63981463f8d0a068ad0d9878',
//     appHost: 'https://playground-weekly.authing.cn',
//     appSecret: '17b9c281ed4c30d4536ab6700cf60ada',
//     redirectUri: 'http://localhost:8362/home/user/callBack?',
//   });

const managementClient=new ManagementClient({
    userPoolId:'613189b2eed393affbbf396e',
    secret:'ccf4951a33e5d54d64e145782a65f0a7'
});

const authenticationClient=new AuthenticationClient({
    appId:''
});

module.exports=managementClient;