class FoodCalorieCalculator
  FOOD_CALORIES = {
    poha: { unit: "gm", calories: 1.8 },
    upma: { unit: "gm", calories: 1.9 },
    idli: { unit: "no", calories: 58 },
    dosa: { unit: "no", calories: 120 },
    masala_dosa: { unit: "no", calories: 250 },
    plain_dosa: { unit: "no", calories: 120 },
    medu_vada: { unit: "no", calories: 150 },
    paratha_aloo: { unit: "no", calories: 220 },
    paratha_gobi: { unit: "no", calories: 210 },
    paratha_paneer: { unit: "no", calories: 265 },
    thepla: { unit: "no", calories: 130 },
    bread_butter: { unit: "no", calories: 180 },
    bread_jam: { unit: "no", calories: 150 },
    omelette: { unit: "no", calories: 150 },
    boiled_eggs: { unit: "no", calories: 78 },
    maggi: { unit: "gm", calories: 4.7 },

    roti: { unit: "no", calories: 80 },
    chapati: { unit: "no", calories: 80 },
    phulka: { unit: "no", calories: 70 },

    dal_tadka: { unit: "gm", calories: 1.2 },
    dal_fry: { unit: "gm", calories: 1.4 },
    plain_dal: { unit: "gm", calories: 1.1 },

    jeera_rice: { unit: "gm", calories: 1.3 },
    steamed_rice: { unit: "gm", calories: 1.3 },
    curd_rice: { unit: "gm", calories: 1.5 },
    sambar_rice: { unit: "gm", calories: 1.4 },

    rajma_chawal: { unit: "gm", calories: 1.6 },
    chole_chawal: { unit: "gm", calories: 1.7 },
    kadhi_chawal: { unit: "gm", calories: 1.5 },

    vegetable_pulao: { unit: "gm", calories: 1.6 },
    veg_biryani: { unit: "gm", calories: 1.7 },
    chicken_biryani: { unit: "gm", calories: 2.0 },

    egg_curry: { unit: "gm", calories: 1.8 },
    chicken_curry: { unit: "gm", calories: 2.1 },
    fish_curry: { unit: "gm", calories: 1.9 },

    paneer_butter_masala: { unit: "gm", calories: 2.6 },
    palak_paneer: { unit: "gm", calories: 2.1 },

    mix_veg_sabzi: { unit: "gm", calories: 1.1 },
    aloo_sabzi: { unit: "gm", calories: 1.4 },
    bhindi_fry: { unit: "gm", calories: 1.5 },
    baingan_bharta: { unit: "gm", calories: 1.2 },
    cabbage_sabzi: { unit: "gm", calories: 1.0 },
    lauki_sabzi: { unit: "gm", calories: 0.9 },

    misal_pav: { unit: "gm", calories: 2.2 },
    usal_pav: { unit: "gm", calories: 2.0 },
    vada_pav: { unit: "no", calories: 290 },
    sabudana_khichdi: { unit: "gm", calories: 1.9 },
    pithla_bhakri: { unit: "gm", calories: 1.8 },
    zunka_bhakri: { unit: "gm", calories: 1.7 },
    thalipeeth: { unit: "no", calories: 200 },
    kanda_poha: { unit: "gm", calories: 1.8 },

    chole_bhature: { unit: "gm", calories: 2.6 },
    aloo_puri: { unit: "gm", calories: 2.4 },
    paneer_paratha: { unit: "no", calories: 280 },
    dal_makhani: { unit: "gm", calories: 2.3 },
    butter_chicken: { unit: "gm", calories: 2.7 },
    shahi_paneer: { unit: "gm", calories: 2.6 },

    rasam: { unit: "gm", calories: 0.6 },
    lemon_rice: { unit: "gm", calories: 1.6 },
    tamarind_rice: { unit: "gm", calories: 1.7 },
    appam: { unit: "no", calories: 120 },
    puttu: { unit: "gm", calories: 1.8 },

    pani_puri: { unit: "no", calories: 30 },
    bhel_puri: { unit: "gm", calories: 1.7 },
    sev_puri: { unit: "no", calories: 60 },
    dahi_puri: { unit: "no", calories: 70 },
    pav_bhaji: { unit: "gm", calories: 2.0 },
    samosa: { unit: "no", calories: 260 },
    kachori: { unit: "no", calories: 240 },
    dabeli: { unit: "no", calories: 300 },
    frankie_roll: { unit: "no", calories: 250 },
    veg_sandwich: { unit: "no", calories: 200 },
    grilled_sandwich: { unit: "no", calories: 250 },

    pakoda: { unit: "gm", calories: 2.4 },
    aloo_bonda: { unit: "no", calories: 180 },
    murukku: { unit: "gm", calories: 5.2 },
    namkeen_mixture: { unit: "gm", calories: 5.0 },
    roasted_peanuts: { unit: "gm", calories: 5.7 },

    chai: { unit: "ml", calories: 0.4 },
    filter_coffee: { unit: "ml", calories: 0.3 },
    lassi: { unit: "ml", calories: 0.6 },
    buttermilk: { unit: "ml", calories: 0.25 },
    sugarcane_juice: { unit: "ml", calories: 0.45 },

    gulab_jamun: { unit: "no", calories: 150 },
    rasgulla: { unit: "no", calories: 125 },
    jalebi: { unit: "gm", calories: 4.0 },
    kaju_katli: { unit: "gm", calories: 5.0 },
    besan_ladoo: { unit: "no", calories: 200 },
    rava_kesari: { unit: "gm", calories: 2.3 }
  }

  def self.normalize(food_name)
    food_name.downcase.gsub(/[()]/, "").strip.gsub(" ", "_")
  end

  def self.calculate(food_name, quantity)
    key = normalize(food_name).to_sym
    food = FOOD_CALORIES[key]

    return 0 unless food

    (food[:calories] * quantity).round
  end
end