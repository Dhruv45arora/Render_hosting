/**
 * Uttarakhand programmatic SEO engine — shared types.
 * Capacity ≠ indexability. Nothing here is published until a wave is explicitly enabled.
 */

export type Region = "garhwal" | "kumaon" | "external";

export type LocationType =
  | "district"
  | "major_city"
  | "town"
  | "small_town"
  | "hill_station"
  | "tourist_destination"
  | "pilgrimage_destination"
  | "airport"
  | "railway_station"
  | "transport_hub"
  | "local_area";

export type IndexTier = "A" | "B" | "C";

export type ServiceId =
  | "taxi_service"
  | "local_taxi"
  | "outstation_taxi"
  | "one_way_taxi"
  | "round_trip_taxi"
  | "airport_taxi"
  | "railway_taxi"
  | "sightseeing_taxi"
  | "hill_station_taxi"
  | "pilgrimage_taxi"
  | "char_dham_taxi"
  | "intercity_taxi"
  | "car_rental"
  | "car_on_rent"
  | "car_with_driver"
  | "self_drive_car"
  | "outstation_car_rental"
  | "local_car_rental"
  | "bike_rental"
  | "motorcycle_rental"
  | "bike_on_rent"
  | "touring_bike_rental"
  | "scooty_rental"
  | "scooter_rental"
  | "scooty_on_rent";

export type PageIntentType =
  | "location_service"
  | "location_vehicle_category"
  | "location_specific_vehicle"
  | "route_taxi"
  | "airport_destination"
  | "railway_destination"
  | "sightseeing"
  | "pilgrimage"
  | "hill_station_travel"
  | "outstation_one_way";

export type WaveId = "existing" | "wave2" | "wave3" | "wave4" | "wave5" | "wave6";

export type RejectionReason =
  | "duplicate_intent"
  | "slug_collision"
  | "weak_commercial_relevance"
  | "unsupported_service"
  | "unsupported_vehicle"
  | "invalid_route"
  | "geography_mismatch"
  | "cannibalization"
  | "insufficient_unique_content"
  | "pilgrimage_accuracy"
  | "origin_equals_destination"
  | "tier_gated"
  | "wave_disabled"
  | "missing_image_policy"
  | "not_motorable_endpoint";

export type SeoLocation = {
  id: string;
  name: string;
  slug: string;
  district: string;
  region: Region;
  locationType: LocationType;
  aliases: string[];
  parentId?: string;
  nearbyIds: string[];
  relevantServices: ServiceId[];
  transportHubIds: string[];
  tourismRelevance: 0 | 1 | 2 | 3;
  pilgrimageRelevance: 0 | 1 | 2 | 3;
  routeRelevance: 0 | 1 | 2 | 3;
  /** Deterministic image keys from IMAGE_MAP — never random. */
  imageKeys: string[];
  /** Only when verified in project data or clearly standard place names — never fabricated coords. */
  lat?: number;
  lng?: number;
  tier: IndexTier;
  indexableEligible: boolean;
  /** True when vehicles cannot reach the final shrine/trek endpoint. */
  roadheadOnly?: boolean;
  roadheadNote?: string;
  /** Structured facts used by content uniqueness (not templated filler). */
  facts: LocationFacts;
};

export type LocationFacts = {
  useCases: string[];
  nearbyDestinations: string[];
  transportNotes: string[];
  tourismContext: string[];
  faqSeeds: { q: string; a: string }[];
};

export type SeoService = {
  id: ServiceId;
  name: string;
  slugFragment: string;
  family: "taxi" | "car" | "bike" | "scooty";
  offered: boolean;
  enquiryOnly: boolean;
  selfDrive: boolean;
  withDriver: boolean;
  minTier: IndexTier;
  notes?: string;
};

export type SeoVehicleIntent = {
  id: string;
  name: string;
  slugFragment: string;
  category: "bike" | "scooty" | "car" | "suv" | "luxury";
  /** Must match SEED_VEHICLES models/families — never invent. */
  verifiedModels: string[];
  imageKey: string;
  minTier: IndexTier;
  touristLocationsOnly?: boolean;
};

export type RouteEdge = {
  id: string;
  originId: string;
  destinationId: string;
  bidirectional: boolean;
  relevance: 0 | 1 | 2 | 3;
  signals: Array<
    | "city_city"
    | "city_tourist"
    | "hub_destination"
    | "airport_tourist"
    | "railway_hill"
    | "pilgrimage_roadhead"
    | "tourist_circuit"
    | "manually_approved"
  >;
  tier: IndexTier;
  wave: WaveId;
  notes?: string;
};

export type PageCandidate = {
  slug: string;
  intent: PageIntentType;
  wave: WaveId;
  tier: IndexTier;
  serviceId?: ServiceId;
  locationId?: string;
  originId?: string;
  destinationId?: string;
  vehicleId?: string;
  titlePattern: string;
  h1Pattern: string;
  primaryKeyword: string;
  sitemapGroup: SitemapGroup;
  contentFingerprint: string[];
  relatedHints: string[];
  imageKeys: string[];
  enquiryCity?: string;
  indexable: boolean;
  published: boolean;
  source: "proposed" | "existing_locked";
};

export type SitemapGroup =
  | "core"
  | "cities"
  | "taxi-cities"
  | "taxi-routes"
  | "car-rental"
  | "bike-rental"
  | "scooty-rental"
  | "vehicle-pages"
  | "airport-transfer"
  | "railway-transfer"
  | "sightseeing"
  | "pilgrimage"
  | "hill-stations"
  | "guides";

export type EligibilityInput = {
  location?: SeoLocation;
  service?: SeoService;
  vehicle?: SeoVehicleIntent;
  origin?: SeoLocation;
  destination?: SeoLocation;
  route?: RouteEdge;
  intent: PageIntentType;
  slug: string;
  wave: WaveId;
  contentFingerprint: string[];
  lockedSlugs: Set<string>;
  proposedSlugs: Set<string>;
  intentKeys: Set<string>;
  intentKey: string;
};

export type EligibilityResult =
  | { ok: true; reasons: string[] }
  | { ok: false; reason: RejectionReason; detail: string };

export type ManifestRejection = {
  slug: string;
  intent: PageIntentType;
  reason: RejectionReason;
  detail: string;
};

export type WaveManifest = {
  wave: WaveId;
  generatedAt: string;
  totalProposed: number;
  byIntent: Record<string, number>;
  bySitemapGroup: Record<string, number>;
  rejectedTotal: number;
  rejectedByReason: Record<string, number>;
  pages: PageCandidate[];
  rejectionsSample: ManifestRejection[];
  capacityEstimate: {
    locations: number;
    servicesOffered: number;
    vehicleIntents: number;
    curatedRoutes: number;
    theoreticalCombinations: number;
    note: string;
  };
  locationCounts: Record<string, number>;
};
