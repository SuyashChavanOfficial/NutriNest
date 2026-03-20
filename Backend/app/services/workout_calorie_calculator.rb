class WorkoutCalorieCalculator
  def initialize(exercise:, duration:, weight:)
    @exercise = exercise
    @duration = duration.to_f
    @weight = weight
  end

  def call
    (met_value * @weight * @duration / 60).round
  end

  private

  def met_value
    case @exercise
    when "running" then 9.8
    when "cycling" then 7.5
    when "walking" then 3.5
    when "yoga" then 3.0
    when "weight_training" then 6.0
    when "outdoor_games" then 7.0
    when "skipping" then 9.0
    when "swimming" then 8.0
    else 5.0
    end
  end
end