export const toolCategories: ToolCategory[] = [
  {
    name: "Frontend инструменты",
    value: "frontend",
    tools: [
      {
        name: "Node.js with NVM",
        value: "node",
        installCommand:
          "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && " +
          "source $HOME/.nvm/nvm.sh && " +
          "nvm install --lts && " +
          "nvm use --lts",
      },
      { name: "Yarn", value: "yarn", installCommand: "npm install -g yarn" },
      {
        name: "Vue CLI",
        value: "vue-cli",
        installCommand: "npm install -g @vue/cli",
      },
    ],
  },
  {
    name: "Java инструменты",
    value: "java",
    tools: [
      {
        name: "OpenJDK",
        value: "openjdk",
        installCommand: "brew install openjdk",
      },
      { name: "Maven", value: "maven", installCommand: "brew install maven" },
      {
        name: "Gradle",
        value: "gradle",
        installCommand: "brew install gradle",
      },
    ],
  },
  {
    name: "Go инструменты",
    value: "go",
    tools: [
      { name: "Go", value: "go", installCommand: "brew install go" },
      {
        name: "Delve (дебаггер)",
        value: "delve",
        installCommand: "brew install delve",
      },
    ],
  },
  {
    name: "Python инструменты",
    value: "python",
    tools: [
      {
        name: "Python",
        value: "python",
        installCommand: "brew install python",
      },
      {
        name: "Pipenv",
        value: "pipenv",
        installCommand: "brew install pipenv",
      },
      {
        name: "Poetry",
        value: "poetry",
        installCommand: "brew install poetry",
      },
    ],
  },
  {
    name: "Devops инструменты",
    value: "devops",
    tools: [
      {
        name: "Python",
        value: "python",
        installCommand: "brew install python",
      },
      {
        name: "Docker",
        value: "docker",
        installCommand: "brew install docker",
      },
      {
        name: "Kubectl",
        value: "kubectl",
        installCommand: "brew install kubernetes-cli",
      },
      {
        name: "Helm",
        value: "helm",
        installCommand: "brew install helm",
      },
      {
        name: "Ansible",
        value: "ansible",
        installCommand: "brew install ansible",
      },
      {
        name: "Terraform",
        value: "terraform",
        installCommand:
          "brew tap hashicorp/tap && brew install hashicorp/tap/terraform",
      },
      {
        name: "Podman",
        value: "podman",
        installCommand: "brew install podman",
      },
    ],
  },
  {
    name: "Qa инструменты",
    value: "qa",
    tools: [
      {
        name: "Postman",
        value: "postman",
        installCommand: "brew install --cask postman",
      },
      {
        name: "Newman",
        value: "newman",
        installCommand: "brew install newman",
      },
      {
        name: "Insomnia",
        value: "insomnia",
        installCommand: "brew install --cask insomnia",
      },
    ],
  },
  {
    name: "Полезные утилиты",
    value: "utility",
    tools: [
      {
        name: "Maccy",
        value: "maccy",
        installCommand: "brew install --cask maccy",
      },
      {
        name: "Iterm2",
        value: "iterm2",
        installCommand: "brew install --cask iterm2",
      },
      {
        name: "Oh-my-zsh",
        value: "oh-my-zsh",
        installCommand:
          "curl -sSL https://install.python-poetry.org | python3 -",
      },
      {
        name: "Dbeaver",
        value: "dbeaver",
        installCommand: "brew install --cask dbeaver-community",
      },
    ],
  },
];
