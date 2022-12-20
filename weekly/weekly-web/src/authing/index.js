import {AuthenticationClient} from 'authing-js-sdk'

export const authingClient=new AuthenticationClient({
    appId:'63981463f8d0a068ad0d9878',
    secret:'17b9c281ed4c30d4536ab6700cf60ada',
    appHost:'https://playground-weekly.authing.cn',
    redirectUri:'http://localhost:8082/authinglogin?'
});

export const appId="63981463f8d0a068ad0d9878";

export var tenantId='';
export function setTenantId(value){
  tenantId=value;
}

