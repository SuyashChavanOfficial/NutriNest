class MealPolicy < ApplicationPolicy

  def create?
    user.present?
  end

  def index?
    user.present?
  end

  def update?
    record.user_id == user.id
  end

  def destroy?
    record.user_id == user.id
  end

  class Scope < Scope
    def resolve
      scope.where(user_id: user.id)
    end
  end

end