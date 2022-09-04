// export const loginPageMessage: string = import.meta.env.VITE_LOGIN_PAGE_MESSAGE;
import { env } from '$env/dynamic/public';
export const loginPageMessage: string = env.PUBLIC_LOGIN_PAGE_MESSAGE;
