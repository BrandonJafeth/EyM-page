export interface LandingService {
  id: string;
  title: string;
  shortDescription: string;
  cta?: string;
}

export interface DetailedService {
[x: string]: string;
  id: string;
  title: string;
  fullDescription: string;
  features?: string[];
}

export type Service = LandingService | DetailedService;

export interface ServicesData {
  landing_services: LandingService[];
  detailed_services: DetailedService[];
  oferta?: any[]; // Keep for backward compatibility if needed, but should be removed eventually
  especializados?: any[]; // Keep for backward compatibility if needed
}