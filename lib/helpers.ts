import {
  BrushCleaning,
  Car,
  Cat,
  Dumbbell,
  Medal,
  Utensils,
  WavesLadder,
  Wifi,
} from 'lucide-react-native';

export const facilitiesIconMapping = (name: string) => {
  switch (name) {
    case 'Laundry':
      return BrushCleaning;
    case 'Parking':
      return Car;
    case 'Sports-center':
      return Medal;
    case 'Cutlery':
      return Utensils;
    case 'Gym':
      return Dumbbell;
    case 'Swimming-pool':
      return WavesLadder;
    case 'Wifi':
      return Wifi;
    case 'Pet-center':
      return Cat;
  }
};

export const getCoordinates = (geoString: string) => {
  if (!geoString) return null;

  try {
    const [lat, long] = geoString.split(',').map((coord) => parseFloat(coord.trim()));
    if (!isNaN(lat) && !isNaN(long)) {
      return {
        latitude: lat,
        longitude: long,
      };
    }
  } catch (error) {
    console.error('Invalid coordinates format', error);
  }
  return null;
};
