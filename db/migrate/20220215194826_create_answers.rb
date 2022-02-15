class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.uuid :response_id, null: false, foreign_key: true
      t.uuid :response_option_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
