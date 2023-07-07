package edu.fiu.ffqr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.Math;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import edu.fiu.ffqr.models.FoodCategoryRecommendation;
import edu.fiu.ffqr.models.FoodItem;

import edu.fiu.ffqr.models.FoodItemInput;
import edu.fiu.ffqr.models.DQIS;
import edu.fiu.ffqr.models.FoodRecommendationRange;
import edu.fiu.ffqr.models.FoodType;
import edu.fiu.ffqr.models.Result;
import edu.fiu.ffqr.models.SysFoodRecommendation;
import edu.fiu.ffqr.service.FFQFoodEntryService;
import edu.fiu.ffqr.service.ResultsService;
import edu.fiu.ffqr.service.SysFoodItemRecommendationService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/DQIS")
public class DQISController {

    // Autowired will change depending on needs
    @Autowired
    private SysFoodItemRecommendationService SysFoodItemRecomService;

    @Autowired
    private ResultsService resultsService;

    @Autowired
    private FFQFoodEntryService foodItemService;

    // Empty Constructor
    public DQISController() {
    }

    @GetMapping("/calculate/{questionnaireID}")
    public DQIS calculateDQIS(@PathVariable("questionnaireID") String questionnaireID) throws Exception {
        String foodItemName = "";
        String nutrientListID = "";
        String portionSize = "";
        String category = "";
        int infantAge = 0;
        String gender = "";
        String ageRange = "";
        Double calculatedPoints = 0.0;
        boolean breastMilkFlag = false; // set breastMilkFlag, if baby is taking breast milk, true
        boolean proteinFlag = false;
        Double formulaMilkAmount = 0.0;
        boolean labelAdequate = false; // if the baby is having both breastmilk & formula but amount is still equal to
                                       // recommmendation, then true
        Map<String, Double> categoryValueMap = new HashMap<String, Double>();
        boolean exclusivelyBreastfed = true; // boolean for if baby is exclusively breastfed. if another fooditem is
                                             // passed as having a value it will turn false

        // get results for given questionnaire
        Result result = resultsService.getResultByQuestionnaireID(questionnaireID);

        infantAge = result.getAgeInMonths();
        gender = result.getGender();
        ArrayList<FoodItemInput> userChoices = result.getUserChoices();

        DQIS dqis = new DQIS();
        dqis.setQuestionnaireId(questionnaireID);
        dqis.setPatientAgeInMonths(infantAge);

        List<SysFoodRecommendation> SysFoodItemRecommendations = SysFoodItemRecomService.getAll();

        // populate the category-value map with the food item categories
        for (SysFoodRecommendation sysFoodItemRecommendation : SysFoodItemRecommendations) {
            categoryValueMap.put(sysFoodItemRecommendation.getCategoryName(), 0.0);
        }

        for (FoodItemInput foodItem : userChoices) {

            foodItemName = foodItem.getName();
            nutrientListID = foodItem.getNutrientListID();
            portionSize = foodItem.getServing();

            // find the food item
            FoodItem f = foodItemService.getEntryWithName(foodItemName);

            // find the food item type category
            for (FoodType foodType : f.getFoodTypes()) {
                if (foodType.getNutrientListID().equalsIgnoreCase(nutrientListID)) {
                    category = foodType.getCategory();
                }
            }

            for (SysFoodRecommendation sysFoodItemRecommendation : SysFoodItemRecommendations) {

                String categoryName = sysFoodItemRecommendation.getCategoryName();

                if (category.equalsIgnoreCase(categoryName)) {
                    double currentPoints = 45.0;

                    if (infantAge > 0 && infantAge < 6) {
                        // Milk
                        if (nutrientListID.equalsIgnoreCase("brea")) {
                            currentPoints += 15;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) + currentPoints);
                        }
                        // Grains
                        if ((nutrientListID.equalsIgnoreCase("cerewhol"))) {
                            currentPoints -= 5;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) + currentPoints);
                        }

                        if ((nutrientListID.equalsIgnoreCase("cererefi"))) {
                            currentPoints -= 5;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) + currentPoints);
                        }
                        // Proteins
                        if (categoryName.equalsIgnoreCase("proteins")) {
                            currentPoints -= 5;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) + currentPoints);

                        }
                        // Vegetables
                        if (categoryName.equalsIgnoreCase("vegetables")) {
                            currentPoints -= 5;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) + currentPoints);
                        }
                        // Fruits
                        if (categoryName.equalsIgnoreCase("Fruits")) {
                            currentPoints -= 5;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) + currentPoints);
                        }
                        // 100% Juices
                        if (categoryName.equalsIgnoreCase("100% Juices")) {
                            currentPoints -= 5;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) + currentPoints);
                        }
                        // Sugary Beverages
                        if (categoryName.equalsIgnoreCase("Sugary Beverages")) {
                            currentPoints -= 5;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) + currentPoints);
                        }
                        // Sweets
                        if (categoryName.equalsIgnoreCase("Sweets")) {
                            currentPoints -= 5;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) + currentPoints);
                        }
                        // Salty snacks
                        if (categoryName.equalsIgnoreCase("Salty Snacks")) {
                            currentPoints -= 5;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) + currentPoints);
                        }

                    }
                    

                    /*
                     * if (infantAge >= 6 && infantAge < 12) {
                     * // Milk
                     * if (breastMilkConsumed > 0 && otherMilkConsumed == 0) {
                     * dietQualityScore += 15;
                     * } else if (breastMilkConsumed > 0) {
                     * dietQualityScore += 5;
                     * 
                     * if (otherMilkConsumed > 0 && otherMilkConsumed <= 28) {
                     * dietQualityScore += 5;
                     * } else if (otherMilkConsumed > 28 && otherMilkConsumed <= 35) {
                     * dietQualityScore += 2.5;
                     * }
                     * }
                     * // Grains
                     * if (wholeGrainConsumed > 0 && wholeGrainConsumed <= 3.5) {
                     * dietQualityScore += 2.5;
                     * } else if (wholeGrainConsumed > 3.5 && wholeGrainConsumed <= 8.0) {
                     * dietQualityScore += 1.25;
                     * }
                     * 
                     * if (refinedGrainConsumed >= 0 && refinedGrainConsumed <= 1.5) {
                     * dietQualityScore += 2.5;
                     * } else if (refinedGrainConsumed > 1.5 && refinedGrainConsumed <= 3.5) {
                     * dietQualityScore += 1.25;
                     * }
                     * // Proteins
                     * if (proteinConsumed > 0 && proteinConsumed <= 6.0) {
                     * dietQualityScore += 5;
                     * } else if (proteinConsumed > 6 && proteinConsumed <= 10) {
                     * dietQualityScore += 2.5;
                     * }
                     * // Vegetables
                     * if (vegetablesConsumed >= 2.0) {
                     * dietQualityScore += 5;
                     * } else if (vegetablesConsumed > 0 && vegetablesConsumed < 2.0) {
                     * dietQualityScore += 2.5;
                     * }
                     * // Fruits
                     * if (fruitsConsumed >= 2.0) {
                     * dietQualityScore += 5;
                     * } else if (fruitsConsumed > 0 && fruitsConsumed < 2.0) {
                     * dietQualityScore += 2.5;
                     * }
                     * // 100% Juices
                     * if (juiceConsumed == 0) {
                     * dietQualityScore += 5;
                     * } else if (juiceConsumed > 0 && juiceConsumed <= 6.0) {
                     * dietQualityScore += 2.5;
                     * }
                     * // Sugary Beverages
                     * if (sugaryBeveragesConsumed == 0) {
                     * dietQualityScore += 5;
                     * } else if (sugaryBeveragesConsumed > 0 && sugaryBeveragesConsumed <= 4.0) {
                     * dietQualityScore += 2.5;
                     * }
                     * // Sweets
                     * if (sweetsConsumed == 0) {
                     * dietQualityScore += 5;
                     * } else if (sweetsConsumed > 0 && sweetsConsumed <= 1.0) {
                     * dietQualityScore += 2.5;
                     * }
                     * // Salty snacks
                     * if (saltySnacksConsumed == 0) {
                     * dietQualityScore += 5;
                     * } else if (saltySnacksConsumed > 0 && saltySnacksConsumed <= 1.0) {
                     * dietQualityScore += 2.5;
                     * }
                     * }
                     * 
                     * if (infantAge >= 12 && infantAge <= 36) {
                     * // Milk
                     * if (breastMilkConsumed > 0 && otherMilkConsumed == 0) {
                     * dietQualityScore += 15;
                     * } else if (breastMilkConsumed > 0) {
                     * dietQualityScore += 5;
                     * 
                     * if (otherMilkConsumed > 0 && otherMilkConsumed <= 18) {
                     * dietQualityScore += 5;
                     * } else if (otherMilkConsumed > 18 && otherMilkConsumed <= 24) {
                     * dietQualityScore += 2.5;
                     * }
                     * }
                     * // Grains
                     * if (wholeGrainConsumed > 0 && wholeGrainConsumed <= 5.5) {
                     * dietQualityScore += 2.5;
                     * } else if (wholeGrainConsumed > 5.5 && wholeGrainConsumed <= 8.0) {
                     * dietQualityScore += 1.25;
                     * }
                     * 
                     * if (refinedGrainConsumed >= 0 && refinedGrainConsumed <= 1.8) {
                     * dietQualityScore += 2.5;
                     * } else if (refinedGrainConsumed > 1.8 && refinedGrainConsumed <= 4.2) {
                     * dietQualityScore += 1.25;
                     * }
                     * // Proteins
                     * if (proteinConsumed > 0 && proteinConsumed <= 3.0) {
                     * dietQualityScore += 5;
                     * } else if (proteinConsumed > 3.0 && proteinConsumed <= 6.0) {
                     * dietQualityScore += 2.5;
                     * }
                     * // Vegetables
                     * if (vegetablesConsumed >= 8.0) {
                     * dietQualityScore += 5;
                     * } else if (vegetablesConsumed > 0 && vegetablesConsumed < 8.0) {
                     * dietQualityScore += 2.5;
                     * }
                     * // Fruits
                     * if (fruitsConsumed >= 8.0) {
                     * dietQualityScore += 5;
                     * } else if (fruitsConsumed > 0 && fruitsConsumed < 8.0) {
                     * dietQualityScore += 2.5;
                     * }
                     * // 100% Juices
                     * if (juiceConsumed >= 0 && juiceConsumed <= 4.0) {
                     * dietQualityScore += 5;
                     * } else if (juiceConsumed > 4.0 && juiceConsumed <= 6.0) {
                     * dietQualityScore += 2.5;
                     * }
                     * // Sugary Beverages
                     * if (sugaryBeveragesConsumed == 0) {
                     * dietQualityScore += 5;
                     * } else if (sugaryBeveragesConsumed > 0 && sugaryBeveragesConsumed <= 4.0) {
                     * dietQualityScore += 2.5;
                     * }
                     * // Sweets
                     * if (sweetsConsumed == 0) {
                     * dietQualityScore += 5;
                     * } else if (sweetsConsumed > 0 && sweetsConsumed <= 1.0) {
                     * dietQualityScore += 2.5;
                     * }
                     * // Salty snacks
                     * if (saltySnacksConsumed == 0) {
                     * dietQualityScore += 5;
                     * } else if (saltySnacksConsumed > 0 && saltySnacksConsumed <= 1.0) {
                     * dietQualityScore += 2.5;
                     * 
                     * }
                     * }
                     * }
                     */

                }

            }
            for (SysFoodRecommendation sysFoodItemRecommendation : SysFoodItemRecommendations) {
                        FoodCategoryRecommendation foodItemRec = new FoodCategoryRecommendation();
                        foodItemRec.setCategoryName(sysFoodItemRecommendation.getCategoryName());
                        foodItemRec.setLabel("");
                        calculatedPoints = categoryValueMap.get(sysFoodItemRecommendation.getCategoryName());
                        foodItemRec.setCalculatedAmount(calculatedPoints);

                        dqis.getFoodCategoryRecList().add(foodItemRec);
                        }            
        }
        return dqis;
    }
}
