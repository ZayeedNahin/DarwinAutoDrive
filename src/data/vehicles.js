// Mock data for the Darwin Auto Drive prototype.
// Images are served from Unsplash; the <SmartImage> component shows a branded
// placeholder if any image fails to load (e.g. when offline).

const u = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  hero: u('1533473359331-0135ef1b58bf', 2000),
  about: u('1469854523086-cc02fe5d8800', 1600),
  sell: u('1492144534655-ae79c964c9d7', 1600),
  rent: u('1506015391300-4802dc74de2e', 1600),
  interior1: u('1503736334956-4c8f8e92946d'),
  interior2: u('1552519507-da3b142c6e3d'),
  dash: u('1580273916550-e323be2ae537'),
};

export const vehicles = [
  {
    id: 'toyota-rav4-gxl-2022',
    make: 'Toyota', model: 'RAV4', variant: 'GXL', year: 2022,
    price: 42990, km: 32500, transmission: 'Automatic', fuel: 'Petrol', type: 'SUV',
    colour: 'Crystal Pearl White', rego: 'Registered NT — expires 03/2027',
    location: 'Darwin, NT', availability: 'Available', hasVideo: true, featured: true,
    summary: 'One owner, full Toyota service history. Top-end comfort for city and Top End road trips.',
    description:
      'This 2022 Toyota RAV4 GXL has been owned by one careful Darwin family and serviced exclusively at Toyota. It comes with the 2.5L petrol engine, 8-speed automatic, adaptive cruise control, 8" touchscreen with Apple CarPlay and Android Auto, dual-zone climate control and a powered tailgate. Tyres are near new and it has just been detailed inside and out. A practical, reliable SUV that suits Darwin conditions year-round.',
    features: ['Adaptive cruise', 'Apple CarPlay', 'Dual-zone climate', 'Reversing camera', 'Powered tailgate', 'Lane keep assist'],
    images: ['1568605117036-5fe5e7bab0b7', '1549317661-bd32c8ce0db2', '1503736334956-4c8f8e92946d', '1580273916550-e323be2ae537'],
  },
  {
    id: 'toyota-hilux-sr5-2021',
    make: 'Toyota', model: 'HiLux', variant: 'SR5 4x4 Double Cab', year: 2021,
    price: 54990, km: 61200, transmission: 'Automatic', fuel: 'Diesel', type: 'Ute',
    colour: 'Graphite Grey', rego: 'Registered NT — expires 11/2026',
    location: 'Winnellie, NT', availability: 'Available', hasVideo: true, featured: true,
    summary: 'Tow-ready 2.8L turbo diesel with tub liner, tow bar and canopy rails.',
    description:
      'A genuine workhorse that has been well looked after. This HiLux SR5 runs the 2.8L turbo diesel with 500Nm of torque, 4x4 with rear diff lock, factory tow bar rated to 3,500kg, tub liner and soft tonneau. Inside you get climate control, sat-nav and a reversing camera. Logbook servicing up to date, two keys, and ready for work or weekend trips down the Stuart Highway.',
    features: ['4x4 with diff lock', '3,500kg towing', 'Tub liner', 'Sat-nav', 'Reversing camera', 'Side steps'],
    images: ['1559416523-140ddc3d238c', '1533473359331-0135ef1b58bf', '1552519507-da3b142c6e3d', '1580273916550-e323be2ae537'],
  },
  {
    id: 'mazda-cx5-touring-2020',
    make: 'Mazda', model: 'CX-5', variant: 'Touring', year: 2020,
    price: 31490, km: 58900, transmission: 'Automatic', fuel: 'Petrol', type: 'SUV',
    colour: 'Soul Red Crystal', rego: 'Registered NT — expires 06/2027',
    location: 'Darwin, NT', availability: 'Available', hasVideo: false, featured: true,
    summary: 'Stylish, efficient mid-size SUV with leather trim and a premium feel.',
    description:
      'The Mazda CX-5 Touring delivers a premium drive at a sensible price. It features leather-appointed seats, heated front seats, keyless entry, a head-up display and Mazda Connect infotainment with smartphone mirroring. Serviced on time with records, no accident history and a clean interior. A great family SUV for Darwin city living.',
    features: ['Leather trim', 'Head-up display', 'Keyless entry', 'Blind spot monitoring', 'Smartphone mirroring'],
    images: ['1542362567-b07e54358753', '1503736334956-4c8f8e92946d', '1552519507-da3b142c6e3d'],
  },
  {
    id: 'ford-ranger-xlt-2022',
    make: 'Ford', model: 'Ranger', variant: 'XLT 3.2 4x4', year: 2022,
    price: 58990, km: 44800, transmission: 'Automatic', fuel: 'Diesel', type: 'Ute',
    colour: 'Arctic White', rego: 'Registered NT — expires 01/2027',
    location: 'Palmerston, NT', availability: 'Under Offer', hasVideo: true,
    summary: 'Fitted with bull bar, LED light bar and snorkel — Top End ready.',
    description:
      'This Ranger XLT is set up for the Territory. Accessories include a steel bull bar with winch, LED light bar, snorkel, UHF radio and roller shutter. The 3.2L five-cylinder diesel pulls strongly and the 10-inch SYNC infotainment makes long trips easy. Full dealer service history, one owner.',
    features: ['Bull bar & winch', 'Snorkel', 'UHF radio', 'Roller shutter', 'LED light bar', 'SYNC 3'],
    images: ['1533106418989-88406c7cc8ca', '1519641471654-76ce0107ad1b', '1580273916550-e323be2ae537'],
  },
  {
    id: 'toyota-landcruiser-gxl-2019',
    make: 'Toyota', model: 'LandCruiser', variant: '200 Series GXL', year: 2019,
    price: 89990, km: 112400, transmission: 'Automatic', fuel: 'Diesel', type: '4WD',
    colour: 'Eclipse Black', rego: 'Registered NT — expires 09/2027',
    location: 'Darwin, NT', availability: 'Available', hasVideo: true, featured: true,
    summary: 'The Territory legend. V8 twin-turbo diesel, 8 seats, full Toyota history.',
    description:
      'A LandCruiser 200 GXL with the 4.5L twin-turbo V8 diesel, 8 seats and full-time 4WD. Fitted with a dual-battery system, long-range fuel tank and rear drawers — ready for Kakadu, Litchfield and beyond. Every service completed at Toyota with stamped logbook. Tyres at 80%.',
    features: ['V8 twin-turbo diesel', '8 seats', 'Dual battery', 'Long-range tank', 'Rear drawers', 'Crawl control'],
    images: ['1519641471654-76ce0107ad1b', '1533473359331-0135ef1b58bf', '1503736334956-4c8f8e92946d', '1580273916550-e323be2ae537'],
  },
  {
    id: 'hyundai-i30-active-2021',
    make: 'Hyundai', model: 'i30', variant: 'Active', year: 2021,
    price: 23990, km: 39800, transmission: 'Automatic', fuel: 'Petrol', type: 'Hatchback',
    colour: 'Intense Blue', rego: 'Registered NT — expires 05/2027',
    location: 'Darwin, NT', availability: 'Available', hasVideo: false,
    summary: 'Economical city hatch with remaining factory warranty.',
    description:
      'A smart first car or daily driver. The i30 Active offers an 8" touchscreen with CarPlay and Android Auto, auto emergency braking, lane keep assist and a reversing camera. Balance of Hyundai factory warranty applies. Low running costs and easy to park around the CBD and Waterfront.',
    features: ['Factory warranty', 'Auto emergency braking', 'Apple CarPlay', 'Reversing camera'],
    images: ['1541899481282-d53bffe3c35d', '1552519507-da3b142c6e3d'],
  },
  {
    id: 'tesla-model-3-2023',
    make: 'Tesla', model: 'Model 3', variant: 'Rear-Wheel Drive', year: 2023,
    price: 49990, km: 18200, transmission: 'Automatic', fuel: 'Electric', type: 'Sedan',
    colour: 'Midnight Silver', rego: 'Registered NT — expires 12/2026',
    location: 'Darwin, NT', availability: 'Available', hasVideo: true,
    summary: 'Low-km EV with Autopilot, glass roof and home charger included.',
    description:
      'Go electric in the Top End. This low-kilometre Model 3 RWD includes Autopilot, premium interior with heated seats, panoramic glass roof and a wall connector for home charging. Battery health checked and reported at 98%. Balance of Tesla battery and drive unit warranty.',
    features: ['Autopilot', 'Glass roof', 'Home charger included', 'Battery warranty', 'OTA updates'],
    images: ['1560958089-b8a1929cea89', '1503736334956-4c8f8e92946d'],
  },
  {
    id: 'kia-carnival-si-2021',
    make: 'Kia', model: 'Carnival', variant: 'Si 8-Seat', year: 2021,
    price: 46990, km: 52300, transmission: 'Automatic', fuel: 'Diesel', type: 'Van',
    colour: 'Astra Blue', rego: 'Registered NT — expires 08/2027',
    location: 'Casuarina, NT', availability: 'Available', hasVideo: false,
    summary: 'Eight seats, power sliding doors and space for the whole family.',
    description:
      'The ultimate family mover. This Carnival Si seats eight adults comfortably, with power sliding doors, tri-zone climate control and rear air vents that make a difference in Darwin heat. Balance of Kia 7-year warranty. Serviced at Kia with records.',
    features: ['8 seats', 'Power sliding doors', 'Tri-zone climate', '7-year warranty'],
    images: ['1570733577524-3a047079e80d', '1552519507-da3b142c6e3d'],
  },
  {
    id: 'mitsubishi-outlander-phev-2022',
    make: 'Mitsubishi', model: 'Outlander', variant: 'PHEV ES', year: 2022,
    price: 44490, km: 27600, transmission: 'Automatic', fuel: 'Hybrid', type: 'SUV',
    colour: 'White Diamond', rego: 'Registered NT — expires 02/2027',
    location: 'Darwin, NT', availability: 'Coming Soon', hasVideo: false,
    summary: 'Plug-in hybrid AWD — electric around town, petrol for longer trips.',
    description:
      'Drive most of your daily commute on electricity and let the petrol engine handle longer drives. This Outlander PHEV ES features twin-motor AWD, V2L power outlet, 9" display and Mitsubishi Connect. Arriving soon — register your interest now.',
    features: ['Plug-in hybrid', 'Twin-motor AWD', 'V2L power', '10-year warranty (conditions apply)'],
    images: ['1606664515524-ed2f786a0bd6', '1503736334956-4c8f8e92946d'],
  },
  {
    id: 'isuzu-dmax-lsu-2023',
    make: 'Isuzu', model: 'D-MAX', variant: 'LS-U 4x4', year: 2023,
    price: 52990, km: 21400, transmission: 'Automatic', fuel: 'Diesel', type: 'Ute',
    colour: 'Cobalt Blue', rego: 'Registered NT — expires 10/2027',
    location: 'Winnellie, NT', availability: 'Available', hasVideo: true,
    summary: 'Near-new 3.0L diesel with 5-star ANCAP and full warranty.',
    description:
      'Barely run in, this 2023 D-MAX LS-U comes with the 3.0L turbo diesel, 9" touchscreen, leather-accented trim and the full IDAS safety suite. Factory tub liner, tow bar and nudge bar fitted. Balance of Isuzu 6-year warranty.',
    features: ['5-star ANCAP', 'IDAS safety', 'Nudge bar', 'Tow bar', '6-year warranty'],
    images: ['1609521263047-f8f205293f24', '1580273916550-e323be2ae537'],
  },
  {
    id: 'toyota-corolla-ascent-2020',
    make: 'Toyota', model: 'Corolla', variant: 'Ascent Sport Hybrid', year: 2020,
    price: 26490, km: 48700, transmission: 'Automatic', fuel: 'Hybrid', type: 'Hatchback',
    colour: 'Glacier White', rego: 'Registered NT — expires 04/2027',
    location: 'Darwin, NT', availability: 'Available', hasVideo: false,
    summary: 'Hybrid efficiency around 4.2L/100km. Reliable and easy to own.',
    description:
      'The Corolla Ascent Sport Hybrid is one of the most economical cars you can drive in Darwin. Smooth CVT, adaptive cruise, lane trace assist and an 8" touchscreen. Full Toyota logbook history and extended hybrid battery warranty eligibility.',
    features: ['Hybrid', 'Adaptive cruise', 'Lane trace assist', 'Reversing camera'],
    images: ['1590362891991-f776e747a588', '1552519507-da3b142c6e3d'],
  },
  {
    id: 'ford-everest-trend-2022',
    make: 'Ford', model: 'Everest', variant: 'Trend 4WD', year: 2022,
    price: 62990, km: 36900, transmission: 'Automatic', fuel: 'Diesel', type: '4WD',
    colour: 'Meteor Grey', rego: 'Registered NT — expires 07/2027',
    location: 'Palmerston, NT', availability: 'Available', hasVideo: true,
    summary: 'Seven-seat 4WD wagon with terrain management and towing capability.',
    description:
      'The Everest Trend combines genuine off-road ability with family comfort. Seven seats, terrain management system, 3,500kg towing, 12" portrait touchscreen and a full suite of driver assistance features. Serviced at Ford, one owner, no accidents.',
    features: ['7 seats', 'Terrain management', '3,500kg towing', '12" touchscreen', 'Matrix LED'],
    images: ['1617814076367-b759c7d7e738', '1533473359331-0135ef1b58bf', '1580273916550-e323be2ae537'],
  },
].map((v) => ({
  ...v,
  title: `${v.year} ${v.make} ${v.model} ${v.variant}`,
  images: v.images.map((id) => u(id)),
  thumbs: v.images.map((id) => u(id, 400)),
}));

export const makes = [...new Set(vehicles.map((v) => v.make))].sort();
export const vehicleTypes = ['Sedan', 'Hatchback', 'SUV', '4WD', 'Ute', 'Van'];
export const transmissions = ['Automatic', 'Manual'];
export const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];

export const rentalFleet = {
  Economy: { name: 'Kia Picanto', category: 'Economy', rate: 49, seats: 4, bags: 1, image: u('1541899481282-d53bffe3c35d') },
  Compact: { name: 'Toyota Corolla Hatch', category: 'Compact', rate: 62, seats: 5, bags: 2, image: u('1590362891991-f776e747a588') },
  Sedan: { name: 'Toyota Camry Hybrid', category: 'Sedan', rate: 79, seats: 5, bags: 3, image: u('1560958089-b8a1929cea89') },
  SUV: { name: 'Toyota RAV4', category: 'SUV', rate: 95, seats: 5, bags: 4, image: u('1568605117036-5fe5e7bab0b7') },
  '4WD': { name: 'Toyota LandCruiser Prado', category: '4WD', rate: 159, seats: 7, bags: 5, image: u('1519641471654-76ce0107ad1b') },
  Ute: { name: 'Toyota HiLux SR 4x4', category: 'Ute', rate: 119, seats: 5, bags: 3, image: u('1559416523-140ddc3d238c') },
  Van: { name: 'Toyota HiAce Commuter', category: 'Van', rate: 139, seats: 12, bags: 6, image: u('1570733577524-3a047079e80d') },
};

export const rentalLocations = [
  'Darwin International Airport',
  'Darwin CBD — Mitchell Street',
  'Winnellie Depot',
  'Palmerston — Temple Terrace',
  'Casuarina',
];

// Placeholder business details — not real contact information.
export const BUSINESS = {
  name: 'Darwin Auto Drive',
  phone: '(08) 8900 0000',
  email: 'hello@darwinautodrive.example',
  address: 'Darwin, Northern Territory, Australia',
  hours: [
    ['Monday – Friday', '8:00 am – 5:30 pm'],
    ['Saturday', '9:00 am – 3:00 pm'],
    ['Sunday & public holidays', 'Closed'],
  ],
};

export const formatPrice = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n);
export const formatKm = (n) => `${new Intl.NumberFormat('en-AU').format(n)} km`;
