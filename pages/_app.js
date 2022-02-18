import Layout from "./components/layout/Layout";
import { useRouter } from "next/router";
import HeadTag from "./components/layout/HeadTag";
import { destroyCookie, parseCookies } from 'nookies'
import "semantic-ui-css/semantic.min.css";
import "../styles/login.css";
import "../styles/globals.css";
import { baseURL, redirectUser } from "./util/auth";
import { Component } from "react";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isLogin = router.pathname === "/login";

  return (
    <>
      {!isLogin ? (
        <Layout>
          <HeadTag />
          <Component {...pageProps} />
        </Layout>
      ) : (
        <>
          <HeadTag />
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}

MyApp.getInitialProps = async ({ ctx, Component }) => {
  const { token } = parseCookies(ctx)
  let pageProps = {};

  const protectedRoutes = ['/']

  const isProtectedRoute = protectedRoutes.includes(ctx.pathname)

  if (!token) {
    isProtectedRoute && redirectUser(ctx, '/login')
  } else {
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    try{
      const res = await axios.get(`${baseURL}/api/v1/auth`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { user } = res.data;

      if(user) !isProtectedRoute && redirectUser(ctx, '/')
      pageProps.user = user;
    } catch (err) {
      console.error(err)
      destroyCookie(ctx, 'token')
      redirectUser(ctx, '/login')
    }
  } 

  return { pageProps };
};

export default MyApp;
