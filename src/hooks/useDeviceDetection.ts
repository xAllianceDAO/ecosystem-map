import { useMemo } from 'react';
import { UAParser } from 'ua-parser-js';

type DeviceInfo = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: string | undefined;
  browserName: string | undefined;
  osName: string | undefined;
};

/**
 * Hook to detect the type of device used by the user
 * @returns DeviceInfo - Device information
 */
export const useDeviceDetection = (): DeviceInfo => {
  const deviceInfo = useMemo(() => {
    const parser = new UAParser();
    const device = parser.getDevice();
    const browser = parser.getBrowser();
    const os = parser.getOS();

    const isMobile = device.type === 'mobile';
    const isTablet = device.type === 'tablet';
    const isDesktop = !isMobile && !isTablet;

    return {
      isMobile,
      isTablet,
      isDesktop,
      deviceType: device.type,
      browserName: browser.name,
      osName: os.name
    };
  }, []);

  return deviceInfo;
}; 