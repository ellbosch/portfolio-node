import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import ReactGA from 'react-ga';
import Canvas from './fog';
import Model from './model';
import Resume from './bin/attachments/BoschwitzElliot-Resume.pdf'

// Initialize analytics
function initializeReactGA() {
  ReactGA.initialize('UA-54022705-1');
  // ,{
  //   debug: true,
  //   titleCase: false,
  //   gaOptions: {
  //     userId: 123
  //   }
  // });
}

// Handles routing for app
function App() {
  initializeReactGA();

  return (
    <Router>
      <Nav />
      <Route path="/" exact component={Home} />
    </Router>
  );
}

// Home page with canvas and projects
function Home() {
  ReactGA.pageview('/homepage');

  const [projects, ] = useState(Model().projects);

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
    <nav id="navbar-main" className="navbar sticky-top navbar-expand-sm navbar-light">
      <Link className="navbar-brand" to="/"><dt>Elliot Boschwitz</dt></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Projects</NavLink>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/ellbosch">GitHub</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://linkedin.com/in/elliotboschwitz">LinkedIn</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={Resume}>Resume</a>
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
    
    if (button.download != null) {
      buttons.push(
        <li key={i} className="nav-item">
            <dt><a className="nav-link" href={button.link} download={button.download}>{button.title}</a></dt>
        </li>
      )
    } else {
      buttons.push(
        <li key={i} className="nav-item">
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
      <div key={i} className="container-fluid project-item">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <h2>{project.name}</h2>
            <p>{project.desc}</p>
            <ul className="nav justify-content-center">
              <ProjectButtons buttons={project.buttons} />
            </ul>
          </div>
        </div>
        <Carousel name={project.name} items={project.screenshots} />
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
  if (props.items == null || props.name == null || props.name === "") {
    return(null)
  }
  const indicators = [];
  const items = [];
  const indicatorsId = props.name + "-carousel-indicators";
  const indicatorsIdHash = "#" + indicatorsId;
  
  for (const [i, item] of props.items.entries()) {
    var classIndicator = "";
    var classItem = "carousel-item";
    if (i === 0) {
      classIndicator = "active";
      classItem += " active";
    }
    indicators.push(<li key={i} data-target={indicatorsIdHash} data-slide-to={i} className={classIndicator}></li>)
    items.push(
      <div key={i} className={classItem}>
        <img src={item.path} className="d-block w-100" alt={item.alt} />
        <div className="carousel-caption d-block">
          <p>{item.desc}</p>
        </div>
      </div>
    )

  }

  return (
    <div className="row justify-content-center">
      <div className="col-6 carousel-wrapper">
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
      </div>
    </div>
  )
}

export default App;
