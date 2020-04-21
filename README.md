# universal-translator

# Proyecto abandonado. 

Esto está incompleto. 

# Lottie's project structure.

```
project/
├── src/
│   ├── public/
│   │   ├── css/
│   │   │   └── ...
│   │   │
│   │   ├── js/
│   │   │   └── ...
│   │   │
│   │   ├── resources/
│   │   │   └── ...
│   │   │
│   │   └── views/
│   │       ├── partials/
│   │       │   └── ...
│   │       └── ...
│   │ 
│   ├── routes/
│   │   └── routes.js
│   │
│   ├── server/
│   │   └── app.js
│   │
│   ├── utils/ 
│   │   └── ...
│   │
│   └── index.js
│    
├── .env*
├── package.json
├── .gitignore
├── LICENSE
└── README.md
```

The main file that starts the server is `src/index.js`.

The server is configured in `src/server/app.js`.

The routes are in `src/routes/routes.js` </br>
If necessary, the routes and their controllers will be separated into different files.

The public files are in the `src/public/` folder. </br>
In the `src/public/views/` folder are the .ejs files (same as html). Some reusable html snippets are found in the `src/public/views/partials/` folder.</br>
The backend and frontend will probably be separated in future updates.

Reusable functions, algorithms, and helpers are located in the `src/utils` folder.

*.env file is gitignored.<br>
The environment variables are detailed below.



