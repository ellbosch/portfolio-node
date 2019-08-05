import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Canvas from './fog';
import Model from './model';

// Handles routing for app
function App() {
  return (
    <Router>
      <Nav />
      <Route path="/" exact component={Home} />
    </Router>
  );
}

// Home page with canvas and projects
function Home() {
  const [projects, setProjects] = useState(Model().projects);

  return (
    <div>
      <Canvas />
      <Projects projects={projects} />
    </div>
  )
}

// Sticky nav on top of view
function Nav() {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Elliot Boschwitz</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// Project info
function Projects(props) {
  return (
    <div id="projects" className="text-center">
      <h1>Projects</h1>
      {
        props.projects.map(function(project, i) {
          return (
            <div className="container-fluid project-item">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                  <h2>{project.name}</h2>
                  <p>{project.desc}</p>
                  <Carousel items={project.screenshots} />
                  <ul className="nav justify-content-center">
                  {
                    project.buttons.map(function(button, i) {
                      return (
                        <li className="nav-item">
                          <dt><a className="nav-link" href={button.link}>{button.title}</a></dt>
                        </li>
                      )
                    })
                  }
                  </ul>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

// Carousel for screenshots for given projects
function Carousel(props) {
  const indicators = [];
  const images = [];

  if (props.items == null) {
    return(null)
  }

  for (const [i, item] of props.items.entries()) {
    if (i == 0) {
      indicators.push(<li data-target="#carouselExampleIndicators" data-slide-to={i} className="active"></li>)
      images.push(
        <div className="carousel-item active">
          <img src={item.path} className="d-block w-100" alt="item.alt" />
        </div>
      )
    } else {
      indicators.push(<li data-target="#carouselExampleIndicators" data-slide-to={i}></li>)
      images.push(
        <div className="carousel-item">
          <img src={item.path} className="d-block w-100" alt="item.alt" />
        </div>
      )
    }

  }

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      {indicators}
    </ol>
    <div className="carousel-inner">
      {images}
    </div>
    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
    </div>
  )
}

export default App;
