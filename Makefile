clean:
	echo "clean"

install: clean
	docker run -i --rm --name install-tigermom-koa -v `pwd`:/usr/src/app -w /usr/src/app node:5 npm install

run: install
	docker-compose down
	docker-compose up
