class AuthController < ApplicationController
  skip_before_action :authenticate_user, only: [:signup, :signin]

  def signup
    user = User.new(user_params)

    if user.save
      token = JsonWebToken.encode(user_id: user.id)

      render json: {
        message: 'User created successfully',
        token: token,
        user: {
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        }
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
        user: {
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        }
      }, status: :ok
    else
      render json: {
        message: 'Invalid email or password'
      }, status: :unauthorized
    end
  end


  private

  def user_params
    params.permit(
      :username,
      :first_name,
      :last_name,
      :age,
      :weight,
      :height,
      :gender,
      :email,
      :phone,
      :password
    )
  end
end