import HeadTag from "./HeadTag";
import { Container } from 'semantic-ui-react'

const Layout = ({ children }) => {
  return <> 
    <HeadTag/>
    <Container style = {{paddingTop: "1rem"}} text>{children}</Container>
  </>;
}

export default Layout;