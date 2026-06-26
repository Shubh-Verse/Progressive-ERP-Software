"use client";

import { useEffect, useState } from "react";

import { getBOQSummary } from "@/services/boqService";

import { BOQSummary } from "@/types/boq";

interface Props{

    boqId:number;

}

export default function BOQSummaryCard({

boqId

}:Props){

const [boq,setBOQ]=
useState<BOQSummary|null>(null);

useEffect(()=>{

getBOQSummary(boqId)

.then(setBOQ);

},[boqId]);

if(!boq)return null;

return(

<div>

    
        <h2 className="text-xl font-bold mb-4">BOQ Summary</h2>
    
        <div className="space-y-2">
    
            <div><strong>Description:</strong> {boq.description}</div>
    
            <div><strong>Unit:</strong> {boq.unit}</div>
    
            <div><strong>Quantity:</strong> {boq.qty}</div>
    
            <div><strong>Rate:</strong> {boq.rate}</div>
    
            <div><strong>Category:</strong> {boq.category || 'N/A'}</div>
    
            <div><strong>Project:</strong> {boq.projects.name}</div>
    
        </div>

</div>

);

}