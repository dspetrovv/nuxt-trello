export const useInterceptorFetch = (url, options) => {
  const store = useUserStore();
  const router = useRouter();
  const route = useRoute();
  const config = useRuntimeConfig();

  const serverUrl = `${config.public.host}${url}`;

  return useFetch(serverUrl, {
    ...options,
    async onResponseError({ request, response, options }) {
      const originalRequest = request;

      if (response && response.status === 401 && originalRequest.includes('refresh')) {
        store.logout();
      } else if (
        response &&
        response.status === 401 &&
        !originalRequest.includes('sign-in')
      ) {
        const token = await store.refresh();
        options.headers.Authorization = token;
        const newResp = await useFetch(request, options);

        response._data = newResp.data.value;
        return newResp;
      }
    },

    async onRequest({ options, ...rest }) {
      const access = localStorage.getItem('access')!;
      if (access) {
        options.headers = {
          Authorization: 'JWT ' + access,
          Accept: 'application/json',
        };
        store.login();
      } else if (route.name !== 'sign-up') {
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