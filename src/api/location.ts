export interface LocationResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country: string;
  };
}

export async function searchLocation(query: string): Promise<LocationResult[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=3&q=${encodedQuery}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "EasyWeather by Uwayss/1.0",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to search for location");
  }

  return response.json();
}
