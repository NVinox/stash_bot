interface IStartMessages {
  getHTML(userName?: string): string
}

export class StartMessage implements IStartMessages {
  getHTML(userName?: string): string {
    const title = userName
      ? `Приветствуем вас, <b>${userName}</b>!`
      : "Приветствуем вас!"
    const firstLine =
      "Этот бот поможет вам вести учет ваших финансовых средств."
    const secondLine =
      "Что умеет этот бот:\n- Добавлять записи финансовых операций по категориям;\n- Генерировать отчеты за различные периоды в разных форматах"
    const thirdLine =
      "Перед использованием рекомендуем ознакомиться с инструкцией пользования сервисом - <a>/help</a>"

    return `${title}\n\n${firstLine}\n\n${secondLine}\n\n${thirdLine}`
  }
}
