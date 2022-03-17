import Router, { useRouter } from "next/router";
import Link from "next/link";
import { List, Divider, Icon, ListDescription } from "semantic-ui-react";
import Cookies from "js-cookie";

const Navbar = ({ user: { username, permission } }) => {
  const router = useRouter();
  const isActive = (route) => router.pathname === route;

  const logoutUser = () => {
    Cookies.remove("token");
    Router.push("/login");
  };

  return (
    <>
      <List
        style={{ marginTop: "2rem", width: "100" }}
        size="big"
        verticalAlign="middle"
        selection
        className="navbar"
      >
        <Link href="/">
          <List.Item active={isActive("/")} style={{ marginBottom: "1rem" }}>
            <Icon
              name="home"
              size="large"
              color={isActive("/") ? "orange" : "grey"}
            />
            <List.Content>
              <List.Header content="Home" />
            </List.Content>
          </List.Item>
        </Link>
        <Link href="/services">
          <List.Item
            active={isActive("/services")}
            style={{ marginBottom: "1rem" }}
          >
            <Icon
              name="clipboard"
              size="large"
              color={isActive("/services") ? "orange" : "grey"}
            />
            <List.Content>
              <List.Header
                content={
                  permission === "teacher" ? "All Services" : "Your Services"
                }
              />
            </List.Content>
          </List.Item>
        </Link>
        {permission === "student" && (
          <Link href="/submit">
            <List.Item
              active={isActive("/submit")}
              style={{ marginBottom: "1rem" }}
            >
              <Icon
                name="edit"
                size="large"
                color={isActive("/submit") ? "orange" : "grey"}
              />
              <List.Content>
                <List.Header content="Submit" />
              </List.Content>
            </List.Item>
          </Link>
        )}
        <List.Item onClick={logoutUser}>
          <Icon name="sign out" size="large" color="grey" />
          <List.Content>
            <List.Header content="Log Out" />
          </List.Content>
        </List.Item>
      </List>
    </>
  );
};

export default Navbar;
