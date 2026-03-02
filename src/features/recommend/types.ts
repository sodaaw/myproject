export type Preferences = {
  noise_level: number | null;
  seat_reliability: number | null;
  seat_comfort: number | null;
  whole_window: number | null;
  view_score: number | null;
  cost_level: number | null;
  ceiling_height: number | null;
  snack_score: number | null;
  snack_price: number | null;
  walk_time_min: number | null;
  transport_time_min: number | null;
};

export const initialPreferences: Preferences = {
  noise_level: null,
  seat_reliability: null,
  seat_comfort: null,
  whole_window: null,
  view_score: null,
  cost_level: null,
  ceiling_height: null,
  snack_score: null,
  snack_price: null,
  walk_time_min: null,
  transport_time_min: null,
};

