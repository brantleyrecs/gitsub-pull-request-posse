const renderToDom = (divId, htmltoRender) => {
  let targetedDiv = document.getElementById(divId);
  targetedDiv.innerHTML = htmltoRender;
};

const navBar = () => {
  let domString = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Github</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#">Overview</a>
          <a class="nav-link" href="/repos.html">Repositories</a>
          <a class="nav-link" href="/projects.html">Projects</a>
          <a class="nav-link" href="/packages.html">Packages</a>
        </div>
      </div>
    </div>
  </nav>
  `;
  renderToDom("navigate", domString);
};

const footer = () => {
  let domString = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="footer">
        <p>@ 2023 GitHub, Inc.</p>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Terms</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Privacy</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Security</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Status</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Help</a>
          </li>
        </ul>
        
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Contact GitHub</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">API</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Training</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Blog</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
        </ul>
    </div>
  </nav>
  `;
  renderToDom("footer", domString);
};

//function for rendering repo cards to DOM
const reposOnDom = (reposArr) => {
  let domString =
    "<div><input type='text' id='find-repo' value='' placeholder='Find a repository...'></div>";

  repos.forEach((repo) => {
    //function to return buttons for each of the repo tags
    const repoTags = () => {
      let tagButtons = "";
      repo.tags.forEach((tag) => {
        tagButtons += `
        <button class='card-tags'>${tag}</button>
      `;
      });
      return tagButtons;
    };

    //function for returning starred symbols based on repo.starred
    const starred = () => {
      if (repo.starred) {
        return "&starf;";
      } else {
        return "&star;";
      }
    };

    //function that calculates days since updated
    const daysSinceUpdate = () => {
      let currentDate = Date.now();
      let otherDate = new Date(repo.updatedDate);
      return Math.floor((currentDate - otherDate) / 86400000);
    };

    const repoLanguage = () => {
      switch (repo.language) {
        case "javascript":
          return `🟡 JavaScript`;
          break;
        case "typescript":
          return `🔵 TypeScript`;
          break;
        case "C#":
          return `🟢 C#`;
          break;
        case "java":
          return `☕️ Java`;
          break;
        case "ruby":
          return `🔻 Ruby`;
          break;
        case "react":
          return `☢️ React`;
          break;
      }
    };

    domString += `
    <div class="card" style="width: 18rem;">
      <div class="card-body repo-card">
        <div class="main-repo-info">
          <h5 class="card-title">${repo.name}</h5>
          <p class="card-text">${repo.description}</p>
          <div class='buttons'>
            ${repoTags()}
          </div>
          <div class='details'>
            <div class='language-${repo.language}'>
              <p>${repoLanguage()}</p>
            </div>
            <div class="stars">
              <p>&star;${repo.stars}</p>
            </div>
            <div class="branches">
              <p>${repo.branches}</p>
            </div>
            <div class="issues">
              <p>${repo.issues} issues need help</p>
            </div>
            <div>
              <p>Updated ${daysSinceUpdate()} days ago</p>
            </div>
          </div>
        </div>
        <div class="side-repo-info">
          <button class="starred" id="starred-button">${starred()} Star</button>
        </div>
      </div>
    </div>`;
  });
  renderToDom("repo-div", domString);
};

//renders repo adding form to DOM
const repoAddForm = () => {
  let domString = `
  <div class="form-title"><h2>Create a new repository</h2></div>
  <form id="repo-form">
    <div class="form-group">
      <label for="repo-name">Repository Name <span id='required-star'>*</span></label>

      <input type="text" class="form-control" id="repo-name-input">
    </div>
    <div class="form-subtext">
      <small id="repo-name-help" class="form-text">Great repository names are short and memorable. Need inspiration? How about<span id='silly-repo-name'>supreme-giggle?</span>
      </small>
    </div>
    <div class="form-group">
      <label for="description">Description <span id="optional">(optional)</span></label>
      <textarea class="form-control" id="repo-description" rows="3"></textarea>
    </div>
    <div class="form-group">
      <select id="language-select" class="custom-select custom-select-lg mb-3">
        <option selected>Choose Primary Language</option>
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="C#">C#</option>
        <option value="java">Java</option>
        <option value="ruby">Ruby</option>
        <option value="react">React</option>
      </select>
    </div>
    <div class="form-group">
    <button type="submit" class="btn btn-success">Create repository</button>
    </div>
  </form>
  `;
  renderToDom("repo-form-div", domString);
};

const repoFormEventListener = () => {
  let repoForm = document.getElementById("repo-form");
  const getDate = () => {
    let date = new Date(Date.now());
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const createNewRepo = (e) => {
    e.preventDefault();
    const newRepo = {
      name: document.getElementById("repo-name-input").value,
      description: document.getElementById("repo-description").value,
      tags: [],
      language: document.getElementById("language-select").value,
      stars: 0,
      branches: 0,
      issues: 0,
      updatedDate: `${getDate()}`,
      starred: false,
      pinned: false,
    };
    repos.push(newRepo);
    console.log(repos);
    reposOnDom(repos);
    repoForm.reset();
  };

  repoForm.addEventListener("submit", createNewRepo);
};

const searchRepos = () => {
  const search = document.getElementById("find-repo");
  const onSearch = (e) => {
    console.log(e);
    const searched = repos.filter(
      (repo) =>
        repo.name.includes(e.target.value) ||
        repo.description.includes(e.target.value)
    );
    console.log(searched);
    reposOnDom(searched);
  };
  search.addEventListener("change", onSearch);
};

// packages array
const packages = [
  {
    id: 1,
    name: "Docker",
    description:
      "A software platform used for building applications based on containers - small and lightweight execution environments.",
  },

  {
    id: 2,
    name: "Ruby Gems",
    description:
      "A standard format for distributing Ruby programs and libraries used for the  Ruby programming language.",
  },

  {
    id: 3,
    name: "npm",
    description:
      "A package manager for JavaScript included with Node.js. npm makes it easy for developers to share and reuse code.",
  },

  {
    id: 4,
    name: "Apache Maven",
    description:
      "A default package manager for the Java programming language and the java runtime environment.",
  },

  {
    id: 5,
    name: "Nugent",
    description:
      "A free and open source package manager used for the Microsoft development platforms including .NET.",
  },
  {
    id: 6,
    name: "Containers",
    description:
      "A singe place for your team to manage Docker images and decide who can see and access your images.",
  },
];

// packages
const packagesOnDom = (array) => {
  let domString = "";

  // package cards
  for (const package of array) {
    domString += `<div class="card" style="width: 18rem;" id="pkgs">
  <div class="card-body">
    <h5 class="card-title">${package.name}</h5>
    <p class="card-text">${package.description}.</p>
   <div class="footer"><button class="btn btn-danger" id="delete">Delete</button>
    <a href="#" class="card-link">More Information</a>
    </div>
  </div>
</div>`;
  }
  renderToDom("packages", domString);
};

const packageFormEventLister = () => {
  const form = document.querySelector(".form");

  const createNewPackage = (e) => {
    e.preventDefault();

    const newPackage = {
      id: packages.length + 1,
      name: document.querySelector("#name").value,
      description: document.querySelector("#description").value,
    };

    packages.push(newPackage);
    packagesOnDom(packages);
    form.reset();
  };

  form.addEventListener("submit", createNewPackage);
};

const repos = [
  {
    id: 1,
    name: "Sorting-Hat",
    description: "An app to find which Hogworts House you are in.",
    tags: ["HTML", "javascript", "CSS"],
    language: "javascript",
    stars: 500,
    branches: 70,
    issues: 0,
    updatedDate: "05/08/2023",
    starred: false,
    pinned: true,
  },
  {
    id: 2,
    name: "Calculator",
    description: "A functioning calculator.",
    tags: ["HTML", "javascript", "CSS"],
    language: "javascript",
    stars: 1000,
    branches: 150,
    issues: 0,
    updatedDate: "04/08/2023",
    starred: true,
    pinned: false,
  },
  {
    id: 3,
    name: "Pet-Adoption",
    description: "An app for adopting pets.",
    tags: ["HTML", "javascript", "CSS"],
    language: "HTML",
    stars: 28752,
    branches: 15,
    issues: 0,
    updatedDate: "05/08/2023",
    starred: true,
    pinned: true,
  },
  {
    id: 4,
    name: "Youtube-Player",
    description: "A project to setup a mock YouTube",
    tags: ["HTML", "javascript", "CSS"],
    language: "javascript",
    stars: 25,
    branches: 5,
    issues: 0,
    updatedDate: "05/08/2023",
    starred: false,
    pinned: false,
  },
  {
    id: 5,
    name: "Link-In-Bio",
    description: "A mock up of your personal links.",
    tags: ["HTML", "CSS"],
    language: "HTML",
    stars: 78,
    branches: 6,
    issues: 0,
    updatedDate: "05/08/2023",
    starred: false,
    pinned: true,
  },
  {
    id: 6,
    name: "Word-Counter",
    description: "A basic Java Script word counter",
    tags: ["HTML", "Javascript", "CSS"],
    language: "Javascript",
    stars: 2,
    branches: 14,
    issues: 2,
    updatedDate: "05/08/2023",
    starred: false,
    pinned: true,
  },
  {
    id: 9,
    name: "pikachu-gif-generator",
    description: "AI pikachu gif generator",
    tags: ["TypeScript", "javascript", "pokeCode", "vim"],
    language: "javascript",
    stars: 10000,
    branches: 3,
    issues: 0,
    updatedDate: "09/28/1998",
    starred: false,
    pinned: true,
  },
  {
    id: 7,
    name: "HTML-Resume",
    description: "A resume project to help learn HTML",
    tags: ["HTML",  "CSS"],
    language: "HTML",
    stars: 2,
    branches: 2,
    issues: 0,
    updatedDate: "05/08/2023",
    starred: false,
    pinned: false,
  },
  {
    id: 8,
    name: "Product-Cards",
    description: "Project to learn css flex.",
    tags: ["HTML",  "CSS"],
    language: "CSS",
    stars: 2,
    branches: 2,
    issues: 0,
    updatedDate: "05/08/2023",
    starred: false,
    pinned: false,
  },
];
// project section below
const projects = [
  { name: "Project 1",
    description: "Fix code in box"},
  { name: 'Project 2',
    description: "Come up with names"},
  { name: 'Project 3',
    description: "List items in array"},
  { name: 'Project 4',
    description: "Thank the Moms"}
];

function projectsOnDom(projectArr) {
  let domString = "";
  for (const proj of projectArr) {
    domString += `<div class="card" style="width:18rem;">
      <div class="card-body">
      <p class="card-text">${proj.name}</p>
      <p class="card-text">${proj.description}</p>
      </div>
    </div>`;
  };

  renderToDom("projectList", domString);
}
projectsOnDom(projects);

const renderProjectForm = () => {
  const form = `
  <form>
    <div class="createNewProject">
      <label for="exampleInputName1" class="form-label"> Project Board Name</label>
      <input type="name" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" placeholder="Name">
      <input type="name" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" placeholder="Example 2">
      <div id="nameHelp" class="form-text"></div>
    </div>
    <button type="submit" class="createNewProjectButton">Create Project</button>
  </form>
  `
 renderToDom("createNewProject", form);
}

renderProjectForm();

const formButton = document.querySelector("#createNewProjectButton");

// formButton.addEventListener('click', renderForm);

const formSubmission = document.querySelector("#createNewProject");

const createProject = (e) => {
  e.preventDefault();
const form = document.querySelector('form');

const newProjectObj = {
  name: document.querySelector("#name").value,
  description: document.querySelector("#description").value
};

projects.push(newProjectObj);
projectsOnDOM(projects);
form.reset();
}

// form.addEventListener('Create Project', createProject);

const app = document.querySelector("#app");

app.addEventListener('click', (e) => {
  if (e.target.id.includes("create project")) {
    console.log(index);
    projectsOnDOM(projects);
  }
});

// project section above 

const pinnedOnDom = (array) => {
  let domString = "";

  for (const pinned of array) {
    if (pinned.pinned === true) {
    domString += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${pinned.name}</h5>
    <p class="card-text">${pinned.description}</p>
  </div>
</div>`
    }
  }
  renderToDom("pinned-repo", domString);
};

const profile = () => {
  let domString = `<div class="card pro-card" style="width: 18rem;">
      <div class="card-body">
        <img src="photos/image.png" class="card-img-top pro-img" alt="Pull Request Posse">
        <h3 class="card-title">Pull Request Posse</h3>
        <h5 class="card-subtitle mb-2 text-body-secondary">PRP</h5>
        <p class="card-text">Coding our hearts out for a better, brighter, techier future!
        </p>
        <div>
        <button type="button" class="btn btn-dark follow-btn">Follow</button>
        <button type="button" class="btn btn-dark sponsor-btn">Sponsor</button>
        <button type="button" class="btn btn-dark more-btn">...</button>
        </div>
        <div class="followers">
        2.8m followers - 48 following -  10
        </div>
        <hr>
        <div class="location">Nashville,TN</div>
        <div class="web-address">https://github.com/nss-evening-cohort-E23/gitsub-pull-request-posse</div>
        <hr>
        <div class="highlights">
          <h5>Highlights</h5>
          <p>Best Group in Class</p>
          <p>GitSub Masters</p>
          <p>Pro... Of Course</p>
        </div>
        <hr>
        <div class="organ">
          <h5>Organizations</h5>
          <img src="https://avatars.githubusercontent.com/u/109764697?s=200&v=4" class="org">
          <img src="https://avatars.githubusercontent.com/u/129906791?s=200&v=4" class="org">
        </div>
        <hr>
        <div>
          <h5>Sponsors</h5>
          <img src="https://ca.slack-edge.com/T03F2SDTJ-U04RQ6SRKJB-5f76c7c0a76b-512" class="sponsor-img">
          <img src="https://ca.slack-edge.com/T03F2SDTJ-U04S1QC70HK-260085a625d5-512" class="sponsor-img">
          <img src="https://ca.slack-edge.com/T03F2SDTJ-U04S76RTBFE-73c92cc7fc1a-512" class="sponsor-img">
          <img src="https://ca.slack-edge.com/T03F2SDTJ-U04SUD9EMK2-a0d7f6b8aa0c-512" class="sponsor-img">
        </div>
      </div>
    </div>`;

  renderToDom("profile", domString);
};

const startApp = () => {
  navBar();
  footer();
  profile();
  //calls functions specific to repos page, so as not to cause app breaking errors on other pages
  if (document.title.includes("Overview")) {
    repoAddForm();
    pinnedOnDom(repos);
  }
  if (document.URL.includes("repos")) {
    reposOnDom(repos);
    repoAddForm();
    repoFormEventListener();
    searchRepos();
  }
  if (document.URL.includes("packages")) {
    packagesOnDom(packages);
    packageFormEventLister();
  }
  if (document.URL.includes("projects")) {
    projectsOnDom(projects);
  }
};

// startApp();
