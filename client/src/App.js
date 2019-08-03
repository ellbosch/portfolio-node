import React from 'react';
import logo from './logo.svg';
import './App.css';


// Model (we'll move this later)
let lob = {
  name: "Lob",
  desc: "Lob presents an extensive variety of sports content, including game highlights, delivered in near real-time performance. Lob is currently a proof-of-concept iPhone app in private beta."
}

function App() {
  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <Project project={lob} />
      </div>
    </div>
  );
}

// Sticky nav on top of view
function Nav() {
  return (
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Elliot Boschwitz</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// Project info
function Project(props) {
  return (
    <div className="project-item">
      <h3>{props.project.name}</h3>
      <p>{props.project.desc}</p>
    </div>
  );
}

export default App;
