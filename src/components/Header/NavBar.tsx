import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import SearchBar from "./SearchBar";
import ThemeButton from "./ThemeButton";

export default function NavBar() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            src="/logo192.png"
            alt="Brand Logo"
            className={styles.brandImage}
          />
          <span className= {styles.brandText}>Todo.ly</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav >
            <Nav.Link as={Link} to="/">
              <span className= {styles.linkText}>Home</span>
            </Nav.Link>
            <SearchBar></SearchBar>
            <ThemeButton></ThemeButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
