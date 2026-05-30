export interface Criterion {
  number: string;
  description: string;
  short_name: string;
}

export interface HeritageSection {
  id: number | string;
  section_type: "summary" | "point" | "exam_notes" | string;
  target_level?: number;
  content: string;
  image_code?: string;
  title?: string;
  source_name?: string;
  source_url?: string;
}

export interface Heritage {
  id: number;
  code: string;
  name: string;
  category: number;
  registered_year: number | string;
  countries: string[];
  level?: number;
  catchphrase?: string;
  criteria?: (Criterion | number)[];
  is_danger: boolean;
  danger_registered_year?: number;
  is_negative_heritage: boolean;
  is_cultural_landscape: boolean;
  source_name?: string;
  source_url?: string;

  sections?: HeritageSection[];
}

export interface Country {
  id: number;
  name: string;
  region: number;
}

export interface NotificationItem {
  id: number;
  title: string;
  category: number;
  category_display: string;
  content: string;
  published_at: string;
}
