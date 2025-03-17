export const toolCategories: ToolCategory[] = [
    {
      name: 'Frontend инструменты',
      value: 'frontend',
      tools: [
        { name: 'Node.js', value: 'node', installCommand: 'brew install node' },
        { name: 'Yarn', value: 'yarn', installCommand: 'npm install -g yarn' },
        { name: 'Vue CLI', value: 'vue-cli', installCommand: 'npm install -g @vue/cli' },
        // Другие frontend инструменты
      ]
    },
    {
      name: 'Java инструменты',
      value: 'java',
      tools: [
        { name: 'OpenJDK', value: 'openjdk', installCommand: 'brew install openjdk' },
        { name: 'Maven', value: 'maven', installCommand: 'brew install maven' },
        { name: 'Gradle', value: 'gradle', installCommand: 'brew install gradle' },
        // Другие Java инструменты
      ]
    },
    {
      name: 'Go инструменты',
      value: 'go',
      tools: [
        { name: 'Go', value: 'go', installCommand: 'brew install go' },
        { name: 'Delve (дебаггер)', value: 'delve', installCommand: 'brew install delve' },
        // Другие Go инструменты
      ]
    },
    {
      name: 'Python инструменты',
      value: 'python',
      tools: [
        { name: 'Python', value: 'python', installCommand: 'brew install python' },
        { name: 'Pipenv', value: 'pipenv', installCommand: 'brew install pipenv' },
        { name: 'Poetry', value: 'poetry', installCommand: 'curl -sSL https://install.python-poetry.org | python3 -' },
        // Другие Python инструменты
      ]
    }
  ];