export function getShortDescription(
    text: string
  ) {
    const value = text.toLowerCase();
  
    if (
      value.includes("aac") ||
      value.includes("autoclaved aerated")
    )
      return "AAC Block Masonry";
  
    if (
      value.includes("brick work") ||
      value.includes("brick masonry")
    )
      return "Brick Work";
  
    if (
      value.includes("paver") ||
      value.includes("interlocking")
    )
      return "Paver Block";
  
    if (
      value.includes("gypsum")
    )
      return "Gypsum Partition";
  
    if (
      value.includes("plinth protection")
    )
      return "Plinth Protection";
  
    if (
      value.includes("wash basin")
    )
      return "Wash Basin Opening";
  
    if (
      value.includes("door stopper")
    )
      return "Door Stopper";
  
    if (
      value.includes("hold fast")
    )
      return "Hold Fast";
  
    if (
      value.includes("tile")
    )
      return "Tile Work";
  
    if (
      value.includes("paint")
    )
      return "Painting Work";
  
    if (
      value.includes("waterproof")
    )
      return "Waterproofing";
  
    if (
      value.includes("plaster")
    )
      return "Plaster Work";
  
    return text
      .split(" ")
      .slice(0, 4)
      .join(" ");
  }