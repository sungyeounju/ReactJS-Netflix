import { styled } from "styled-components";

const Nav = styled.div``;
const Col = styled.div``;
const Items = styled.ul``;
const Item = styled.li``;
function Header() {
  return (
    <Nav>
      <Col>
        <Items>
          <Item>Home</Item>
          <Item>Tv Shows</Item>
        </Items>
      </Col>
    </Nav>
  );
}
export default Header;
