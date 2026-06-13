import pandas as pd
import numpy as np


def analyze_dataset(df):

    rows, cols = df.shape

    missing_values = int(
        df.isnull().sum().sum()
    )

    duplicate_rows = int(
        df.duplicated().sum()
    )

    numerical_columns = len(
        df.select_dtypes(
            include=np.number
        ).columns
    )

    categorical_columns = len(
        df.select_dtypes(
            include=["object"]
        ).columns
    )

    total_cells = rows * cols

    completeness = round(
        (
            (total_cells - missing_values)
            / total_cells
        ) * 100,
        2
    )

    outliers = {}

    numeric_cols = df.select_dtypes(
        include=np.number
    ).columns

    for col in numeric_cols:

        q1 = df[col].quantile(0.25)
        q3 = df[col].quantile(0.75)

        iqr = q3 - q1

        lower = q1 - (
            1.5 * iqr
        )

        upper = q3 + (
            1.5 * iqr
        )

        count = len(
            df[
                (df[col] < lower)
                |
                (df[col] > upper)
            ]
        )

        outliers[col] = int(count)

    column_types = {}

    for col in df.columns:

        if str(df[col].dtype).startswith(
            ("int", "float")
        ):
            column_types[col] = (
                "Numerical"
            )

        else:
            column_types[col] = (
                "Categorical"
            )

    dataset_type = (
        "Regression Dataset"
        if numerical_columns >
        categorical_columns
        else "Classification Dataset"
    )

    suggestions = []

    if missing_values > 0:

        suggestions.append(
            "Handle missing values"
        )

    if duplicate_rows > 0:

        suggestions.append(
            "Remove duplicate rows"
        )

    if sum(
        outliers.values()
    ) > 0:

        suggestions.append(
            "Investigate outliers"
        )

    cleaning_recommendations = []

    if missing_values > 0:

        cleaning_recommendations.append(
            "Fill missing values using mean, median or mode"
        )

    if duplicate_rows > 0:

        cleaning_recommendations.append(
            "Remove duplicate rows before training"
        )

    if sum(
        outliers.values()
    ) > 0:

        cleaning_recommendations.append(
            "Cap or remove extreme outliers"
        )

    correlations = []

    if len(
        numeric_cols
    ) > 1:

        corr_matrix = (
            df[numeric_cols]
            .corr()
            .abs()
            .fillna(0)
        )

        for i in range(
            len(numeric_cols)
        ):

            for j in range(
                i + 1,
                len(numeric_cols)
            ):

                correlations.append({

                    "feature_1":
                    numeric_cols[i],

                    "feature_2":
                    numeric_cols[j],

                    "value":
                    round(
                        float(
                            corr_matrix.iloc[i, j]
                        ),
                        2
                    )
                })

        correlations = sorted(
            correlations,
            key=lambda x:
            x["value"],
            reverse=True
        )[:5]

    if completeness >= 95:

        dataset_grade = "A"

        risk_level = "LOW"

        ai_verdict = (
            "Ready For Machine Learning"
        )

    elif completeness >= 85:

        dataset_grade = "B"

        risk_level = "MEDIUM"

        ai_verdict = (
            "Minor Cleaning Recommended"
        )

    elif completeness >= 70:

        dataset_grade = "C"

        risk_level = "MEDIUM"

        ai_verdict = (
            "Moderate Cleaning Required"
        )

    else:

        dataset_grade = "D"

        risk_level = "HIGH"

        ai_verdict = (
            "Dataset Needs Cleaning"
        )

    summary = f"""
Dataset contains {rows} rows and {cols} columns.

Health indicators show {missing_values} missing values and {duplicate_rows} duplicate rows.

Dataset type identified as {dataset_type}.

Overall dataset quality is suitable for machine learning after applying recommended cleaning steps.
"""

    return {

        "rows":
        rows,

        "columns":
        cols,

        "missing_values":
        missing_values,

        "duplicate_rows":
        duplicate_rows,

        "numerical_columns":
        numerical_columns,

        "categorical_columns":
        categorical_columns,

        "completeness":
        completeness,

        "outliers":
        outliers,

        "column_types":
        column_types,

        "dataset_type":
        dataset_type,

        "suggestions":
        suggestions,

        "cleaning_recommendations":
        cleaning_recommendations,

        "correlations":
        correlations,

        "dataset_grade":
        dataset_grade,

        "risk_level":
        risk_level,

        "ai_verdict":
        ai_verdict,

        "summary":
        summary
    }