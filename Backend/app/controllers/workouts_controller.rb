class WorkoutsController < ApplicationController


  def create
    workout = current_user.workouts.new(workout_params)

    authorize workout

    if workout.save
      render json: workout, status: :created
      
    else
      render json: {errors: workout.errors.full_messages}, status: :unprocessable_entity
    end

  end


  def index
    workouts = policy_scope(Workout)
    render json: workouts
  end


   private

  def workout_params
    params.permit(:exercise, :duration, :calories_burned, :date)
  end


end
