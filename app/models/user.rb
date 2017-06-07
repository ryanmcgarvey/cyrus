class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
    :registerable,
    :recoverable,
    :rememberable,
    :trackable,
    :validatable,
    :omniauthable, omniauth_providers: [:google_oauth2]

  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.find_by(
      email: data['email']
    )

    user ||=
      User.new(email: data['email'],
                  password: Devise.friendly_token[0,20])

    user.pickup_name = data.name
    user.first_name  = data.first_name
    user.last_name   = data.last_name
    user.avatar_url  = data.image

    user.save!
    user
  end

  has_many :orders

  def full_name
    "#{first_name} #{last_name}"
  end

  def data
    {
      pickup_name: pickup_name,
      first_name:  first_name,
      last_name:   last_name,
      avatar_url:  avatar_url,
      email:       email
    }
  end
end
