class Workout < ApplicationRecord
  belongs_to :user

  enum exercise: {
    running: 0,
    cycling: 1,
    walking: 2,
    yoga: 3,
    weight_training: 4,
    outdoor_games: 5,
    skipping: 6,
    swimming: 7
  }

  validates :exercise, presence: true
  validates :duration, presence: true, numericality: { greater_than: 0 }

  before_create :set_calories_and_date

  private

  def set_calories_and_date
    self.calories_burned = WorkoutCalorieCalculator.new(
      exercise: exercise,
      duration: duration,
      weight: user.weight
    ).call

    self.date = Date.today
  end
end