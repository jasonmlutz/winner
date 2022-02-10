class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions, id: :uuid do |t|
      t.string :title
      t.uuid :parent_id, foreign_key: true

      t.timestamps
    end
  end
end
