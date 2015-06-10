# AuthBoss

## Description

Multiple Application JWT Authentication management that incorporates users, roles, and applications.

## Parts

This application consists of a NodeJS backend and an AngularJS frontend. The frontend is located within the public folder.

## Backend

### Routes

Route configuration is located in the `config/routes.js` file.

### Controllers

Controllers contain route functions such as `get()`, `update()`, and `delete()` that are ran when route requests are receieved.

### Models

Models organize data and how it will be saved in the database as well as apply methods to objects like the `saveNew()` method on the `User` object.

## Frontend

*More coming soon*

## TODO
* Roles dropdown in `user.html` page
* `applyRole()` method for User model that adds userId to Role
* App Name Middleware to handle app specific requests
* Route Docs (apiDoc)
* $log decorator
* Angular Plugin
* Getting Started guide for Angular plugin
* React Plugin
* Getting Started guide for React plugin
