import {
  CATEGORIES_COMMAND_TEXT,
  OPERATION_COMMAND_TEXT,
  REPORT_COMMAND_TEXT,
} from "./commands.constants"

// Start
export const START_GREETING = "Приветствуем вас"
export const START_FIRST_LINE =
  "Этот бот поможет вам вести учет ваших финансовых средств."
export const START_SECOND_LINE =
  "Что умеет этот бот:\n- Добавлять записи финансовых операций по категориям;\n- Генерировать отчеты за различные периоды в разных форматах."
export const START_THIRD_LINE =
  "Перед использованием рекомендуем ознакомиться с инструкцией пользования сервисом - <a>/help</a>"

// Help
export const HELP_START_LINE =
  "Для того, чтобы использовать бот используйте основные команды:"
export const HELP_SECOND_LINE = `<a>/${OPERATION_COMMAND_TEXT}</a> - записать транзакцию.\nПри выборе команды вы сможете внести совершенную вами транзакцию.`
export const HELP_THIRD_LINE = `<a>/${CATEGORIES_COMMAND_TEXT}</a> - добавить категорию доходов/расходов.\nКоманда служит для создания категории дохода/расхода, к которой вы сможете записать транзакцию.`
export const HELP_FOURTH_LINE = `<a>/${REPORT_COMMAND_TEXT}</a> - вывести отчет.\nКоманда служит для вывода наглядного отчета передвижения ваших денежных средств.`
export const HELP_FINAL_LINE = "Желаем вам приятного пользования!"

export const CATEGORY_INCOME_TEXT = "Категории доходов"
export const CATEGORY_EXPENSES_TEXT = "Категории расходов"

export const INCOME_CATEGORIES_NOT_EXIST = "Категорий дохода не существует"
export const EXPENSES_CATEGORIES_NOT_EXIST = "Категорий расхода не существует"
export const DELETE_INCOME_CATEGORY = "Выберите категорию дохода для удаления"
export const DELETE_EXPENSES_CATEGORY =
  "Выберите категорию расхода для удаления"
export const CATEGORY_NOT_EXIST_DELETED =
  "Категория не существует или была удалена"
