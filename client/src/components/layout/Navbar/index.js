import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return(
      <>
        <Link to="/">About</Link>
        <Link to="/">Plays</Link>
        <Link to="/">Writing</Link>
        <Link to="/">Youth</Link>
      </>
    );
  }
}

export default Navbar;
