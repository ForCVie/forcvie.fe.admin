import {SCREEN} from './screen';
import authMiddleware from '@/middleware/auth';
import logMiddleware from '@/middleware/log'

const getView = (path: any) => {
  return () => import(`@/views/${path}.vue`);
};

export const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: {
      title: "ForC Food",
      middleware: [authMiddleware],
    },
    children: [
      {
        path: '/template',
        name: 'template',
        meta: {title: 'TemplateUi'},
        component: getView('TemplateUiYeongsang'),
      },
      {
        path: SCREEN.resourceManagement.path,
        name: SCREEN.resourceManagement.name,
        component: import('@/views/developer/resourceMng/ResourceMngList.vue'),
      },
      {
        path: SCREEN.menuManagement.path,
        name: SCREEN.menuManagement.name,
        component: import('@/views/developer/menuMng/MenuMngList.vue'),
      },
      {
        path: SCREEN.menuManagementForm.path,
        name: SCREEN.menuManagementForm.name,
        component: import('@/views/developer/menuMng/MenuMngForm.vue'),
      },
      {
        path: SCREEN.roleManagement.path,
        name: SCREEN.roleManagement.name,
        component: import('@/views/developer/roleMng/RoleMngList.vue'),
      },
      {
        path: SCREEN.roleManagementForm.path,
        name: SCREEN.roleManagementForm.name,
        component: import('@/views/developer/roleMng/RoleMngForm.vue'),
      },
      {
        path: SCREEN.noticeManagement.path,
        name: SCREEN.noticeManagement.name,
        component: import('@/views/fqaMng/notice/NoticeMng.vue'),
      },
      {
        path: SCREEN.noticeManagementForm.path,
        name: SCREEN.noticeManagementForm.name,
        component: import('@/views/fqaMng/notice/NoticeForm.vue'),
      },
      {
        path: SCREEN.questionAnswerMng.path,
        name: SCREEN.questionAnswerMng.name,
        component: import('@/views/fqaMng/questionAnswer/QuestionAnswerMng.vue'),
      },
      {
        path: SCREEN.questionAnswerMngForm.path,
        name: SCREEN.questionAnswerMngForm.name,
        component: import('@/views/fqaMng/questionAnswer/QuestionAnswerForm.vue'),
      },
    ],
  },
  // {
  //   path: '/template',
  //   name: 'template',
  //   meta: {title: 'TemplateUi'},
  //   component: getView('TemplateUiYeongsang'),
  // },
  {
    path: SCREEN.login.path,
    name: SCREEN.login.name,
    meta: {
      middleware: [authMiddleware],
    },
    component: getView('LoginView'),
  },
  {
    path: SCREEN.internalError.path,
    name: SCREEN.internalError.name,
    component: getView('InternalError'),
  },
  {
    path: SCREEN.notFound.path,
    name: SCREEN.notFound.name,
    meta: {title: 'Not Found'},
    component: getView('NotFound'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: SCREEN.notFound.path,
    component: getView('NotFound'),
  },
  {
    /** 접근권한 없음 */
    path: SCREEN.unauthorized.path,
    name: SCREEN.unauthorized.name,
    component: () => import("@/views/UnauthorizedPage.vue"),
    meta: {
      title: "계원예술대학교",
      auth: false,
    },
  },
];
