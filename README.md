# Social Artist

DISCLAIMER: Данное приложения является только примером возможности Web-технологий
и не является вредоносным ПО. Любая ответственность ложится на лицо, использующее данное ПО
не по назначению.

Пример web-приложения для автоматизации рутинных задач в сервисе Artstation.
Приложение использует сущности сервиса Artstation (посты, оценки, комментарии) и манипулирует ими по заданным сценариям.

Приложение описано послойно: домен, приложение, адаптеры, фреймворки

Для запуска небходимо:
- Выделить свободный порт для web-сервера, указав его в файле конфигурации `./config.js`
- Запустить сервис `node index.js`
- Обратиться к Social Artist API через запросы

Реализованные запросы:   
- Системное действие: Вход на сайте сервиса Artstation:   
http://localhost:8082/artstation/login?email={EMAIL}&password={PASSWORD}

- Пользовательский сценарий: лайкнуть и зафолловить автора каждой публикации на странице [Latest](https://www.artstation.com/?sort_by=latest&dimension=3d),
где `count` - колличество публикаций:    
http://localhost:8082/artstation/likeLatestPublicationsAndFollowAuthor?username={USERNAME}&count={COUNT}
