class Goal < ApplicationRecord
  belongs_to :user

  enum goal_type: {
    weight_gain: 0,
    fat_loss: 1,
    strength_training: 2
  }
end