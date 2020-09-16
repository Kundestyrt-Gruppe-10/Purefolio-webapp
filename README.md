# Purefolio frontend

## Installation
1. Install: 
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/)

2. Clone the repo: 
    ```bash
    git clone https://github.com/Kundestyrt-Gruppe-10/Purefolio-webapp.git
    ```
    
3. Go into the repo
    ```bash
    cd Purefolio-webapp/
    ```

4. Install dependencies
    ```bash
    npm i
    ```

## Run the project locally

- Developing locally is done with `webpack-dev-server` and is run on port 3000.
- Hot reload and history API fallback are enabled by default. 

Command:
```
$ npm start
```

## Build the project

Command: 
```
$ npm run build
```

## Analyzing/Measuring


### Measure build performance

If the build process seems to be slower than it should you can run the following command to analyze where bottlenecks might occur.

```
$ npm run build:measure
```

### Analyzing bundle size

Performance budget has been enabled for the application. If you get warnings about bundle size when building you have exceeded the build size set by the budget. Consider use of code splitting or analyze your bundle with the following command

```
$ make analyze
```
