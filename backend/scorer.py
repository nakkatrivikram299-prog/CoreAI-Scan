def calculate_health_score(info):

    score = 100

    score -= min(
        info["missing_values"] * 0.05,
        30
    )

    score -= min(
        info["duplicate_rows"] * 2,
        20
    )

    score -= min(
        sum(
            info["outliers"].values()
        ) * 0.2,
        20
    )

    return round(
        max(score, 0),
        2
    )


def calculate_readiness_score(info):

    completeness = (
        info["completeness"]
    )

    outlier_penalty = min(
        sum(
            info["outliers"].values()
        ) * 0.2,
        20
    )

    duplicate_penalty = min(
        info["duplicate_rows"] * 2,
        15
    )

    score = (
        completeness
        - outlier_penalty
        - duplicate_penalty
    )

    return round(
        max(score, 0),
        2
    )


def calculate_ranking(score):

    if score >= 95:
        return "Top 5%"

    elif score >= 90:
        return "Top 10%"

    elif score >= 80:
        return "Top 25%"

    elif score >= 70:
        return "Top 40%"

    return "Top 50%"