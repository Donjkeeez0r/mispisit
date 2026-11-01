# SalesDrive

Система геймификации отдела продаж для Bitrix24. Лабораторные работы по дисциплине МиСПИСИТ.

Стек: Node.js 22, NestJS 10, TypeScript, Handlebars (hbs), PostgreSQL 16, TypeORM.

## Запуск

```text
Репозиторий: https://github.com/Donjkeeez0r/mispisit
Ветка: lab3
Pull Request: https://github.com/Donjkeeez0r/mispisit/pull/3
Образ: donjkeeez0r/mispisit-lab1:0.0.3
Страница образа: https://hub.docker.com/r/donjkeeez0r/mispisit-lab1

git clone -b lab3 https://github.com/Donjkeeez0r/mispisit
cd mispisit
docker compose up -d
```

После запуска сайт открывается по адресу http://localhost:8080

## Страницы

| Адрес | Что на странице |
|---|---|
| http://localhost:8080/ | Главная, версия, переход к действиям |
| http://localhost:8080/leaderboard | Рейтинг отдела (после первого запуска пустой) |
| http://localhost:8080/events/new | Форма начисления опыта за событие из CRM |
| http://localhost:8080/events/rejected | Отклонённые события: кто, что и почему не принято |

Данные хранятся в PostgreSQL (сервис `db`, том `dbdata`). После `docker compose down` и `docker compose up -d` записи сохраняются.