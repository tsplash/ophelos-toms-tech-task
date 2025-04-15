build:
	docker-compose up -d --build app
	docker-compose run app npm run prisma:migrate -- --name init
	docker-compose run app npm run prisma:generate
	docker-compose run app npm run seed

ssh-app:
	docker-compose exec app bash

start:
	docker-compose up  -d --remove-orphans

stop:
	docker-compose stop

.PHONY: test

test:
	docker-compose exec app npm test

delete:
	docker-compose down --volumes