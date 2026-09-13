-- ==============================================================================
-- Sunya Visibility — Sample Kathmandu Valley Seed Data
-- ==============================================================================

INSERT INTO public.leads (
    place_id, name, category, address, district, phone, email, rating, reviews_count, has_website, google_maps_url, latitude, longitude, status
) VALUES 
(
    'seed_ktm_001',
    'Himalayan Momo & Sekuwa Corner',
    'restaurant',
    'Jhamsikhel Road, Ward 3, Lalitpur 44700',
    'Lalitpur',
    '+977-1-5538920',
    'contact@himalayanmomo.com.np',
    4.7,
    142,
    FALSE,
    'https://maps.google.com/?cid=101',
    27.6782,
    85.3125,
    'discovered'
),
(
    'seed_ktm_002',
    'Patan Heritage Herbal Spa & Ayurveda',
    'spa',
    'Patan Durbar Square North, Lalitpur 44600',
    'Lalitpur',
    '+977-1-5521934',
    'namaste@patanheritagespa.np',
    4.8,
    88,
    FALSE,
    'https://maps.google.com/?cid=102',
    27.6740,
    85.3260,
    'discovered'
),
(
    'seed_ktm_003',
    'Boudha Organic Bakery & Artisan Coffee',
    'cafe',
    'Boudhanath Stupa Outer Circle, Kathmandu 44600',
    'Kathmandu',
    '+977-1-4498721',
    'hello@boudhabakery.com.np',
    4.5,
    215,
    FALSE,
    'https://maps.google.com/?cid=103',
    27.7215,
    85.3620,
    'discovered'
),
(
    'seed_ktm_004',
    'Bhaktapur Traditional Pottery & Crafts',
    'boutique',
    'Pottery Square, Ward 4, Bhaktapur 44800',
    'Bhaktapur',
    '+977-1-6614399',
    'info@bhaktapurpottery.np',
    4.7,
    96,
    FALSE,
    'https://maps.google.com/?cid=104',
    27.6720,
    85.4280,
    'discovered'
)
ON CONFLICT (place_id) DO NOTHING;
