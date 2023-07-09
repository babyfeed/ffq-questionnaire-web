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
        boolean wGrainsFlag = true;
        boolean rGrainsFlag = true;
        boolean vegetableFlag = false;
        boolean fruitsFlag = false;
        boolean juicesFlag = false;
        boolean sBeveragesFlag = false;
        boolean sweetsFlag = false;
        boolean snacksFlag = false;
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
            categoryValueMap.put(sysFoodItemRecommendation.getCategoryName(), 5.0);
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
                    double currentPoints = 60;
                    /*
                     * if (foodItem.getServing() == null) {
                     * if (nutrientListID.equalsIgnoreCase("brea")) {
                     * breastMilkFlag = true;
                     * }
                     * if (nutrientListID.equalsIgnoreCase("chee")) {
                     * 
                     * currentPoints = (25.2 * foodItem.getFrequency() / 28.35);
                     * 
                     * if (foodItem.getFrequencyType().equalsIgnoreCase("Week")) {
                     * currentPoints = currentPoints / 7;
                     * }
                     * exclusivelyBreastfed = false;
                     * categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) +
                     * currentPoints);
                     * } else if (nutrientListID.equalsIgnoreCase("yogu")) {
                     * 
                     * currentPoints = (113.4 * foodItem.getFrequency() / 28.35);
                     * 
                     * if (foodItem.getFrequencyType().equalsIgnoreCase("Week")) {
                     * currentPoints = currentPoints / 7;
                     * }
                     * exclusivelyBreastfed = false;
                     * categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) +
                     * currentPoints);
                     * } else if (nutrientListID.equalsIgnoreCase("soyp")) {
                     * 
                     * currentPoints = (28.4 * foodItem.getFrequency() / 28.35);
                     * 
                     * if (foodItem.getFrequencyType().equalsIgnoreCase("Week")) {
                     * currentPoints = currentPoints / 7;
                     * }
                     * exclusivelyBreastfed = false;
                     * categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) +
                     * currentPoints);
                     * } else if (nutrientListID.equalsIgnoreCase("icec")) {
                     * 
                     * currentPoints = (29.5 * foodItem.getFrequency() *
                     * Double.parseDouble(foodItem.getServing().split(" ")[0]) / 28.35); // 1 ice
                     * cream serving = 29.5 grams, defined by PO
                     * 
                     * if (foodItem.getFrequencyType().equalsIgnoreCase("Week")) {
                     * currentPoints = currentPoints / 7;
                     * }
                     * exclusivelyBreastfed = false;
                     * categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) +
                     * currentPoints);
                     * } else if (nutrientListID.equalsIgnoreCase("brea")) {
                     * currentPoints = foodItem.getFrequency() * 3;
                     * if (foodItem.getFrequencyType().equalsIgnoreCase("Week")) {
                     * currentPoints /= 7;
                     * }
                     * formulaMilkAmount = currentPoints; // temporarily save bresatmilk amount here
                     * categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) +
                     * currentPoints);
                     * } else {
                     * currentPoints = foodItem.getFrequency();
                     * if (foodItem.getFrequencyType().equalsIgnoreCase("Week")) {
                     * currentPoints = currentPoints / 7;
                     * }
                     * exclusivelyBreastfed = false;
                     * categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) +
                     * currentPoints);
                     * }
                     * } else {
                     * if (nutrientListID.equalsIgnoreCase("pancrefi")) {
                     * 
                     * currentPoints = (45.8 * foodItem.getFrequency() *
                     * Double.parseDouble(foodItem.getServing().split(" ")[0]) / 28.35); // 1
                     * refined pancake = 45.8 grams, defined by PO
                     * 
                     * if (foodItem.getFrequencyType().equalsIgnoreCase("Week")) {
                     * currentPoints = currentPoints / 7;
                     * }
                     * 
                     * exclusivelyBreastfed = false;
                     * categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) +
                     * currentPoints);
                     * } else if (nutrientListID.equalsIgnoreCase("pancwhol")) {
                     * 
                     * currentPoints = (49.7 * foodItem.getFrequency() *
                     * Double.parseDouble(foodItem.getServing().split(" ")[0]) / 28.35); // 1 whole
                     * pancake = 49.7 grams, defined by PO
                     * 
                     * if (foodItem.getFrequencyType().equalsIgnoreCase("Week")) {
                     * currentPoints = currentPoints / 7;
                     * }
                     * exclusivelyBreastfed = false;
                     * categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) +
                     * currentPoints);
                     * } else if (nutrientListID.equalsIgnoreCase("hone")) {
                     * 
                     * currentPoints = (0.5 * foodItem.getFrequency() *
                     * Double.parseDouble(foodItem.getServing().split(" ")[0])); //
                     * 
                     * if (foodItem.getFrequencyType().equalsIgnoreCase("Week")) {
                     * currentPoints = currentPoints / 7;
                     * }
                     * exclusivelyBreastfed = false;
                     * categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) +
                     * currentPoints);
                     * } else if (nutrientListID.equalsIgnoreCase("cook")) {
                     * 
                     * currentPoints = (10.8 * foodItem.getFrequency() *
                     * Double.parseDouble(foodItem.getServing().split(" ")[0]) / 28.35); //
                     * 
                     * if (foodItem.getFrequencyType().equalsIgnoreCase("Week")) {
                     * currentPoints = currentPoints / 7;
                     * }
                     * exclusivelyBreastfed = false;
                     * categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) +
                     * currentPoints);
                     * } else {
                     * currentPoints = (foodItem.getFrequency() *
                     * Double.parseDouble(foodItem.getServing().split(" ")[0])); //
                     * 
                     * if (foodItem.getFrequencyType().equalsIgnoreCase("Week")) {
                     * currentPoints = currentPoints / 7;
                     * }
                     * exclusivelyBreastfed = false;
                     * categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) +
                     * currentPoints);
                     * }
                     * }
                     * }
                     * }
                     * }
                     */

                    if (infantAge > 0 && infantAge < 6) {
                        // Milk
                        if (nutrientListID.equalsIgnoreCase("brea")) {
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) + 10);
                        }
                        // Grains
                        if (category.equalsIgnoreCase("Whole Grains") && !(wGrainsFlag) ) {
                            wGrainsFlag = false;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) - 5);
                        }
                        if (category.equalsIgnoreCase("Refined Grains")&& !(rGrainsFlag)) {
                            rGrainsFlag = false;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) - 5);
                        }

                        // Proteins
                        if (categoryName.equalsIgnoreCase("Proteins")&& !(proteinFlag)) {
                            currentPoints -= 5;
                            proteinFlag = false;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);

                        }
                        // Vegetables
                        if (categoryName.equalsIgnoreCase("vegetables") && !(vegetableFlag)) {
                            currentPoints -= 5;
                            vegetableFlag = true;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);
                        }
                        // Fruits
                        if (categoryName.equalsIgnoreCase("Fruits")&& !(fruitsFlag)) {
                            currentPoints -= 5;
                            fruitsFlag = true;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);
                        }
                        // 100% Juices
                        if (categoryName.equalsIgnoreCase("100% Juices") && !(juicesFlag)) {
                            currentPoints -= 5;
                            juicesFlag = true;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);
                        }
                        // Sugary Beverages
                        if (categoryName.equalsIgnoreCase("Sugary Beverages") && !(sBeveragesFlag)){
                            currentPoints -= 5;
                            sBeveragesFlag = true;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);
                        }
                        // Sweets
                        if (categoryName.equalsIgnoreCase("Sweets")&& !(sweetsFlag)) {
                            currentPoints -= 5;
                            sweetsFlag = true;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);
                        }
                        // Salty snacks
                        if (categoryName.equalsIgnoreCase("Salty Snacks")  && !(snacksFlag)) {
                            currentPoints -= 5;
                            snacksFlag = true;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);
                        }

                    }

                    if (infantAge >= 6 && infantAge <= 12) {
                        // Milk
                        if (nutrientListID.equalsIgnoreCase("brea")) {
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) + 10);
                        }
                        // Grains
                        if (category.equalsIgnoreCase("Whole Grains") && !(wGrainsFlag) ) {
                            wGrainsFlag = false;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) - 5);
                        }
                        if (category.equalsIgnoreCase("Refined Grains")&& !(rGrainsFlag)) {
                            rGrainsFlag = false;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) - 5);
                        }

                        // Proteins
                        if (categoryName.equalsIgnoreCase("Proteins")&& !(proteinFlag)) {
                            currentPoints -= 5;
                            proteinFlag = false;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);

                        }
                        // Vegetables
                        if (categoryName.equalsIgnoreCase("vegetables") && !(vegetableFlag)) {
                            currentPoints -= 5;
                            vegetableFlag = true;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);
                        }
                        // Fruits
                        if (categoryName.equalsIgnoreCase("Fruits")&& !(fruitsFlag)) {
                            currentPoints -= 5;
                            fruitsFlag = true;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);
                        }
                        // 100% Juices
                        if (categoryName.equalsIgnoreCase("100% Juices") && !(juicesFlag)) {
                            currentPoints -= 5;
                            juicesFlag = true;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);
                        }
                        // Sugary Beverages
                        if (categoryName.equalsIgnoreCase("Sugary Beverages") && !(sBeveragesFlag)){
                            currentPoints -= 5;
                            sBeveragesFlag = true;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);
                        }
                        // Sweets
                        if (categoryName.equalsIgnoreCase("Sweets")&& !(sweetsFlag)) {
                            currentPoints -= 5;
                            sweetsFlag = true;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);
                        }
                        // Salty snacks
                        if (categoryName.equalsIgnoreCase("Salty Snacks")  && !(snacksFlag)) {
                            currentPoints -= 5;
                            snacksFlag = true;
                            categoryValueMap.replace(categoryName, categoryValueMap.get(categoryName) -5);
                        }
                }
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
         * }
         * 
         */
        for (SysFoodRecommendation sysFoodItemRecommendation : SysFoodItemRecommendations) {

            FoodCategoryRecommendation foodItemRec = new FoodCategoryRecommendation();
            foodItemRec.setCategoryName(sysFoodItemRecommendation.getCategoryName());
            foodItemRec.setLabel("");
            calculatedPoints = categoryValueMap.get(sysFoodItemRecommendation.getCategoryName());
            // 2/20/2022 WENJIA update
            // SET breastMilkFlag
            // if the baby is taking breast milk, then the calculated amount should be the
            // standard amount
            // 4/18/2022 wenjia update
            // add new logic: if a baby is having formula more than the maximum of
            // standdard, ex. 6 month baby is having formula > 28.9
            // then the total number of milk = formula + breastmilk + cow milk
            double recommendAmount = setCalculatedAmountForBreastMilk(infantAge);
            formulaMilkAmount = calculatedPoints - formulaMilkAmount;
            if (breastMilkFlag && sysFoodItemRecommendation.getCategoryName().equalsIgnoreCase(
                    "Breastmilk/Formula/Cows Milk/Other milks") && formulaMilkAmount <= recommendAmount) {
                foodItemRec.setCalculatedAmount(recommendAmount);
                labelAdequate = true;
            } else {
                foodItemRec.setCalculatedAmount(calculatedPoints);
            }
            if (infantAge >= 0 && infantAge <= 5) {
                ageRange = "0-5";
            } else if (infantAge >= 6 && infantAge <= 12) {
                ageRange = "6-12";
            } else if (infantAge >= 13 && infantAge <= 24) {
                ageRange = "13-24";
            } else
                throw new Exception("There are no recommendations available for infants of age over 24 months");

            List<FoodRecommendationRange> rangeList = sysFoodItemRecommendation.getRecommendationsByAge().get(ageRange);

            boolean notFound = true;
            double compareValue = Math.floor(foodItemRec.getCalculatedAmount() * 10) / 10.0;
            // compareValue is used to account for the grey areas in the payload. it rounds
            // down the calculated amount to 1 decimal place
            // so all food categories will get a proper label
            for (FoodRecommendationRange range : rangeList) {
                if (compareValue >= range.getFrom() && compareValue <= range.getTo() && notFound) {
                    // if statement checks first to see if exclusively breastfed is true. if so, it
                    // will manually make the label 'adequate'
                    // since babies that are exclusively breastfed are always getting adequate milk
                    // according to the PO
                    if (exclusivelyBreastfed && (sysFoodItemRecommendation.getCategoryName()
                            .equalsIgnoreCase("Breastmilk/Formula/Cows Milk/Other milks")) || labelAdequate) {
                        foodItemRec.setLabel("Adequate");
                    } else {
                        foodItemRec.setLabel(range.getLabel());
                    }
                    foodItemRec.setRangeFrom(range.getFrom());
                    foodItemRec.setRangeTo(range.getTo());
                    notFound = false;
                }
            }
            dqis.getFoodCategoryRecList().add(foodItemRec);
        }
    }
        return dqis;
    }

    public static double setCalculatedAmountForBreastMilk(int babyAgeInMonth) {
        double oneMonthInfantBreastMilkVolume = 21.1;
        double twoMonthInfantBreastMilkVolume = 23.8;
        double threeMonthInfantBreastMilkVolume = 24.9;
        double fourMonthInfantBreastMilkVolume = 25.1;
        double fiveMonthInfantBreastMilkVolume = 25.9;
        double sixMonthInfantBreastMilkVolume = 24.7;
        double sevenMonthInfantBreastMilkVolume = 24.1;
        double eightMonthInfantBreastMilkVolume = 23.5;
        double nineMonthInfantBreastMilkVolume = 22.7;
        double tenMonthInfantBreastMilkVolume = 21.9;
        double elevenMonthInfantBreastMilkVolume = 21.0;
        double twelveMonthInfantBreastMilkVolume = 20.1;
        double thirteenMonthInfantBreastMilkVolume = 19.0;
        double fourteenMonthInfantBreastMilkVolume = 18.0;
        double fifteenMonthInfantBreastMilkVolume = 17.0;
        double sixteenMonthInfantBreastMilkVolume = 15.9;
        double seveteenMonthInfantBreastMilkVolume = 14.8;
        double eighteenMonthInfantBreastMilkVolume = 13.7;
        double nineteenMonthInfantBreastMilkVolume = 12.5;
        double twentyMonthInfantBreastMilkVolume = 11.4;
        double twentyoneMonthInfantBreastMilkVolume = 10.2;
        double twentytwoMonthInfantBreastMilkVolume = 9.0;
        double twentythreeMonthInfantBreastMilkVolume = 7.8;
        double twentyfourMonthInfantBreastMilkVolume = 6.6;
        // static final double ouncesToMilliliter = 29.5735;
        double finalAmount = 0.0;
        switch (babyAgeInMonth) {
            case 1:
                finalAmount = oneMonthInfantBreastMilkVolume;
                break;
            case 2:
                finalAmount = twoMonthInfantBreastMilkVolume;
                break;
            case 3:
                finalAmount = threeMonthInfantBreastMilkVolume;
                break;
            case 4:
                finalAmount = fourMonthInfantBreastMilkVolume;
                break;
            case 5:
                finalAmount = fiveMonthInfantBreastMilkVolume;
                break;
            case 6:
                finalAmount = sixMonthInfantBreastMilkVolume;
                break;
            case 7:
                finalAmount = sevenMonthInfantBreastMilkVolume;
                break;
            case 8:
                finalAmount = eightMonthInfantBreastMilkVolume;
                break;
            case 9:
                finalAmount = nineMonthInfantBreastMilkVolume;
                break;
            case 10:
                finalAmount = tenMonthInfantBreastMilkVolume;
                break;
            case 11:
                finalAmount = elevenMonthInfantBreastMilkVolume;
                break;
            case 12:
                finalAmount = twelveMonthInfantBreastMilkVolume;
                break;
            case 13:
                finalAmount = thirteenMonthInfantBreastMilkVolume;
                break;
            case 14:
                finalAmount = fourteenMonthInfantBreastMilkVolume;
                break;
            case 15:
                finalAmount = fifteenMonthInfantBreastMilkVolume;
                break;
            case 16:
                finalAmount = sixteenMonthInfantBreastMilkVolume;
                break;
            case 17:
                finalAmount = seveteenMonthInfantBreastMilkVolume;
                break;
            case 18:
                finalAmount = eighteenMonthInfantBreastMilkVolume;
                break;
            case 19:
                finalAmount = nineteenMonthInfantBreastMilkVolume;
                break;
            case 20:
                finalAmount = twentyMonthInfantBreastMilkVolume;
                break;
            case 21:
                finalAmount = twentyoneMonthInfantBreastMilkVolume;
                break;
            case 22:
                finalAmount = twentytwoMonthInfantBreastMilkVolume;
                break;
            case 23:
                finalAmount = twentythreeMonthInfantBreastMilkVolume;
                break;
            default:
                finalAmount = twentyfourMonthInfantBreastMilkVolume;
        }
        return finalAmount;
    }
    /*
     * for (SysFoodRecommendation sysFoodItemRecommendation :
     * SysFoodItemRecommendations) {
     * FoodCategoryRecommendation foodItemRec = new FoodCategoryRecommendation();
     * foodItemRec.setCategoryName(sysFoodItemRecommendation.getCategoryName());
     * //foodItemRec.setLabel("");
     * calculatedPoints =
     * categoryValueMap.get(sysFoodItemRecommendation.getCategoryName());
     * foodItemRec.setCalculatedAmount(calculatedPoints);
     * 
     * dqis.getFoodCategoryRecList().add(foodItemRec);
     * }
     * 
     * return dqis;
     * }
     */
}