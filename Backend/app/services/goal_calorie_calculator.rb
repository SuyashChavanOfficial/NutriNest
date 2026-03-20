class GoalCalorieCalculator
  def self.calculate(user, goal_type)
    weight = user.weight.to_f
    height = user.height.to_f
    age = user.age.to_i
    gender = user.gender

    if gender == "male"
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    end

    maintenance_calories = bmr * 1.2

    case goal_type
    when "fat_loss"
      maintenance_calories - 500
    when "weight_gain"
      maintenance_calories + 500
    when "strength_training"
      maintenance_calories + 250
    else
      maintenance_calories
    end.round
  end
end