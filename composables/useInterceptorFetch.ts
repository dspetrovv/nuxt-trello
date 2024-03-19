export const useInterceptorFetch = (url, options) => {
  const store = useUserStore();
  const router = useRouter();
  const route = useRoute();

  return useFetch(url, {
    ...options,
    async onResponseError({ request, response }) {
      const originalRequest = request;
      if (response && response.status === 401 && originalRequest.url.includes('refresh')) {
        store.logout();
      } else if (
        response &&
        response.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes('sign-in')
      ) {
        originalRequest._retry = true;
        const token = await store.refresh();
        request.headers.common.Authorization = token;
      }
    },

    async onRequest({ options, ...rest }) {
      const access = JSON.parse(localStorage.getItem('access')!);
      if (access) {
        options.headers = {
          Authorization: 'JWT ' + access,
          Accept: 'application/json',
        };
      } else {
        store.logout(route.name);
        router.replace('/sign-in');
      }
      return { options, ...rest };
    },

    onRequestError({ error }) {
      Promise.reject(error);
    }
  })
}