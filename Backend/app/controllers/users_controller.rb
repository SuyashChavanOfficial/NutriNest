class UsersController < ApplicationController

  def update
    if current_user.update(user_params)
      render json: {
        message: "Profile updated successfully",
        profile_completion: current_user.profile_completion_percentage,
        missing_fields: current_user.missing_profile_fields,
        user: current_user
      }
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(
      :first_name,
      :last_name,
      :age,
      :height,
      :weight,
      :gender
    )
  end

end