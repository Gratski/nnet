# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160208175436) do

  create_table "cities", force: :cascade do |t|
    t.integer  "country_id"
    t.string   "name"
    t.string   "code"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "conversations", force: :cascade do |t|
    t.integer  "user_1"
    t.integer  "user_2"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.boolean  "deleted_by_user_1", default: false
    t.boolean  "deleted_by_user_2", default: false
  end

  create_table "countries", force: :cascade do |t|
    t.string   "name"
    t.string   "code"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "deleted_conversations", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "conversation_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "details", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "self_description"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "interests", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "conversation_id"
    t.integer  "user_id"
    t.text     "body"
    t.boolean  "seen"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "punches", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "user_punched_id"
  end

  create_table "sector_areas", force: :cascade do |t|
    t.integer  "sector_id"
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "sectors", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "topics", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_cities", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "city_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_sectors", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "sector_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "confirmation_token"
    t.boolean  "active"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "password_digest"
    t.boolean  "admin"
    t.date     "birthdate"
    t.boolean  "premium",            default: false
    t.date     "premium_payment"
    t.date     "premium_valid_date"
  end

end
