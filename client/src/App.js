import React, { useState } from 'react';
import Canvas from './fog';
import Model from './model';

function App() {
  const [projects, setProjects] = useState(Model().projects);

  return (
    <div>
      <Nav />
      <Canvas />
      <Projects projects={projects} />
    </div>
  );
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
            <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
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
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
