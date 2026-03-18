class ApplicationController < ActionController::API
  include Pundit::Authorization

  before_action :authenticate_user

  attr_reader :current_user

  # Pundit expects this method
  def pundit_user
    current_user
  end

  private

  def authenticate_user
    header = request.headers['Authorization']

    if header.present?
      token = header.split(' ').last

      begin
        decoded = JsonWebToken.decode(token)

        @current_user = User.find_by(id: decoded[:user_id])

        render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_user

      rescue JWT::DecodeError
        render json: { error: 'Invalid token' }, status: :unauthorized
      rescue JWT::ExpiredSignature
        render json: { error: 'Token expired' }, status: :unauthorized
      end
    else
      render json: { error: 'Token not present' }, status: :unauthorized
    end
  end

  def unauthorized_user
    render json: { error: 'Forbidden' }, status: :forbidden
  end
end