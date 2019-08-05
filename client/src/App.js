import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
    <nav className="navbar sticky-top navbar-expand-sm navbar-light bg-light">
      <Link className="navbar-brand" to={Home}><dt>Elliot Boschwitz</dt></Link>
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

function ProjectButtons(props) {
  const buttons = [];
  for (const i in props.buttons) {
    const button = props.buttons[i];
    const maybeDownload = "";
    
    if (button.download != null) {
      buttons.push(
        <li className="nav-item">
            <dt><a className="nav-link" href={button.link} download={button.download}>{button.title}</a></dt>
        </li>
      )
    } else {
      buttons.push(
        <li className="nav-item">
            <dt><a className="nav-link" href={button.link}>{button.title}</a></dt>
        </li>
      )
    }

  }
  return buttons;
}

// Project info
function Projects(props) {
  const projects = []

  for (const i in props.projects) {
    const project = props.projects[i];
    projects.push(
      <div className="container-fluid project-item">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <h2>{project.name}</h2>
            <p>{project.desc}</p>
            <ul className="nav justify-content-center">
              <ProjectButtons buttons={project.buttons} />
            </ul>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6 carousel-wrapper">
            <Carousel name={project.name} items={project.screenshots} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="projects" className="text-center">
      <h1>Projects</h1>
      {projects}
    </div>
  );
}

// Carousel for screenshots for given projects
function Carousel(props) {
  if (props.items == null || props.name == null || props.name == "") {
    return(null)
  }
  const indicators = [];
  const items = [];
  const indicatorsId = props.name + "-carousel-indicators";
  const indicatorsIdHash = "#" + indicatorsId;
  
  for (const [i, item] of props.items.entries()) {
    var classIndicator = "";
    var classItem = "carousel-item";
    if (i == 0) {
      classIndicator = "active";
      classItem += " active";
    }
    indicators.push(<li data-target={indicatorsIdHash} data-slide-to={i} className={classIndicator}></li>)
    items.push(
      <div className={classItem}>
        <img src={item.path} className="d-block w-100" alt={item.alt} />
        <div class="carousel-caption d-block">
          <p>{item.desc}</p>
        </div>
      </div>
    )

  }

  return (
    <div id={indicatorsId} className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {items}
      </div>
      <ol className="carousel-indicators">
        {indicators}
      </ol>
      <a className="carousel-control-prev" href={indicatorsIdHash} role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href={indicatorsIdHash} role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  )
}

export default App;
