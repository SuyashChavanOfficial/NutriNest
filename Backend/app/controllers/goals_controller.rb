class GoalsController < ApplicationController

  def create
    return render json: { error: "Goal already exists" }, status: :unprocessable_entity if current_user.goal.present?

    goal = current_user.build_goal(goal_params)

    authorize goal

    if goal.save
      render json: goal, status: :created
    else
      render json: { errors: goal.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def show
    goal = current_user.goal
    return render json: { message: "Goal not set yet" }, status: :not_found unless goal

    authorize goal

    render json: goal
  end


  private

  def goal_params
    params.permit(:goal_type)
  end
end
