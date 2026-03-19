class FoodCalorieCalculator

  FOOD_CALORIES = {
   eggs: { unit: "no", calories: 78 },
    milk: { unit: "litre", calories: 640 },
    sprouts: { unit: "gram", calories: 0.3 },
    banana: { unit: "no", calories: 105 },
    oats: { unit: "gram", calories: 3.9 }
  
  }

  def self.calculate(food_name, quantity)

    food = FOOD_CALORIES[food_name.to_sym]

    return 0 unless food

    (food[:calories] * quantity).round

  end

end