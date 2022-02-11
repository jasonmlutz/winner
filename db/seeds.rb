# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

users = User.create([
  {name: "jason", password: "password"},
  {name: "jarmo", password: "password"},
  {name: "jasonmlutz", password: "password"},
  {name: "jmlutz", password: "password"},
  {name: "jlutz", password: "password"}
])