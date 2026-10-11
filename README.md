# CALL

React + TypeScript + Vite приложение на Gravity UI.

## Скрипты

- `npm run dev` — dev-сервер Vite
- `npm run build` — типы (`tsc -b`) + продакшн-сборка
- `npm run preview` — предпросмотр сборки
- `npm run lint` — ESLint
- `npm run lint:fix` — ESLint с автофиксом
- `npm run format` — форматирование Prettier
- `npm run format:check` — проверка форматирования

## Линт и форматирование

Линтинг настроен на ESLint (flat config, `eslint.config.js`):
`@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`,
`eslint-plugin-react-refresh`. Конфликтующие с Prettier правила отключены
через `eslint-config-prettier`.

Форматирование — Prettier, настройки в `.prettierrc.json`, игнор в
`.prettierignore`.

## Стек

- React 19, React Router
- Gravity UI (`@gravity-ui/uikit`, `@gravity-ui/navigation`,
  `@gravity-ui/date-components`, `@gravity-ui/icons`)
- Vite + TypeScript
