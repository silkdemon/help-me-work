#!/usr/bin/env node
import { checkbox, confirm, input, search } from "@inquirer/prompts";
import chalk from "chalk";
import { execSync } from "child_process";
import { ides } from "./models/ides";
import { toolCategories } from "./models/tools";
import { installNvm } from "./utility/permissions-handler";

const findSelectedTool = (tools: Tool[], selectedTools: string[]): Tool[] => {
  return tools.filter((tool) => selectedTools.includes(tool.value));
};

const findSelectedToolNames = (tools: Tool[]): string[] => {
  return tools.map((tool) => tool.name);
};

async function main() {
  console.log("Установщик инструментов разработки для Mac");

  // Шаг 0: Проверяем наличие Homebrew
  try {
    execSync("which brew", { stdio: "ignore" });
    console.log("✅ Homebrew уже установлен");
  } catch (error) {
    const isInstallBrew = await confirm({
      message: `Установить Homebrew?`,
    });
    if (isInstallBrew) {
      console.log("📦 Установка Homebrew...");
      execSync(
        '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
        { stdio: "inherit" }
      );
    }
  }

  // Шаг 0.5: Скачиваем гит
  try {
    execSync("git --version", { stdio: "ignore" });
    console.log("✅ Git уже установлен");
  } catch (error) {
    const isInstallGit = await confirm({
      message: `Установить Git?`,
    });
    if (isInstallGit) {
      console.log("📦 Установка Git...");
      execSync("brew install git");
    }
  }

  // Шаг 1: Спрашиваем какую IDE скачать
  const ideAnswers = await checkbox({
    message: "Выберите ide для установки:",
    choices: ides,
  });

  // Шаг 2: Спрашиваем категории инструментов
  const categoryAnswer = await search({
    message: "Выберите категории инструментов для установки:",
    source: () => {
      return toolCategories.map((cat) => ({
        name: cat.name,
        value: cat.value,
      }));
    },
  });

  // Создаем список инструментов из выбранных категорий
  const toolChoices: Tool[] = toolCategories
    .filter((cat) => cat.value === categoryAnswer)
    .flatMap((cat) =>
      cat.tools.map((tool) => ({
        name: tool.name,
        value: tool.value,
        installCommand: tool.installCommand,
        hasVersion: tool.hasVersion,
      }))
    );

  // Шаг 3: Спрашиваем какие конкретно инструменты из выбранных категорий выбрать
  const toolAnswers = await checkbox({
    message: "Выберите инструменты для установки:",
    choices: toolChoices,
  });

  if (toolAnswers.length === 0 && ideAnswers.length === 0) {
    console.log("Инструменты не выбраны. Установка прервана.");
    return;
  }

  // Создаем список выбранных инструментов и IDE
  const selectedTools = findSelectedTool(toolChoices, toolAnswers);
  const selectedIdes = findSelectedTool(ides, ideAnswers);
  // Создаем список имен выбранных инструментов и IDE
  const selectedToolNames = findSelectedToolNames(selectedTools);
  const selectedIdeNames = findSelectedToolNames(selectedIdes);

  const toolsText =
    (selectedToolNames ?? []).length > 0
      ? `\n  - ${(selectedToolNames ?? []).join("\n  - ")}`
      : "";

  const idesText =
    (selectedIdeNames ?? []).length > 0
      ? `\n  - ${(selectedIdeNames ?? []).join("\n  - ")}`
      : "";

  const toolsToInstall = [...selectedTools, ...selectedIdes];

  let needVersion = false;
  let version = "";

  // Шаг 4: Спрашиваем хотим ли указывать конкретную версию инструмента
  for (const tool of toolsToInstall) {
    if (tool.hasVersion === true) {
      needVersion = await confirm({
        message: `Вы выбрали инструмент, для которого доступно версионирование - ${tool.name}, вам нужна НЕ latest версия?`,
        default: false,
        transformer: (answer) => (answer ? "👍" : "👎"),
      });
    }

    if (needVersion && tool.hasVersion) {
      version = await input({
        message: `Введите версию для установки ${tool.name}:`,
      });
    }
  }

  // Шаг 5: Запрос подтверждения установки
  const confirmAnswer = await confirm({
    message: `Вы уверены, что хотите установить выбранные инструменты: ${toolsText}${idesText}?`,
    transformer: (answer) => (answer ? "👍" : "👎"),
  });

  if (confirmAnswer) {
  } else {
    console.log(
      chalk.yellow("Не выбрано ни одного инструмента для установки.")
    );
    return;
  }

  // Шаг 6: Установка выбранных инструментов
  for (const tool of toolsToInstall) {
    console.log(`\nУстановка ${tool.name}...`);

    if (tool.value === "npm") {
      installNvm();
    } else {
      try {
        if (needVersion && tool.hasVersion === true) {
          execSync(`${tool.installCommand}@${version}`);
          console.log(chalk.bgCyan(`✅ ${tool.name} установлен успешно`));
        } else {
          execSync(tool.installCommand);
          console.log(chalk.bgCyan(`✅ ${tool.name} установлен успешно`));
        }
      } catch (error) {
        console.error(chalk.red(`❌ Ошибка при установке ${tool.name}:`));
        console.error(chalk.yellow(error));
      }
    }
  }

  console.log(chalk.green("\n🎉 Установка завершена!"));
}

main();

// хендлинг комманд+с
// проверка как работает installNvm
// проверить терраформ
