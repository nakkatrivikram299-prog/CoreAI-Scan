def recommend_algorithm(info):

    numerical = (
        info["numerical_columns"]
    )

    categorical = (
        info["categorical_columns"]
    )

    completeness = (
        info["completeness"]
    )

    recommendations = []

    if numerical > categorical:

        recommendations.extend([

            "Linear Regression",

            "Random Forest Regressor",

            "XGBoost Regressor"

        ])

    else:

        recommendations.extend([

            "Logistic Regression",

            "Random Forest Classifier",

            "XGBoost Classifier"

        ])

    if completeness < 80:

        recommendations.append(
            "Data Cleaning Required Before Training"
        )

    return recommendations