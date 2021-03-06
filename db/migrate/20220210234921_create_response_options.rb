class CreateResponseOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :response_options, id: :uuid do |t|
      t.string :title, null: false
      t.uuid :parent_id, foreign_key: true, null: false
      t.integer :position, null: false

      t.timestamps
    end
  end
end
