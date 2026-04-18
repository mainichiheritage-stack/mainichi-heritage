export interface Criterion {
  number: string;
  description: string;
  short_name: string;
}

export interface Country {
  id: number;
  name: string;
  region: number;
}

export interface Heritage {
  id: number;
  code: string; // e.g., "h00001"
  name: string;
  category: number; // 1: 文化, 2: 自然, 3: 複合
  registered_year: number;
  countries: string[];
  level: number;
  catchphrase: string;
  description: string;
  criteria: number[];
  is_danger: boolean;
  danger_registered_year?: number;
  is_negative_heritage: boolean;

  image_url: string | null;
  source_name?: string;
  source_url?: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  category: number;
  category_display: string;
  content: string;
  published_at: string;
}
