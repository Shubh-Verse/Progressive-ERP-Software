export function getCategory(
    description: string
  ) {
    const text = description.toLowerCase();
  
    if (
      text.includes("aac") ||
      text.includes("autoclaved aerated")
    ) {
      return "AAC Block Masonry";
    }
  
    if (
      text.includes("brick")
    ) {
      return "Brick Work";
    }
  
    if (
      text.includes("wash basin")
    ) {
      return "Wash Basin Opening";
    }
  
    if (
      text.includes("door stopper")
    ) {
      return "Door Stopper";
    }
  
    if (
      text.includes("hold fast")
    ) {
      return "Hold Fast";
    }
  
    if (
      text.includes("marble") ||
      text.includes("granite")
    ) {
      return "Marble Work";
    }
  
    if (
      text.includes("khurra")
    ) {
      return "Khurra Work";
    }
  
    if (
      text.includes("road") ||
      text.includes("roller") ||
      text.includes("sub grade")
    ) {
      return "Road Work";
    }
  
    if (
      text.includes("concrete") ||
      text.includes("cement concrete")
    ) {
      return "Concrete Work";
    }
  
    return "Miscellaneous Works";
  }