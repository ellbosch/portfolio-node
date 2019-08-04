import React, { useState } from 'react';
import Canvas from './fog';

// Model (we'll move this later)
const projectsModel = [
  {
    name: "Lob",
    desc: "Lob presents an extensive variety of sports content, including game highlights, delivered in near real-time performance. Lob is currently a proof-of-concept iPhone app in private beta."
  },
  {
    name: "SwiftVid",
    desc: "Inspired from Lob, SwiftVid is a framework that provides easier integration of videos into Swift projects. SwiftVid will launch soon."
  }
]
  
function App() {
  const [projects, setProjects] = useState(projectsModel);

  return (
    <div>
      <Nav />
      <Canvas />
      <div className="container-fluid">
        <Projects projects={projects} />
      </div>
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
  console.log(props);
  return (
    <div className="projects">
      {
        props.projects.map(function(project, i) {
          return (
            <div className="project-item">
              <h3>{project.name}</h3>
              <p>{project.desc}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
