import { ReactNode } from "react";

export interface BOQSummary {
    qty: ReactNode;

    id: number;
  
    project_id: number;
  
    serial_no: number;
  
    description: string;
  
    short_description: string | null;
  
    unit: string;
  
    quantity: number;
  
    rate: number;
  
    amount: number;
  
    category: string | null;
  
    projects: {
  
      id: number;
  
      name: string;
  
    };

    dsr_id: number | null;

dsr_master?: {

    id: number;

    dsr_code: string;

    description: string;

} | null;
  
  }