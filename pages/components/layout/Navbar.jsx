import { useRouter } from 'next/router'
import Link from 'next/link'
import { List, Divider, Icon } from 'semantic-ui-react'

const Navbar = ({ user: {email, username} }) => {

  const router = useRouter();
  const isActive = (route) => router.pathname === route;

  return <>
    <List
      style={{marginTop: '2rem', width: '100'}}
      size='big'
      verticalAlign='middle'
      selection
      className="navbar"
    >
      <Link href="/">
        <List.Item active={isActive('/')} style={{marginBottom: "1rem"}}>
          <Icon 
            name="home"
            size="large"
            color={isActive('/') ? 'orange' : 'grey'}
          />
          <List.Content>
            <List.Header content="Home" />
          </List.Content>
        </List.Item>
      </Link>
      <Link href="/services">
        <List.Item active={isActive('/services')} style={{marginBottom: "1rem"}}>
          <Icon 
            name="clipboard"
            size="large"
            color={isActive('/services') ? 'orange' : 'grey'}
          />
          <List.Content>
            <List.Header content="Your Services" />
          </List.Content>
        </List.Item>
      </Link>
      <Link href="/submit">
        <List.Item active={isActive('/submit')} style={{marginBottom: "1rem"}}>
          <Icon 
            name="edit"
            size="large"
            color={isActive('/submit') ? 'orange' : 'grey'}
          />
          <List.Content>
            <List.Header content="Submit" />
          </List.Content>
        </List.Item>
      </Link>
    </List>
  </>
}

export default Navbar;