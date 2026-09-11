/**
 * Module 1 — Discovery Engine
 * Queries Google Places API for businesses in the Kathmandu Valley (Kathmandu, Lalitpur, Bhaktapur)
 * Filters:
 *   - Rating >= 4.0
 *   - Review count >= 15 (adjustable)
 *   - CRITICAL: NO existing website field in Places listing (absence = lead qualifier)
 * Complies with official Google Places API Terms of Service.
 */

export interface GooglePlaceResult {
  place_id: string;
  name: string;
  category: string;
  address: string;
  district: 'Kathmandu' | 'Lalitpur' | 'Bhaktapur';
  phone?: string;
  email?: string;
  rating: number;
  user_ratings_total: number;
  website?: string;
  photos?: string[];
  location?: { lat: number; lng: number };
  google_maps_url?: string;
}

export interface DiscoveryOptions {
  category: string;
  district: 'Kathmandu' | 'Lalitpur' | 'Bhaktapur' | 'All';
  minRating?: number;
  minReviews?: number;
  limit?: number;
}

const KATHMANDU_VALLEY_BOUNDS = {
  Kathmandu: { lat: 27.7172, lng: 85.3240, radius: 10000 },
  Lalitpur: { lat: 27.6670, lng: 85.3200, radius: 8000 },
  Bhaktapur: { lat: 27.6710, lng: 85.4298, radius: 8000 },
};

export async function discoverPlaces(options: DiscoveryOptions): Promise<GooglePlaceResult[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const minRating = options.minRating ?? 4.0;
  const minReviews = options.minReviews ?? 15;

  if (!apiKey || apiKey === 'placeholder') {
    console.log('[Places Discovery] No GOOGLE_PLACES_API_KEY found, using realistic Kathmandu Valley fixture data.');
    return getKathmanduMockLeads(options);
  }

  const districts = options.district === 'All' 
    ? (['Kathmandu', 'Lalitpur', 'Bhaktapur'] as const) 
    : [options.district];

  const results: GooglePlaceResult[] = [];

  for (const district of districts) {
    const coords = KATHMANDU_VALLEY_BOUNDS[district];
    const query = `${options.category} in ${district}, Nepal`;
    
    // Official Google Places API (New Text Search endpoint)
    const url = `https://places.googleapis.com/v1/places:searchText`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.rating,places.userRatingCount,places.websiteUri,places.googleMapsUri,places.location,places.photos,places.types',
        },
        body: JSON.stringify({
          textQuery: query,
          locationBias: {
            circle: {
              center: { latitude: coords.lat, longitude: coords.lng },
              radius: coords.radius,
            },
          },
          pageSize: 20,
        }),
      });

      if (!response.ok) {
        console.error(`[Places API Error] Status: ${response.status} ${response.statusText}`);
        continue;
      }

      const data = await response.json();
      const places = data.places || [];

      for (const p of places) {
        // CRITICAL FILTER:
        // 1. Rating >= minRating
        // 2. Reviews >= minReviews
        // 3. NO existing website listed (absence is lead qualification)
        const rating = p.rating || 0;
        const reviewsCount = p.userRatingCount || 0;
        const hasWebsite = !!p.websiteUri && p.websiteUri.trim().length > 0;

        if (rating >= minRating && reviewsCount >= minReviews && !hasWebsite) {
          results.push({
            place_id: p.id,
            name: p.displayName?.text || 'Local Business',
            category: options.category,
            address: p.formattedAddress || `${district}, Nepal`,
            district: district,
            phone: p.nationalPhoneNumber || undefined,
            rating: rating,
            user_ratings_total: reviewsCount,
            google_maps_url: p.googleMapsUri,
            location: p.location ? { lat: p.location.latitude, lng: p.location.longitude } : undefined,
            photos: (p.photos || []).map((ph: any) => ph.name).slice(0, 5),
          });
        }
      }
    } catch (err) {
      console.error(`[Places Discovery Error] ${district}:`, err);
    }
  }

  return results;
}

/**
 * High-fidelity test fixture representing real Kathmandu Valley businesses without websites
 */
function getKathmanduMockLeads(options: DiscoveryOptions): GooglePlaceResult[] {
  const mockDatabase: GooglePlaceResult[] = [
    {
      place_id: 'ktm_place_001',
      name: 'Himalayan Momo & Sekuwa Corner',
      category: 'restaurant',
      address: 'Jhamsikhel Rd, Ward 3, Lalitpur 44700',
      district: 'Lalitpur',
      phone: '+977-1-5542890',
      rating: 4.6,
      user_ratings_total: 142,
      google_maps_url: 'https://maps.google.com/?cid=101',
      location: { lat: 27.6785, lng: 85.3125 },
      photos: ['https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80']
    },
    {
      place_id: 'ktm_place_002',
      name: 'Patan Heritage Herbal Spa & Ayurveda',
      category: 'spa',
      address: 'Patan Durbar Square North, Lalitpur 44600',
      district: 'Lalitpur',
      phone: '+977-1-5521934',
      rating: 4.8,
      user_ratings_total: 88,
      google_maps_url: 'https://maps.google.com/?cid=102',
      location: { lat: 27.6740, lng: 85.3260 },
      photos: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80']
    },
    {
      place_id: 'ktm_place_003',
      name: 'Boudha Organic Bakery & Artisan Coffee',
      category: 'cafe',
      address: 'Boudhanath Stupa Outer Circle, Kathmandu 44600',
      district: 'Kathmandu',
      phone: '+977-1-4498721',
      rating: 4.5,
      user_ratings_total: 215,
      google_maps_url: 'https://maps.google.com/?cid=103',
      location: { lat: 27.7215, lng: 85.3620 },
      photos: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80']
    },
    {
      place_id: 'ktm_place_004',
      name: 'Bhaktapur Traditional Pottery & Crafts',
      category: 'boutique',
      address: 'Pottery Square, Ward 4, Bhaktapur 44800',
      district: 'Bhaktapur',
      phone: '+977-1-6614399',
      rating: 4.7,
      user_ratings_total: 96,
      google_maps_url: 'https://maps.google.com/?cid=104',
      location: { lat: 27.6720, lng: 85.4280 },
      photos: ['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80']
    },
    {
      place_id: 'ktm_place_005',
      name: 'Apex Physiotherapy & Wellness Clinic',
      category: 'clinic',
      address: 'New Baneshwor Chowk, Kathmandu 44600',
      district: 'Kathmandu',
      phone: '+977-1-4782390',
      rating: 4.4,
      user_ratings_total: 54,
      google_maps_url: 'https://maps.google.com/?cid=105',
      location: { lat: 27.6915, lng: 85.3420 },
      photos: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80']
    },
    {
      place_id: 'ktm_place_006',
      name: 'Cafe Teentalle',
      category: 'cafe',
      address: 'Near Madan Bhandari Memorial College, New Baneshwor, Kathmandu',
      district: 'Kathmandu',
      phone: '+977-9801234567',
      rating: 4.8,
      user_ratings_total: 128,
      google_maps_url: 'https://maps.google.com/?q=Cafe+Teentalle+New+Baneshwor',
      location: { lat: 27.6912, lng: 85.3415 },
      photos: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80']
    },
    {
      place_id: 'ktm_place_007',
      name: 'Sunrise Bakeries Restaurant',
      category: 'restaurant',
      address: 'House #2, New Baneshwor Marg, Kathmandu',
      district: 'Kathmandu',
      phone: '+977-1-4785123',
      rating: 4.8,
      user_ratings_total: 94,
      google_maps_url: 'https://maps.google.com/?q=Sunrise+Bakeries+Restaurant+New+Baneshwor',
      location: { lat: 27.6925, lng: 85.3430 },
      photos: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80']
    },
    {
      place_id: 'ktm_place_008',
      name: 'Krystal Food Cafe',
      category: 'restaurant',
      address: 'Sunrise Bank Building, Sankhamul Marg, Kathmandu',
      district: 'Kathmandu',
      phone: '+977-1-4793314',
      rating: 4.3,
      user_ratings_total: 165,
      google_maps_url: 'https://maps.google.com/?q=Krystal+Food+Cafe+Sankhamul',
      location: { lat: 27.6845, lng: 85.3325 },
      photos: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80']
    },
    {
      place_id: 'ktm_place_009',
      name: 'Surface Coffee',
      category: 'cafe',
      address: 'Opposite Eyeplex Mall, New Baneshwor, Kathmandu',
      district: 'Kathmandu',
      phone: '+977-9812345678',
      rating: 4.4,
      user_ratings_total: 112,
      google_maps_url: 'https://maps.google.com/?q=Surface+Coffee+New+Baneshwor',
      location: { lat: 27.6905, lng: 85.3400 },
      photos: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80']
    },
    {
      place_id: 'ktm_place_010',
      name: 'Iron Forge Fitness Gym',
      category: 'gym',
      address: 'Kumaripati Main Road, Lalitpur 44700',
      district: 'Lalitpur',
      phone: '+977-1-5534120',
      rating: 4.6,
      user_ratings_total: 110,
      google_maps_url: 'https://maps.google.com/?cid=106',
      location: { lat: 27.6690, lng: 85.3180 },
      photos: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80']
    }
  ];

  return mockDatabase.filter(item => {
    const matchCat = options.category === 'all' || item.category.toLowerCase().includes(options.category.toLowerCase());
    const matchDist = options.district === 'All' || item.district === options.district;
    return matchCat && matchDist && item.rating >= (options.minRating ?? 4.0) && item.user_ratings_total >= (options.minReviews ?? 15);
  });
}
