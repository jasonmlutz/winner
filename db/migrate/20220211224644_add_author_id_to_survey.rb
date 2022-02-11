class AddAuthorIdToSurvey < ActiveRecord::Migration[7.0]
  def change
    add_column :surveys, :author_id, :uuid, null: false, foreign_key: true
  end
end
