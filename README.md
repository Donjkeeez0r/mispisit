# SalesDrive

Система геймификации отдела продаж для Bitrix24. Лабораторные работы по дисциплине МиСПИСИТ.

Стек: Node.js 22, NestJS 10, TypeScript, Handlebars (hbs), Bootstrap 5.3, PostgreSQL 16, TypeORM.

## Запуск

```text
Репозиторий: https://github.com/Donjkeeez0r/mispisit
Ветка: lab4
Pull Request: https://github.com/Donjkeeez0r/mispisit/pull/4
Образ: donjkeeez0r/mispisit-lab1:0.0.4

git clone -b lab4 https://github.com/Donjkeeez0r/mispisit
cd mispisit
docker compose up -d
```

После запуска сайт открывается по адресу http://localhost:8080

## Страницы

| Адрес | Что на странице |
|---|---|
| http://localhost:8080/ | Главная: версия, сводка, переход к функциям |
| http://localhost:8080/leaderboard | Рейтинг отдела (после первого запуска пустой) |
| http://localhost:8080/events/new | Форма начисления опыта за событие из CRM |
| http://localhost:8080/events/rejected | Отклонённые события: кто, что и почему не принято |

Данные хранятся в PostgreSQL (сервис `db`, том `dbdata`).