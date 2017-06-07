class AddProfileInfoToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :pickup_name, :string
    add_column :users, :first_name,  :string
    add_column :users, :last_name,   :string
    add_column :users, :avatar_url,  :string
  end
end
