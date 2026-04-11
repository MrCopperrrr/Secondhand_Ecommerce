import React, { createContext, useContext, useState, useEffect } from 'react';
import { commonServices } from '../services/common.services';

interface Location {
  lat: number;
  lng: number;
}

interface LocationContextType {
  userLocation: Location | null;
  loading: boolean;
  error: string | null;
  provinces: any[];
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await commonServices.getProvinces();
        setProvinces(res.data.result || []);
      } catch (err) {
        console.error("Failed to load provinces", err);
      }

      const requestLocation = () => {
        if (!navigator.geolocation) {
          setError("Trình duyệt không hỗ trợ định vị");
          setLoading(false);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            setError(null);
            setLoading(false);
          },
          (err) => {
            if (err.code === 1) {
              setError("Vui lòng cho phép quyền truy cập vị trí.");
            } else {
              setError("Không thể lấy vị trí: " + err.message);
            }
            setLoading(false);
          },
          { 
            enableHighAccuracy: true, 
            timeout: 15000,  // Increased to 15s for user to click Allow
            maximumAge: 1000 * 60 * 5 // Cache for 5 mins
          }
        );
      };

      // Listen for permission changes if supported
      if ('permissions' in navigator) {
          navigator.permissions.query({ name: 'geolocation' as PermissionName }).then((result) => {
              result.onchange = () => {
                  if (result.state === 'granted') {
                      requestLocation();
                  }
              };
          });
      }

      requestLocation();
    };

    init();
  }, []);

  return (
    <LocationContext.Provider value={{ userLocation, loading, error, provinces }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};

// Haversine formula to calculate distance in KM
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
