class AddColumnToResponses < ActiveRecord::Migration[7.0]
  def change
    add_column :responses, :survey_id, :uuid, null: false, foreign_key: true
  end
end
