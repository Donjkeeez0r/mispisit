# SalesDrive

Система геймификации отдела продаж для Bitrix24. Лабораторные работы по дисциплине МиСПИСИТ.

Стек: Node.js 22, NestJS 10, TypeScript, шаблонизатор Handlebars (hbs).

## Образ

https://hub.docker.com/r/donjkeeez0r/mispisit-lab1

Тег 0.0.2 содержит сборки для linux/amd64 и linux/arm64.

## Запуск

```bash
docker pull donjkeeez0r/mispisit-lab1:0.0.2
docker run --rm -p 8080:8080 donjkeeez0r/mispisit-lab1:0.0.2
```

## Страницы

| Адрес | Что на странице |
|---|---|
| http://localhost:8080/ | Главная, переход к действиям |
| http://localhost:8080/leaderboard | Рейтинг отдела (просмотр) |
| http://localhost:8080/employees/1 | Карточка сотрудника: уровень, опыт, история начислений |
| http://localhost:8080/events/new | Форма начисления опыта за событие из CRM (изменение данных) |
| http://localhost:8080/events/rejected | Отклонённые события: кто, что и почему не принято (отказ) |

Данные хранятся в оперативной памяти контейнера и сбрасываются к демо-данным при перезапуске.