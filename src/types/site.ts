export interface SiteData {
  name: string;
  url: string;
  logo: string;
  contact: {
    phone: string;
    phone_secondary?: string;
    email: string;
    address: string;
    maps_link: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
  };
}
