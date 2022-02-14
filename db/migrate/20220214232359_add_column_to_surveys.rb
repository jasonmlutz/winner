class AddColumnToSurveys < ActiveRecord::Migration[7.0]
  def change
    add_column :surveys, :publish, :boolean, default: false
  end
end
