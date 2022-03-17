import styles from "../styles/Home.module.css";
import { Message } from "semantic-ui-react";
import { getServices } from "./util/serviceActions";
import { parseCookies } from "nookies";
import axios from "axios";
import { baseURL } from "./util/auth";
import { getTotalHours } from "./util/getTotalHours";

export default function Home({ user: { permission, username, userId }, services }) {
  return permission === "student" ? (
    <>
      <Message 
        size="large"
        color="grey"
        styles={{marginTop: '10rem'}}
        content={`You have completed ${getTotalHours(services)} hours worth of community service`}
      />
    </>
  ) : (
    <>

    </>
  );
}

Home.getInitialProps = async (ctx) => {
  try{
    const { token } = parseCookies(ctx)
    const res = await axios.get(`${baseURL}/api/v1/service`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { services: res.data.services }
  } catch (err) {
    console.error(err)
    return { errorLoading: true }
  }
}