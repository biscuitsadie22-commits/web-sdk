/**
 * Selected event fields copied from genuine test_only_stake_book_export rounds.
 * Generated from the Twin Impact math snapshot using seed 20261105, trial 0.
 * Only preview-consumed fields are retained; these are NOT complete books.
 * CANDIDATE-ONLY: never use for RTP claims, RGS uploads, or wallet wagering.
 */
export const testOnlyTwinImpactBooks = {
  "base": {
    "id": 1,
    "payoutMultiplier": 10,
    "events": [
      {
        "index": 0,
        "type": "roundStart",
        "mode": "base",
        "cost": 1,
        "goldenGridStart": null
      },
      {
        "index": 1,
        "type": "reelStop",
        "board": [
          [
            "L3",
            "L2",
            "H3",
            "L4",
            "H4"
          ],
          [
            "L5",
            "L5",
            "L5",
            "L3",
            "L1"
          ],
          [
            "H3",
            "S",
            "L4",
            "L5",
            "L2"
          ]
        ],
        "strikeWildFactors": []
      },
      {
        "index": 2,
        "type": "roundSettle",
        "payoutMultiplier": 10
      }
    ]
  },
  "ante_3": {
    "id": 1,
    "payoutMultiplier": 0,
    "events": [
      {
        "index": 0,
        "type": "roundStart",
        "mode": "ante_3",
        "cost": 2,
        "goldenGridStart": null
      },
      {
        "index": 1,
        "type": "reelStop",
        "board": [
          [
            "H2",
            "L5",
            "H1",
            "L5",
            "L1"
          ],
          [
            "L3",
            "H3",
            "L5",
            "L2",
            "H3"
          ],
          [
            "L2",
            "H4",
            "L2",
            "L3",
            "L5"
          ]
        ],
        "strikeWildFactors": []
      },
      {
        "index": 2,
        "type": "roundSettle",
        "payoutMultiplier": 0
      }
    ]
  },
  "ante_10": {
    "id": 1,
    "payoutMultiplier": 1540,
    "events": [
      {
        "index": 0,
        "type": "roundStart",
        "mode": "ante_10",
        "cost": 6.5,
        "goldenGridStart": null
      },
      {
        "index": 1,
        "type": "reelStop",
        "board": [
          [
            "L1",
            "S",
            "L5",
            "L4",
            "L4"
          ],
          [
            "L3",
            "L5",
            "L3",
            "L5",
            "L5"
          ],
          [
            "L5",
            "SW",
            "L4",
            "SW",
            "SW"
          ]
        ],
        "strikeWildFactors": [
          {
            "factor": {
              "denominator": 1,
              "display": "2.00",
              "numerator": 2
            },
            "reel": 1,
            "row": 2
          },
          {
            "factor": {
              "denominator": 1,
              "display": "2.00",
              "numerator": 2
            },
            "reel": 3,
            "row": 2
          },
          {
            "factor": {
              "denominator": 1,
              "display": "2.00",
              "numerator": 2
            },
            "reel": 4,
            "row": 2
          }
        ]
      },
      {
        "index": 2,
        "type": "roundSettle",
        "payoutMultiplier": 1540
      }
    ]
  },
  "golden_spin": {
    "id": 1,
    "payoutMultiplier": 22820,
    "events": [
      {
        "index": 0,
        "type": "roundStart",
        "mode": "golden_spin",
        "cost": 10,
        "goldenGridStart": [
          [
            1,
            1,
            1
          ],
          [
            1,
            1,
            2
          ],
          [
            8,
            1,
            4
          ],
          [
            1,
            4,
            8
          ],
          [
            8,
            1,
            1
          ]
        ]
      },
      {
        "index": 1,
        "type": "reelStop",
        "board": [
          [
            "H2",
            "L4",
            "L4",
            "L4",
            "H2"
          ],
          [
            "L4",
            "W",
            "L3",
            "W",
            "L4"
          ],
          [
            "L5",
            "H1",
            "L5",
            "H1",
            "L5"
          ]
        ],
        "strikeWildFactors": []
      },
      {
        "index": 2,
        "type": "roundSettle",
        "payoutMultiplier": 22820
      }
    ]
  },
  "strike_spin": {
    "id": 1,
    "payoutMultiplier": 0,
    "events": [
      {
        "index": 0,
        "type": "roundStart",
        "mode": "strike_spin",
        "cost": 20,
        "goldenGridStart": null
      },
      {
        "index": 1,
        "type": "reelStop",
        "board": [
          [
            "L3",
            "L2",
            "L2",
            "L5",
            "L4"
          ],
          [
            "L5",
            "H4",
            "L5",
            "SW",
            "L5"
          ],
          [
            "H3",
            "L1",
            "SW",
            "H2",
            "SW"
          ]
        ],
        "strikeWildFactors": [
          {
            "factor": {
              "denominator": 1,
              "display": "2.00",
              "numerator": 2
            },
            "reel": 2,
            "row": 2
          },
          {
            "factor": {
              "denominator": 1,
              "display": "2.00",
              "numerator": 2
            },
            "reel": 3,
            "row": 1
          },
          {
            "factor": {
              "denominator": 1,
              "display": "2.00",
              "numerator": 2
            },
            "reel": 4,
            "row": 2
          }
        ]
      },
      {
        "index": 2,
        "type": "roundSettle",
        "payoutMultiplier": 0
      }
    ]
  },
  "collision_spin": {
    "id": 1,
    "payoutMultiplier": 4480,
    "events": [
      {
        "index": 0,
        "type": "roundStart",
        "mode": "collision_spin",
        "cost": 50,
        "goldenGridStart": [
          [
            1,
            4,
            4
          ],
          [
            1,
            4,
            1
          ],
          [
            4,
            1,
            1
          ],
          [
            1,
            1,
            1
          ],
          [
            1,
            1,
            1
          ]
        ]
      },
      {
        "index": 1,
        "type": "reelStop",
        "board": [
          [
            "L5",
            "H4",
            "L5",
            "L4",
            "L1"
          ],
          [
            "SW",
            "L1",
            "L3",
            "L5",
            "L2"
          ],
          [
            "L4",
            "L4",
            "L4",
            "SW",
            "L4"
          ]
        ],
        "strikeWildFactors": [
          {
            "factor": {
              "denominator": 1,
              "display": "2.00",
              "numerator": 2
            },
            "reel": 0,
            "row": 1
          },
          {
            "factor": {
              "denominator": 1,
              "display": "2.00",
              "numerator": 2
            },
            "reel": 3,
            "row": 2
          }
        ]
      },
      {
        "index": 2,
        "type": "roundSettle",
        "payoutMultiplier": 4480
      }
    ]
  },
  "golden_impact": {
    "id": 1,
    "payoutMultiplier": 13650,
    "events": [
      {
        "index": 0,
        "type": "roundStart",
        "mode": "golden_impact",
        "cost": 100,
        "goldenGridStart": null
      },
      {
        "index": 1,
        "type": "bonusStart",
        "initialFreeSpins": 7,
        "goldenGridStart": null
      },
      {
        "index": 2,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L3",
              "L4",
              "L5",
              "L4",
              "L5"
            ],
            [
              "H2",
              "L5",
              "L4",
              "H2",
              "L3"
            ],
            [
              "L4",
              "L5",
              "W",
              "S",
              "L4"
            ]
          ],
          "golden_grid_before": [
            [
              1,
              1,
              4
            ],
            [
              1,
              1,
              2
            ],
            [
              1,
              1,
              2
            ],
            [
              1,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "golden_grid_after": [
            [
              1,
              1,
              8
            ],
            [
              2,
              1,
              2
            ],
            [
              1,
              2,
              2
            ],
            [
              1,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "ladder_active": false,
          "ladder_after": {
            "denominator": 1,
            "display": "1.00",
            "numerator": 1
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 3,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L3",
              "L4",
              "L4",
              "L5",
              "L1"
            ],
            [
              "L4",
              "H2",
              "L3",
              "L5",
              "W"
            ],
            [
              "H2",
              "L3",
              "L2",
              "L4",
              "H1"
            ]
          ],
          "golden_grid_before": [
            [
              1,
              1,
              8
            ],
            [
              2,
              1,
              2
            ],
            [
              1,
              2,
              2
            ],
            [
              1,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "golden_grid_after": [
            [
              2,
              2,
              8
            ],
            [
              4,
              1,
              4
            ],
            [
              2,
              4,
              2
            ],
            [
              1,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "ladder_active": false,
          "ladder_after": {
            "denominator": 1,
            "display": "1.00",
            "numerator": 1
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 4,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L5",
              "L4",
              "L5",
              "L5",
              "L2"
            ],
            [
              "L4",
              "L2",
              "L5",
              "L3",
              "H3"
            ],
            [
              "H2",
              "H3",
              "L4",
              "L4",
              "L5"
            ]
          ],
          "golden_grid_before": [
            [
              2,
              2,
              8
            ],
            [
              4,
              1,
              4
            ],
            [
              2,
              4,
              2
            ],
            [
              1,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "golden_grid_after": [
            [
              2,
              2,
              8
            ],
            [
              4,
              1,
              4
            ],
            [
              2,
              4,
              2
            ],
            [
              1,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "ladder_active": false,
          "ladder_after": {
            "denominator": 1,
            "display": "1.00",
            "numerator": 1
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 5,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L2",
              "L3",
              "L3",
              "L3",
              "H4"
            ],
            [
              "L5",
              "H4",
              "L2",
              "L4",
              "L1"
            ],
            [
              "H1",
              "L1",
              "L1",
              "L5",
              "W"
            ]
          ],
          "golden_grid_before": [
            [
              2,
              2,
              8
            ],
            [
              4,
              1,
              4
            ],
            [
              2,
              4,
              2
            ],
            [
              1,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "golden_grid_after": [
            [
              2,
              2,
              8
            ],
            [
              4,
              1,
              4
            ],
            [
              2,
              4,
              2
            ],
            [
              1,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "ladder_active": false,
          "ladder_after": {
            "denominator": 1,
            "display": "1.00",
            "numerator": 1
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 6,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L2",
              "S",
              "L3",
              "H2",
              "L3"
            ],
            [
              "H3",
              "SW",
              "L5",
              "S",
              "H4"
            ],
            [
              "L5",
              "H2",
              "L4",
              "L3",
              "L1"
            ]
          ],
          "golden_grid_before": [
            [
              2,
              2,
              8
            ],
            [
              4,
              1,
              4
            ],
            [
              2,
              4,
              2
            ],
            [
              1,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "golden_grid_after": [
            [
              2,
              2,
              8
            ],
            [
              4,
              2,
              4
            ],
            [
              2,
              8,
              2
            ],
            [
              1,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "ladder_active": false,
          "ladder_after": {
            "denominator": 1,
            "display": "1.00",
            "numerator": 1
          },
          "strike_wild_factors": [
            {
              "factor": {
                "denominator": 1,
                "display": "2.00",
                "numerator": 2
              },
              "reel": 1,
              "row": 1,
              "sticky": false
            }
          ]
        }
      },
      {
        "index": 7,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "W",
              "L2",
              "L2",
              "L1",
              "L3"
            ],
            [
              "H4",
              "H4",
              "L1",
              "L4",
              "L5"
            ],
            [
              "L1",
              "L1",
              "S",
              "W",
              "L4"
            ]
          ],
          "golden_grid_before": [
            [
              2,
              2,
              8
            ],
            [
              4,
              2,
              4
            ],
            [
              2,
              8,
              2
            ],
            [
              1,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "golden_grid_after": [
            [
              4,
              2,
              8
            ],
            [
              8,
              2,
              8
            ],
            [
              4,
              8,
              2
            ],
            [
              2,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "ladder_active": false,
          "ladder_after": {
            "denominator": 1,
            "display": "1.00",
            "numerator": 1
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 8,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "W",
              "L5",
              "L5",
              "L3",
              "L2"
            ],
            [
              "H4",
              "H3",
              "H3",
              "H2",
              "H4"
            ],
            [
              "L1",
              "H4",
              "L2",
              "L4",
              "L1"
            ]
          ],
          "golden_grid_before": [
            [
              4,
              2,
              8
            ],
            [
              8,
              2,
              8
            ],
            [
              4,
              8,
              2
            ],
            [
              2,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "golden_grid_after": [
            [
              8,
              2,
              8
            ],
            [
              8,
              4,
              8
            ],
            [
              8,
              8,
              2
            ],
            [
              2,
              1,
              1
            ],
            [
              2,
              1,
              1
            ]
          ],
          "ladder_active": false,
          "ladder_after": {
            "denominator": 1,
            "display": "1.00",
            "numerator": 1
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 9,
        "type": "roundSettle",
        "payoutMultiplier": 13650
      }
    ]
  },
  "twin_strike": {
    "id": 1,
    "payoutMultiplier": 63705,
    "events": [
      {
        "index": 0,
        "type": "roundStart",
        "mode": "twin_strike",
        "cost": 300,
        "goldenGridStart": null
      },
      {
        "index": 1,
        "type": "bonusStart",
        "initialFreeSpins": 7,
        "goldenGridStart": null
      },
      {
        "index": 2,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L5",
              "H4",
              "L1",
              "L5",
              "L3"
            ],
            [
              "L3",
              "L1",
              "L2",
              "S",
              "L5"
            ],
            [
              "L4",
              "L4",
              "L5",
              "L3",
              "L4"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "1.00",
            "numerator": 1
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 3,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L1",
              "L5",
              "L4",
              "L1",
              "H3"
            ],
            [
              "H3",
              "L4",
              "L5",
              "L4",
              "L5"
            ],
            [
              "L5",
              "L3",
              "H3",
              "W",
              "L4"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "2.00",
            "numerator": 2
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 4,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L4",
              "L4",
              "SW",
              "L5",
              "H3"
            ],
            [
              "L5",
              "L3",
              "H2",
              "L5",
              "L5"
            ],
            [
              "L3",
              "L2",
              "H4",
              "L4",
              "L3"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "4.00",
            "numerator": 4
          },
          "strike_wild_factors": [
            {
              "factor": {
                "denominator": 1,
                "display": "3.00",
                "numerator": 3
              },
              "reel": 2,
              "row": 0,
              "sticky": false
            }
          ]
        }
      },
      {
        "index": 5,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L3",
              "L3",
              "L3",
              "L2",
              "H2"
            ],
            [
              "H4",
              "L5",
              "L2",
              "L3",
              "H4"
            ],
            [
              "L1",
              "H3",
              "L1",
              "H2",
              "L1"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "8.00",
            "numerator": 8
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 6,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "H1",
              "L4",
              "L4",
              "L3",
              "L3"
            ],
            [
              "L4",
              "W",
              "L5",
              "L4",
              "L4"
            ],
            [
              "W",
              "H1",
              "L5",
              "L5",
              "L5"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "16.00",
            "numerator": 16
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 7,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L2",
              "L4",
              "L4",
              "H1",
              "L1"
            ],
            [
              "H4",
              "L2",
              "W",
              "H4",
              "L3"
            ],
            [
              "L1",
              "H3",
              "H1",
              "L1",
              "L5"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "16.00",
            "numerator": 16
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 8,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L5",
              "L4",
              "H4",
              "L1",
              "L2"
            ],
            [
              "L3",
              "L5",
              "L3",
              "L2",
              "L3"
            ],
            [
              "H4",
              "L3",
              "L5",
              "L3",
              "L4"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "16.00",
            "numerator": 16
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 9,
        "type": "roundSettle",
        "payoutMultiplier": 63705
      }
    ]
  },
  "mystery_buy": {
    "id": 1,
    "payoutMultiplier": 3381,
    "events": [
      {
        "index": 0,
        "type": "roundStart",
        "mode": "mystery_buy",
        "cost": 485,
        "goldenGridStart": null
      },
      {
        "index": 1,
        "type": "mysteryReveal",
        "result": "Twin Strike",
        "activationBoard": [
          [
            "S",
            "H2",
            "H3",
            "S",
            "L1"
          ],
          [
            "H1",
            "H2",
            "S",
            "H4",
            "L1"
          ],
          [
            "H1",
            "S",
            "H3",
            "H4",
            "L1"
          ]
        ]
      },
      {
        "index": 2,
        "type": "bonusStart",
        "initialFreeSpins": 7,
        "goldenGridStart": null
      },
      {
        "index": 3,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L3",
              "H3",
              "L3",
              "L2",
              "L4"
            ],
            [
              "L5",
              "L2",
              "L2",
              "L3",
              "L3"
            ],
            [
              "H3",
              "L4",
              "L1",
              "L4",
              "L5"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "1.00",
            "numerator": 1
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 4,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L4",
              "L5",
              "L3",
              "S",
              "L1"
            ],
            [
              "L3",
              "L3",
              "L4",
              "L3",
              "H3"
            ],
            [
              "L5",
              "H4",
              "L1",
              "L2",
              "L5"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "2.00",
            "numerator": 2
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 5,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L3",
              "L5",
              "L5",
              "H1",
              "H3"
            ],
            [
              "L5",
              "L3",
              "L5",
              "L5",
              "L2"
            ],
            [
              "L4",
              "L4",
              "L4",
              "L2",
              "L4"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "4.00",
            "numerator": 4
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 6,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "H2",
              "H2",
              "H3",
              "L4",
              "H1"
            ],
            [
              "H4",
              "L3",
              "L2",
              "W",
              "S"
            ],
            [
              "L1",
              "L2",
              "L4",
              "H1",
              "L4"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "4.00",
            "numerator": 4
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 7,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "H3",
              "L5",
              "L3",
              "S",
              "L4"
            ],
            [
              "L2",
              "L4",
              "L4",
              "L3",
              "L5"
            ],
            [
              "L4",
              "H2",
              "L5",
              "L2",
              "SW"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "8.00",
            "numerator": 8
          },
          "strike_wild_factors": [
            {
              "factor": {
                "denominator": 1,
                "display": "2.00",
                "numerator": 2
              },
              "reel": 4,
              "row": 2,
              "sticky": false
            }
          ]
        }
      },
      {
        "index": 8,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "L4",
              "W",
              "L2",
              "H1",
              "L4"
            ],
            [
              "W",
              "H1",
              "L3",
              "H4",
              "L3"
            ],
            [
              "L5",
              "H4",
              "L4",
              "L1",
              "L2"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "16.00",
            "numerator": 16
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 9,
        "type": "bonusSpin",
        "spin": {
          "board": [
            [
              "H3",
              "H2",
              "L2",
              "L4",
              "H4"
            ],
            [
              "L5",
              "L4",
              "H3",
              "W",
              "L1"
            ],
            [
              "L3",
              "L5",
              "L5",
              "H1",
              "H3"
            ]
          ],
          "golden_grid_before": null,
          "golden_grid_after": null,
          "ladder_active": true,
          "ladder_after": {
            "denominator": 1,
            "display": "16.00",
            "numerator": 16
          },
          "strike_wild_factors": []
        }
      },
      {
        "index": 10,
        "type": "roundSettle",
        "payoutMultiplier": 3381
      }
    ]
  },
  "max_win_or_nothing": {
    "id": 1,
    "payoutMultiplier": 0,
    "events": [
      {
        "index": 0,
        "type": "roundStart",
        "mode": "max_win_or_nothing",
        "cost": 1000,
        "goldenGridStart": null
      },
      {
        "index": 1,
        "type": "maxWinReveal",
        "won": false
      },
      {
        "index": 2,
        "type": "roundSettle",
        "payoutMultiplier": 0
      }
    ]
  }
} as const;
