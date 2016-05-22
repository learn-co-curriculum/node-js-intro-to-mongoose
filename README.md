Building a Blog with Bookshelf.Js
=================================

## Overview

In this lab, we will build the backend for a blog using the ORM libraries Knex (which we've used once already) and Bookshelf.Js.

## Introduction

Every heard of a blog? Of course you have! We all use blogs every day; they're one of the most common symbols of the disruptive power of web technology. But do you know how to build one? That's what we'll be doing in this lab. We'll build a blog back end, that can handle users, posts, and post commenting. As we move through this unit, we will expand and build on the work we do here.

## Quick Setup
 
The first step here, as always, is to install the necessary modules as specified in the package.json tests. Go ahead and do that now. You'll notice that for the knex library we are going to be using a specific version (v0.10.0), so make sure that you install this version specifically.

## What We'll Use to Build: Knex & Bookshelf.Js
 
In this lab, we'll be building things out with one tool that you are already familiar with -- knex -- and a new one called Bookshelf.Js that builds on top of knex. Now as you'll remember, knex is a tool for interacting with and querying databases. It allows us to do things like:

```
knex('users').select('*').where({id: 1});
```

That way we don't have to write out the query ourselves or worry about the particular syntax that a specific database may require. Bookshelf.Js builds on top of knex, allowing us to reach an even higher level of abstraction when dealing with the units of data that comprise our application. What does this mean more concretely? It means that we can define a model like so:

```
const User = bookshelf.Model.extend({
  tableName: 'users'
});
```

And, once we've done that, later on when we want to query our database about a user, we can just do the following:

```
User.forge({id: 1}).fetch().then((usr) => {
  console.log(usr);
})
```

In other words, Bookshelf provides us with a more expressive syntax for interacting with the data in our application. In addition, as we'll discover in this lab, it makes it MUCH easier to define and work with the relationships *between* our data in the database.
 
## Bookshelf / Knex v. ActiveRecord

Now many of you are very familiar with the ActiveRecord tool for defining data that is used in Rails. As such, you're probably already seeing some similarities between Bookshelf / Knex and ActiveRecord. If so, you're right!

How would we do the above in ActiveRecord? Well, something like this:

```
class User < ActiveRecord::Base
end

user = User.find_by(id: 1)
```



Another similarity is that through its depednency on Knex Bookshelf, like ActiveRecord, includes the concept of a database migration for handling database changes and versioning. So just as you might do something like this in ActiveRecord to support the User table model:

```
$ bin/rails generate model User id:integer name:string
```
  
Thereby generating the following migration:

```
class CreateUser < ActiveRecord:Migrations[5.0]
   def change
    create table :users do |t|
      t.integer :id
      t.string :name
    end
   end
end
```

Ultimately, running your migration by doing: `rails db:migrate`.

When using Bookshelf & Knex you'll do something quite similar. First you'd run the following:

```
$ knex migrate:make User
```

This would then create a migration file in a directory specified in the config file `knexfile.js` (more about that in a bit) that would look like this:

```
exports.up = function(knex, Promise) {

};

exports.down = function(knex, Promise) {

};
```

At this point, you would then fill in the appropriate knex function calls to create your table using the [knex schema functions](http://knexjs.org/#Schema). So something like this:

```
exports.up = function(knex, Promise) {
  knex.schema.createTable('users').then((tbl) => {
    tbl.increments();
    tbl.string('name');
  }
};

exports.down = function(knex, Promise) {
  knex.schema.destroyTable('users');
};
```

Then once we'd filled out your schema we would then run `knex migrate:latest` to run our migrations, or `knex migrate:rollback` to roll back the latest set of migrations. The `up` and `down` functions here specify, respectively, the change to the database, and the way to rollback that change.


## So How Can We Compare Them?

Well, as you can see Bookshelf and ActiveRecord seek to achieve the same high level of abstraction, allowing us to think about and manipulate our data in the database without having to worry about the detailed query language that our database may be using.
Both Bookshelf and ActiveRecord belong to a type of software pattern called an "Object Relational Mapper" or ORM. You can read more about them [here](http://en.wikipedia.org/wiki/Object-relational_mapping) and [here](https://stackoverflow.com/questions/1279613/what-is-an-orm-and-where-can-i-learn-more-about-it).

But what are the differences between Bookshelf.Js and ActiveRecord? Well, essentially the the biggest difference is that Bookshelf.Js is going to require you to write out much more of the query logic yourself using the knex schema builder functions and syntax.

Which is better? Well, ActiveRecord handles so much behind the scenes for you so beautifully that it's hard to not admire the slickness of its machinery! Perhaps, though, it's satisfying to be involved at a slighly lower level with the code that is manipulating your datain the database as you are when using Bookshelf / Knex.

But for the moment let's not judge. Let's just notice how different it feels to achieve something a system of model to represent your application data in Bookshelf comparedto Active Record.





