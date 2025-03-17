import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('dashboard', nextUrl));
            }
            return true; // 사용자가 특정 페이지에 접근할 때마다 호출 됨.
        },
    },
    providers: [],
} satisfies NextAuthConfig;