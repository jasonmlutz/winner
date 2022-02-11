class AddGrandparentIdToResponseOptions < ActiveRecord::Migration[7.0]
  def change
    add_column :response_options, :grandparent_id, :uuid, null: false, foreign_key: true
  end
end
