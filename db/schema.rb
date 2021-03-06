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

ActiveRecord::Schema.define(version: 20151104033632) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cars", force: :cascade do |t|
    t.string  "make",  null: false
    t.string  "model", null: false
    t.integer "year",  null: false
  end

  add_index "cars", ["make", "model", "year"], name: "index_cars_on_make_and_model_and_year", unique: true, using: :btree

  create_table "classifieds", force: :cascade do |t|
    t.string   "title",      null: false
    t.text     "body",       null: false
    t.string   "status",     null: false
    t.integer  "price",      null: false
    t.integer  "odometer",   null: false
    t.integer  "car_id",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "author_id",  null: false
    t.string   "address"
    t.float    "lat"
    t.float    "lng"
    t.string   "source"
  end

  add_index "classifieds", ["car_id"], name: "index_classifieds_on_car_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.string  "img_path",      null: false
    t.integer "classified_id", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
