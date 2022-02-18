import HeadTag from "./HeadTag";
import { Ref, Grid, Sticky, Visibility } from 'semantic-ui-react'
import Navbar from "./Navbar";
import { createRef } from "react";

const Layout = ({ children, user }) => {

  const contextRef = createRef()

  return <> 
    <HeadTag/>
    <div style={{ marginLeft: '1rem', marginRight: '1rem'}}>
      <Ref innerRef={contextRef}>
        <Grid>
          <Grid.Column width={2}>
            <Sticky context={contextRef}>
              <Navbar user={user} />
            </Sticky>
          </Grid.Column>
          <Grid.Column width={5}>
            <Visibility context={contextRef}>
              {children}
            </Visibility>
          </Grid.Column>
        </Grid>
      </Ref>
    </div>
  </>;
}

export default Layout;