class User < ApplicationRecord
  # self referential relationship through messages
  has_many :received, foreign_key: :receiver_id, class_name: "Message", dependent: :destroy
  has_many :senders, through: :received, source: :sender
  has_many :sent, foreign_key: :sender_id, class_name: "Message", dependent: :destroy
  has_many :recipients, through: :sent, source: :receiver

  

  #hash and salt password with bcrypt, store in user database column password_digest
  #password confirmation matches
  #password and password_confirmation presence required
  has_secure_password
  validates :password, confirmation: true
  validates :password, :password_confirmation, presence: true, on: :create

  validates :name, presence: true
  validates :email, presence: true
  #email has valid syntax using regex
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  # method to get all the user's messages and order them by the time they were created
  def messages
    Message.where("sender_id = ? OR receiver_id = ?", self.id, self.id).order(created_at: :asc)
  end

end
