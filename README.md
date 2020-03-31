# universal-translator

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
│   │   ├── index.html
│   │   └── ... 
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

The server is configured in `src/server/app.js` </br>
If necessary, the routes and their controllers will be separated into different files.

The public files are in the `src/public/` folder.

Reusable functions, algorithms, and helpers are located in the `src/utils` folder.

*.env file is gitignored. 