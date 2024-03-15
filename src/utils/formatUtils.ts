export const formatCoordinates = (coordinates: [string, string][]) => {
  return coordinates.map((c) => ({ lat: Number(c[0]), lng: Number(c[1]) }));
};

export const formatDistance = (distance: number): string => {
  if (distance < 1000) return distance + " m";
  return (distance / 1000).toFixed(2) + " km";
};

export const formatTime = (time: number): string => {
  if (time < 60) return time + " s";
  return (time / 60).toFixed(2) + " min";
};
