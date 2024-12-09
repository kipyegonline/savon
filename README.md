# Welcome toSavon

This is a sleek open source photo sharing and repository for photography enthusiast around Kenya. It is the next big thing embedded with AI.

The frontend can be accessed at [Savon frontend](https://savon-one.vercel.app/) and the REST API available at [Savon](https://savon.lakeviewagc.net/api)

## Getting started

Clone the project from Github

```sh
git clone https://github.com/kipyegonline/savon

```

Install the project dependencies

```
npm install

```

## Development

Checkout to the development branch and Run the dev server:

```shellscript
npm run dev
```

## Deployment

You can can build your app for production then deploy its build to a static server:

```sh
npm run build
```

## Or

Deploy to hosting services such as vercel, heroku or netlify uising git and github sing CI.DC and github.

## Branches

1. `Main` branch is the production branch
2. `Staging` is the development and testing branch
3. `Feature` branches can be created and pull requests made to the staging branch

### Issues

Report bug and issues to [issues section](https://github.com/kipyegonline/savon)

# Architecture

The frontented part of the application is built using _remix js_, react metaframework and the backend is a minimal laravel REST API found here [backend](https://savon.lakeviewagc.net/api). Typescript is used for the development of react components and type safety

### data fetching

Data is done using react query and axios

### Styling

Styling is done using Tailwind css and vanilla CSS. The app also uses [Mantine Ui](https://mantine.dev) responsive design system and hooks heavily for app development

#### UI library

Mantine UI, react UI library,us to develop the UI

## Authentication

The app relies on laravel sanctum to authenticate and authorize users, Other authentication providers will be added in due course. feel free to open a PR to add an auth provider

### Note on photos

The project stores the image metadata (title and date of addition) in the server but uses only on image for purposes of deadline and project requirement, you can edit the image title and the info will be saved . However an image upload system can be created.

### Testing

Testing and typeching can be carried out by running

` npm run lint` and `npm run typecheck` to check Typescript.

### Error logging

the app uses sentry to track and monitor app health performance. Google analytics to monitor app traffic.

### REST API

the app is design based on REST principles, endpoints can be added to [ [backend](https://savon.lakeviewagc.net/api) using http to fetch resources such as `users`, `albums` and `photos`

## How it works

Sign up for an account, add albums then attacvh photos to your albums, then share your pictures to the world
