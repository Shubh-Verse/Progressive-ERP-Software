import { getDSRComponents } from "./dsrComponentService";

export async function calculateDSRAnalysis(
  dsrId: number
) {

  const components =
    await getDSRComponents(dsrId);

  let materialTotal = 0;
  let labourTotal = 0;
  let equipmentTotal = 0;
  let cartageTotal = 0;
  let gstTotal = 0;
  let ohpTotal = 0;
  let subcontractTotal = 0;

  components.forEach((item: any) => {

    const amount = Number(item.amount || 0);

    switch (item.component_type) {

      case "Material":
        materialTotal += amount;
        break;

      case "Labour":
        labourTotal += amount;
        break;

      case "Equipment":
        equipmentTotal += amount;
        break;

      case "Cartage":
        cartageTotal += amount;
        break;

      case "GST":
        gstTotal += amount;
        break;

      case "OH&P":
        ohpTotal += amount;
        break;

      case "Subcontract":
        subcontractTotal += amount;
        break;
    }
  });

  const total =
    materialTotal +
    labourTotal +
    equipmentTotal +
    cartageTotal +
    gstTotal +
    ohpTotal +
    subcontractTotal;

  return {
    materialTotal,
    labourTotal,
    equipmentTotal,
    cartageTotal,
    gstTotal,
    ohpTotal,
    subcontractTotal,
    total,
  };
}