class CreateResponses < ActiveRecord::Migration[7.0]
  def change
    create_table :responses, id: :uuid do |t|
      t.uuid :respondent_id, null: false, foreign_key: true
      t.timestamps
    end
  end
end
