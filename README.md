# Contacts Manager Application

This project is a small contacts manager application built with vue.js(front-end) and node.js + MongoDb(backend).

Front end:

The front end application is located in the "webapp" folder. It has been developed using `router`, `vuex` in `vue.js` and `vuetify` to obtain a material design look. You can find a main page with the list of contacts shown sorted by first name and through the search bar you can filter the contacts matching both first and last name. You can select a contact and the application will show you the details of that contact in a separate view. From there you can modify the contact or delete it. Click on the email of the user and an email form will open. You can send email to the contact from there.

I have used `sendgrid` as a transactional email delivery service. However, since the sendgrid API cannot be published (otherwise the account will be blocked), I will send you the API in private. Please, insert them in contacts-app/server/index.js (line 21, inside the blank quotes). 

To add a new contact you can simply tap the plus icon at the top right of the toolbar and a dialog window will open.

The server must be run first to perform fetching of contacts and all other operations like add, edit and delete.
    
    To run the webapp:
        1. Clone the repository
        2. Run cd webapp
        3. Run npm run serve 

Back end:

The back end application is located in the "server" folder. It has been developed using `node.js` and `mongodb`, as I mentioned. In particular, it has been used a free instance of mongodb from `mlab.com`, for demo purposes. 
I will send you the credentials in order to login in 'mlab' and have a look at the database behavior. 

    To run the server (after you've cloned the repository and, obviously, in another CLI instance): 
        1. Run cd server
        2. Run npm run dev

The application will be available on: localhost:8080/
