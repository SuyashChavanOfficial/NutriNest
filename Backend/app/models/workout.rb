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
  
end
