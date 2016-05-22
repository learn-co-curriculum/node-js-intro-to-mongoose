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

## Compare & Contrast: Bookshelf & ActiveRecord

Now many of you are very familiar with the ActiveRecord tool for defining data that is used in Rails. As such, you're probably already seeing some similarities between Bookshelf / Knex and ActiveRecord. If so, you're right!

How would we do the above in ActiveRecord? Well, something like this:

```
class User < ActiveRecord::Base
end

user = User.find_by(id: 1)
```

Another similarity is that through its depednency on Knex Bookshelf, like ActiveRecord, includes the concept of a database migration for handling database changes and versioning. So just as you might do someting like this in ActiveRecord to support the User table model:

```
$ bin/rails generate model User id:integer name:string
```

in order to generate the migration:

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

And then running your migration by doing: `rails db:migrate`. 



