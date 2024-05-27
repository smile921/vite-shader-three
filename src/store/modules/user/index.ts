import { defineStore } from 'pinia';
import { login as userLogin, logout as userLogout, getUserInfo, LoginData } from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { UserState } from './types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      // const res = await getUserInfo()
      const userInfo = {
        name: '王立群',
        avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
        email: 'wangliqun@email.com',
        job: 'frontend',
        jobName: '前端艺术家',
        organization: 'Frontend',
        organizationName: '前端',
        location: 'beijing',
        locationName: '北京',
        introduction: '人潇洒，性温存',
        personalWebsite: 'https://www.arco.design',
        phone: '150****0000',
        registrationDate: '2013-05-10 12:10:00',
        accountId: '15012312300',
        certification: 1,
        role: 'admin',
      };
      // this.setInfo(res.data);
      this.setInfo(userInfo);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        // const res = await userLogin(loginForm);
        // setToken(res.data.token);
        setToken('user-mock-token');
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // Logout
    async logout() {
      await userLogout();

      this.resetInfo();
      clearToken();
    },
  },
});

export default useUserStore;
