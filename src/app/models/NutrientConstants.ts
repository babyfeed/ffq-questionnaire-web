export class NutrientConstants {
  static readonly NUTRIENT_NAMES: string[] = [
    //Changed nutrients in accordance to the new database given by the PO
    //Will show weird display if you still have the old database but
    //it is no indication of any errors
    /*
    'Maltitol (g)',
    'Beta-Carotene (provitamin A carotenoid) (mcg)',
    'Beta-Cryptoxanthin (provitamin A carotenoid) (mcg)',
    'Vitamin E (International Units) (IU)',
    'Lutein + Zeaxanthin (mcg)',
    '% Calories from Fat',
    'Glucose (g)',
    'Acesulfame Potassium (mg)',
    'Cholesterol (mg)',
    'Total Polyunsaturated Fatty Acids (PUFA) (g)',
    'Total Vitamin A Activity (Retinol Activity Equivalents) (mcg)',
    'Xylitol (g)',
    'Magnesium (mg)',
    '% Calories from Protein',
    'Omega-3 Fatty Acids (g)',
    'Total Monounsaturated Fatty Acids (MUFA) (g)',
    'Insoluble Dietary Fiber (g)',
    'Dietary Folate Equivalents (mcg)',
    'Zinc (mg)',
    'Calcium (mg)',
    'Pantothenic Acid (mg)',
    'Formononetin (mg)',
    'Sodium (mg)',
    'Cystine (g)',
    'Nitrogen (g)',
    'Genistein (mg)',
    'Total Folate (mcg)',
    'Valine (g)',
    'Refined Grains (ounce equivalents)',
    'Leucine (g)',
    'Caffeine (mg)',
    'Alpha-Carotene (provitamin A carotenoid) (mcg)',
    'Niacin Equivalents (mg)',
    'Aspartame (mg)',
    'Mannitol (g)',
    'Lactose (g)',
    'Vitamin K (phylloquinone) (mcg)',
    'Synthetic Alpha-Tocopherol (all rac-alpha-tocopherol or dl-alpha-tocopherol) (mg)',
    'Betaine (mg)',
    'Animal Protein (g)',
    'Total Sugars (g)',
    'Inositol (g)',
    'Glycine (g)',
    'Total Fat (g)',
    'Total Carbohydrate (g)',
    'Soluble Dietary Fiber (g)',
    'Natural Folate (food folate) (mcg)',
    'Phosphorus (mg)',
    'Maltose (g)',
    '3-Methylhistidine (mg)',
    'Arginine (g)',
    'Sorbitol (g)',
    'Added Sugars (by Available Carbohydrate) (g)',
    'Lactitol (g)',
    'Niacin (vitamin B3) (mg)',
    'Saccharin (mg)',
    'Beta-Tocopherol (mg)',
    'Manganese (mg)',
    'Lysine (g)',
    'Natural Alpha-Tocopherol (RRR-alpha-tocopherol or d-alpha-tocopherol) (mg)',
    '% Calories from Carbs',
    'PUFA 18:3 n-3 (alpha-linolenic acid [ALA]) (g)',
    'Copper (mg)',
    'Sucrose Polyester (g)',
    'Vitamin C (ascorbic acid) (mg)',
    'Tryptophan (g)',
    'Ash (g)',
    'Total Protein (g)',
    'Vitamin E (Total Alpha-Tocopherol) (mg)',
    'Oxalic Acid (mg)',
    'Pinitol (g)',
    'Alcohol (g)',
    'Sucralose (mg)',
    'Riboflavin (vitamin B2) (mg)',
    'Erythritol (g)',
    'Histidine (g)',
    'Synthetic Folate (folic acid) (mcg)',
    'Energy (kj)',
    'Isomalt (g)',
    'Beta-Carotene Equivalents (derived from provitamin A carotenoids) (mcg)',
    'Total Vitamin A Activity (International Units) (IU)',
    'Lycopene (mcg)',
    'Fructose (g)',
    'Delta-Tocopherol (mg)',
    'Total Trans-Fatty Acids (TRANS) (g)',
    'Serine (g)',
    'Added Sugars (by Total Sugars) (g)',
    'Thiamin (vitamin B1) (mg)',
    'Choline (mg)',
    'Coumestrol (mg)',
    'Biochanin A (mg)',
    'Alanine (g)',
    'Galactose (g)',
    'Whole Grains (ounce equivalents)',
    'Proline (g)',
    'Methionine (g)',
    'Water (g)',
    'Daidzein (mg)',
    'Retinol (mcg)',
    'Sucrose (g)',
    'Gamma-Tocopherol (mg)',
    'Potassium (mg)',
    'Total Alpha-Tocopherol Equivalents (mg)',
    'Total Dietary Fiber (g)',
    'Total Vitamin A Activity (Retinol Equivalents) (mcg)',
    'Threonine (g)',
    'Total Grains (ounce equivalents)',
    'Vitamin B-6 (pyridoxine, pyridoxyl, & pyridoxamine) (mg)',
    'Glycitein (mg)',
    'Aspartic Acid (g)',
    'Glutamic Acid (g)',
    'Vitamin D (calciferol) (mcg)',
    'Vitamin D2 (ergocalciferol) (mcg)',
    'Solid Fats (g)',
    'Starch (g)',
    'Available Carbohydrate (g)',
    'Pectins (g)',
    'Vitamin B-12 (cobalamin) (mcg)',
    'Selenium (mcg)',
    'Total Saturated Fatty Acids (SFA) (g)',
    'Vitamin D3 (cholecalciferol) (mcg)',
    'Isoleucine (g)',
    'Total Grams',
    'Energy (kcal)',
    'Phytic Acid (mg)',
    'Tyrosine (g)',
    'Iron (mg)',
    'Phenylalanine (g)',
    */

//*******************************************************************************/
//*######  keeping all nutrient names to use on upcoming research portal  ######*/
//*******************************************************************************/
    // "Energy (kcal)",
    // "Total Protein (g)",
    // "Total Carbohydrate (g)",
    // "Total Fat (g)",
    // "% Calories from Protein",
    // "% Calories from Carbs",
    // "% Calories from Fat",
    // "Animal Protein (g)",
    // "Vegetable Protein (g)",
    // "Total Dietary Fiber (g)",
    // "Total Sugars (g)",
    // "Added Sugars (by Total Sugars) (g)",
    // "Fructose (g)",
    // "Lactose (g)",
    // "Starch (g)",
    // "Total Grains (ounce equivalents)",
    // "Whole Grains (ounce equivalents)",
    // "Refined Grains (ounce equivalents)",
    // "Total Saturated Fatty Acids (SFA) (g)",
    // "Total Monounsaturated Fatty Acids (MUFA) (g)",
    // "Total Polyunsaturated Fatty Acids (PUFA) (g)",
    // "Omega-3 Fatty Acids (g)",
    // "Water (g)",
    // "Caffeine (mg)",
    // "Thiamin (vitamin B1) (mg)",
    // "Riboflavin (vitamin B2) (mg)",
    // "Niacin (vitamin B3) (mg)",
    // "Pantothenic Acid (mg)",
    // "Vitamin B-6 (pyridoxine, pyridoxyl, & pyridoxamine) (mg)",
    // "Total Folate (mcg)",
    // "Vitamin B-12 (cobalamin) (mcg)",
    // "Vitamin C (ascorbic acid) (mg)",
    // "Total Vitamin A Activity (Retinol Activity Equivalents) (mcg)",
    // "Vitamin D (calciferol) (mcg)",
    // "Vitamin E (Total Alpha-Tocopherol) (mg)",
    // "Vitamin K (phylloquinone) (mcg)",
    // "Calcium (mg)",
    // "Copper (mg)",
    // "Iron (mg)",
    // "Manganese (mg)",
    // "Magnesium (mg)",
    // "Phosphorus (mg)",
    // "Potassium (mg)",
    // "Selenium (mcg)",
    // "Sodium (mg)",
    // "Zinc (mg)",

    "Energy (kcal)",
    "Protein (g)",
    "CHO (g)",
    "Fat (g)",
    "Vitamin A (Retinol) (mcg)",
    "Vitamin D (mcg)",
    "Vitamin E (mg)",
    "Vitamin K (mcg)",
    "Vitamin C (mg)",
    "Vitamin B1 (Thiamin) (mg)",
    "Vitamin B2 (Riboflavin) (mg)",
    "Vitamin B3 (Niacin) (mg)",
    "Vitamin B5 (Pantothenic acid) (mg)",
    "Vitamin B6 (mg)",
    "Vitamin B9 (Folate) (mcg)",
    "Vitamin B12 (mcg)",
    "Calcium (mg)",
    "Copper (mg)",
    "Iron (mg)",
    "Magnesium (mg)",
    "Phosphorus (mg)",
    "Potassium (mg)",
    "Zinc (mg)",
  ];
}
