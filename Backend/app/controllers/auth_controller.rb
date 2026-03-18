class AuthController < ApplicationController
  skip_before_action :authenticate_user, only: [:signup, :signin]

  def signup
    user = User.new(user_params)

    if user.save
      render json: {
        message: 'User created successfully',
        user: user
      }, status: :created
    else
      render json: {
        errors: user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end


  def signin
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)

      render json: {
        message: 'Login successful',
        token: token,
        user: user
      }, status: :ok
    else
      render json: {
        message: 'Invalid email or password'
      }, status: :unauthorized
    end
  end


  private

  def user_params
    params.permit(:name, :age, :email, :password, :height, :gender)
  end
end