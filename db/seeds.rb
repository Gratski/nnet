# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#Users
User.create(name: 'João', password: 'sabes', email: 'rodrigues.at.work@gmail.com', admin: true, available_punches: 10, active:true)
User.create(name: 'José', password: 'oui', email: 'jbalb@gmail.com', admin: false, available_punches: 10, active: true)
User.create(name: 'Simão', password: 'yey', email: 'simaodacostaneves@gmail.com', admin: false, available_punches: 10, active:false)

#Sectors
Sector.create(name: 'Business & Finance')
Sector.create(name: 'Computers & Technology')
Sector.create(name: 'Construction')
Sector.create(name: 'Education & Teaching')
Sector.create(name: 'Engineering')
Sector.create(name: 'Farming & Fishing')
Sector.create(name: 'Health')
Sector.create(name: 'Hospitality & Tourism')
Sector.create(name: 'Law Enforcement')
Sector.create(name: 'Management')
Sector.create(name: 'Media Communications')
Sector.create(name: 'Military')
Sector.create(name: 'Office Administration')
Sector.create(name: 'Production & Manufacturing')
Sector.create(name: 'Professional & Service')
Sector.create(name: 'Psichology')
Sector.create(name: 'Installation & Repair')
Sector.create(name: 'Sales & Marketing')
Sector.create(name: 'Science')
Sector.create(name: 'Transportation')

#Sector Areas
SectorArea.create(sector_id: 1, name: 'Accounting and Auditing', summary: 'BLA BLA BLA')
SectorArea.create(sector_id: 1, name: 'Account Executive', summary: 'LELELELE')

SectorArea.create(sector_id: 2, name: 'Computer and Information Research Scientist', summary: 'TECH TECH TECH')
SectorArea.create(sector_id: 2, name: 'Computer Network Architect', summary: 'TECH TECH TECH 2')

#User details
Detail.create(user_id: 1, self_description: 'I am a person who is very enthusiastic about computer tech', hair_color: 'Brown', eye_color: 'Brown', height: 1.78, body_type: 'Athletic', body_color: 'Tanned', religion: 'Catholic', sector_area_id: 4)
Detail.create(user_id: 2, self_description: 'Yo yo yo you should text me right now!!!', hair_color: 'Brown', eye_color: 'Brown', height: 1.78, body_type: 'Slim', body_color: 'Tanned', religion: 'Catholic', sector_area_id: 3)





