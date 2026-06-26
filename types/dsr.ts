import { ReactNode } from "react";

// Search Result
export interface ReferenceSearchResult {
    id: number;
    dsr_code: string;
    description: string;
    rate?: number;
    unit?: string;
}
  
  // Master DSR Item
  export interface DSRItem {
    category: string;
    unit: ReactNode;
    rate: any;
    id: number;
    dsr_code: string;
    description: string;
  }
  
  // Individual Component
  export interface DSRComponent {
    id: number;
    dsr_id: number;
  
    component_type: string;
    component_name: string;
  
    icd_no: string | null;
  
    unit: string | null;
  
    qty: number;
  
    rate: number;
  
    amount: number;
  }
  
  // Complete Reference
  export interface ReferenceDetail {
    master: DSRItem;
    components: DSRComponent[];
  }