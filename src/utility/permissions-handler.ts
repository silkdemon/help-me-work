import fs from "fs/promises";
import { PathLike } from "fs";
import { search } from "@inquirer/prompts";
import { execSync } from "child_process";

export async function checkPermissions(path: PathLike) {
  try {
    await fs.access(path, fs.constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

function setupNpmPrefix() {
  try {
    const userHome = require("os").homedir();
    const npmGlobalDir = `${userHome}/.npm-global`;

    execSync(`mkdir -p ${npmGlobalDir}`);
    execSync(`npm config set prefix ${npmGlobalDir}`);

    // Добавление пути в PATH (для текущей сессии)
    const npmPath = `${npmGlobalDir}/bin:${process.env.PATH}`;
    process.env.PATH = npmPath;

    console.log("Настроен пользовательский npm-префикс!");
  } catch (error: any) {
    console.error("Ошибка настройки npm:", error.message);
  }
}

export async function handlePermissionError(tool: Tool) {
  const response = await search({
    message: "Как исправить права доступа?",
    source: () => [
      {
        name: "auto",
        value: "auto",
        description: "Настроить автоматически (без sudo)",
      },
      {
        name: "sudo",
        value: "sudo",
        description: "Запустить с sudo (вручную)",
      },
      { name: "exit", value: "exit", description: "Выйти" },
    ],
  });

  if (response === "auto") {
    setupNpmPrefix();
  } else if (response === "sudo") {
    console.log(`Запустите: sudo ${tool.installCommand}`);
    process.exit(0);
  } else {
    process.exit(1);
  }
}

export function installNvm() {
  try {
    console.log("Устанавливаем nvm...");
    execSync(
      `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && 
      unset npm_config_prefix && 
      source $HOME/.nvm/nvm.sh && 
      nvm install --lts && 
      nvm use --lts`,
      {
        shell: "/bin/bash",
        stdio: "inherit",
        env: {
          ...process.env,
          SHELL: "/bin/bash",
          npm_config_prefix: undefined,
        },
      }
    );
    console.log("✅ Успешно! Закройте и перезапустите терминал.");
  } catch (error: any) {
    console.error("❌ Ошибка:", error.message);
    console.log("Попробуйте вручную:");
    console.log("1. source ~/.bashrc (или ~/.zshrc)");
    console.log("2. Повторите команду");
  }
}
