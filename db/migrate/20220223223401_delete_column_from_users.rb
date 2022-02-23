class DeleteColumnFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :session_token
  end
end
