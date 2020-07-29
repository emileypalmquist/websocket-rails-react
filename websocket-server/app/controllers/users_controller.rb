class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def index
    users = User.others(current_user.id) 
    render json: users
  end

  def create
    user = User.create(user_params)
    if user.valid?
      token = encode_token({ id: user.id })
      render json: { user: user, jwt: token }, status: :created
    else
      render json: { error: 'Failed to create user. Please try again.' }, status: :not_acceptable
    end
  end

  private
 
  def user_params
    params.require(:user).permit(:name, :username, :password, :password_confirmation, :email)
  end
end
