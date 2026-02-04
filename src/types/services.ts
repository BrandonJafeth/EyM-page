export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features?: string[];
  icon?: string;
}

export interface ServicesData {
  oferta: Service[];
  especializados: Service[];
}
