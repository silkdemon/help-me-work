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
        hasVersion: true,
      },
      {
        name: "Yarn",
        value: "yarn",
        installCommand: "npm install -g yarn",
        hasVersion: false,
      },
      {
        name: "Vue CLI",
        value: "vue-cli",
        installCommand: "npm install -g @vue/cli",
        hasVersion: false,
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
        hasVersion: true,
      },
      {
        name: "Maven",
        value: "maven",
        installCommand: "brew install maven",
        hasVersion: false,
      },
      {
        name: "Gradle",
        value: "gradle",
        installCommand: "brew install gradle",
        hasVersion: true,
      },
    ],
  },
  {
    name: "Go инструменты",
    value: "go",
    tools: [
      {
        name: "Go",
        value: "go",
        installCommand: "brew install go",
        hasVersion: true,
      },
      {
        name: "Delve (дебаггер)",
        value: "delve",
        installCommand: "brew install delve",
        hasVersion: false,
      },
    ],
  },
  {
    name: "Python инструменты",
    value: "pythonTools",
    tools: [
      {
        name: "Python",
        value: "python",
        installCommand: "brew install python",
        hasVersion: true,
      },
      {
        name: "Pipenv",
        value: "pipenv",
        installCommand: "brew install pipenv",
        hasVersion: false,
      },
      {
        name: "Poetry",
        value: "poetry",
        installCommand: "brew install poetry",
        hasVersion: false,
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
        hasVersion: true,
      },
      {
        name: "Docker",
        value: "docker",
        installCommand: "brew install docker",
        hasVersion: false,
      },
      {
        name: "Kubectl",
        value: "kubectl",
        installCommand: "brew install kubernetes-cli",
        hasVersion: false,
      },
      {
        name: "Helm",
        value: "helm",
        installCommand: "brew install helm",
        hasVersion: false,
      },
      {
        name: "Ansible",
        value: "ansible",
        installCommand: "pip3 install --user ansible",
        hasVersion: false,
      },
      {
        name: "Terraform",
        value: "terraform",
        installCommand:
          "brew untap hashicorp/tap && brew tap hashicorp/tap && brew install hashicorp/tap/terraform",
        hasVersion: false,
      },
      {
        name: "Podman",
        value: "podman",
        installCommand: "brew install podman",
        hasVersion: false,
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
        hasVersion: true,
      },
      {
        name: "Newman",
        value: "newman",
        installCommand: "brew install newman",
        hasVersion: false,
      },
      {
        name: "Insomnia",
        value: "insomnia",
        installCommand: "brew install --cask insomnia",
        hasVersion: false,
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
        hasVersion: false,
      },
      {
        name: "Iterm2",
        value: "iterm2",
        installCommand: "brew install --cask iterm2",
        hasVersion: false,
      },
      {
        name: "Oh-my-zsh",
        value: "oh-my-zsh",
        installCommand:
          'sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"',
        hasVersion: false,
      },
      {
        name: "Dbeaver",
        value: "dbeaver",
        installCommand: "brew install --cask dbeaver-community",
        hasVersion: false,
      },
    ],
  },
];
