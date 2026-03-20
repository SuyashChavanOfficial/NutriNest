class GoalsController < ApplicationController

  def create
    unless current_user.profile_complete?
      return render json: {
        error: "Complete your profile first to set the goal",
        missing_fields: current_user.missing_profile_fields,
        profile_completion: current_user.profile_completion_percentage
      }, status: :unprocessable_entity
    end

    goal = current_user.goal.new(goal_params)  # Corrected from current_user.goal.new to current_user.goals.new

    goal.goal_calorie = GoalCalorieCalculator.calculate(current_user, goal.goal_type)

    if goal.save
      render json: goal, status: :created
    else
      render json: { errors: goal.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    unless current_user.profile_complete?
      return render json: {
        error: "Complete your profile first to set the goal",
        missing_fields: current_user.missing_profile_fields,
        profile_completion: current_user.profile_completion_percentage
      }, status: :unprocessable_entity
    end

    goal = current_user.goal.last  # Corrected to get the last goal

    if goal
      render json: goal
    else
      render json: { error: "No goal found. Please set your goal first." }, status: :not_found
    end
  end

  private

  def goal_params
    params.permit(:goal_type)
  end
end