insert into public.listings (
  slug, title, property_type, purpose, city, area, price, bedrooms, bathrooms, size_label, status,
  featured, published, cover_image_url, gallery_urls, description, amenities, title_status, zoning,
  road_access, utilities, map_query
)
values
(
  'modern-4-bedroom-family-home',
  'Modern 4 Bedroom Family Home',
  'House',
  'Sale',
  'Nairobi',
  'Kilimani',
  28500000,
  4,
  4,
  '320 sqm',
  'Available',
  true,
  true,
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
  array[
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  ],
  'A bright, mid-market family home in Kilimani with spacious living areas, a private garden, ensuite bedrooms, and easy access to schools, malls, and business districts.',
  array['Garden', 'Parking', 'Ensuite bedrooms', 'DSQ', 'Perimeter wall'],
  'Freehold title available',
  'Residential',
  'Tarmac access road',
  array['Water', 'Electricity', 'Internet'],
  'Kilimani Nairobi Kenya'
),
(
  'prime-quarter-acre-residential-plot',
  'Prime 1/4 Acre Residential Plot',
  'Land',
  'Sale',
  'Nakuru',
  'Milimani',
  7800000,
  null,
  null,
  '0.25 acres',
  'Available',
  true,
  true,
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  array[
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  ],
  'Level and ready-to-build residential land in a fast-growing neighborhood, ideal for a family home or small residential project.',
  array['Corner plot', 'Beaconed', 'Perimeter fencing on two sides'],
  'Clean title deed',
  'Residential',
  'All-weather access road',
  array['Water nearby', 'Electricity nearby'],
  'Milimani Nakuru Kenya'
),
(
  'serviced-2-bedroom-apartment',
  'Serviced 2 Bedroom Apartment',
  'Apartment',
  'Rent',
  'Nairobi',
  'Westlands',
  185000,
  2,
  2,
  '145 sqm',
  'Available',
  true,
  true,
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  array[
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
  ],
  'A well-finished apartment suited for professionals and young families seeking comfort, convenience, backup utilities, and quick access to Nairobi''s commercial core.',
  array['Lift', 'Gym', 'Backup generator', 'Borehole', 'Balcony'],
  'Managed rental unit',
  'Mixed residential',
  'Secure estate road',
  array['Water', 'Electricity', 'Backup power'],
  'Westlands Nairobi Kenya'
)
on conflict (slug) do nothing;

insert into public.agents (full_name, role, city, phone, email, image_url, specialties, bio, sort_order, active)
values
(
  'Amina Kibet',
  'Head of Sales',
  'Nairobi',
  '+254 742 370 125',
  'magutujob@gmail.com',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  array['Family homes', 'Buyer advisory', 'Negotiation'],
  'Amina leads the sales desk and supports homebuyers, investors, and developers with practical, insight-led property decisions.',
  1,
  true
),
(
  'Brian Otieno',
  'Land & Investment Advisor',
  'Kisumu',
  '+254 742 370 125',
  'magutujob@gmail.com',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  array['Land sales', 'Due diligence', 'Investment scouting'],
  'Brian helps clients evaluate land opportunities with a focus on zoning, title status, growth corridors, and practical exit potential.',
  2,
  true
)
on conflict do nothing;

insert into public.blog_posts (slug, title, category, excerpt, content, cover_image_url, author_name, read_time_minutes, published, published_at)
values
(
  'how-to-buy-land-in-kenya-with-more-confidence',
  'How to Buy Land in Kenya With More Confidence',
  'Land',
  'A practical guide to plot size, title checks, zoning, road access, and the documents buyers should review before making an offer.',
  'Buying land is often a long-term decision. Start with the title or ownership documents, confirm the location and beacons on the ground, review zoning and permitted use, and understand utilities and road access. Buyers should also review transfer costs, timelines, and any physical or legal issues affecting development potential.',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  'Zebaki Realty Group',
  5,
  true,
  now()
),
(
  'what-mid-market-homebuyers-now-prioritize',
  'What Mid-Market Homebuyers Now Prioritize',
  'Homes',
  'Affordability still matters, but so do access roads, water reliability, flexible layouts, and proximity to daily services.',
  'Across Kenya''s growing cities, mid-market buyers increasingly want practical homes: reliable utility connections, secure compounds, flexible family-friendly layouts, and locations that reduce commuting pressure. Good value is not just price; it is also usability, upkeep, and future resale appeal.',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  'Zebaki Realty Group',
  4,
  true,
  now()
)
on conflict (slug) do nothing;
