class AddNotNullToQuestionFields < ActiveRecord::Migration[7.0]
  def change
    change_column_null(:questions, :title, false)
    change_column_null(:questions, :parent_id, false)
  end
end
