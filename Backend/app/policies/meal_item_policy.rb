class MealItemPolicy < ApplicationPolicy

  def create?
    record.meal.user_id == user.id
  end

  def destroy?
    record.meal.user_id == user.id
  end


  class Scope < Scope
    def resolve
      scope.joins(:meal).where(meals: { user_id: user.id })
    end
  end

end