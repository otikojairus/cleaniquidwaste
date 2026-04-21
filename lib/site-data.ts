import locationDataset from "@/data/ca-locations.generated.json";

export type IndustryContent = {
  slug: string;
  name: string;
  summary: string;
  regulations: string;
  checklist: string[];
  planOptions: string[];
};

export type ServiceSlug =
  | "grease-trap-cleaning"
  | "car-wash-pit-cleaning"
  | "septic-tank-pumping"
  | "vacuum-truck-service"
  | "hydrovac-service"
  | "industrial-tank-cleaning"
  | "catch-basin-cleaning"
  | "storm-drain-cleaning";

export type ServiceContent = {
  slug: ServiceSlug;
  name: string;
  navLabel: string;
  clusterLabel: string;
  shortDescription: string;
  heroPrimary: string;
  heroSecondary: string;
  whatItIs: string;
  whoNeeds: string[];
  processSteps: string[];
  whyChoose: string;
  secondaryKeywords: string[];
  relatedServiceSlugs: ServiceSlug[];
  industries: IndustryContent[];
  faqs: Array<{ q: string; a: string }>;
};

export type ProvinceContent = {
  name: string;
  slug: string;
  abbr: string;
  context: string;
  cities: string[];
};

export type LocationContent = {
  stateName: string;
  stateSlug: string;
  stateAbbr: string;
  cityName: string;
  citySlug: string;
  nearbyCities: string[];
  countryName: "Canada";
};

const BASE_FAQS = [
  {
    q: "Do you offer emergency service?",
    a: "Yes. Emergency and after-hours response is available when spills, backups, overflows, or shutdown risks cannot wait for regular scheduling.",
  },
  {
    q: "Do you handle commercial and residential properties?",
    a: "Yes. We support restaurants, municipalities, industrial yards, car washes, rural homes, acreages, and other property types that need scheduled or urgent pumping work.",
  },
  {
    q: "Can you help me decide how often service is needed?",
    a: "Yes. Frequency depends on volume, waste type, equipment size, and site use. We can recommend a maintenance interval after reviewing your setup and service history.",
  },
];

const ALL_PROVINCES: ProvinceContent[] = locationDataset.provinces.map((province) => ({
  name: province.name,
  slug: province.slug,
  abbr: province.abbr,
  context: province.context,
  cities: province.cities.slice(0, 5).map((city) => city.name),
}));

const ALL_LOCATION_PAGES: LocationContent[] = locationDataset.provinces.flatMap((province) =>
  province.cities.map((city) => ({
    stateName: province.name,
    stateSlug: province.slug,
    stateAbbr: province.abbr,
    cityName: city.name,
    citySlug: city.slug,
    nearbyCities: province.cities
      .filter((candidate) => candidate.slug !== city.slug)
      .slice(0, 3)
      .map((candidate) => candidate.name),
    countryName: "Canada" as const,
  })),
);

const SERVICES_INTERNAL: Record<ServiceSlug, ServiceContent> = {
  "grease-trap-cleaning": {
    slug: "grease-trap-cleaning",
    name: "Grease Trap Cleaning",
    navLabel: "Grease Traps",
    clusterLabel: "Food Service",
    shortDescription: "Grease trap pumping, interceptor cleaning, and maintenance for restaurants, commissaries, hotels, and food facilities.",
    heroPrimary: "Keep FOG Buildup From Shutting You Down",
    heroSecondary: "Scheduled grease trap service keeps kitchens compliant, drains moving, and foul backups off your floor.",
    whatItIs: "Grease trap cleaning removes fats, oils, grease, and settled waste before blockages, odours, or overflow create operational problems.",
    whoNeeds: ["Restaurants", "Hotels", "Ghost kitchens", "Food courts", "Institutional kitchens"],
    processSteps: [
      "Confirm trap size, access, and service condition before pumping begins.",
      "Remove grease, slurry, and standing waste using the right vacuum capacity for the site.",
      "Scrape interior walls and baffles to reduce leftover buildup and restore working volume.",
      "Document service findings and recommend an interval that matches your kitchen load.",
    ],
    whyChoose: "CleanLiquidWaste combines licensed crews, 24/7 availability, and practical scheduling support so your kitchen service stays predictable instead of reactive.",
    secondaryKeywords: ["grease trap pumping", "grease interceptor cleaning", "restaurant grease trap cleaning", "grease trap maintenance"],
    relatedServiceSlugs: ["car-wash-pit-cleaning", "catch-basin-cleaning", "vacuum-truck-service"],
    industries: [
      { slug: "restaurant", name: "Restaurant", summary: "Reduce drain backups, kitchen downtime, and compliance problems with routine interceptor cleaning.", regulations: "Food service operations are commonly expected to maintain grease interceptors on a scheduled basis to prevent sewer issues. Regulations vary by province and municipality — check with your local authority for specific requirements.", checklist: ["Interceptor pumping", "Wall and baffle scraping", "FOG buildup assessment", "Service documentation"], planOptions: ["Monthly service", "Quarterly service", "Peak-season callouts"] },
      { slug: "hotel", name: "Hotel", summary: "Protect guest operations, banquet kitchens, and back-of-house drain systems with proactive maintenance.", regulations: "Hospitality sites often need planned grease management because volume can change quickly during events and peak occupancy. Regulations vary by province and municipality — check with your local authority for specific requirements.", checklist: ["Multi-kitchen review", "High-volume grease pumping", "Odour reduction support", "Maintenance reminders"], planOptions: ["Monthly plans", "Event-driven service", "Quarterly deep cleans"] },
    ],
    faqs: BASE_FAQS,
  },
  "car-wash-pit-cleaning": {
    slug: "car-wash-pit-cleaning",
    name: "Car Wash & Wash Bay Cleaning",
    navLabel: "Wash Bays",
    clusterLabel: "Vehicle Sites",
    shortDescription: "Pit cleaning, sludge removal, and wash bay maintenance for car washes, fleet yards, dealerships, and service facilities.",
    heroPrimary: "Keep Wash Bays Flowing Safely",
    heroSecondary: "Sludge, grit, and standing waste can slow operations fast when pits and sumps are ignored.",
    whatItIs: "Car wash pit cleaning removes sand, sludge, oils, and settled debris that reduce drainage performance and make cleanup more difficult.",
    whoNeeds: ["Automatic car washes", "Truck wash bays", "Fleet yards", "Dealerships", "Service garages"],
    processSteps: [
      "Review site layout, pit depth, and disposal requirements before work starts.",
      "Vacuum out sludge, grit, and contaminated standing water from pits and sumps.",
      "Clear heavy residue from corners and hard-to-reach settling areas.",
      "Leave the bay ready for restart with notes on future cleaning frequency.",
    ],
    whyChoose: "We keep wash bay work straightforward with fast scheduling, experienced pumping crews, and service plans that fit around operating hours.",
    secondaryKeywords: ["wash bay cleaning", "car wash pit pumping", "sump pit cleaning", "sludge removal"],
    relatedServiceSlugs: ["vacuum-truck-service", "industrial-tank-cleaning", "catch-basin-cleaning"],
    industries: [
      { slug: "fleet-yard", name: "Fleet Yard", summary: "Prevent wash downtime and protect drainage systems in heavy-use fleet environments.", regulations: "Fleet operations often need documented waste handling and scheduled pit cleaning to keep wash areas operational. Regulations vary by province and municipality — check with your local authority for specific requirements.", checklist: ["Pit vacuuming", "Sediment removal", "Drainage review", "Service reporting"], planOptions: ["Monthly cleaning", "Quarterly cleaning", "High-volume seasonal plans"] },
    ],
    faqs: BASE_FAQS,
  },
  "septic-tank-pumping": {
    slug: "septic-tank-pumping",
    name: "Septic & Holding Tank Pumping",
    navLabel: "Septic Tanks",
    clusterLabel: "Residential + Rural",
    shortDescription: "Septic pumping, holding tank cleanouts, and rural waste removal for homes, cottages, acreages, and commercial properties.",
    heroPrimary: "Protect Your System Before It Backs Up",
    heroSecondary: "Routine septic pumping helps prevent sewage overflow, drainfield stress, and emergency callouts.",
    whatItIs: "Septic and holding tank pumping removes accumulated solids and liquids so the system can keep working without overflow, odours, or avoidable strain.",
    whoNeeds: ["Rural homes", "Cottages", "Acreages", "Campgrounds", "Small commercial sites"],
    processSteps: [
      "Locate the tank, verify access, and check recent use patterns.",
      "Pump down liquid and solids safely using equipment matched to the tank condition.",
      "Inspect visible tank condition and flag anything that may need further attention.",
      "Recommend a pumping interval based on occupancy, usage, and site type.",
    ],
    whyChoose: "From routine rural service to urgent overflow support, CleanLiquidWaste focuses on clear timing, safe handling, and practical maintenance recommendations.",
    secondaryKeywords: ["septic tank cleaning", "holding tank pumping", "cottage septic pumping", "rural septic service"],
    relatedServiceSlugs: ["vacuum-truck-service", "storm-drain-cleaning", "industrial-tank-cleaning"],
    industries: [
      { slug: "cottage", name: "Cottage", summary: "Match service timing to seasonal occupancy so you avoid backups during peak use.", regulations: "Seasonal properties often need different pumping schedules than full-time homes because occupancy changes quickly. Regulations vary by province and municipality — check with your local authority for specific requirements.", checklist: ["Tank pump-out", "Seasonal interval review", "Access planning", "Usage-based recommendations"], planOptions: ["Pre-season pumping", "Mid-season service", "Annual shutdown plans"] },
      { slug: "acreage", name: "Acreage", summary: "Keep rural systems dependable with service intervals matched to family size, guests, and tank volume.", regulations: "Large rural properties may require scheduled maintenance and clear access planning for vacuum trucks. Regulations vary by province and municipality — check with your local authority for specific requirements.", checklist: ["Tank access review", "Pump-out service", "Usage discussion", "Maintenance reminders"], planOptions: ["Annual plans", "Biannual plans", "High-occupancy service"] },
    ],
    faqs: BASE_FAQS,
  },
  "vacuum-truck-service": {
    slug: "vacuum-truck-service",
    name: "Vacuum Truck Service",
    navLabel: "Vacuum Trucks",
    clusterLabel: "Industrial Pumping",
    shortDescription: "Vacuum truck pumping for sludge, liquids, pits, interceptors, spill response, and industrial waste handling.",
    heroPrimary: "On-Demand Vacuum Capacity For Tough Jobs",
    heroSecondary: "When solids, liquids, or slurry have to move quickly, the right vacuum truck keeps cleanup controlled.",
    whatItIs: "Vacuum truck service removes liquid waste, sludge, and debris from tanks, pits, trenches, and other sites that need fast material transfer and cleanup.",
    whoNeeds: ["Industrial facilities", "Municipal sites", "Commercial yards", "Construction teams", "Emergency response crews"],
    processSteps: [
      "Confirm waste type, access conditions, and the equipment capacity needed for the job.",
      "Set up safe hose runs and containment before pumping starts.",
      "Remove liquid, sludge, or solids efficiently while monitoring site conditions.",
      "Close out with disposal routing and next-step recommendations for follow-up service.",
    ],
    whyChoose: "We pair experienced operators with responsive dispatch so time-sensitive pumping jobs can move without unnecessary delays.",
    secondaryKeywords: ["industrial vacuum service", "sludge vacuum truck service", "vacuum truck pumping", "emergency vacuum truck"],
    relatedServiceSlugs: ["hydrovac-service", "industrial-tank-cleaning", "catch-basin-cleaning"],
    industries: [
      { slug: "industrial", name: "Industrial", summary: "Support shutdowns, maintenance windows, and spill response with flexible vacuum capacity.", regulations: "Industrial pumping often requires site-specific waste handling procedures and clear documentation. Regulations vary by province and municipality — check with your local authority for specific requirements.", checklist: ["Sludge removal", "Tank and pit pumping", "Containment setup", "Waste routing support"], planOptions: ["Shutdown support", "Weekly maintenance", "Emergency callouts"] },
      { slug: "municipal", name: "Municipal", summary: "Keep public works jobs moving with vacuum support for basins, lines, and wastewater-related cleanup.", regulations: "Municipal jobs can involve traffic control, access coordination, and regulated disposal practices. Regulations vary by province and municipality — check with your local authority for specific requirements.", checklist: ["Basin pumping", "Line debris removal", "Site cleanup", "Reporting support"], planOptions: ["Seasonal service", "Storm response coverage", "Project-based dispatch"] },
    ],
    faqs: BASE_FAQS,
  },
  "hydrovac-service": {
    slug: "hydrovac-service",
    name: "Hydrovac Service",
    navLabel: "Hydrovac",
    clusterLabel: "Excavation Support",
    shortDescription: "Hydrovac excavation and non-destructive digging for utilities, pole holes, daylighting, trenching, and sensitive sites.",
    heroPrimary: "Excavate Precisely Without Guesswork",
    heroSecondary: "Hydrovac service exposes buried infrastructure with water and vacuum instead of risky mechanical digging.",
    whatItIs: "Hydrovac service uses pressurized water and strong vacuum recovery to loosen soil and safely expose utilities or sensitive underground areas.",
    whoNeeds: ["Utility contractors", "Civil crews", "Municipal teams", "Industrial sites", "Telecom projects"],
    processSteps: [
      "Assess soil, access, and utility exposure goals before excavation begins.",
      "Use controlled water pressure to break material without over-digging.",
      "Vacuum slurry away immediately to keep the work zone visible and tidy.",
      "Complete daylighting or trenching with a cleaner, more precise excavation footprint.",
    ],
    whyChoose: "Hydrovac work demands steady operators, careful excavation control, and clear jobsite communication. That is where our crews focus.",
    secondaryKeywords: ["hydrovac excavation", "hydrovac near me", "utility daylighting", "non-destructive digging"],
    relatedServiceSlugs: ["vacuum-truck-service", "storm-drain-cleaning", "industrial-tank-cleaning"],
    industries: [
      { slug: "excavation", name: "Excavation", summary: "Use hydrovac to expose lines, reduce damage risk, and keep projects moving in congested utility corridors.", regulations: "Utility exposure work typically depends on local locate rules, site controls, and job-specific procedures. Regulations vary by province and municipality — check with your local authority for specific requirements.", checklist: ["Daylighting", "Pole holes", "Utility exposure", "Spoils containment"], planOptions: ["Single-day dispatch", "Project standby", "Multi-day excavation support"] },
    ],
    faqs: BASE_FAQS,
  },
  "industrial-tank-cleaning": {
    slug: "industrial-tank-cleaning",
    name: "Industrial Tank Cleaning",
    navLabel: "Tank Cleaning",
    clusterLabel: "Environmental",
    shortDescription: "Industrial tank cleaning, sludge removal, lift station support, and environmental pumping for commercial and industrial systems.",
    heroPrimary: "Restore Capacity In Tanks, Sumps, And Process Areas",
    heroSecondary: "Planned tank cleaning reduces buildup, access issues, odours, and maintenance delays.",
    whatItIs: "Industrial tank cleaning removes liquids, sludge, scale, and settled waste from containment systems so maintenance, inspection, and regular operation can continue safely.",
    whoNeeds: ["Manufacturing plants", "Food processors", "Municipal lift stations", "Warehouses", "Energy sites"],
    processSteps: [
      "Review tank condition, access limitations, and the cleaning objective.",
      "Pump liquids and heavy residue using the right combination of vacuum equipment and site controls.",
      "Clean down remaining buildup so inspection or maintenance can proceed.",
      "Provide notes on future cleaning intervals or follow-up pumping needs.",
    ],
    whyChoose: "Complex industrial sites need calm coordination, strong pumping capacity, and crews who can work around shutdown windows without creating extra friction.",
    secondaryKeywords: ["industrial pumping", "lift station cleaning", "sludge removal", "environmental pumping"],
    relatedServiceSlugs: ["vacuum-truck-service", "hydrovac-service", "storm-drain-cleaning"],
    industries: [
      { slug: "manufacturing", name: "Manufacturing", summary: "Keep maintenance windows productive with tank cleaning that reduces sludge buildup and restart delays.", regulations: "Industrial facilities often need site-specific disposal, safety planning, and service documentation. Regulations vary by province and municipality — check with your local authority for specific requirements.", checklist: ["Tank pump-out", "Sludge removal", "Surface cleaning", "Maintenance coordination"], planOptions: ["Shutdown support", "Quarterly service", "Annual deep cleaning"] },
      { slug: "lift-station", name: "Lift Station", summary: "Remove grease, rags, and settled solids that interfere with wastewater performance.", regulations: "Municipal and private lift stations often need preventative cleaning to reduce blockages and mechanical stress. Regulations vary by province and municipality — check with your local authority for specific requirements.", checklist: ["Wet well pumping", "Debris removal", "Odour reduction support", "Maintenance notes"], planOptions: ["Monthly plans", "Quarterly plans", "Emergency overflow response"] },
    ],
    faqs: BASE_FAQS,
  },
  "catch-basin-cleaning": {
    slug: "catch-basin-cleaning",
    name: "Catch Basin Cleaning",
    navLabel: "Catch Basins",
    clusterLabel: "Drainage",
    shortDescription: "Catch basin pumping and debris removal for parking lots, commercial sites, industrial yards, and municipal drainage systems.",
    heroPrimary: "Keep Surface Water Moving",
    heroSecondary: "Routine catch basin cleaning helps prevent ponding, overflow, and sediment buildup during heavy weather.",
    whatItIs: "Catch basin cleaning removes sediment, trash, and standing water so drainage structures can keep handling runoff effectively.",
    whoNeeds: ["Parking lots", "Retail plazas", "Industrial yards", "Property managers", "Municipal crews"],
    processSteps: [
      "Inspect basin access and sediment level before vacuum work begins.",
      "Pump out standing water, trash, and settled material from the structure.",
      "Remove compacted debris that reduces usable basin volume.",
      "Recommend future cleaning frequency based on site runoff and debris load.",
    ],
    whyChoose: "We help sites stay ahead of ponding and drainage complaints with responsive service and maintenance plans that are easy to schedule.",
    secondaryKeywords: ["catch basin pumping", "parking lot catch basin cleaning", "stormwater maintenance", "commercial basin cleaning"],
    relatedServiceSlugs: ["storm-drain-cleaning", "vacuum-truck-service", "car-wash-pit-cleaning"],
    industries: [
      { slug: "commercial", name: "Commercial", summary: "Support safer lots and cleaner runoff routes with scheduled basin cleaning across busy properties.", regulations: "Commercial drainage maintenance may be tied to property standards, runoff management, and local bylaws. Regulations vary by province and municipality — check with your local authority for specific requirements.", checklist: ["Sediment pumping", "Trash removal", "Water removal", "Service tracking"], planOptions: ["Spring cleanup", "Quarterly plans", "Storm-season support"] },
    ],
    faqs: BASE_FAQS,
  },
  "storm-drain-cleaning": {
    slug: "storm-drain-cleaning",
    name: "Storm Drain Cleaning",
    navLabel: "Storm Drains",
    clusterLabel: "Drainage",
    shortDescription: "Storm drain cleaning and debris removal for commercial sites, municipalities, industrial properties, and high-runoff areas.",
    heroPrimary: "Reduce Flooding Risk Before The Next Storm",
    heroSecondary: "Blocked storm drains can create ponding, property damage, and disruption when runoff has nowhere to go.",
    whatItIs: "Storm drain cleaning removes silt, leaves, trash, and other obstructions that limit water flow through surface drainage infrastructure.",
    whoNeeds: ["Municipal systems", "Commercial plazas", "Industrial yards", "Warehouses", "Large residential sites"],
    processSteps: [
      "Identify the drain structures, access points, and debris level across the site.",
      "Vacuum out loose material and standing water that restrict flow.",
      "Clear deeper buildup that can trigger surface flooding during peak runoff.",
      "Leave the system with a practical maintenance recommendation for the next cycle.",
    ],
    whyChoose: "Storm response is easier when drains are maintained ahead of time. We help property teams stay ready with direct scheduling and dependable pumping support.",
    secondaryKeywords: ["storm drain maintenance", "storm drain pumping", "surface drain cleaning", "drainage debris removal"],
    relatedServiceSlugs: ["catch-basin-cleaning", "vacuum-truck-service", "hydrovac-service"],
    industries: [
      { slug: "municipal", name: "Municipal", summary: "Maintain public drainage assets with planned debris removal before peak runoff periods.", regulations: "Public drainage maintenance often follows municipal schedules and site-specific runoff priorities. Regulations vary by province and municipality — check with your local authority for specific requirements.", checklist: ["Drain cleaning", "Debris removal", "Standing water removal", "Condition notes"], planOptions: ["Seasonal plans", "Pre-storm preparation", "Emergency response dispatch"] },
    ],
    faqs: BASE_FAQS,
  },
};

export const SERVICES = SERVICES_INTERNAL;
export const SERVICE_ORDER = Object.keys(SERVICES) as ServiceSlug[];

const BASE_ROUTE_COUNT = 2;
const HUB_PAGE_COUNT = SERVICE_ORDER.length;
const NEAR_ME_PAGE_COUNT = SERVICE_ORDER.length;
const INDUSTRY_PAGE_COUNT = Object.values(SERVICES).reduce((count, service) => count + service.industries.length, 0);
const PROVINCE_SERVICE_PAGE_COUNT = ALL_PROVINCES.length * SERVICE_ORDER.length;

export const CLUSTER_PAGE_ESTIMATE = 33660;
export const LAUNCH_PAGE_PERCENTAGE = 0.1;
export const LAUNCH_PAGE_TARGET = Math.ceil(CLUSTER_PAGE_ESTIMATE * LAUNCH_PAGE_PERCENTAGE);

const NON_CITY_PAGE_COUNT =
  BASE_ROUTE_COUNT + HUB_PAGE_COUNT + NEAR_ME_PAGE_COUNT + INDUSTRY_PAGE_COUNT + PROVINCE_SERVICE_PAGE_COUNT;

const MAX_LAUNCH_LOCATION_COUNT = Math.max(
  0,
  Math.floor((LAUNCH_PAGE_TARGET - NON_CITY_PAGE_COUNT) / SERVICE_ORDER.length),
);

const PROVINCE_LAUNCH_PRIORITY = [
  "AB",
  "BC",
  "ON",
  "SK",
  "MB",
  "QC",
  "NS",
  "NB",
  "NL",
  "PE",
  "NT",
  "NU",
  "YT",
] as const;

function selectLaunchLocations(locations: LocationContent[], maxCount: number) {
  if (locations.length <= maxCount) {
    return locations;
  }

  const provinceOrder = new Map(PROVINCE_LAUNCH_PRIORITY.map((abbr, index) => [abbr, index]));
  const locationOrder = new Map(
    locations.map((location, index) => [`${location.stateAbbr}:${location.citySlug}`, index]),
  );
  const sortedLocations = [...locations].sort((a, b) => {
    const priorityDelta =
      (provinceOrder.get(a.stateAbbr as (typeof PROVINCE_LAUNCH_PRIORITY)[number]) ?? Number.MAX_SAFE_INTEGER) -
      (provinceOrder.get(b.stateAbbr as (typeof PROVINCE_LAUNCH_PRIORITY)[number]) ?? Number.MAX_SAFE_INTEGER);

    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    return (
      (locationOrder.get(`${a.stateAbbr}:${a.citySlug}`) ?? Number.MAX_SAFE_INTEGER) -
      (locationOrder.get(`${b.stateAbbr}:${b.citySlug}`) ?? Number.MAX_SAFE_INTEGER)
    );
  });

  return sortedLocations.slice(0, maxCount);
}

export const LOCATION_PAGES: LocationContent[] = selectLaunchLocations(
  ALL_LOCATION_PAGES,
  MAX_LAUNCH_LOCATION_COUNT,
);

export const PROVINCES: ProvinceContent[] = ALL_PROVINCES;

export function getServiceBySlug(slug: string) {
  return SERVICES[slug as ServiceSlug] ?? null;
}

export function getProvinceBySlug(slug: string) {
  return PROVINCES.find((province) => province.slug === slug) ?? null;
}

export function getLocation(state: string, city: string) {
  return LOCATION_PAGES.find((location) => location.stateSlug === state && location.citySlug === city) ?? null;
}

export function getLocationsByState(state: string) {
  return LOCATION_PAGES.filter((location) => location.stateSlug === state);
}

export function getStates() {
  return PROVINCES.map(({ slug, name, abbr }) => ({ slug, name, abbr }));
}

export function getIndustry(serviceSlug: string, industrySlug: string) {
  return getServiceBySlug(serviceSlug)?.industries.find((industry) => industry.slug === industrySlug) ?? null;
}

export const FEATURED_CITIES = ["Toronto", "Calgary", "Vancouver", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Saskatoon", "Halifax"];
