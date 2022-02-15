class ChangeIdToUuidAnswers < ActiveRecord::Migration[7.0]
  def up
    add_column :answers, :uuid, :uuid, default: "gen_random_uuid()", null: false

    change_table :answers do |t|
      t.remove :id
      t.rename :uuid, :id
    end
    execute "ALTER TABLE answers ADD PRIMARY KEY (id);"
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
