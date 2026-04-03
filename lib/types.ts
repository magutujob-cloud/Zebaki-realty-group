export type Listing = {
  id: string;
  slug: string;
  title: string;
  property_type: string;
  purpose: string;
  city: string;
  area: string;
  price: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  size_label: string | null;
  status: string;
  featured: boolean;
  published: boolean;
  cover_image_url: string | null;
  gallery_urls: string[] | null;
  description: string | null;
  amenities: string[] | null;
  title_status: string | null;
  zoning: string | null;
  road_access: string | null;
  utilities: string[] | null;
  map_query: string | null;
  created_at: string;
};

export type Agent = {
  id: string;
  full_name: string;
  role: string;
  city: string | null;
  phone: string | null;
  email: string | null;
  image_url: string | null;
  specialties: string[] | null;
  bio: string | null;
  sort_order: number | null;
  active: boolean;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  author_name: string | null;
  read_time_minutes: number | null;
  published: boolean;
  published_at: string | null;
};

export type Inquiry = {
  id: string;
  customer_id?: string | null;
  listing_id?: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  interest: string | null;
  city: string | null;
  budget: string | null;
  message: string;
  status: string | null;
  created_at: string;
};

export type CustomerProfile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  city: string | null;
  created_at: string;
  updated_at: string;
};

export type InquiryWithListing = Inquiry & {
  listings?: {
    id: string;
    title: string;
    slug: string;
    city: string;
    area: string;
  } | null;
};
