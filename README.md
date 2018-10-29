# PC Builder Web App

###### Name: Niall Mulcahy

###### Student ID : 20077039

Website can be viewed [here](https://pc-builder-web-app.herokuapp.com/).

General Overview
-----------------

This is a simple web app, that allows a user to configure PC buids by simply adding components from a preconfigured list of parts. It is worth noting that the parts list can be updated as new hardware is released.

The app allows for the creation of a user, whereby they enter an email and a password. The password is authenticated by generating a salt, and from that, creating a hash of the password[1] by passing the password and the salt through a sha512 hash function. As with everything in mongo, the user is given an ID by default, this comes into play later with the build collection.

In the build collection, the aforementioned userID is also stored, this is to show taht a build belongs to a particualr user. This field can be left blank, at which point the build will default to anonymous, thus allowing a user to take advantage of the service without signing up. Each particular component also has its own paramater, not only for name, but the ID as well. When creating a build, it is highly recommended that any and all component fields are left blank, these will be updated later.

For the parts collection, I have already created a decent amount for a user to choose from, containing the majority of "go to" parts for most gaming orientated builds. The way mongo works, if a field is left blank, the field will simply not be added along with the part. This feature was extremely helpful when creating parts as it allowed me to pick and chooses each characteristic of each component as was seen fit.

Persistence
-----------
In terms of persistence, all of the aforementioned collections are being stored noSQL Mongo database, all of which are hosted on MLab. [2]

Routes
-------


###### POST
```app.post('/builds', builds.addBuild);``` Allows a user to create a build.

```app.post('/parts', parts.addPart);``` Allows a user to create a part.

```app.post('/user', user.addUser);``` Allows a user to create a new user


###### GET
```app.get('/builds', builds.findAll);``` Method that returns all the builds.

```app.get('/parts', parts.findAll);``` Method that returns all the parts.

```app.get('/user', user.findAll);``` Method that reurns all of the users.

```app.get('/builds/findByCost/:cost', builds.findByCost);```Method that allows a user to search all builds by cost.

```app.get('/builds/findByCPU/:cpu', builds.findByCPU);``` Method that allows a user to search all builds by CPU.

```app.get('/builds/findByGPU/:gpu', builds.findByGPU);```Method that allows a user to search all builds by GPU.

```app.get('/builds/findByRAM/:ram', builds.findByRAM);```Method that allows a user to search all builds by RAM.

```app.get('/builds/findByStorage/:storage', builds.findByStorage);```Method that allows a user to search all builds by Storage.

```app.get('/builds/findByOs/:os', builds.findByOs);```Method that allows a user to search all builds by Operating System.

```app.get('/builds/votes', builds.findTotalUpvotes);``` Method that finds the total number of upvotes across all builds.

```app.get('/builds/:id', builds.findOne);``` Method that returns one build by ID.

```app.get('/parts/:id', parts.findOne);```Method that returns one part by ID.

```app.get('/user/:id', user.findOne);```Method that returns one user by ID.

```app.get('/user/userBuild/:userId', builds.findByUser);```Method that returns all builds submitted by a particular user.

```app.get('/parts/findByType/:type', parts.findByType);```Method that searches all parts by a certain type.

```app.get('/parts/fuzzySearch/:title', parts.fuzzySearch);```Fuzzy search for all components, i.e. searching "amd", will return any and all components whose names contain "AMD".


###### PUT
```app.put('/builds/:id/vote', builds.incrementUpvotes);```Method that allows users to upvote builds.

```app.put('/builds/:buildId/partsCPU/:partId', builds.updateCPU);``` Method that allows a user to update the cpu of a build. The parts list is searched via an ID and once found, the part name and id in the build collection is updated.

```app.put('/builds/:buildId/partsGPU/:partId', builds.updateGPU);``` Method that allows a user to update the gpu of a build. The parts list is searched via an ID and once found, the part name and id in the build collection is updated.

```app.put('/builds/:buildId/partsRAM/:partId', builds.updateRAM);``` Method that allows a user to update the ram of a build. The parts list is searched via an ID and once found, the part name and id in the build collection is updated.

```app.put('/builds/:buildId/partsStorage/:partId', builds.updateStorage);``` Method that allows a user to update the storgae of a build. The parts list is searched via an ID and once found, the part name and id in the build collection is updated.

```app.put('/builds/:buildId/partsOS/:partId', builds.updateOS);``` Method that allows a user to update the operating system of a build. The parts list is searched via an ID and once found, the part name and id in the build collection is updated.

```app.put('/builds/:id/cost', builds.updateCost);``` Allows the user to update the cost of a build.

```app.put('/builds/:id/title', builds.updateTitle);``` Allows the user to update the titel of a build.

```app.put('/user/:userId/:newEmail', user.updateEmail);``` Allows the user to update a users email.


###### DELETE
```app.delete('/builds/:id', builds.deleteBuild);``` Allows the user to delte a build.

```app.delete('/parts/:id', parts.deletePart);``` Allows the user to delte a part.

```app.delete('/user/:id', user.deleteUser);``` Allows the user to delte a user.

GitHub
------
Full project can be found [here](https://github.com/niallmul97/PC-Web-App).

References
-----------
1. Authentication was done following [this](https://medium.freecodecamp.org/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e) tutorial from [FreeCodeCamp.org](https://medium.freecodecamp.org/).

2. The database used for this project are from [mongo](https://www.mongodb.com/), and a hosted on [mLabs.](https://mlab.com/)

3. Server deployed usering [Heroku](https://dashboard.heroku.com/auth/heroku/callback?code=0b8d15dd-49d9-4ad1-a860-5d600a8e5a88), and can be found [here](https://pc-builder-web-app.herokuapp.com/).

4. For RESTful, mongo, mlabs, and heroku setup, I followed along the [labs of David Drohan](https://ddrohan.github.io/wit-wad-2-2018/index.html).