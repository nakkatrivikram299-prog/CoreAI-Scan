from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import io
import math

from analyzer import analyze_dataset
from recommender import recommend_algorithm
from scorer import (
    calculate_health_score,
    calculate_readiness_score,
    calculate_ranking
)

app = FastAPI()

app.add_middleware(
     CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def clean_json(obj):

    if isinstance(obj, dict):
        return {
            k: clean_json(v)
            for k, v in obj.items()
        }

    if isinstance(obj, list):
        return [
            clean_json(x)
            for x in obj
        ]

    if isinstance(obj, float):

        if math.isnan(obj):
            return 0

        if math.isinf(obj):
            return 0

    return obj


@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...)
):

    contents = await file.read()

    df = pd.read_csv(
        io.BytesIO(contents)
    )

    analysis = analyze_dataset(df)

    health_score = calculate_health_score(
        analysis
    )

    readiness_score = calculate_readiness_score(
        analysis
    )

    ranking = calculate_ranking(
        health_score
    )

    recommendation = recommend_algorithm(
        analysis
    )

    result = {

        "dataset_info":
        analysis,

        "health_score":
        health_score,

        "readiness_score":
        readiness_score,

        "ranking":
        ranking,

        "recommended_algorithms":
        recommendation,

        "report": {

            "summary":
            analysis.get(
                "summary",
                ""
            ),

            "health_score":
            health_score,

            "readiness_score":
            readiness_score,

            "ranking":
            ranking,

            "algorithms":
            recommendation
        }
    }

    return clean_json(result)
