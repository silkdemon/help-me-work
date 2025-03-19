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
      execSync(
        '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
      );
    }
  }

  // Шаг 1: Выбор категорий инструментов
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
  const toolChoices = toolCategories
    .filter((cat) => cat.value === categoryAnswer)
    .flatMap((cat) =>
      cat.tools.map((tool) => ({
        name: tool.name,
        value: tool.value,
        installCommand: tool.installCommand,
      }))
    );

  // Шаг 2: Выбор конкретных инструментов из выбранных категорий
  const toolAnswers = await checkbox({
    message: "Выберите инструменты для установки:",
    choices: toolChoices,
  });

  if (toolAnswers.length === 0) {
    console.log("Инструменты не выбраны. Установка прервана.");
    return;
  }

  const selectedTools: Tool[] = toolChoices.filter((tool) =>
    toolAnswers.includes(tool.value)
  );

  const selectedToolNames = selectedTools.map((tool) => tool.name);

  // Шаг 3: Запрос подтверждения установки
  const confirmAnswer = await confirm({
    message: `Вы уверены, что хотите установить выбранные инструменты: \n  - ${selectedToolNames.join(
      "\n  - "
    )}?`,
  });

  if (confirmAnswer) {
  } else {
    console.log("Не выбрано ни одного инструмента для установки.");
    return;
  }

  // Шаг 4: Установка выбранных инструментов
  console.log("Начинаем установку выбранных инструментов...");

  for (const tool of selectedTools) {
    console.log(`\nУстановка ${tool.name}...`);

    if (categoryAnswer === "frontend") {
      if (!(await checkPermissions("/usr/local/lib/node_modules"))) {
        console.error("Недостаточно прав для установки npm-пакетов!");
        // Предложите решение из п.3 или п.4
        await handlePermissionError(tool);
        // installNvm();
      }
    }

    try {
      execSync(tool.installCommand, {
        shell: "/bin/bash",
        stdio: "inherit",
        env: { ...process.env, SHELL: "/bin/bash" },
      });
      console.log(`✅ ${tool.name} установлен успешно`);
    } catch (error) {
      console.error(`❌ Ошибка при установке ${tool.name}:`);
      console.error(error);
    }
  }

  console.log("\n🎉 Установка завершена!");
}

main();
