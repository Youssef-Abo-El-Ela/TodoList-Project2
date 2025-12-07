import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './NavBar.module.css'
import SearchBar from "./SearchBar";
import ThemeButton from "./ThemeButton";

export default function NavBar() {
  return (
    <Navbar expand="lg" >
      <Container>
        <Navbar.Brand>
            <img src="/logo192.png" alt="Brand Logo" className={styles.brandImage}/>
            Todo.ly
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <SearchBar></SearchBar>
            <ThemeButton></ThemeButton>    
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
