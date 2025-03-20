#!/usr/bin/env node
import inquirer from "inquirer";
import { exec, execSync } from "child_process";
import { promisify } from "util";
import {
  checkbox,
  search,
  confirm,
  Separator,
  select,
} from "@inquirer/prompts";
import { toolCategories } from "./models/tools";
import { log } from "console";
import fs from "fs/promises";
import { PathLike } from "fs";
import {
  checkPermissions,
  handlePermissionError,
  installNvm,
} from "./utility/permissions-handler";
import { ides } from "./models/ides";

const findSelectedTool = (tools: Tool[], selectedTools: string[]): Tool[] => {
  return tools.filter((tool) => selectedTools.includes(tool.value));
};

const findSelectedToolNames = (tools: Tool[]): string[] => {
  return tools.map((tool) => tool.name);
};

async function main() {
  console.log("Установщик инструментов разработки для Mac");

  // Шаг 0: Проверяем наличие Homebrew
  const isInstallBrew = await confirm({
    message: `Установить Homebrew?`,
  });
  if (isInstallBrew) {
    try {
      execSync("which brew", { stdio: "ignore" });
      console.log("✅ Homebrew уже установлен");
    } catch (error) {
      console.log("📦 Установка Homebrew...");
      execSync(
        '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
      );
    }
  }

  // Шаг 0.5: Скачиваем гит
  const isInstallGit = await confirm({
    message: `Установить Git?`,
  });

  if (isInstallGit) {
    try {
      execSync("git --version", { stdio: "ignore" });
      console.log("✅ Git уже установлен");
    } catch (error) {
      console.log("📦 Установка Git...");
      execSync("brew install git");
    }
  }

  // Шаг 1: спрашиваем какую IDE скачать
  const ideAnswers = await checkbox({
    message: "Выберите ide для установки:",
    choices: ides,
  });

  // Шаг 2: Выбор категорий инструментов
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
      }))
    );

  // Шаг 3: Выбор конкретных инструментов из выбранных категорий
  const toolAnswers = await checkbox({
    message: "Выберите инструменты для установки:",
    choices: toolChoices,
  });

  if (toolAnswers.length === 0 && ideAnswers.length === 0) {
    console.log("Инструменты не выбраны. Установка прервана.");
    return;
  }

  const selectedTools = findSelectedTool(toolChoices, toolAnswers);
  const selectedIdes = findSelectedTool(ides, ideAnswers);
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

  // Шаг 4: Запрос подтверждения установки
  const confirmAnswer = await confirm({
    message: `Вы уверены, что хотите установить выбранные инструменты: ${toolsText}${idesText}?`,
  });

  if (confirmAnswer) {
  } else {
    console.log("Не выбрано ни одного инструмента для установки.");
    return;
  }

  // Шаг 5: Установка выбранных инструментов
  console.log("Начинаем установку выбранных инструментов...");

  const toolsToInstall = [...selectedTools, ...selectedIdes];
  console.log(toolsToInstall);

  for (const tool of toolsToInstall) {
    console.log(`\nУстановка ${tool.name}...`);

    // Проверка для npm
    if (categoryAnswer === "frontend") {
      if (!(await checkPermissions("/usr/local/lib/node_modules"))) {
        console.error("Недостаточно прав для установки npm-пакетов!");
      }
    }

    if (tool.value === "npm") {
      installNvm();
    } else {
      try {
        execSync(tool.installCommand);
        console.log(`✅ ${tool.name} установлен успешно`);
      } catch (error) {
        console.error(`❌ Ошибка при установке ${tool.name}:`);
        console.error(error);
      }
    }

    console.log("\n🎉 Установка завершена!");

  }
}

main();
