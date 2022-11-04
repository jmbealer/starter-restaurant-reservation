import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import Footer from "./Footer";
import Burger from "../images/burger.jpg";
import Steak from "../images/steak.jpg";
import Pasta from "../images/pasta.jpg";
import "./Layout.css";

// Defines the main layout of the application

// You will not need to make changes to this file.

// @returns {JSX.Element}

function Layout() {
  return (
    <>
      <div class="container-fluid">
        <div class="row h-100">
          <div class="col-md-2 side-bar"> <Menu /> </div>
          <div class="col">
            <div id="carouselExampleIndicators" class="carousel slide"
              data-ride="carousel" >
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators"
                  data-slide-to="0" class="active">
                </li>
                <li data-target="#carouselExampleIndicators"
                  data-slide-to="1" >
                </li>
                <li data-target="#carouselExampleIndicators"
                  data-slide-to="2" >
                </li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active text-center">
                  <img src={Burger} class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={Steak} class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={Pasta} class="d-block w-100" alt="..." />
                </div>
              </div>
              <button class="carousel-control-prev" type="button"
                data-target="#carouselExampleIndicators" data-slide="prev" >
                <span class="carousel-control-prev-icon" aria-hidden="true" >
                </span>
                <span class="sr-only">Previous</span>
              </button>
              <button class="carousel-control-next" type="button"
                data-target="#carouselExampleIndicators" data-slide="next" >
                <span class="carousel-control-next-icon" aria-hidden="true" >
                </span>
                <span class="sr-only">Next</span>
              </button>
            </div>
            <main class="container">
              <Routes />
            </main>
          </div>
        </div>
      </div>
      <footer class="footer"> <Footer /> </footer>
    </>
  );
}

export default Layout;
