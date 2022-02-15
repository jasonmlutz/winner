# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# clear the unique value generator

puts "building seed data"
puts ""

Faker::Name.unique.clear
Faker::Movies::Lebowski.unique
User.destroy_all
Survey.destroy_all
puts "reset and clear completed"

# generate 5 users with random names, and default passwords
(1..5).each do
  User.create(
    name:Faker::Name.unique.first_name,
    password: "password",
    password_confirmation: "password",
  )
end
puts "#{User.count} users created"

# create 5 surveys, with a randomly selected author
# the first two have published = true
(1..5).each do |i|
  survey = Survey.create(
    title: Faker::Movies::Lebowski.unique.quote,
    author_id: User.all.sample.id,
    publish: i < 3,
  )
end

# loop over all the surveys
Survey.all.each do |survey|
  # this survey has between 3 and 5 questions
  (1..rand(3..5)).each do |i|
    question = Question.create(
      title: Faker::Movies::HarryPotter.unique.quote,
      position: i,
      parent_id: survey.id
    )
  end
  # clear the record of unique values; 
  # different surveys may have overlap in questions
  Faker::Movies::HarryPotter.unique.clear
end

# loop over all the questions
Question.all.each do |question|
  # this question has between 3 and 5 response options
  (1..rand(3..5)).each do |j|
    ResponseOption.create(
      title: Faker::Movies::StarWars.unique.quote,
      position: j,
      parent_id: question.id,
      grandparent_id: question.parent_id
    )
  end
  # clear the record of unique values; 
  # different questions may have overlap in response options
  Faker::Movies::StarWars.unique.clear
end

puts "#{Survey.count} surveys created"
puts "#{Question.count} questions created"
puts "#{ResponseOption.count} response options created"
puts ""
puts "complete!"

