<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" width="300px" />
</h1>

#### This project is the final challenge called FastFeet, which is evaluated as the final work of the [Rocketseat](https://rocketseat.com.br/)'s Bootcamp
 
<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## :rocket: Technologies

### :gear: BACK-END
-   [Node.js][nodejs]
-   [Express](https://expressjs.com/)
-   [nodemon](https://nodemon.io/)
-   [Sucrase](https://github.com/alangpierce/sucrase)
-   [Docker](https://www.docker.com/docker-community)
-   [Sequelize](http://docs.sequelizejs.com/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Redis](https://redis.io/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [JWT](https://jwt.io/)
-   [Multer](https://github.com/expressjs/multer)
-   [Bcrypt](https://www.npmjs.com/package/bcrypt)
-   [Yup](https://www.npmjs.com/package/yup)
-   [Bee Queue](https://www.npmjs.com/package/bcrypt)
-   [Nodemailer](https://nodemailer.com/about/)
-   [VS Code][vs] with [ESLint][vslint], [EditorConfig][vseditorconfig] and [Prettier][prettier]

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js][nodejs] + [Yarn][yarn] installed on your computer.

From your command line:

### Install API
```bash
# Clone this repository
$ git clone https://github.com/byronkamal/fastfeet-api.git

# Go into the repository
$ cd fastfeet-api

# Install dependencies
$ yarn install

# Created Postgres Docker container
$ docker run --name database -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=fastfeet -p 5432:5432 -d postgres

# Created Mongo Docker container
$ docker run --name mongo -p 27017:27017 -d -t mongo

# Created Redis Docker container
$ docker run --name redisDesafioFastFeet -p 6379:6379 -d -t redis:alpine

# Run Migrates
$ yarn sequelize db:migrate

# Run Seeds
$ yarn sequelize db:seed:all

# Run Queue
$ yarn queue

# Run the API
$ yarn start
```

---
Made with ♥ by Byron Kamal :wave: [Get in touch!](https://www.linkedin.com/in/byron-kamal/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vs]: https://code.visualstudio.com/
[vseditorconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
