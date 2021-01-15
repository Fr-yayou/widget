# C-COD-280-PAR-2-1-dashboard-estelle.thou


# Dev Dash

 

## Presentation
"Dev Dash" is a multi purpose website which allows a user to select and set some widgets among which:
- timer -> Yanis
- clock -> Estelle
- spotify artist -> JB
- some jokes poilantes -> JB
- latest reddit posts from r/ProgrammerHumor -> JB
- weather -> Yanis
- posts from DevTo (can query) -> Estelle
- Google auth -> Yanis
  
## Stack 
<br/>Frontend: React, using about all libraries Yanis could find
<br/>Backend: ExpressJS
<br/>DB: MongoDB Atlas
<br/>Cloud platform: Heroku using 
<br/>API : Moults

 

## Installation for local usage
 

##### Backend
npm install, run with 
```
npm run dev
```
 

and access from:
http://localhost:5001/

 

### For the Frontend



#### Install library
At the root of the frontend project, read package.json and install all libraries 

 

```bash
npm install 
```

 

#### Compiles

 

```bash
npm start
```

 

Then open a browser with the url :
```bash 
http://127.0.0.1:3000/
```

 

## Installation with cloud platform 
We use  ```HEROKU``` (https://devcenter.heroku.com/articles/git)
```bash
cd Alumni
git init
git add .
git commit -m "My first commit"
heroku create
```
You can use the git remote command to confirm that a remote named heroku has been set for your app:

 

```bash
git remote -v 
```

 

You deploy your code running 
```bash
git push heroku main
```
Do the same for deploying frontend project 

 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

 

## License
[MIT](https://choosealicense.com/licenses/mit/)
